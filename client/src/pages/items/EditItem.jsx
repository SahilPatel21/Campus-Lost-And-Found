// pages/items/EditItem.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiArrowLeft, FiCheck } from 'react-icons/fi';
import itemService from '../../services/itemService';
import ImageUploadInput from '../../components/ImageUploadInput';
import Loader from '../../components/Loader';

const CATEGORIES = [
  'Electronics',
  'ID Cards & Documents',
  'Books & Stationery',
  'Keys',
  'Bags & Wallets',
  'Clothing',
  'Other',
];

const EditItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'Other',
    type: 'Lost',
    location: '',
    date: '',
    contact: '',
    imageUrl: '',
    status: 'Open',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true);
        const data = await itemService.getItemById(id);
        const formattedDate = data.date ? new Date(data.date).toISOString().split('T')[0] : '';
        setForm({
          title: data.title || '',
          description: data.description || '',
          category: data.category || 'Other',
          type: data.type || 'Lost',
          location: data.location || '',
          date: formattedDate,
          contact: data.contact || '',
          imageUrl: data.imageUrl || '',
          status: data.status || 'Open',
        });
      } catch (err) {
        toast.error('Failed to load item details.');
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await itemService.updateItem(id, form);
      toast.success('Item updated successfully!');
      navigate(`/items/${id}`);
    } catch (err) {
      toast.error('Failed to update item.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loader label="Loading item for editing..." />;
  }

  return (
    <div className="flex-1 py-10 px-4 sm:px-6">
      <div className="mx-auto max-w-2xl">
        <Link
          to={`/items/${id}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-4 transition-colors"
        >
          <FiArrowLeft /> Back to Item Details
        </Link>

        <div className="card overflow-hidden">
          <div className="bg-slate-900 px-6 py-5 text-white">
            <h1 className="text-xl font-bold tracking-tight">Edit Item Details</h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Update item information or change status to Returned.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
            {/* Status & Type Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Item Status
                </label>
                <select
                  name="status"
                  className="input-field bg-white cursor-pointer"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option value="Open">Open (Active Listing)</option>
                  <option value="Returned">Returned (Reunited / Closed)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Item Type
                </label>
                <select
                  name="type"
                  className="input-field bg-white cursor-pointer"
                  value={form.type}
                  onChange={handleChange}
                >
                  <option value="Lost">Lost</option>
                  <option value="Found">Found</option>
                </select>
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Item Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                className="input-field"
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>

            {/* Category & Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  className="input-field cursor-pointer"
                  value={form.category}
                  onChange={handleChange}
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  className="input-field"
                  value={form.date}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="location"
                className="input-field"
                value={form.location}
                onChange={handleChange}
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                rows="3"
                className="input-field"
                value={form.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            {/* Contact */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Contact Information <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="contact"
                className="input-field"
                value={form.contact}
                onChange={handleChange}
                required
              />
            </div>

            {/* Image Upload Input */}
            <ImageUploadInput
              imageUrl={form.imageUrl}
              onImageChange={(url) => setForm({ ...form, imageUrl: url })}
            />

            {/* Buttons */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <Link to={`/items/${id}`} className="btn-secondary">
                Cancel
              </Link>
              <button
                type="submit"
                disabled={saving}
                className="btn-primary"
              >
                {saving ? (
                  'Saving Changes...'
                ) : (
                  <>
                    <FiCheck className="text-sm" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditItem;
