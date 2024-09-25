import React, { useState } from "react";
import { Table, Input, Button, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

const SubscriptionManagement = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  // Dữ liệu giả lập cho Subscriptions
  const data = [
    {
      subscriptionId: 1,
      subscriptionTitle: "Basic Plan",
      price: 9.99,
      durationInDays: 30,
      description: "Basic plan with limited features",
      status: "Active",
    },
    {
      subscriptionId: 2,
      subscriptionTitle: "Premium Plan",
      price: 19.99,
      durationInDays: 90,
      description: "Premium plan with all features",
      status: "Active",
    },
    {
      subscriptionId: 3,
      subscriptionTitle: "Enterprise Plan",
      price: 99.99,
      durationInDays: 365,
      description: "Full access for enterprises",
      status: "Inactive",
    },
    // Thêm dữ liệu giả lập khác
    ...Array.from({ length: 10 }, (_, i) => ({
      subscriptionId: i + 4,
      subscriptionTitle: `Plan ${i + 4}`,
      price: (i + 1) * 15.99,
      durationInDays: (i + 1) * 30,
      description: `Plan ${i + 4} with extended features`,
      status: i % 2 === 0 ? "Active" : "Inactive",
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
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
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
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : "",
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }} searchWords={[searchText]} autoEscape textToHighlight={text ? text.toString() : ""} />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Subscription ID",
      dataIndex: "subscriptionId",
      key: "subscriptionId",
      sorter: (a, b) => a.subscriptionId - b.subscriptionId,
    },
    {
      title: "Subscription Title",
      dataIndex: "subscriptionTitle",
      key: "subscriptionTitle",
      ...getColumnSearchProps("subscriptionTitle"),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      render: (price) => `$${price.toFixed(2)}`,
    },
    {
      title: "Duration (Days)",
      dataIndex: "durationInDays",
      key: "durationInDays",
      sorter: (a, b) => a.durationInDays - b.durationInDays,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ...getColumnSearchProps("description"),
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
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Manage Subscriptions</h2>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="subscriptionId"
        pagination={{
          pageSizeOptions: ["5", "10", "20", "50"],
          showSizeChanger: true,
          defaultPageSize: 10,
        }}
      />
    </div>
  );
};

export default SubscriptionManagement;
