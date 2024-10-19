import React, { useEffect, useState } from "react";
import { Table, Button, Space, Image, message, Input, Switch } from "antd";
import FashionItemForm from "./FashionItemForm";
import { activateDeactivateFashionItem, addNewFashionItem, updateFashionItem, viewFashionItems } from "../../../../../services/FashionItemApi";
import { uploadImages } from "../../../../../services/FileApi";
import { SearchOutlined } from "@ant-design/icons";

const FashionItemsManagement = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(1);
    const pageSize = 10; // Set the page size

  const [fashionItems, setFashionItems] = useState([]);
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
      handleUpdateFashionItem(editingItem.itemId, values.itemName, values.brand, values.category, values.price, values.fitType, 
        values.genderTarget, values.fashionTrend, values.size, values.color, values.material, values.occasion, 
        values.thumbnail, values.productUrl, values.itemImages)

      setEditingItem(null);
    } else {
      // Add new item      
      handleCreateNewFashionItem(values.itemName, values.brand, values.category, values.price, values.fitType, 
        values.genderTarget, values.fashionTrend, values.size, values.color, values.material, values.occasion, 
        values.thumbnail, values.productUrl, values.itemImages)
      
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

  const handleUpdateFashionItem = async (
    itemId,
    itemName,
    brand,
    category,
    price,
    fitType,
    genderTarget,
    fashionTrend,
    size,
    color,
    material,
    occasion,
    thumbnail,
    productUrl,
    itemImages
  ) => {
    try {
      const response = await updateFashionItem(itemId, itemName, brand, category, price, fitType, 
        genderTarget, fashionTrend, size, color, material, occasion, thumbnail, productUrl, itemImages )
      message.success({
        content: "Update fashion item successfully!",
        style: {
          marginTop: '10px',
          fontSize: '20px', 
          padding: '10px',
          position: 'absolute',
          right: '10px'
      },
        duration: 2,
    });

    viewAllFashionItem(currentPage);

    }catch(error) {
      console.error("Error creating new item:", error);
      message.error({
          content: error.response.data.message,
          style: {
            marginTop: '10px',
            fontSize: '20px', 
            padding: '10px',
            position: 'absolute',
            right: '10px'
        },
          duration: 2,
      });
    }
  }

  const handleCreateNewFashionItem = async (
    itemName,
    brand,
    category,
    price,
    fitType,
    genderTarget,
    fashionTrend,
    size,
    color,
    material,
    occasion,
    thumbnail,
    productUrl,
    itemImages
  ) => {
    try {
      const response = await addNewFashionItem(itemName, brand, category, price, fitType, 
        genderTarget, fashionTrend, size, color, material, occasion, thumbnail, productUrl, itemImages )

        message.success({
          content: "Create new fashion item successfully!",
          style: {
            marginTop: '10px',
            fontSize: '20px', 
            padding: '10px',
            position: 'absolute',
            right: '10px'
        },
          duration: 2,
      });

      viewAllFashionItem(currentPage);

    }catch(error) {
      console.error("Error creating new item:", error);
            message.error({
                content: error.response.data.message,
                style: {
                  marginTop: '10px',
                  fontSize: '20px', 
                  padding: '10px',
                  position: 'absolute',
                  right: '10px'
              },
                duration: 2,
            });
    }
  }

  const viewAllFashionItem = async (page) => {
     try {
      const resposne = await viewFashionItems(page, pageSize);
      
      console.log(resposne.data);
      
      setFashionItems(resposne.data);      

      setTotalItems(resposne.totalItems);      

     }catch(error){
       console.log("Failed to load fashion items", error);
       
     }
  }

  const handleStatusToggle = async (itemId, checked) => {
    try {
      await activateDeactivateFashionItem(itemId); // Call API to activate/deactivate
      const newStatus = checked ? "Available" : "Unavailable";
      const updatedData = fashionItems.map((item) =>
        item.itemId === itemId ? { ...item, status: newStatus } : item
      );
      setFashionItems(updatedData);
      message.success({
        content: `Fashion item's status updated to ${newStatus} successfully!`,
        style: {
          marginTop: '5px',
          fontSize: '16px', 
          padding: '10px',
      },
        duration: 2,
    });
    } catch (error) {
      message.error("Failed to update status of fashion item");
    }
  }

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
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : "",
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
      render: (price) => (price !== null ? `${price.toFixed(2)} VND` : "Not available"), // Hiển thị "Free" nếu price là null
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Available", value: "Available" },
        { text: "Unavailable", value: "Unavailable" },],
        onFilter: (value, record) => record.status.includes(value),
        render: (text, record) => (
          <Switch
            checked={record.status === "Available"}
            onChange={(checked) => handleStatusToggle(record.itemId, checked)}
          />
        ),
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

  useEffect(() => {
    viewAllFashionItem(currentPage);
  }, [currentPage])

  const onPageChange = (page) => {
    setCurrentPage(page);
  };


  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Manage Fashion Items</h2>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        Add Fashion Item
      </Button>
      <Table
        columns={columns}
        dataSource={fashionItems}
        rowKey="itemId"
        pagination={{ pageSize: pageSize, current: currentPage, total: totalItems, onChange: onPageChange, showSizeChanger: false }}
      />
      <FashionItemForm
        visible={isModalVisible}
        onCreate={handleCreate}
        onCancel={() => {
          setIsModalVisible(false);
          viewAllFashionItem(currentPage);
        }}
        initialValues={editingItem}
      />
    </div>
  );
};

export default FashionItemsManagement;
