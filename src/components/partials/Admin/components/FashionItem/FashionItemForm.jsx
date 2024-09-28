import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  Row,
  Col,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

const FashionItemForm = ({ visible, onCreate, onCancel, initialValues }) => {
  const [form] = Form.useForm();
  const [thumbnailFile, setThumbnailFile] = useState([]);
  const [itemImagesFileList, setItemImagesFileList] = useState([]);

  // Khi initialValues thay đổi (ví dụ khi người dùng chọn "Update"), điền dữ liệu vào form
  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
      if (initialValues.thumbnailURL) {
        setThumbnailFile([{ url: initialValues.thumbnailURL }]); // Load thumbnail từ initialValues
      }
      if (initialValues.itemImages) {
        setItemImagesFileList(
          initialValues.itemImages.map((image, index) => ({
            uid: index,
            url: image,
            name: `image_${index}`,
          }))
        ); // Load danh sách ảnh sản phẩm từ initialValues
      }
    }
  }, [initialValues, form]);

  // Function to handle single file upload for thumbnail
  const handleThumbnailChange = ({ fileList }) => {
    setThumbnailFile(fileList.slice(-1)); // Chỉ giữ lại 1 ảnh
  };

  // Function to handle multiple file uploads for item images
  const handleItemImagesChange = ({ fileList }) => {
    setItemImagesFileList(fileList); // Không giới hạn số lượng ảnh
  };

  const categoryOptions = [
    { label: "Clothing", value: "Clothing" },
    { label: "Accessories", value: "Accessories" },
  ];

  const fitTypeOptions = [
    { label: "Regular", value: "Regular" },
    { label: "Slim", value: "Slim" },
    { label: "Loose", value: "Loose" },
  ];

  const genderOptions = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Unisex", value: "Unisex" },
  ];

  const preferredSizeOptions = [
    { label: "XS", value: "XS" },
    { label: "S", value: "S" },
    { label: "M", value: "M" },
    { label: "L", value: "L" },
    { label: "XL", value: "XL" },
    { label: "XXL", value: "XXL" },
    { label: "36", value: "36" },
    { label: "37", value: "37" },
    { label: "38", value: "38" },
    { label: "39", value: "39" },
    { label: "40", value: "40" },
    { label: "41", value: "41" },
    { label: "42", value: "42" },
    { label: "43", value: "43" },
    { label: "44", value: "44" },
  ];

  const preferredColorsOptions = [
    { label: "Red", value: "Red" },
    { label: "Orange", value: "Orange" },
    { label: "Yellow", value: "Yellow" },
    { label: "Green", value: "Green" },
    { label: "Blue", value: "Blue" },
    { label: "Purple", value: "Purple" },
    { label: "Pink", value: "Pink" },
    { label: "Brown", value: "Brown" },
    { label: "Gray", value: "Gray" },
    { label: "Black", value: "Black" },
    { label: "White", value: "White" },
  ];

  const preferredMaterialsOptions = [
    { label: "Cotton", value: "Cotton" },
    { label: "Polyester", value: "Polyester" },
    { label: "Silk", value: "Silk" },
    { label: "Denim", value: "Denim" },
    { label: "Wool", value: "Wool" },
    { label: "Mesh", value: "Mesh" },
    { label: "Leather", value: "Leather" },
    { label: "Linen", value: "Linen" },
    { label: "Nylon", value: "Nylon" },
  ];

  const occasionOptions = [
    { label: "Business", value: "Business" },
    { label: "Party", value: "Party" },
    { label: "Wedding", value: "Wedding" },
    { label: "Casual", value: "Casual" },
    { label: "Formal", value: "Formal" },
    { label: "Sport", value: "Sport" },
    { label: "Vacation", value: "Vacation" },
  ];

  return (
    <Modal
      open={visible}
      title={initialValues ? "Update Fashion Item" : "Create Fashion Item"}
      okText={initialValues ? "Update" : "Create"}
      cancelText="Cancel"
      onCancel={() => {
        form.resetFields(); // Reset form fields
        setThumbnailFile([]); // Clear thumbnail
        setItemImagesFileList([]); // Clear item images
        onCancel();
      }}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            values.thumbnailFile = thumbnailFile;
            values.itemImagesFileList = itemImagesFileList;

            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
      width={800}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={
          initialValues || { itemName: "", category: "", price: 0 }
        }
      >
        {/* Field nhập tay branch */}
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="branch"
              label="Branch"
              rules={[{ required: true, message: "Please input the branch!" }]}
            >
              <Input placeholder="Enter Branch Name" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="itemName"
              label="Item Name"
              rules={[
                { required: true, message: "Please input the item name!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="category"
              label="Category"
              rules={[{ required: true, message: "Please select a category!" }]}
            >
              <Select showSearch options={categoryOptions} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="fitType"
              label="Fit Type"
              rules={[{ required: true, message: "Please select a fit type!" }]}
            >
              <Select showSearch options={fitTypeOptions} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="genderTarget"
              label="Gender Target"
              rules={[
                { required: true, message: "Please select a gender target!" },
              ]}
            >
              <Select showSearch options={genderOptions} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="size"
              label="Size"
              rules={[{ required: true, message: "Please select a size!" }]}
            >
              <Select
                mode="multiple"
                showSearch
                options={preferredSizeOptions}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="color"
              label="Color"
              rules={[{ required: true, message: "Please select a color!" }]}
            >
              <Select
                mode="multiple"
                showSearch
                options={preferredColorsOptions}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="material"
              label="Material"
              rules={[{ required: true, message: "Please select a material!" }]}
            >
              <Select
                mode="multiple"
                showSearch
                options={preferredMaterialsOptions}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="occasion"
              label="Occasion"
              rules={[
                { required: true, message: "Please select an occasion!" },
              ]}
            >
              <Select mode="multiple" showSearch options={occasionOptions} />
            </Form.Item>
          </Col>
        </Row>

        {/* Thumbnail Upload */}
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="thumbnail"
              label="Thumbnail (One Image)"
              rules={[
                { required: true, message: "Please upload a thumbnail!" },
              ]}
            >
              <Upload
                listType="picture"
                maxCount={1}
                beforeUpload={() => false}
                onChange={handleThumbnailChange}
                fileList={thumbnailFile}
              >
                <Button icon={<UploadOutlined />}>Upload Thumbnail</Button>
              </Upload>
            </Form.Item>
          </Col>

          {/* Multiple Images Upload */}
          <Col xs={24} sm={12}>
            <Form.Item
              name="itemImages"
              label="Product Images (Multiple images)"
              rules={[
                { required: true, message: "Please upload product images!" },
              ]}
            >
              <Upload
                listType="picture"
                multiple
                beforeUpload={() => false}
                onChange={handleItemImagesChange}
                fileList={itemImagesFileList}
              >
                <Button icon={<UploadOutlined />}>Upload Product Images</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default FashionItemForm;
