import React, { useState, useEffect } from "react";
import { Table, Input, Button, Space, Switch, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import {
  viewCustomerList,
  activateDeactivateCustomer,
} from "../../../../../services/Admin/UserManagementApi";

const UserManagement = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  // Fetch data when component mounts or when pagination changes
  useEffect(() => {
    fetchData(pagination.current, pagination.pageSize);
  }, [pagination.current, pagination.pageSize]);

  // Fetch data from API
  const fetchData = async (page, size) => {
    setLoading(true);
    try {
      const response = await viewCustomerList(page, size);

      // Đảm bảo lấy đúng dữ liệu từ phản hồi API
      const customerData = response.data; // Đây là mảng khách hàng
      const totalItems = response.data.totalItems;
      // Update data and pagination
      setData(customerData); // Đặt dữ liệu khách hàng vào bảng
      setPagination((prev) => ({
        ...prev,
        total: totalItems, // Đặt tổng số lượng bản ghi vào phân trang
      }));
      setLoading(false);
    } catch (error) {
      message.error("Failed to fetch data");
      setLoading(false);
    }
  };

  // Searching logic
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
  });

  // Toggle status of customer (Active/Inactive)
  const handleStatusToggle = async (customerId, checked) => {
    try {
      await activateDeactivateCustomer(customerId); // Call API to activate/deactivate
      const newStatus = checked ? "Active" : "Inactive";
      const updatedData = data.map((user) =>
        user.customerId === customerId ? { ...user, status: newStatus } : user
      );
      setData(updatedData);
      message.success(`Customer status updated to ${newStatus}`);
    } catch (error) {
      message.error("Failed to update status");
    }
  };

  // Handle pagination change
  const handleTableChange = (pagination) => {
    setPagination({
      ...pagination,
      current: pagination.current,
      pageSize: pagination.pageSize,
    });
  };

  // Table columns definition
  const columns = [
    {
      title: "CustomerID",
      dataIndex: "customerId",
      key: "customerId",
      sorter: (a, b) => a.customerId - b.customerId,
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      ...getColumnSearchProps("username"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      ...getColumnSearchProps("fullName"),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      filters: [
        { text: "Male", value: "Male" },
        { text: "Female", value: "Female" },
      ],
      onFilter: (value, record) => record.gender.includes(value),
    },
    {
      title: "Date of Birth",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
      sorter: (a, b) => new Date(a.dateOfBirth) - new Date(b.dateOfBirth),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Active", value: "Active" },
        { text: "Inactive", value: "Inactive" },
      ],
      onFilter: (value, record) => record.status.includes(value),
      render: (text, record) => (
        <Switch
          checked={record.status === "Active"}
          onChange={(checked) => handleStatusToggle(record.customerId, checked)}
        />
      ),
    },
    {
      title: "Date Joined",
      dataIndex: "dateJoined",
      key: "dateJoined",
      sorter: (a, b) => new Date(a.dateJoined) - new Date(b.dateJoined),
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Manage Users</h2>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="customerId"
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default UserManagement;
