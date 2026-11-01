// pages/items/ItemDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  FiArrowLeft,
  FiMapPin,
  FiCalendar,
  FiUser,
  FiPhone,
  FiCheckCircle,
  FiRefreshCw,
  FiEdit2,
  FiTrash2,
  FiCopy,
  FiCheck,
} from 'react-icons/fi';
import itemService from '../../services/itemService';
import Loader from '../../components/Loader';

const PLACEHOLDER_IMG =
  'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22600%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20400%22%3E%3Crect%20width%3D%22600%22%20height%3D%22400%22%20fill%3D%22%23f1f5f9%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22%2394a3b8%22%20font-family%3D%22sans-serif%22%20font-size%3D%2222%22%3ENo%20Image%20Available%3C%2Ftext%3E%3C%2Fsvg%3E';

const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true);
        const data = await itemService.getItemById(id);
        setItem(data);
      } catch (err) {
        toast.error('Item not found.');
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm(`Delete "${item?.title}"?`)) return;
    try {
      await itemService.deleteItem(id);
      toast.success('Item deleted successfully.');
      navigate('/');
    } catch {
      toast.error('Failed to delete item.');
    }
  };

  const handleToggleStatus = async () => {
    const next = item.status === 'Open' ? 'Returned' : 'Open';
    try {
      const res = await itemService.updateItem(id, { status: next });
      setItem(res.data);
      toast.success(`Marked as ${next}!`);
    } catch {
      toast.error('Failed to update status.');
    }
  };

  const handleCopyContact = () => {
    if (item?.contact) {
      navigator.clipboard.writeText(item.contact);
      setCopied(true);
      toast.success('Contact info copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return <Loader label="Loading item details..." />;
  }

  if (!item) {
    return (
      <div className="flex-1 py-12 px-4 text-center">
        <h2 className="text-xl font-bold text-slate-800">Item Not Found</h2>
        <p className="text-xs text-slate-500 mt-1 mb-4">The requested item doesn't exist.</p>
        <Link to="/" className="btn-primary text-xs">
          Back to Home
        </Link>
      </div>
    );
  }

  const formattedEventDate = new Date(item.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="flex-1 py-10 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl">
        {/* Top Action Nav */}
        <div className="flex items-center justify-between mb-5">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
          >
            <FiArrowLeft /> Back to Feed
          </Link>

          <div className="flex items-center gap-2">
            <Link to={`/edit/${item._id}`} className="btn-secondary py-1.5 text-xs">
              <FiEdit2 /> Edit
            </Link>
            <button
              type="button"
              onClick={handleDelete}
              className="rounded-lg border border-red-200 bg-red-50 py-1.5 px-3 text-xs font-semibold text-red-700 hover:bg-red-100 transition-colors flex items-center gap-1"
            >
              <FiTrash2 /> Delete
            </button>
          </div>
        </div>

        {/* Detail Card */}
        <div className="card overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12">
            {/* Image Box */}
            <div className="md:col-span-5 bg-slate-100 flex items-center justify-center p-4 border-b md:border-b-0 md:border-r border-slate-200">
              <img
                src={item.imageUrl && item.imageUrl.trim() !== '' ? item.imageUrl : PLACEHOLDER_IMG}
                alt={item.title}
                className="max-h-80 w-full rounded-lg object-contain shadow-sm bg-white"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = PLACEHOLDER_IMG;
                }}
              />
            </div>

            {/* Info Box */}
            <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider ${
                      item.type === 'Lost'
                        ? 'bg-rose-500 text-white'
                        : 'bg-emerald-600 text-white'
                    }`}
                  >
                    {item.type} Item
                  </span>

                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold ${
                      item.status === 'Open'
                        ? 'bg-amber-100 text-amber-800 border border-amber-200'
                        : 'bg-slate-800 text-white'
                    }`}
                  >
                    Status: {item.status}
                  </span>

                  <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                    {item.category}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-2xl font-extrabold text-slate-900 mb-3 tracking-tight">
                  {item.title}
                </h1>

                {/* Description */}
                <div className="mb-6">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Description
                  </h4>
                  <p className="text-sm text-slate-700 whitespace-pre-line leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Metadata Box */}
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3 mb-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 block mb-0.5 font-medium">Campus Location:</span>
                      <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                        <FiMapPin className="text-rose-500" />
                        {item.location}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-400 block mb-0.5 font-medium">Date {item.type}:</span>
                      <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                        <FiCalendar className="text-primary-500" />
                        {formattedEventDate}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-slate-200 pt-3">
                    <span className="text-slate-400 block text-xs font-medium mb-1">
                      Contact Information:
                    </span>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                        <FiPhone className="text-emerald-600" />
                        {item.contact}
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyContact}
                        className="btn-secondary py-1 px-2.5 text-xs font-semibold"
                      >
                        {copied ? (
                          <>
                            <FiCheck className="text-emerald-600" /> Copied
                          </>
                        ) : (
                          <>
                            <FiCopy /> Copy
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Toggle Action Button */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleToggleStatus}
                  className={`btn-primary flex-1 py-2.5 ${
                    item.status === 'Open'
                      ? 'bg-emerald-600 hover:bg-emerald-700'
                      : 'bg-amber-600 hover:bg-amber-700'
                  }`}
                >
                  {item.status === 'Open' ? (
                    <>
                      <FiCheckCircle className="text-base" />
                      Mark this Item as Returned / Resolved
                    </>
                  ) : (
                    <>
                      <FiRefreshCw className="text-base" />
                      Reopen this Item (Mark as Open)
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
