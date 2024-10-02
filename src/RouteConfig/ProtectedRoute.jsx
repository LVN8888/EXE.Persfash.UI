import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Loading from "../../src/Loading"; 

const ProtectedRoute = ({ requiredRole }) => {
  const { user, isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <Loading tip="Loading..." />; // Use the Loading component
  }

  // Nếu chưa đăng nhập, điều hướng về trang login
  if (!isAuthenticated) {
    return <Navigate to="/login-form" />;
  }

  // Nếu đã đăng nhập nhưng không có vai trò yêu cầu thì điều hướng về trang phù hợp
  if (requiredRole && user?.role !== requiredRole) {
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
