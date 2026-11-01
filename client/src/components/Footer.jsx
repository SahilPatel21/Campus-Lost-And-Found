// components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white py-8 text-sm text-slate-500">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded bg-primary-100 text-xs">🎓</span>
            <span className="font-semibold text-slate-800">Campus Lost and Found Portal</span>
            <span className="text-slate-300">|</span>
            <span className="text-xs text-slate-400">MERN Stack College Project</span>
          </div>

          <div className="flex items-center gap-6 text-xs font-medium">
            <Link to="/" className="hover:text-primary-600 transition-colors">Home</Link>
            <Link to="/report" className="hover:text-primary-600 transition-colors">Report Item</Link>
            <Link to="/about" className="hover:text-primary-600 transition-colors">About Portal</Link>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Campus Lost and Found. Built with MongoDB, Express, React & Node.</p>
          <p className="mt-1 sm:mt-0">Designed for College Project Demonstration & Viva</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
