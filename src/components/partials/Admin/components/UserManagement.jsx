import React, { useState } from "react";
import { Table, Input, Button, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

const UserManagement = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const data = [
    {
      customerId: 1,
      username: "johndoe",
      email: "johndoe@example.com",
      fullName: "John Doe",
      gender: "Male",
      dob: "1990-05-15",
      dateJoined: "2024-09-18",
      status: "Active",
    },
    {
      customerId: 2,
      username: "janedoe",
      email: "janedoe@example.com",
      fullName: "Jane Doe",
      gender: "Female",
      dob: "1992-08-25",
      dateJoined: "2024-09-18",
      status: "Active",
    },
    {
      customerId: 3,
      username: "michael",
      email: "michael@example.com",
      fullName: "Michael Smith",
      gender: "Male",
      dob: "1988-03-22",
      dateJoined: "2024-09-18",
      status: "Inactive",
    },
    {
      customerId: 4,
      username: "emily",
      email: "emily@example.com",
      fullName: "Emily Johnson",
      gender: "Female",
      dob: "1995-11-05",
      dateJoined: "2024-09-18",
      status: "Active",
    },
    // Fake thêm nhiều dữ liệu
    ...Array.from({ length: 46 }, (_, i) => ({
      customerId: i + 5,
      username: `user${i + 5}`,
      email: `user${i + 5}@example.com`,
      fullName: `User ${i + 5}`,
      gender: i % 2 === 0 ? "Male" : "Female",
      dob: `199${i % 10}-01-01`,
      dateJoined: `2024-09-18`,
      status: i % 3 === 0 ? "Inactive" : "Active",
    })),
  ];

  let searchInput;

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
          ref={(node) => {
            searchInput = node;
          }}
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
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

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
      dataIndex: "dob",
      key: "dob",
      sorter: (a, b) => new Date(a.dob) - new Date(b.dob),
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
      <h2 className="text-xl font-bold mb-4">Manage Customers</h2>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="customerId"
        pagination={{
          pageSizeOptions: ["5", "10", "20", "50"],
          showSizeChanger: true,
          defaultPageSize: 10,
        }}
      />
    </div>
  );
};

export default UserManagement;
