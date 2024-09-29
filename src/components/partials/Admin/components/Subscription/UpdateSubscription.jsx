import React, { useState } from "react";
import { Button, Modal, Form, Input, InputNumber, Select } from "antd";

const { Option } = Select;
const { TextArea } = Input;

const UpdateSubscription = ({ subscription, onUpdate }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);

    // Chuyển đổi description từ mảng thành chuỗi để hiện trong TextArea và xử lý các giá trị null
    const updatedSubscription = {
      ...subscription,
      price: subscription.price !== null ? subscription.price : null, // Giá trị mặc định là null nếu price là null
      durationInDays: subscription.durationInDays !== null ? subscription.durationInDays : null, // Giá trị mặc định là null nếu durationInDays là null
      description: Array.isArray(subscription.description)
        ? subscription.description.join("\n") // Chuyển đổi mảng thành chuỗi với mỗi phần tử trên 1 dòng
        : "", // Nếu description không phải mảng, đặt chuỗi rỗng
    };

    form.setFieldsValue(updatedSubscription);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      // Kiểm tra nếu người dùng không nhập giá trị nào, gửi null
      const updatedValues = {
        ...values,
        price: values.price === undefined ? null : values.price, // Nếu không nhập giá trị, gửi null
        durationInDays: values.durationInDays === undefined ? null : values.durationInDays, // Nếu không nhập giá trị, gửi null
        description: values.description ? values.description.split("\n") : [], // Chuyển chuỗi thành mảng nếu có nội dung
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
        open={isModalVisible}
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
          >
            {/* Giá trị null nếu không nhập */}
            <InputNumber min={0} step={1000} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Duration (Days)"
            name="durationInDays"
          >
            {/* Giá trị null nếu không nhập */}
            <InputNumber min={0} style={{ width: "100%" }} />
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
