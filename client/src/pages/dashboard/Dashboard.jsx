// pages/dashboard/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FiPlusCircle,
  FiGrid,
  FiCheckCircle,
  FiAlertCircle,
  FiTrash2,
  FiEdit2,
  FiEye,
  FiInbox,
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import itemService from '../../services/itemService';
import Loader from '../../components/Loader';
import ItemCard from '../../components/ItemCard';

const Dashboard = () => {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyItems = async () => {
    try {
      setLoading(true);
      const data = await itemService.getMyItems();
      setItems(data || []);
    } catch (err) {
      toast.error('Failed to load your reported items.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyItems();
  }, []);

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"?`)) return;

    try {
      await itemService.deleteItem(id);
      setItems((prev) => prev.filter((i) => i._id !== id));
      toast.success('Item deleted successfully.');
    } catch {
      toast.error('Failed to delete item.');
    }
  };

  const handleToggleStatus = async (item) => {
    const next = item.status === 'Open' ? 'Returned' : 'Open';
    try {
      const res = await itemService.updateItem(item._id, { status: next });
      setItems((prev) =>
        prev.map((i) => (i._id === item._id ? res.data : i))
      );
      toast.success(`Marked as ${next}!`);
    } catch {
      toast.error('Failed to update status.');
    }
  };

  const total = items.length;
  const lost = items.filter((i) => i.type === 'Lost').length;
  const found = items.filter((i) => i.type === 'Found').length;
  const returned = items.filter((i) => i.status === 'Returned').length;

  return (
    <div className="flex-1 py-10 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-md bg-primary-50 px-2.5 py-1 text-xs font-semibold text-primary-700 mb-1.5">
              🎓 Student & Faculty Dashboard
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Hello, {user?.name}!
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Manage your reported lost and found items and update return statuses.
            </p>
          </div>

          <Link to="/report" className="btn-accent shrink-0">
            <FiPlusCircle className="text-base" />
            Report New Item
          </Link>
        </div>

        {/* Quick User Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-8">
          <div className="card p-4 text-center">
            <span className="text-xs font-semibold text-slate-500 uppercase">My Items</span>
            <span className="text-2xl font-bold text-primary-600 block mt-1">{total}</span>
          </div>

          <div className="card p-4 text-center">
            <span className="text-xs font-semibold text-slate-500 uppercase">Lost Reported</span>
            <span className="text-2xl font-bold text-rose-600 block mt-1">{lost}</span>
          </div>

          <div className="card p-4 text-center">
            <span className="text-xs font-semibold text-slate-500 uppercase">Found Reported</span>
            <span className="text-2xl font-bold text-emerald-600 block mt-1">{found}</span>
          </div>

          <div className="card p-4 text-center">
            <span className="text-xs font-semibold text-slate-500 uppercase">Resolved / Returned</span>
            <span className="text-2xl font-bold text-slate-700 block mt-1">{returned}</span>
          </div>
        </div>

        {/* Section Title */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <FiGrid className="text-primary-600" />
            My Reported Items ({items.length})
          </h2>
        </div>

        {/* Items Grid or Empty */}
        {loading ? (
          <Loader label="Loading your reported items..." />
        ) : items.length === 0 ? (
          <div className="card p-12 text-center my-4">
            <FiInbox className="mx-auto text-5xl text-slate-300 mb-3" />
            <h3 className="text-base font-bold text-slate-800">No Items Reported Yet</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-5">
              You haven't reported any lost or found belongings yet.
            </p>
            <Link to="/report" className="btn-primary text-xs">
              <FiPlusCircle /> Report Your First Item
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                onDelete={handleDelete}
                onToggleStatus={handleToggleStatus}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
