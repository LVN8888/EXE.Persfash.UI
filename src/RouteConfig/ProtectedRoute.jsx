import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Spin } from "antd";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ requiredRole }) => {
  const { user, isAuthenticated, loading } = useContext(AuthContext);

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

  // Nếu chưa đăng nhập, điều hướng về trang login
  if (!isAuthenticated) {
    return <Navigate to="/login-form" />;
  }

  // Nếu đã đăng nhập nhưng không có vai trò yêu cầu thì điều hướng về trang phù hợp
  if (requiredRole && user?.role !== requiredRole) {
    // Kiểm tra nếu là Admin nhưng truy cập vào route không phải của Admin
    if (user.role === "Admin") {
      return <Navigate to="/admin" />;
    } else {
      return <Navigate to="/" />;
    }
  }

  // Nếu đã đăng nhập và thỏa mãn yêu cầu, render các route con
  return <Outlet />;
};

export default ProtectedRoute;
