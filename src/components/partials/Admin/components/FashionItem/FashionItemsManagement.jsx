import React, { useState } from "react";
import { Table, Button, Space, Image } from "antd";
import FashionItemForm from "./FashionItemForm";

const FashionItemsManagement = () => {
  // Thêm dữ liệu với 50 items
  const [data, setData] = useState(
    Array.from({ length: 50 }, (_, i) => ({
      itemId: i + 1,
      itemName: `Fashion Item ${i + 1}`,
      category: i % 2 === 0 ? "Clothing" : "Accessories",
      brand: `Brand ${String.fromCharCode(65 + (i % 26))}`,
      price: (i + 1) * 10,
      fitType: i % 2 === 0 ? "Regular" : "Slim",
      genderTarget: i % 2 === 0 ? "Male" : "Female",
      fashionTrend: i % 2 === 0 ? "Casual" : "Formal",
      size: i % 2 === 0 ? "M" : "L",
      color: i % 2 === 0 ? "Red" : "Blue",
      material: i % 2 === 0 ? "Cotton" : "Polyester",
      thumbnailURL: "https://eliscenter.edu.vn/wp-content/uploads/2024/09/meme-het-cuu-2dHQseD.jpg", // Sử dụng link ảnh giả lập
      occasion: i % 2 === 0 ? "Daily" : "Work",
      productURL: `https://example.com/item${i + 1}`,
      itemImages: [
        "https://eliscenter.edu.vn/wp-content/uploads/2024/09/meme-het-cuu-2dHQseD.jpg",
      ],
      status: i % 2 === 0 ? "Active" : "Inactive",
    }))
  );

  const [editingItem, setEditingItem] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCreate = (values) => {
    if (editingItem) {
      // Update existing item
      setData((prev) =>
        prev.map((item) =>
          item.itemId === editingItem.itemId ? { ...item, ...values } : item
        )
      );
      setEditingItem(null);
    } else {
      // Add new item
      const newItem = { ...values, itemId: data.length + 1 };
      setData([...data, newItem]);
    }
    setIsModalVisible(false);
  };

  const handleUpdate = (record) => {
    setEditingItem(record);
    setIsModalVisible(true);
  };

  const handleAdd = () => {
    setEditingItem(null);
    setIsModalVisible(true);
  };

  const columns = [
    {
      title: "ItemID",
      dataIndex: "itemId",
      key: "itemId",
    },
    {
      title: "Item Name",
      dataIndex: "itemName",
      key: "itemName",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Thumbnail",
      dataIndex: "thumbnailURL",
      key: "thumbnailURL",
      render: (text) => <Image width={50} src={text} alt="Thumbnail" />,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => handleUpdate(record)}>Edit</Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Manage Fashion Items</h2>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        Add Fashion Item
      </Button>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="itemId"
        pagination={{ pageSize: 10 }}
      />
      <FashionItemForm
        visible={isModalVisible}
        onCreate={handleCreate}
        onCancel={() => setIsModalVisible(false)}
        initialValues={editingItem}
      />
    </div>
  );
};

export default FashionItemsManagement;
