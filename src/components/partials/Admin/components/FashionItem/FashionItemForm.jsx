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
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { uploadImages } from "../../../../../services/FileApi";

const categoryOptions = [
  { label: "Tops", value: "Tops" },
  { label: "Bottoms", value: "Bottoms" },
  { label: "Shoes", value: "Shoes" },
  { label: "Accessories", value: "Accessories" },
  { label: "Dresses", value: "Dresses" },
];

const fitTypeOptions = [
  { label: "Regular", value: "Regular" },
  { label: "Slim", value: "Slim" },
  { label: "Loose", value: "Loose" },
];

const genderOptions = [
  { label: "Men", value: "Men" },
  { label: "Women", value: "Women" },
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
  { label: "One Size", value: "One Size" },
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
  { label: 'Cotton', value: 'Cotton' },
  { label: 'Polyester', value: 'Polyester' },
  { label: 'Silk', value: 'Silk' },
  { label: 'Denim', value: 'Denim' },
  { label: 'Wool', value: 'Wool' },
  { label: 'Mesh', value: 'Mesh' },
  { label: 'Leather', value: 'Leather' },
  { label: 'Linen', value: 'Linen' },
  { label: 'Nylon', value: 'Nylon' },
  { label: 'Corduroy', value: 'Corduroy' },
  { label: 'Rubber', value: 'Rubber' },
  { label: 'Canvas', value: 'Canvas' },
  { label: 'Metal', value: 'Metal' },
  { label: 'Plastic', value: 'Plastic' },
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

const fashionStyleOptions = [
  { label: 'Casual', value: 'Casual' },
  { label: 'Minimalist', value: 'Minimalist' },
  { label: 'Classic', value: 'Classic' },
  { label: 'Vintage', value: 'Vintage' },
  { label: 'Formal', value: 'Formal' },
  { label: 'Streetwear', value: 'Streetwear' },
  { label: 'Bohemian', value: 'Bohemian' },
  { label: 'Luxury', value: 'Luxury' },
  { label: 'Sporty', value: 'Sporty' },
  { label: 'Trendy', value: 'Trendy' },
];


const FashionItemForm = ({ visible, onCreate, onCancel, initialValues }) => {
  const [form] = Form.useForm();
  const [thumbnailFile, setThumbnailFile] = useState([]);
  const [itemImagesFileList, setItemImagesFileList] = useState([]);

  // Khi initialValues thay đổi (ví dụ khi người dùng chọn "Update"), điền dữ liệu vào form
  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
      if (initialValues.thumbnailURL) {
        form.setFieldsValue({thumbnail: initialValues.thumbnailURL})
        setThumbnailFile([initialValues.thumbnailURL]); // Load thumbnail từ initialValues
      }
      if (initialValues.itemImages) {
        form.setFieldsValue({itemImages: initialValues.itemImages})
        setItemImagesFileList(initialValues.itemImages); // Load danh sách ảnh sản phẩm từ initialValues
      }
    }else {
        form.resetFields(); // Reset form fields
        form.setFieldsValue({itemName: ""})
        setThumbnailFile([]); // Clear thumbnail
        setItemImagesFileList([]); // Clear item images
    }
  }, [initialValues, form]);

  const handleItemImagesChange = async (e) => {
    const files = e.target.files; // Access all selected files (multiple images)
    if (files.length > 0) {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("itemImages", files[i]); // Append each file to FormData
      }
      
      try {
        const response = await uploadImages(formData); // Upload API call
        console.log(response.data);

        const newImage = response.data

        const currImage = form.getFieldValue('itemImages') || []

        form.setFieldsValue({itemImages : [...currImage, ...newImage] })
  
        setItemImagesFileList([...itemImagesFileList, ...response.data]); // Update the file list with uploaded files
        message.success({
          content: "Upload images successfully!",
          style: {
            marginTop: '10px',
            fontSize: '20px', 
            padding: '10px',
            position: 'absolute',
            right: '10px'
        },
          duration: 2,
      });
      } catch (error) {
        console.error("Error uploading item images:", error);
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
  };


  const handleThumbnailChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append('thumbnail', file);

        try {
            const response = await uploadImages(formData);
            console.log(response);
            
            setThumbnailFile(response.data[0]); 
            message.success({
                content: "Upload thumbnail successfully!",
                style: {
                  marginTop: '10px',
                  fontSize: '20px', 
                  padding: '10px',
                  position: 'absolute',
                  right: '10px'
              },
                duration: 2,
            });
        } catch (error) {
            console.error("Error uploading avatar:", error);
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
};

  return (
    <Modal
      open={visible}
      title={initialValues ? "Update Fashion Item" : "Create Fashion Item"}
      okText={initialValues ? "Update" : "Create"}
      cancelText="Cancel"
      onCancel={() => {
        if (!initialValues) {
          form.setFieldsValue({itemName: ""})
          form.resetFields(); // Reset form fields
        setThumbnailFile([]); // Clear thumbnail
        setItemImagesFileList([]); // Clear item images
        }
        onCancel();
      }}
      onOk={() => {
        console.log(thumbnailFile);
        console.log(itemImagesFileList);
        form
          .validateFields()
          .then((values) => {
            values.thumbnail = thumbnailFile;
            values.itemImages = itemImagesFileList;

            onCreate(values);
            if (!initialValues) {
              form.setFieldsValue({itemName: ""})
              form.resetFields(); // Reset form fields
            setThumbnailFile([]); // Clear thumbnail
            setItemImagesFileList([]); // Clear item images
            }

            onCancel();

            // setThumbnailFile([]); // Clear thumbnail
            // setItemImagesFileList([]);
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
        {/* Field nhập tay brand */}
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="brand"
              label="Brand"
              rules={[{ required: true, message: "Please input the brand!" }]}
            >
              <Input placeholder="Enter Brand Name" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              name="productUrl"
              label="Product Url"
              rules={[
                { required: true, message: "Please input the productUrl !" },
              ]}
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

        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="price"
              label="Price"
              rules={[
                { required: true, message: "Please input item price!" },
                {
                  type: "number",
                  min: 0,
                  message: "Price must be a valid number!",
                },
              ]}
            >
              <InputNumber
                placeholder="Enter Price"
                style={{ width: "100%" }}
                min={0}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                } // Optional: format for thousands
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")} // Parser to remove commas
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              name="fashionTrend"
              label="Fashion Trend"
              rules={[{ required: true, message: "Please select a fashion trend!" }]}
            >
              <Select mode="multiple" showSearch options={fashionStyleOptions} />
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
              <Input
                type="file"
                id="thumbnailInput"
                accept="image/*"
                onChange={handleThumbnailChange}
                className="mt-4" // Optional: hide this using 'hidden' if needed
              />
              {thumbnailFile.length > 0 && (
                <img
                  src={thumbnailFile}
                  alt="Thumbnail Preview"
                  style={{ width: 60, height: 60, marginTop: 10 }}
                />
              )}
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
              <Input
                type="file"
                id="itemImagesInput"
                accept="image/*"
                multiple
                onChange={handleItemImagesChange}
                className="mt-4" // Optional: hide this using 'hidden' if needed
              />
              <Row gutter={16}>
                {itemImagesFileList.map((image, index) => (
                  <Col key={index}>
                    <img
                      src={image}
                      alt="images item"
                      style={{ width: 60, height: 60, marginTop: 10 }}
                    />
                  </Col>
                ))}
              </Row>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default FashionItemForm;
