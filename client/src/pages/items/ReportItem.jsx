// pages/items/ReportItem.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiArrowLeft, FiSend, FiAlertCircle } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import itemService from '../../services/itemService';
import ImageUploadInput from '../../components/ImageUploadInput';

const CATEGORIES = [
  'Electronics',
  'ID Cards & Documents',
  'Books & Stationery',
  'Keys',
  'Bags & Wallets',
  'Clothing',
  'Other',
];

const ReportItem = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const today = new Date().toISOString().split('T')[0];

  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'Electronics',
    type: 'Lost',
    location: '',
    date: today,
    contact: '',
    imageUrl: '',
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Auto-fill contact info if authenticated
  useEffect(() => {
    if (isAuthenticated && user && !form.contact) {
      setForm((prev) => ({
        ...prev,
        contact: `${user.name} - ${user.phone || user.email}`,
      }));
    }
  }, [isAuthenticated, user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: undefined });
    }
  };

  const validate = () => {
    const next = {};
    if (!form.title.trim()) next.title = 'Item title/name is required.';
    if (!form.description.trim()) next.description = 'Description is required.';
    if (!form.location.trim()) next.location = 'Campus location is required.';
    if (!form.date) next.date = 'Date is required.';
    if (!form.contact.trim()) next.contact = 'Contact information is required.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);
    try {
      await itemService.createItem({
        ...form,
        reportedBy: user ? user.name : 'Campus Member',
      });
      toast.success('Item reported successfully!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit report.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex-1 py-10 px-4 sm:px-6">
      <div className="mx-auto max-w-2xl">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-4 transition-colors"
        >
          <FiArrowLeft /> Back to Home Feed
        </Link>

        <div className="card overflow-hidden">
          {/* Card Header */}
          <div className="bg-primary-600 px-6 py-5 text-white">
            <h1 className="text-xl font-bold tracking-tight">Report a Lost or Found Item</h1>
            <p className="text-xs text-primary-100 mt-0.5">
              Provide specific details to help reunite the item with its owner.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
            {/* 1. Item Type: Lost or Found */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                What are you reporting? <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label
                  className={`flex items-center gap-2.5 p-3 rounded-lg border cursor-pointer transition-colors ${
                    form.type === 'Lost'
                      ? 'border-rose-500 bg-rose-50 text-rose-900 font-bold'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700 font-medium'
                  }`}
                >
                  <input
                    type="radio"
                    name="type"
                    value="Lost"
                    checked={form.type === 'Lost'}
                    onChange={handleChange}
                    className="accent-rose-600"
                  />
                  <span>⚠️ I Lost an Item</span>
                </label>

                <label
                  className={`flex items-center gap-2.5 p-3 rounded-lg border cursor-pointer transition-colors ${
                    form.type === 'Found'
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700 font-medium'
                  }`}
                >
                  <input
                    type="radio"
                    name="type"
                    value="Found"
                    checked={form.type === 'Found'}
                    onChange={handleChange}
                    className="accent-emerald-600"
                  />
                  <span>✓ I Found an Item</span>
                </label>
              </div>
            </div>

            {/* 2. Item Title */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Item Title / Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                className={`input-field ${errors.title ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                placeholder="e.g. Black Leather Wallet, Casio Calculator, Blue Water Bottle"
                value={form.title}
                onChange={handleChange}
              />
              {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title}</p>}
            </div>

            {/* 3. Category & Date */}
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
                  Date {form.type === 'Lost' ? 'Lost' : 'Found'} <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  className="input-field"
                  value={form.date}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* 4. Campus Location */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Campus Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="location"
                className={`input-field ${errors.location ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                placeholder="e.g. Central Library 2nd Floor, Science Block Room 102, Main Canteen"
                value={form.location}
                onChange={handleChange}
              />
              {errors.location && <p className="mt-1 text-xs text-red-600">{errors.location}</p>}
            </div>

            {/* 5. Description */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Detailed Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                rows="3"
                className={`input-field ${errors.description ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                placeholder="Describe brand, color, stickers, distinct markings, condition..."
                value={form.description}
                onChange={handleChange}
              ></textarea>
              {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description}</p>}
            </div>

            {/* 6. Contact Details */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Contact Information <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="contact"
                className={`input-field ${errors.contact ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                placeholder="e.g. Phone: 9876543210 / Email: student@college.edu / Hostel Block B 204"
                value={form.contact}
                onChange={handleChange}
              />
              {errors.contact && <p className="mt-1 text-xs text-red-600">{errors.contact}</p>}
            </div>

            {/* 7. Image Upload / Paste Link Component */}
            <ImageUploadInput
              imageUrl={form.imageUrl}
              onImageChange={(url) => setForm({ ...form, imageUrl: url })}
            />

            {/* Submit & Cancel */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <Link to="/" className="btn-secondary">
                Cancel
              </Link>
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary"
              >
                {submitting ? (
                  'Saving Report...'
                ) : (
                  <>
                    <FiSend className="text-sm" />
                    Submit Report
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

export default ReportItem;
