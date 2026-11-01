// pages/About.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  FiTarget,
  FiShield,
  FiSearch,
  FiUploadCloud,
  FiCheckCircle,
  FiArrowRight,
  FiLayers,
} from 'react-icons/fi';

const About = () => {
  return (
    <div className="flex-1 py-12 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700 mb-3">
            🎓 Campus Community Guide
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            About Campus Lost and Found
          </h1>
          <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto mt-2 leading-relaxed">
            A centralized digital platform designed to quickly reunite students, faculty,
            and campus staff with their misplaced personal belongings.
          </p>
        </div>

        {/* Mission Card */}
        <div className="card p-6 sm:p-8 mb-8">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-600 text-xl font-bold">
              <FiTarget />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-2">Our Objective</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                On large university campuses, hundreds of valuable personal items—including student ID cards,
                notebooks, laptop chargers, scientific calculators, keys, and wallets—are misplaced every week.
                Traditional bulletin boards and chaotic WhatsApp groups are slow, unsearchable, and easily missed.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed mt-2.5">
                The <strong>Campus Lost and Found Portal</strong> provides a structured web hub where anyone can
                report a lost item or list an item they found. With real-time keyword search, category filters,
                photo uploads, and status tracking (Open vs. Returned), students can locate and claim their items safely.
              </p>
            </div>
          </div>
        </div>

        {/* 3 Step Workflow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="card p-5 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-rose-600 text-xl mb-3">
              <FiUploadCloud />
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-1.5">1. Report an Item</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Upload a photo from your phone or device, enter location details, and leave your contact information.
            </p>
          </div>

          <div className="card p-5 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 text-primary-600 text-xl mb-3">
              <FiSearch />
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-1.5">2. Search & Filter</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Search by title keywords or filter by item category, location, and status (Lost / Found).
            </p>
          </div>

          <div className="card p-5 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 text-xl mb-3">
              <FiCheckCircle />
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-1.5">3. Reconnect & Return</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Verify ownership in public campus areas and update the status to "Returned" to keep the feed organized.
            </p>
          </div>
        </div>

        {/* Campus Safety Guidelines */}
        <div className="card p-6 sm:p-8 bg-slate-900 text-white mb-8 border-none">
          <div className="flex items-center gap-2.5 text-amber-400 font-bold text-sm mb-3">
            <FiShield className="text-lg" />
            <span>Campus Safety & Verification Tips</span>
          </div>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">•</span>
              <span><strong>Meet in public campus areas:</strong> Always arrange handovers at well-lit public spots like the College Library, Main Canteen, or Security Desk.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">•</span>
              <span><strong>Verify ownership:</strong> Ask the claimant for specific proof (e.g. unlocking a phone, showing student ID card, or describing hidden contents).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">•</span>
              <span><strong>Update the status:</strong> Once an item is handed over, update its status to <em>Returned</em> so others know it is resolved.</span>
            </li>
          </ul>
        </div>

        {/* Tech Stack Box */}
        <div className="card p-6 sm:p-8">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-base mb-4">
            <FiLayers className="text-primary-600 text-lg" />
            <span>MERN Stack Architecture</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
            <div className="p-3 rounded-lg border border-slate-100 bg-slate-50">
              <span className="font-bold text-emerald-600 block mb-0.5">MongoDB</span>
              <span className="text-slate-500 text-[11px]">NoSQL Database & Mongoose</span>
            </div>
            <div className="p-3 rounded-lg border border-slate-100 bg-slate-50">
              <span className="font-bold text-slate-800 block mb-0.5">Express.js</span>
              <span className="text-slate-500 text-[11px]">REST API & Middlewares</span>
            </div>
            <div className="p-3 rounded-lg border border-slate-100 bg-slate-50">
              <span className="font-bold text-primary-600 block mb-0.5">React 18</span>
              <span className="text-slate-500 text-[11px]">Vite, Hooks & Tailwind</span>
            </div>
            <div className="p-3 rounded-lg border border-slate-100 bg-slate-50">
              <span className="font-bold text-indigo-600 block mb-0.5">Node.js</span>
              <span className="text-slate-500 text-[11px]">Server Runtime & Multer</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8 text-center">
          <Link to="/" className="btn-primary">
            Explore Campus Feed <FiArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
