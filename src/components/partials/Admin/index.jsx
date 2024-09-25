import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer, toast } from 'react-toastify';

const SESSION_TIMEOUT = 60 * 60 * 1000; // 60 minutes

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check session status on component mount
  useEffect(() => {
    const session = localStorage.getItem('admin-session');
    if (session) {
      const { expiresAt } = JSON.parse(session);
      if (Date.now() < expiresAt) {
        setIsLoggedIn(true);
      } else {
        // If session expired, remove it from localStorage
        localStorage.removeItem('admin-session');
        setIsLoggedIn(false);
      }
    }
  }, []);

  // Function to handle login
  const handleLogin = () => {
    const expiresAt = Date.now() + SESSION_TIMEOUT;
    localStorage.setItem('admin-session', JSON.stringify({ expiresAt }));
    setIsLoggedIn(true);
    toast.success('Logged in successfully! Session will expire in 60 minutes.');
  };

  // If user tries to access any `/admin` route and is not logged in, redirect to `/admin/login`
  // If logged in, redirect them to `/admin/dashboard`

  return (
    <div>
      <Routes>
        {/* Login route */}
        <Route path="/admin/login" element={<Login onLogin={handleLogin} />} />

        {/* Protected dashboard route */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        {/* Redirect to dashboard if trying to access `/admin` */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
      </Routes>

      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Admin;
