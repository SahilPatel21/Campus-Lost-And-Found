// components/ImageUploadInput.jsx
import React, { useState } from 'react';
import { FiUpload, FiLink, FiTrash2, FiCheckCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';
import itemService from '../services/itemService';

const ImageUploadInput = ({ imageUrl, onImageChange }) => {
  const [mode, setMode] = useState('file'); // 'file' or 'url'
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size cannot exceed 5MB.');
      return;
    }

    try {
      setUploading(true);
      const res = await itemService.uploadPhoto(file);
      if (res && res.imageUrl) {
        onImageChange(res.imageUrl);
        toast.success('Photo uploaded from device!');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to upload photo.');
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    onImageChange('');
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-center justify-between mb-2.5 flex-wrap gap-2">
        <label className="text-xs font-semibold text-slate-700">
          Item Photo <span className="font-normal text-slate-400">(Optional)</span>
        </label>

        {/* Mode Toggle */}
        <div className="flex rounded-lg border border-slate-200 bg-white p-0.5 text-xs font-medium">
          <button
            type="button"
            onClick={() => setMode('file')}
            className={`flex items-center gap-1 rounded-md px-2.5 py-1 transition-colors ${
              mode === 'file'
                ? 'bg-primary-600 text-white font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FiUpload className="text-xs" />
            Upload File
          </button>
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`flex items-center gap-1 rounded-md px-2.5 py-1 transition-colors ${
              mode === 'url'
                ? 'bg-primary-600 text-white font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FiLink className="text-xs" />
            Paste Web Link
          </button>
        </div>
      </div>

      {/* Mode 1: Direct File Upload */}
      {mode === 'file' && (
        <div>
          <div className="flex items-center gap-2">
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg, image/webp, image/gif"
              onChange={handleFileSelect}
              disabled={uploading}
              className="block w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 cursor-pointer"
            />
            {uploading && (
              <span className="shrink-0 text-xs text-primary-600 font-semibold animate-pulse">
                Uploading...
              </span>
            )}
          </div>
          <p className="mt-1.5 text-[11px] text-slate-400">
            Choose a photo from your computer or phone gallery (JPG, PNG, WEBP, max 5MB).
          </p>
        </div>
      )}

      {/* Mode 2: Paste Web Link */}
      {mode === 'url' && (
        <div>
          <input
            type="url"
            className="input-field bg-white"
            placeholder="e.g. https://images.unsplash.com/photo-..."
            value={imageUrl}
            onChange={(e) => onImageChange(e.target.value)}
          />
          <p className="mt-1.5 text-[11px] text-slate-400">
            Paste any direct image URL from the web.
          </p>
        </div>
      )}

      {/* Preview Card */}
      {imageUrl && (
        <div className="mt-3 flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white p-2.5">
          <div className="flex items-center gap-3">
            <img
              src={imageUrl}
              alt="Item Preview"
              className="h-14 w-14 rounded-md object-cover border border-slate-200 shadow-sm"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <div>
              <span className="inline-flex items-center gap-1 rounded bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                <FiCheckCircle /> Photo Selected
              </span>
              <p className="mt-0.5 text-[11px] text-slate-400 max-w-[240px] truncate">
                {imageUrl}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRemove}
            className="rounded-md border border-red-200 p-1.5 text-xs text-red-600 hover:bg-red-50"
            title="Remove photo"
          >
            <FiTrash2 />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUploadInput;
