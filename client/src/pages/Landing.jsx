// pages/Landing.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FiPlusCircle,
  FiInfo,
  FiSearch,
  FiCheckCircle,
  FiAlertTriangle,
  FiInbox,
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import itemService from '../services/itemService';
import ItemCard from '../components/ItemCard';
import SearchFilter from '../components/SearchFilter';
import Loader from '../components/Loader';

const Landing = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter State
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const fetchItems = async () => {
    try {
      setLoading(true);
      const params = {};
      if (search.trim()) params.search = search.trim();
      if (typeFilter !== 'All') params.type = typeFilter;
      if (statusFilter !== 'All') params.status = statusFilter;
      if (categoryFilter !== 'All') params.category = categoryFilter;

      const res = await itemService.getItems(params);
      setItems(res.data || []);
    } catch (err) {
      toast.error('Unable to connect to backend server. Make sure it is running on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchItems();
    }, 250);
    return () => clearTimeout(timer);
  }, [search, typeFilter, statusFilter, categoryFilter]);

  const handleResetFilters = () => {
    setSearch('');
    setTypeFilter('All');
    setStatusFilter('All');
    setCategoryFilter('All');
  };

  const handleDeleteItem = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      await itemService.deleteItem(id);
      setItems((prev) => prev.filter((it) => it._id !== id));
      toast.success(`Deleted "${title}" successfully.`);
    } catch (err) {
      toast.error('Failed to delete item.');
    }
  };

  const handleToggleStatus = async (item) => {
    const nextStatus = item.status === 'Open' ? 'Returned' : 'Open';
    try {
      const res = await itemService.updateItem(item._id, { status: nextStatus });
      setItems((prev) =>
        prev.map((it) => (it._id === item._id ? res.data : it))
      );
      toast.success(`Item marked as ${nextStatus}!`);
    } catch (err) {
      toast.error('Failed to update status.');
    }
  };

  // Stats Counters
  const totalCount = items.length;
  const lostCount = items.filter((i) => i.type === 'Lost').length;
  const foundCount = items.filter((i) => i.type === 'Found').length;
  const returnedCount = items.filter((i) => i.status === 'Returned').length;

  return (
    <div className="flex-1 pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-700 via-primary-600 to-indigo-800 text-white py-14 px-4 sm:px-6 shadow-sm">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur mb-4">
            🎓 Campus Community Portal
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Campus Lost and Found Portal
          </h1>
          <p className="text-base sm:text-lg text-primary-100 max-w-2xl mx-auto mb-7 leading-relaxed">
            Misplaced your valuables or found someone else's item on campus? Report it
            here to reunite belongings quickly and securely.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/report" className="btn-accent px-5 py-2.5 text-sm font-bold shadow-md">
              <FiPlusCircle className="text-base" />
              Report an Item
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
            >
              <FiInfo className="text-base" />
              How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 mt-8">
        {/* Statistics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-8">
          <div className="card p-4 text-center">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Visible
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-primary-600 mt-1 block">
              {totalCount}
            </span>
          </div>

          <div className="card p-4 text-center">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Lost Items
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-rose-600 mt-1 block">
              {lostCount}
            </span>
          </div>

          <div className="card p-4 text-center">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Found Items
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 mt-1 block">
              {foundCount}
            </span>
          </div>

          <div className="card p-4 text-center">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Returned
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-700 mt-1 block">
              {returnedCount}
            </span>
          </div>
        </div>

        {/* Search & Filters */}
        <SearchFilter
          search={search}
          setSearch={setSearch}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          onReset={handleResetFilters}
        />

        {/* Feed Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span>Recent Campus Items</span>
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-600 font-semibold">
              {items.length}
            </span>
          </h2>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <Loader label="Fetching campus items from MongoDB..." />
        ) : items.length === 0 ? (
          /* Empty State */
          <div className="card p-12 text-center my-6">
            <FiInbox className="mx-auto text-5xl text-slate-300 mb-3" />
            <h3 className="text-base font-bold text-slate-800">No Items Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-5">
              No reported items match your current search criteria or filters.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleResetFilters}
                className="btn-secondary text-xs"
              >
                Clear Filters
              </button>
              <Link to="/report" className="btn-primary text-xs">
                Report an Item
              </Link>
            </div>
          </div>
        ) : (
          /* Items Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                onDelete={handleDeleteItem}
                onToggleStatus={handleToggleStatus}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Landing;
