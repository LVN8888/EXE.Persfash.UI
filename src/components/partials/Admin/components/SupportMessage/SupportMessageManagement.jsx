import React, { useState, useEffect } from "react";
import { Table, Input, Button, Space, Switch, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { createSupportMessage, removeSupportMessage, viewSupportQuestion } from "../../../../../services/SupportQuestionApi";
import { FaEnvelope, FaTrashCan } from "react-icons/fa6";
import Modal from 'antd/lib/modal';

export const SupportMessageManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(1);
  const pageSize = 10; // Set the page size

  const [fashionItems, setFashionItems] = useState([]);

  const [supportedQuestion, setSupportedQuestion] = useState([]);
  const [currentMessages, setCurrentMessages] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleCreateModal, setVisibleCreateModal] = useState(false);
  const [currMessage, setCurrMessage] = useState('');
  const [currQuestion, setCurrQuestion] = useState({});

  const fetchSupportQuestion = async (page) => {
    try {
      const response = await viewSupportQuestion(page, pageSize, null);

    //   console.log(response.data);

      const formattedData = response.data.map((item) => ({
        ...item,
        username: item.customer.username, // Add the customer username for display
      }));

      console.log(formattedData);
      setSupportedQuestion(formattedData);
      setTotalItems(response.totalItems);
      //   setSupportedQuestion(response.data);
    } catch (error) {
      console.log("Failed to fetch support question", error);
    }
  };

  useEffect(() => {
    fetchSupportQuestion(currentPage);
  }, [currentPage]);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const handleShowMessages = (messages) => {
    setCurrentMessages(messages);
    setVisibleModal(true);
  };

  const handleAnswer = (record) => {
    setVisibleCreateModal(true);
    setCurrQuestion(record);
  }

  const handleSubmitSupportMessage = async () => {
    try {
        // console.log(currQuestion.supportId);
        // console.log(currMessage);
        const response = await createSupportMessage(currQuestion.supportId, currMessage);

        message.success({
            content: "Respond support question successfully",
            style: {
              marginTop: '10px',
              fontSize: '20px', 
              padding: '10px',
              position: 'absolute',
              right: '10px'
          },
            duration: 2,
        });

        fetchSupportQuestion(currentPage);

        

    }catch(error) {
        console.log("Failed to submit message question", error);
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

  const handleRemoveMessage = async (messageId) => {
    try {

      const response = await removeSupportMessage(messageId);

      message.success({
        content: "Remove support message successfully",
        style: {
          marginTop: '10px',
          fontSize: '20px', 
          padding: '10px',
          position: 'absolute',
          right: '10px'
      },
        duration: 2,
    });

    fetchSupportQuestion(currentPage);

    }catch (error) {
      console.log("Failed to remove support message", error);
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

  const columns = [
    {
      title: "SupportId",
      dataIndex: "supportId",
      key: "supportId",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Question",
      dataIndex: "question",
      key: "question",
    },
    {
      title: "Date Created",
      dataIndex: "dateCreated",
      key: "dateCreated",
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Open", value: "Open" },
        { text: "Answered", value: "Answered" },
      ],
      onFilter: (value, record) => record.status.includes(value),
    },

    {
      title: "Messages",
      key: "messages",
      render: (_, record) => (
        <>
          {record.supportMessages.length > 0 && (
            <div
              className="cursor-pointer"
              onClick={() => handleShowMessages(record.supportMessages)}
            >
              <FaEnvelope className="text-[#4949e9] mx-1" size={24} />
            </div>
          )}
        </>
      ),
    },

    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button className="bg-[#4949e9] text-[#b3ff00]" onClick={() => handleAnswer(record)}>Answer</Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Manage Support Questions</h2>
      <Table
        columns={columns}
        dataSource={supportedQuestion}
        rowKey="supportId"
        pagination={{
          pageSize: pageSize,
          current: currentPage,
          total: totalItems,
          onChange: onPageChange,
        }}
      />

      <Modal
        centered
        title="Support Messages"
        open={visibleModal}
        onCancel={() => setVisibleModal(false)}
        footer={null}
        className="font-medium text-[#4949e9] font-avantgarde"
      >
        <div>
          {currentMessages.map((msg, index) => (
            <div key={index} className="mb-2 mt-2 flex items-center justify-between">
              <p>
                <strong>{msg.admin.username}</strong>: {msg.messageText} 
              </p>
              <FaTrashCan onClick={() => {
                handleRemoveMessage(msg.messageId);
                setVisibleModal(false)
              }} className="text-[#ff5449] mx-1 cursor-pointer" size={24} />
            </div>
          ))}
        </div>
      </Modal>

      <Modal
  centered
  title="Response Support Question"
  open={visibleCreateModal}
  onCancel={() => setVisibleCreateModal(false)}
  footer={null}
  className="font-medium text-[#4949e9] font-avantgarde"
>
  <div>
    <Input.TextArea
      rows={4}
      placeholder="Type your support message here..."
      value={currMessage}
      onChange={(e) => setCurrMessage(e.target.value)} // Update state on input change
      className="mb-4"
    />
    <Button
    style={{ backgroundColor: "#b3ff00", color: "#4949e9" }}
    className="bg-[#b3ff00] text-[#4949e9] py-2 px-4 rounded-full font-medium"
    disabled={!currMessage.trim()}
      onClick={() => {
        // Handle the submit action, e.g., sending the question to your API
        console.log('Submitted Question:', message);
        handleSubmitSupportMessage();
        
        // You may want to reset the input after submission
        setCurrMessage('');
        setVisibleCreateModal(false); // Close the modal after submission
      }}
    >
      Submit Message
    </Button>
  </div>
</Modal>
    </div>
    
  );
};
