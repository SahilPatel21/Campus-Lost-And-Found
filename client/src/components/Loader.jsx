// components/Loader.jsx
import React from 'react';

const Loader = ({ label = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10">
      <div className="h-9 w-9 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600"></div>
      {label && <p className="text-sm font-medium text-slate-500">{label}</p>}
    </div>
  );
};

export default Loader;
