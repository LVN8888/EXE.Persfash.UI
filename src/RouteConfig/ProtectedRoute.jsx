import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Spin } from 'antd'; // Ant Design Spin component

const ProtectedRoute = ({ requiredRole }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true); // Để hiển thị loading khi kiểm tra session

  useEffect(() => {
    // Lấy thông tin user từ localStorage
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      setIsLoggedIn(true);
      setRole(userData.role);
    }
    setLoading(false); // Set loading thành false sau khi kiểm tra xong
  }, []);

  if (loading) {
    // Hiển thị loading spinner trong khi đang kiểm tra
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <Spin size="large" tip="Loading..." />
      </div>
    );
  }

  // Nếu chưa đăng nhập, điều hướng về trang login
  if (!isLoggedIn) {
    return <Navigate to="/login-form" />;
  }

  // Nếu đã đăng nhập nhưng không có vai trò yêu cầu (vd: Admin), điều hướng về home
  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/home" />;
  }

  // Nếu đã đăng nhập và thỏa mãn yêu cầu, render các route con
  return <Outlet />;
};

export default ProtectedRoute;
