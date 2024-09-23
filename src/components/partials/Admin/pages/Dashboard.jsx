import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import UserManagement from '../components/UserManagement';
import Footer from '../../../layouts/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
  // State để kiểm soát trạng thái đóng/mở của Sidebar
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Hàm để đóng/mở Sidebar
  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Bố cục chính */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div
          className={`transition-all duration-300 bg-gray-900 text-white ${isSidebarCollapsed ? 'w-20' : 'w-64'} flex flex-col`}
        >
          <Sidebar collapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
        </div>

        {/* Nội dung chính */}
        <div className="flex-1 p-4">
          <UserManagement />
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Toast container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Dashboard;
