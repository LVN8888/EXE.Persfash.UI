import React from 'react';
import { 
  MenuFoldOutlined, 
  MenuUnfoldOutlined, 
  DashboardOutlined, 
  UserOutlined, 
  SettingOutlined, 
  DollarCircleOutlined,  // Icon cho subscription
  ShoppingOutlined       // Icon cho fashion items
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const Sidebar = ({ collapsed, toggleSidebar }) => {
  return (
    <div className={`bg-gray-900 text-white ${collapsed ? 'w-20' : 'w-64'} transition-all duration-300 flex flex-col`}>
      <div className="flex justify-between items-center p-4">
        {/* Tên Admin hiển thị khi Sidebar mở */}
        <h2 className={`text-2xl ${collapsed ? 'hidden' : 'block'}`}>Admin</h2>
        {/* Nút để mở/đóng Sidebar */}
        <button onClick={toggleSidebar}>
          {collapsed ? <MenuUnfoldOutlined className="text-white text-xl" /> : <MenuFoldOutlined className="text-white text-xl" />}
        </button>
      </div>

      {/* Menu Sidebar */}
      <ul className="p-4 space-y-4 flex-1">
        <li className="flex items-center">
          <DashboardOutlined className="text-xl" />
          {!collapsed && <Link to="/admin" className="text-white block ml-4">Dashboard</Link>}
        </li>
        <li className="flex items-center">
          <UserOutlined className="text-xl" />
          {!collapsed && <Link to="/admin/user-management" className="text-white block ml-4">Manage Users</Link>}
        </li>
        <li className="flex items-center">
          <DollarCircleOutlined className="text-xl" />
          {!collapsed && <Link to="/admin/subscription-management" className="text-white block ml-4">Manage Subscriptions</Link>}
        </li>
        <li className="flex items-center">
          <ShoppingOutlined className="text-xl" />
          {!collapsed && <Link to="/admin/fashion-item-management" className="text-white block ml-4">Manage Fashion Items</Link>}
        </li>
        <li className="flex items-center">
          <SettingOutlined className="text-xl" />
          {!collapsed && <Link to="/settings" className="text-white block ml-4">Settings</Link>}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
