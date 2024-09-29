import React, { useState } from "react";
import { Button, Modal, Form, Input, InputNumber, Select } from "antd";

const { Option } = Select;
const { TextArea } = Input;

const UpdateSubscription = ({ subscription, onUpdate }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
    // Chuyển đổi description từ mảng thành chuỗi để hiện trong TextArea
    const updatedSubscription = {
      ...subscription,
      description: subscription.description.join("\n"), // Mỗi dòng là một chuỗi
    };
    form.setFieldsValue(updatedSubscription);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      // Chuyển đổi description từ chuỗi thành mảng
      const updatedValues = {
        ...values,
        description: values.description.split("\n"), // Mỗi dòng là một phần tử trong mảng
      };
      onUpdate(subscription.subscriptionId, updatedValues); // Gọi hàm update từ props
      setIsModalVisible(false);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Update
      </Button>
      <Modal
        title="Update Subscription"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Update"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Subscription Title"
            name="subscriptionTitle"
            rules={[{ required: true, message: "Please enter subscription title" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please enter price" }]}
          >
            <InputNumber min={0} step={0.01} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Duration (Days)"
            name="durationInDays"
            rules={[{ required: true, message: "Please enter duration in days" }]}
          >
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            {/* Sử dụng TextArea để nhập nhiều dòng */}
            <TextArea rows={4} placeholder="Enter each description line on a new line" />
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please select status" }]}
          >
            <Select>
              <Option value="Active">Active</Option>
              <Option value="Inactive">Inactive</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UpdateSubscription;
