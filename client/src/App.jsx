// App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Landing from './pages/Landing';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/dashboard/Dashboard';
import ReportItem from './pages/items/ReportItem';
import EditItem from './pages/items/EditItem';
import ItemDetail from './pages/items/ItemDetail';
import About from './pages/About';

function App() {
  return (
    <AuthProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontSize: '13px',
            borderRadius: '8px',
            padding: '12px 16px',
            color: '#0f172a',
            border: '1px solid #e2e8f0',
          },
        }}
      />

      {/* Top Navbar */}
      <Navbar />

      {/* Main Page Routing */}
      <main className="flex-1 flex flex-col">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/items/:id" element={<ItemDetail />} />

          {/* Report & Edit Items */}
          <Route path="/report" element={<ReportItem />} />
          <Route path="/edit/:id" element={<EditItem />} />

          {/* Protected Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* 404 Route */}
          <Route
            path="*"
            element={
              <div className="flex-1 flex flex-col items-center justify-center py-20 text-center">
                <span className="text-4xl mb-2">🤔</span>
                <h1 className="text-2xl font-bold text-slate-800">404 - Page Not Found</h1>
                <p className="text-xs text-slate-500 mt-1 mb-4">
                  The page you are looking for does not exist.
                </p>
                <a href="/" className="btn-primary text-xs">
                  Return to Home
                </a>
              </div>
            }
          />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </AuthProvider>
  );
}

export default App;
