// components/SearchFilter.jsx
import React from 'react';
import { FiSearch, FiX, FiFilter, FiRotateCcw, FiTag } from 'react-icons/fi';

const CATEGORIES = [
  'All',
  'Electronics',
  'ID Cards & Documents',
  'Books & Stationery',
  'Keys',
  'Bags & Wallets',
  'Clothing',
  'Other',
];

const SearchFilter = ({
  search,
  setSearch,
  typeFilter,
  setTypeFilter,
  statusFilter,
  setStatusFilter,
  categoryFilter,
  setCategoryFilter,
  onReset,
}) => {
  return (
    <div className="card p-4 sm:p-5 mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3.5 items-end">
        {/* Search by Title */}
        <div className="lg:col-span-4">
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Search by Item Name
          </label>
          <div className="relative">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
            <input
              type="text"
              className="input-field pl-9 pr-8"
              placeholder="e.g. Wallet, Student ID, Keys, Calculator..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <FiX className="text-sm" />
              </button>
            )}
          </div>
        </div>

        {/* Type Filter */}
        <div className="lg:col-span-2">
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Item Type
          </label>
          <select
            className="input-field cursor-pointer"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="All">All Types</option>
            <option value="Lost">Lost Only</option>
            <option value="Found">Found Only</option>
          </select>
        </div>

        {/* Status Filter */}
        <div className="lg:col-span-2">
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Status
          </label>
          <select
            className="input-field cursor-pointer"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Open">Open (Active)</option>
            <option value="Returned">Returned (Resolved)</option>
          </select>
        </div>

        {/* Category Filter */}
        <div className="lg:col-span-2">
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Category
          </label>
          <select
            className="input-field cursor-pointer"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'All' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
        </div>

        {/* Reset Button */}
        <div className="lg:col-span-2">
          <button
            type="button"
            onClick={onReset}
            className="btn-secondary w-full text-xs font-semibold text-red-600 hover:bg-red-50 hover:border-red-200"
            title="Clear all filters"
          >
            <FiRotateCcw className="text-xs" />
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
