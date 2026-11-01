// components/ItemCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  FiMapPin,
  FiCalendar,
  FiUser,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiCheckCircle,
  FiRefreshCw,
  FiTag,
} from 'react-icons/fi';

const PLACEHOLDER_IMG =
  'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22400%22%20height%3D%22250%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20400%20250%22%3E%3Crect%20width%3D%22400%22%20height%3D%22250%22%20fill%3D%22%23f1f5f9%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22%2394a3b8%22%20font-family%3D%22sans-serif%22%20font-size%3D%2218%22%3ENo%20Image%20Available%3C%2Ftext%3E%3C%2Fsvg%3E';

const ItemCard = ({ item, onDelete, onToggleStatus, showActions = true }) => {
  const formattedDate = new Date(item.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="card overflow-hidden flex flex-col group hover:-translate-y-1 hover:shadow-md transition-all duration-200">
      {/* Image Thumbnail with Overlay Badges */}
      <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
        <img
          src={item.imageUrl && item.imageUrl.trim() !== '' ? item.imageUrl : PLACEHOLDER_IMG}
          alt={item.title}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = PLACEHOLDER_IMG;
          }}
        />

        {/* Type Badge: Lost (Red) / Found (Green) */}
        <div className="absolute top-2.5 left-2.5">
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider shadow-sm ${
              item.type === 'Lost'
                ? 'bg-rose-500 text-white'
                : 'bg-emerald-600 text-white'
            }`}
          >
            {item.type}
          </span>
        </div>

        {/* Status Badge: Open (Amber) / Returned (Slate) */}
        <div className="absolute top-2.5 right-2.5">
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold shadow-sm ${
              item.status === 'Open'
                ? 'bg-amber-100 text-amber-800 border border-amber-200'
                : 'bg-slate-800 text-white'
            }`}
          >
            {item.status}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Category Pill */}
        <div className="mb-2">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-600">
            <FiTag className="text-slate-400" />
            {item.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-slate-900 text-base mb-1.5 line-clamp-1 group-hover:text-primary-600 transition-colors">
          {item.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-slate-500 line-clamp-2 mb-3.5 leading-relaxed">
          {item.description}
        </p>

        {/* Metadata */}
        <div className="mt-auto space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
          <div className="flex items-center gap-1.5">
            <FiMapPin className="text-rose-500 shrink-0" />
            <span className="truncate">{item.location}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <FiCalendar className="text-primary-500 shrink-0" />
            <span>{formattedDate}</span>
          </div>

          {item.reportedBy && (
            <div className="flex items-center gap-1.5">
              <FiUser className="text-slate-400 shrink-0" />
              <span className="truncate text-slate-500">By {item.reportedBy}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {showActions && (
          <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-col gap-2">
            {/* Quick Status Toggle Button */}
            {onToggleStatus && (
              <button
                type="button"
                onClick={() => onToggleStatus(item)}
                className={`w-full py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                  item.status === 'Open'
                    ? 'border border-emerald-600 text-emerald-700 hover:bg-emerald-50'
                    : 'border border-slate-300 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {item.status === 'Open' ? (
                  <>
                    <FiCheckCircle className="text-emerald-600" />
                    Mark as Returned
                  </>
                ) : (
                  <>
                    <FiRefreshCw className="text-slate-500" />
                    Reopen Item
                  </>
                )}
              </button>
            )}

            {/* View / Edit / Delete */}
            <div className="grid grid-cols-3 gap-1.5">
              <Link
                to={`/items/${item._id}`}
                className="btn-secondary py-1.5 px-2 text-xs flex items-center justify-center gap-1"
                title="View full details"
              >
                <FiEye />
                Details
              </Link>
              <Link
                to={`/edit/${item._id}`}
                className="btn-secondary py-1.5 px-2 text-xs flex items-center justify-center gap-1"
                title="Edit item"
              >
                <FiEdit2 />
                Edit
              </Link>
              {onDelete && (
                <button
                  type="button"
                  onClick={() => onDelete(item._id, item.title)}
                  className="rounded-lg border border-red-200 bg-red-50 py-1.5 px-2 text-xs font-semibold text-red-700 hover:bg-red-100 transition-colors flex items-center justify-center gap-1"
                  title="Delete item"
                >
                  <FiTrash2 />
                  Delete
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemCard;
