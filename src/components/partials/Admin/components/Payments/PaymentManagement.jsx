import { useState } from "react";
import React, { useEffect } from "react";
import { Table, Button, Space, Image, message, Input, Switch, Tag } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { viewPaymentForAdmin } from "../../../../../services/PaymentApi";
import moment from "moment";

const PaymentManagement = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(1);
    const pageSize = 10; // Set the page size

    const [payment, setPayment] = useState([]);

    const viewAllPayment = async (page) => {
        try {

         const resposne = await viewPaymentForAdmin(page, pageSize);
         
         console.log(resposne.data);
         
         setPayment(resposne.data);      
   
         setTotalItems(resposne.totalItems);      
   
        }catch(error){
          console.log("Failed to load payment", error);
          
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
        title: "PaymentId",
        dataIndex: "paymentId",
        key: "paymentId",
        sorter: (a, b) => a.paymentId - b.paymentId,
      },
      {
        title: "Payment Date",
        dataIndex: "paymentDate",
        render: (date) => (date ? moment(date).format("YYYY-MM-DD") : "N/A"),
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
        render: (price) => (price !== null ? `${price.toFixed(2)} VND` : "Not available"), // Hiển thị "Free" nếu price là null
      },
      {
        title: "Email",
        key: "email",
        render: (record) => (record.customer ? record.customer.email : "N/A"),
      },
      {
        title: "Username",
        key: "username",
        render: (record) => (record.customer ? record.customer.username : "N/A"),
      },
      {
        title: "Subscription",
        key: "subscription",
        render: (record) =>
          record.subscription ? record.subscription.subscriptionTitle : "N/A",
      },
  
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        filters: [
          { text: "Paid", value: "Paid" },
          { text: "Unpaid", value: "Unpaid" },],
          onFilter: (value, record) => record.status.includes(value),
          render: (status) => (
            <Tag color={status === "Paid" ? "green" : "red"}>
              {status}
            </Tag>
          ),
      },
    ];

    useEffect(() => {
      viewAllPayment(currentPage);      
    }, [currentPage])
  
    const onPageChange = (page) => {
      setCurrentPage(page);
    };

    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Manage Payments</h2>
        <Table
          columns={columns}
          dataSource={payment}
          rowKey="paymentId"
          pagination={{ pageSize: pageSize, current: currentPage, total: totalItems, onChange: onPageChange, showSizeChanger: false }}
        />
      </div>
    );
}


export default PaymentManagement;