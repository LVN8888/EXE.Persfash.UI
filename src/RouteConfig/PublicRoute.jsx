import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Spin } from 'antd'; // Ant Design Spin component

const PublicRoute = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // Để hiển thị loading khi kiểm tra session

  useEffect(() => {
    // Lấy thông tin user từ localStorage
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
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

  // Nếu đã đăng nhập, điều hướng về trang home
  if (isLoggedIn) {
    return <Navigate to="/home" />;
  }

  // Nếu chưa đăng nhập, cho phép truy cập các route công khai
  return <Outlet />;
};

export default PublicRoute;
