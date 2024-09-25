import React from 'react';
import { useNavigate } from 'react-router-dom'; // Sử dụng hook useNavigate
import { LogoutOutlined } from '@ant-design/icons'; // Icon logout từ Ant Design

const Header = () => {
  const navigate = useNavigate(); // Hook điều hướng trong React Router v6

  // Hàm xử lý logout
  const handleLogout = () => {
    // Xóa session của admin khỏi localStorage
    localStorage.removeItem('admin-session'); // Xóa phiên đăng nhập của admin

    // Điều hướng về trang login
    navigate('/login'); // Điều hướng về trang login
  };

  return (
    <div className="flex justify-between items-center bg-gradient-to-r from-blue-500 to-green-400 p-4 shadow-lg">
      {/* Logo or Title */}
      <div className="flex items-center">
        <h1 className="text-white text-3xl font-bold">Admin Dashboard</h1>
      </div>

      {/* Logout Button as Icon */}
      <div className="flex items-center space-x-6">
        <LogoutOutlined 
          onClick={handleLogout} 
          className="text-white text-3xl cursor-pointer hover:text-red-500" 
        />
      </div>
    </div>
  );
};

export default Header;
