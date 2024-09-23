import React, { useState, useEffect } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { toast, ToastContainer } from 'react-toastify';

const SESSION_TIMEOUT = 60 * 60 * 1000; // 60 phút (60 phút x 60 giây x 1000 ms)

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Kiểm tra session khi component được load
  useEffect(() => {
    const session = localStorage.getItem('admin-session');
    if (session) {
      const { expiresAt } = JSON.parse(session);
      if (Date.now() < expiresAt) {
        setIsLoggedIn(true);
      } else {
        localStorage.removeItem('admin-session');
      }
    }
  }, []);

  const handleLogin = () => {
    // Lưu session vào localStorage với thời gian hết hạn 60 phút
    const expiresAt = Date.now() + SESSION_TIMEOUT;
    localStorage.setItem(
      'admin-session',
      JSON.stringify({ expiresAt })
    );
    toast.success('Logged in successfully! Session will expire in 60 minutes.');
    setIsLoggedIn(true);

    // Tự động đăng xuất sau 60 phút
    setTimeout(() => {
      localStorage.removeItem('admin-session');
      setIsLoggedIn(false);
      toast.info('Session expired. Please log in again.');
    }, SESSION_TIMEOUT);
  };

  return (
    <div>
      {isLoggedIn ? <Dashboard /> : <Login onLogin={handleLogin} />}
      {/* Toast container cho toàn hệ thống, ở góc phải trên cùng */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Admin;
