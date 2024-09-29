import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Loading from "../../src/Loading";  // Import Loading component

const PublicRoute = () => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <Loading tip="Loading..." />;
  }

  // Nếu đã đăng nhập, điều hướng về trang home
  if (isAuthenticated) {
    return <Navigate to="/home" />;
  }

  // Nếu chưa đăng nhập, cho phép truy cập các route công khai
  return <Outlet />;
};

export default PublicRoute;
