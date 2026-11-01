// components/Navbar.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  FiChevronDown,
  FiUser,
  FiLogOut,
  FiPlusCircle,
  FiGrid,
  FiInfo,
  FiHome,
  FiMenu,
  FiX,
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    toast.success('Logged out successfully.');
    navigate('/');
  };

  const navLinkClass = ({ isActive }) =>
    `inline-flex items-center gap-1.5 text-sm font-medium transition-colors ${
      isActive ? 'text-primary-600 font-semibold' : 'text-slate-600 hover:text-slate-900'
    }`;

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3.5">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600 text-white font-bold text-lg shadow-sm">
            🎓
          </div>
          <span className="text-lg font-bold tracking-tight text-ink">
            Campus <span className="text-primary-600">Lost & Found</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7">
          <NavLink to="/" className={navLinkClass}>
            <FiHome className="text-base" />
            Home
          </NavLink>
          <NavLink to="/report" className={navLinkClass}>
            <FiPlusCircle className="text-base" />
            Report Item
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            <FiInfo className="text-base" />
            About
          </NavLink>
        </nav>

        {/* Right Auth / Action Controls */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen((v) => !v)}
                className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white py-1.5 pl-2 pr-3 text-sm font-medium text-ink shadow-sm hover:bg-slate-50 transition-colors"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-100 text-primary-700 font-bold text-xs">
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <span className="max-w-[120px] truncate">{user?.name}</span>
                <FiChevronDown className="text-slate-400 text-xs" />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-200 bg-white py-1.5 shadow-lg animate-in fade-in zoom-in-95 duration-100">
                  <div className="border-b border-slate-100 px-4 py-2.5">
                    <p className="text-xs text-slate-400 font-medium">Signed in as</p>
                    <p className="truncate text-sm font-semibold text-ink">{user?.email}</p>
                    <span className="inline-block mt-1 rounded bg-primary-50 px-2 py-0.5 text-[11px] font-semibold text-primary-700">
                      {user?.role || 'STUDENT'}
                    </span>
                  </div>

                  <Link
                    to="/dashboard"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <FiGrid className="text-slate-400" />
                    My Dashboard
                  </Link>

                  <Link
                    to="/report"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <FiPlusCircle className="text-slate-400" />
                    Report an Item
                  </Link>

                  <div className="border-t border-slate-100 my-1"></div>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <FiLogOut className="text-red-400" />
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="btn-secondary py-1.5 text-xs">
                Log In
              </Link>
              <Link to="/register" className="btn-primary py-1.5 text-xs">
                Sign Up
              </Link>
            </div>
          )}

          <Link to="/report" className="btn-accent py-1.5 text-xs font-semibold">
            <FiPlusCircle />
            Report
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((v) => !v)}
          className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
        >
          {mobileMenuOpen ? <FiX className="text-lg" /> : <FiMenu className="text-lg" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3 shadow-lg">
          <NavLink
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 text-sm font-medium text-slate-700 py-1.5"
          >
            <FiHome /> Home
          </NavLink>
          <NavLink
            to="/report"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 text-sm font-medium text-slate-700 py-1.5"
          >
            <FiPlusCircle /> Report Item
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 text-sm font-medium text-slate-700 py-1.5"
          >
            <FiInfo /> About
          </NavLink>

          <hr className="border-slate-100" />

          {isAuthenticated ? (
            <div className="space-y-2">
              <div className="text-xs text-slate-500 font-medium">
                Signed in: <span className="font-semibold text-slate-800">{user?.name}</span>
              </div>
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 text-sm font-medium text-primary-600 py-1"
              >
                <FiGrid /> My Dashboard
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm font-medium text-red-600 py-1 w-full text-left"
              >
                <FiLogOut /> Log Out
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2 pt-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-secondary w-full"
              >
                Log In
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-primary w-full"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
