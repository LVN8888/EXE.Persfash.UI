import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Spin } from 'antd'; // Import Ant Design Spin component
import 'antd/dist/reset.css'; // Đảm bảo Ant Design styles được import

const ProtectedRoute = ({ children }) => {
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
    setLoading(false); // Sau khi kiểm tra xong
  }, []);

  if (loading) {
    // Hiển thị loading spinner với Ant Design Spin
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <Spin size="large" tip="Loading..." />
      </div>
    );
  }

  // Nếu không đăng nhập hoặc role không phải là Admin, điều hướng về home
  if (!isLoggedIn || role !== 'Admin') {
    return <Navigate to="/" />;
  }

  // Nếu đã đăng nhập và là Admin, render nội dung con
  return children;
};

export default ProtectedRoute;
