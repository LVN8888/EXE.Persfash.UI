import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Spin } from 'antd'; // Ant Design Spin component
import { AuthContext } from '../context/AuthContext'; // Import AuthContext

const PublicRoute = () => {
  const { isAuthenticated, loading } = useContext(AuthContext); // Lấy trạng thái từ context

  if (loading) {
    // Hiển thị loading spinner với nội dung lồng ghép bên trong Spin
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <Spin size="large" tip="Loading...">
          <div style={{ height: '100vh' }}></div>
        </Spin>
      </div>
    );
  }

  // Nếu đã đăng nhập, điều hướng về trang home
  if (isAuthenticated) {
    return <Navigate to="/home" />;
  }

  // Nếu chưa đăng nhập, cho phép truy cập các route công khai
  return <Outlet />;
};

export default PublicRoute;
