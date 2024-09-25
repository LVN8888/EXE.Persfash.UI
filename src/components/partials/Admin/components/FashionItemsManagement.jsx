import React, { useState } from "react";
import { Table, Input, Button, Space, Image } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

const FashionItemsManagement = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  // Dữ liệu giả lập cho Fashion Items với hình ảnh từ link đã cung cấp
  const data = [
    {
      itemId: 1,
      itemName: "Classic T-Shirt",
      category: "Clothing",
      brand: "Brand A",
      price: 29.99,
      fitType: "Regular",
      genderTarget: "Male",
      fashionTrend: "Casual",
      size: "M",
      color: "White",
      material: "Cotton",
      thumbnailURL: "https://eliscenter.edu.vn/wp-content/uploads/2024/09/meme-het-cuu-2dHQseD.jpg",
      occasion: "Daily",
      productURL: "https://example.com/tshirt1",
      partnerID: 1001,
      dateAdded: "2023-09-01",
      status: "Active",
    },
    {
      itemId: 2,
      itemName: "Formal Pants",
      category: "Clothing",
      brand: "Brand B",
      price: 59.99,
      fitType: "Slim",
      genderTarget: "Female",
      fashionTrend: "Formal",
      size: "L",
      color: "Black",
      material: "Polyester",
      thumbnailURL: "https://eliscenter.edu.vn/wp-content/uploads/2024/09/meme-het-cuu-2dHQseD.jpg",
      occasion: "Work",
      productURL: "https://example.com/pants1",
      partnerID: 1002,
      dateAdded: "2023-09-05",
      status: "Inactive",
    },
    // Thêm dữ liệu giả lập
    ...Array.from({ length: 10 }, (_, i) => ({
      itemId: i + 3,
      itemName: `Item ${i + 3}`,
      category: i % 2 === 0 ? "Clothing" : "Accessories",
      brand: `Brand ${String.fromCharCode(65 + i)}`,
      price: (i + 1) * 10,
      fitType: i % 2 === 0 ? "Regular" : "Slim",
      genderTarget: i % 2 === 0 ? "Male" : "Female",
      fashionTrend: i % 2 === 0 ? "Casual" : "Formal",
      size: i % 2 === 0 ? "M" : "L",
      color: i % 2 === 0 ? "Red" : "Blue",
      material: i % 2 === 0 ? "Cotton" : "Polyester",
      thumbnailURL: "https://eliscenter.edu.vn/wp-content/uploads/2024/09/meme-het-cuu-2dHQseD.jpg", // Link ảnh cố định
      occasion: "Daily",
      productURL: `https://example.com/item${i + 3}`,
      partnerID: 1000 + i,
      dateAdded: `2023-09-${i + 1}`,
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
      title: "ItemID",
      dataIndex: "itemId",
      key: "itemId",
      sorter: (a, b) => a.itemId - b.itemId,
    },
    {
      title: "Item Name",
      dataIndex: "itemName",
      key: "itemName",
      ...getColumnSearchProps("itemName"),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      ...getColumnSearchProps("category"),
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      ...getColumnSearchProps("brand"),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
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
      title: "Date Added",
      dataIndex: "dateAdded",
      key: "dateAdded",
      sorter: (a, b) => new Date(a.dateAdded) - new Date(b.dateAdded),
    },
    {
      title: "Thumbnail",
      dataIndex: "thumbnailURL",
      key: "thumbnailURL",
      render: (text) => <Image width={50} src={text} alt="Thumbnail" />,
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Manage Fashion Items</h2>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="itemId"
        pagination={{
          pageSizeOptions: ["5", "10", "20", "50"],
          showSizeChanger: true,
          defaultPageSize: 10,
        }}
      />
    </div>
  );
};

export default FashionItemsManagement;
