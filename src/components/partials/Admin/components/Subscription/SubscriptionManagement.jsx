import React, { useState, useEffect } from "react";
import { Table, Input, Button, Space, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import UpdateSubscription from "./UpdateSubscription"; // Import component UpdateSubscription
import { getSubscriptions, updateSubscription } from "../../../../../services/Admin/SubscriptionManagementApi"; // Import API calls

const SubscriptionManagement = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1, // Trang hiện tại
    pageSize: 5, // Kích thước trang mặc định
    total: 0, // Tổng số bản ghi, sẽ được lấy từ API
  });

  // Fetch subscription data from API
  const fetchSubscriptions = async (page, size) => {
    setLoading(true); // Hiển thị spinner loading
    try {
      const response = await getSubscriptions(page, size);
      if (Array.isArray(response)) {
        setSubscriptions(response);
        setPagination((prev) => ({
          ...prev,
          total: response.totalItems, 
        }));
      } else {
        message.error("Invalid data structure");
      }
      setLoading(false); // Tắt loading spinner
    } catch (error) {
      message.error("Failed to load subscriptions");
      setLoading(false);
    }
  };

  useEffect(() => {
    // Gọi API lần đầu với trang và pageSize mặc định
    fetchSubscriptions(pagination.current, pagination.pageSize);
  }, []);

  const handleTableChange = (pagination) => {
    // Khi có sự thay đổi phân trang hoặc số bản ghi/trang, cập nhật lại state và gọi API
    setPagination(pagination);
    fetchSubscriptions(pagination.current, pagination.pageSize);
  };

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

  const handleUpdate = async (id, updatedSubscription) => {
    try {
      await updateSubscription(id, updatedSubscription);
      setSubscriptions((prev) =>
        prev.map((item) => (item.subscriptionId === id ? { ...item, ...updatedSubscription } : item))
      );
      message.success("Subscription updated successfully!");
    } catch (error) {
      message.error("Failed to update subscription");
    }
  };

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
      sorter: (a, b) => (a.price || 0) - (b.price || 0),
      render: (price) => (price !== null ? `$${price.toFixed(2)}` : "Free"), // Hiển thị "Free" nếu price là null
    },
    {
      title: "Duration (Days)",
      dataIndex: "durationInDays",
      key: "durationInDays",
      sorter: (a, b) => (a.durationInDays || 0) - (b.durationInDays || 0),
      render: (duration) => (duration !== null ? `${duration} days` : "Unlimited"), // Hiển thị "Unlimited" nếu duration là null
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (description) => (
        <ul>
          {description.map((line, index) => (
            <li key={index}>{line}</li>
          ))}
        </ul>
      ),
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
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <UpdateSubscription subscription={record} onUpdate={handleUpdate} />
      ),
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Manage Subscriptions</h2>
      <Table
        columns={columns}
        dataSource={subscriptions}
        rowKey="subscriptionId"
        loading={loading} // Hiển thị loading spinner khi đang lấy dữ liệu
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          pageSizeOptions: ["5", "10", "20", "50"],
          showSizeChanger: false,
        }}
        onChange={handleTableChange} // Gọi lại API khi thay đổi trang hoặc pageSize
      />
    </div>
  );
};

export default SubscriptionManagement;
