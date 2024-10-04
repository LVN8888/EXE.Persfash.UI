import React, { useState, useEffect } from 'react';
import { Select, Form, Button, Card, message, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { updateCustomerProfile, viewCustomerProfile } from '../../../../services/CustomerApi';

const { Option } = Select;

export const EditProfileSetup = () => {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [initialValues, setInitialValues] = useState(null); // to store API response
  const [saving, setSaving] = useState(false); // for saving state
  const navigate = useNavigate();

  const [customerProfile, setCustomerProfile] = useState({
        customer: {
          customerId: 1,
          email: "",
          profilePicture: "",
          username: ""
        },
        profileId: 1,
        bodyType: "",
        fashionStyle: [""],
        fitPreferences: [""],
        preferredSize: [""],
        preferredColors: [""],
        preferredMaterials: [""],
        occasion: [""],
        lifestyle: [""],
        facebookLink: "",
        instagramLink: "",
        tikTokLink: ""

  })

  const sampleData = {
    BodyType: 'Slim',
    FashionStyle: ['Casual', 'Formal'],
    FitPreferences: ['Regular'],
    PreferredSize: ['M'],
    PreferredColors: ['Blue'],
    PreferredMaterials: ['Cotton'],
    Occasion: ['Work', 'CasualOuting'],
    Lifestyle: ['Active'],
  };

  const fetchCustomerProfile = async () => {
    try {
      const response = await viewCustomerProfile();

      console.log(response.data);

      setCustomerProfile(response.data)

      console.log(customerProfile);
      
      // Set the initial values fetched from the API
      form.setFieldsValue({
        BodyType: response.data.bodyType || sampleData.BodyType,
        FashionStyle: response.data.fashionStyle || sampleData.FashionStyle,
        FitPreferences: response.data.fitPreferences || sampleData.FitPreferences,
        PreferredSize: response.data.preferredSize || sampleData.PreferredSize,
        PreferredColors: response.data.preferredColors || sampleData.PreferredColors,
        PreferredMaterials: response.data.preferredMaterials || sampleData.PreferredMaterials,
        Occasion: response.data.occasion || sampleData.Occasion,
        Lifestyle: response.data.lifestyle || sampleData.Lifestyle,
      });

      setIsLoading(false);
    } catch (error) {
      message.error('Failed to fetch profile data');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomerProfile();
  }, []);

  const handleSaveClick = async () => {
    setSaving(true);
    try {
      const values = form.getFieldsValue(); 

      const updatedData = {
        profileId: customerProfile.profileId,
        fashionStyle: values.FashionStyle,
        bodyType: values.BodyType,
        fitPreferences: values.FitPreferences,
        preferredSize: values.PreferredSize,
        preferredColors: values.PreferredColors,
        preferredMaterials: values.PreferredMaterials,
        occasion: values.Occasion,
        lifestyle: values.Lifestyle,
        facebookLink: "",
        instagramLink: "",
        tiktokLink: ""
      }

      console.log(updatedData);
      
      const response = await updateCustomerProfile(updatedData.profileId, updatedData.bodyType, updatedData.fashionStyle, updatedData.fitPreferences,
        updatedData.preferredSize, updatedData.preferredColors, updatedData.preferredMaterials, updatedData.occasion, updatedData.lifestyle, updatedData.facebookLink,
        updatedData.instagramLink, updatedData.tiktokLink);

      setSaving(false)

      message.success({
        content: "Update customer profile successfully!",
        style: {
          marginTop: '10px',
          fontSize: '20px', 
          padding: '10px',
          position: 'absolute',
          right: '10px'
      },
        duration: 2,
      });
       
      fetchCustomerProfile();

      console.log(response);

      setIsEditing(false);
      
      
    } catch (error) {
      console.error("Update customer information failed:", error);
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
    setSaving(false);
  };

  const handleUpdateClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    form.setFieldsValue({
      BodyType: customerProfile.bodyType || sampleData.BodyType,
      FashionStyle: customerProfile.fashionStyle || sampleData.FashionStyle,
      FitPreferences: customerProfile.fitPreferences || sampleData.FitPreferences,
      PreferredSize: customerProfile.preferredSize || sampleData.PreferredSize,
      PreferredColors: customerProfile.preferredColors || sampleData.PreferredColors,
      PreferredMaterials: customerProfile.preferredMaterials || sampleData.PreferredMaterials,
      Occasion: customerProfile.occasion || sampleData.Occasion,
      Lifestyle: customerProfile.lifestyle || sampleData.Lifestyle,
    });
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="flex justify-center p-10 bg-gradient-to-r from-white to-[#4949e9] min-h-screen">
      <div className="max-w-5xl w-full">
        <Card className="p-6 shadow-lg rounded-xl">
          <h2 className="text-4xl font-bold mb-4 text-[#4949e9] font-avantgarde">Edit Profile Setup</h2>
          <Form
            form={form}
            layout="vertical"
            initialValues={initialValues}
          >
            {/* Body Type */}
            <Form.Item
              label="Body Type"
              name="BodyType"
              rules={[{ required: true, message: 'Body Type is required.' }]}
              className='font-avantgarde font-medium'
            >
              <Select
                disabled={!isEditing}
                placeholder="Select Body Type"
                className="w-full"
              >
                {bodyTypeOptions.map(option => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {/* Fashion Style */}
            <Form.Item
              label="Fashion Style"
              name="FashionStyle"
              rules={[
                { required: true, message: 'Fashion Style is required.' },
                {
                  validator: (_, value) => {
                    if (value && value.length >= 3) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Please select at least three Fashion Style.'));
                  }
                }
              ]}
              className='font-avantgarde font-medium'
            >
              <Select
                mode="multiple"
                disabled={!isEditing}
                placeholder="Select Fashion Style"
                className="w-full"
              >
                {fashionStyleOptions.map(option => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {/* Fit Preferences */}
            <Form.Item
              label="Fit Preferences"
              name="FitPreferences"
              rules={[{ required: true, message: 'At least one Fit Preference is required.' }]}
              className='font-avantgarde font-medium'
            >
              <Select
                mode="multiple"
                disabled={!isEditing}
                placeholder="Select Fit Preferences"
                className="w-full"
              >
                {fitPreferencesOptions.map(option => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {/* Preferred Size */}
            <Form.Item
              label="Preferred Size"
              name="PreferredSize"
              rules={[
                { required: true, message: 'Preferred size is required.' },
                {
                  validator: (_, value) => {
                    if (value && value.length >= 3) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Please select at least three preferred size.'));
                  }
                }
              ]}
              className='font-avantgarde font-medium'
            >
              <Select
                mode="multiple"
                disabled={!isEditing}
                placeholder="Select Preferred Size"
                className="w-full"
              >
                {preferredSizeOptions.map(option => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {/* Preferred Colors */}
            <Form.Item
              label="Preferred Colors"
              name="PreferredColors"
              rules={[
                { required: true, message: 'Preferred Colors is required.' },
                {
                  validator: (_, value) => {
                    if (value && value.length >= 2) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Please select at least two Preferred Colors.'));
                  }
                }
              ]}
              className='font-avantgarde font-medium'
            >
              <Select
                mode="multiple"
                disabled={!isEditing}
                placeholder="Select Preferred Colors"
                className="w-full"
              >
                {preferredColorsOptions.map(option => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {/* Preferred Materials */}
            <Form.Item
              label="Preferred Materials"
              name="PreferredMaterials"
              rules={[
                { required: true, message: 'Preferred Materials is required.' },
                {
                  validator: (_, value) => {
                    if (value && value.length >= 3) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Please select at least three Preferred Materials.'));
                  }
                }
              ]}
              className='font-avantgarde font-medium'
            >
              <Select
                mode="multiple"
                disabled={!isEditing}
                placeholder="Select Preferred Materials"
                className="w-full"
              >
                {preferredMaterialsOptions.map(option => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {/* Occasion */}
            <Form.Item
              label="Occasion"
              name="Occasion"
              rules={[
                { required: true, message: 'Occasion is required.' },
                {
                  validator: (_, value) => {
                    if (value && value.length >= 2) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Please select at least two Occasion.'));
                  }
                }
              ]}
              className='font-avantgarde font-medium'
            >
              <Select
                mode="multiple"
                disabled={!isEditing}
                placeholder="Select Occasion"
                className="w-full"
              >
                {occasionOptions.map(option => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {/* Lifestyle */}
            <Form.Item
              label="Lifestyle"
              name="Lifestyle"
              rules={[{ required: true, message: 'At least one Lifestyle is required.' }]}
              className='font-avantgarde font-medium'
            >
              <Select
                mode="multiple"
                disabled={!isEditing}
                placeholder="Select Lifestyle"
                className="w-full"
              >
                {lifestyleOptions.map(option => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <div className="flex justify-end space-x-4">
              {isEditing ? (
                <>
                  <button 
                  className="bg-[#4949e9] px-4 py-2 rounded-md font-medium text-[#b3ff00] hover:bg-[#b3ff00] hover:text-[#4949e9] font-avantgarde"
                  onClick={handleCancelClick}>Cancel</button>
                  <button
                    type="primary"
                    htmlType="submit"
                    className="bg-[#4949e9] px-4 py-2 rounded-md font-medium text-[#b3ff00] hover:bg-[#b3ff00] hover:text-[#4949e9] font-avantgarde"
                    onClick={handleSaveClick}
                  >
                    {saving ? "Saving..." : "Save"}
                  </button>
                </>
              ) : (
                <>
                <button onClick={() => navigate("/customer/customer-info")} 
                className="bg-[#4949e9] px-4 py-2 rounded-md font-medium text-[#b3ff00] hover:bg-[#b3ff00] hover:text-[#4949e9] font-avantgarde"
                >
                  Back
                </button>
                <button onClick={handleUpdateClick} 
                className="bg-[#4949e9] px-4 py-2 rounded-md font-medium text-[#b3ff00] hover:bg-[#b3ff00] hover:text-[#4949e9] font-avantgarde"
                >
                  Update
                </button>
                </>
              )}
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
}

const bodyTypeOptions = [
  { label: 'Slim', value: 'Slim' },
  { label: 'Athletic', value: 'Athletic' },
  { label: 'Curvy', value: 'Curvy' },
  { label: 'Plus Size', value: 'Plus Size' },
  { label: 'Rectangle', value: 'Rectangle' },
  { label: 'Inverted Triangle', value: 'Inverted Triangle' },
  { label: 'Pear', value: 'Pear' },
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
  { label: 'Chic', value: 'Chic' },
];

const fitPreferencesOptions = [
  { label: 'Loose', value: 'Loose' },
  { label: 'Slim', value: 'Slim' },
  { label: 'Regular', value: 'Regular' },
  { label: 'Tight', value: 'Tight' },
];

const preferredSizeOptions = [
  { label: 'XS', value: 'XS' },
  { label: 'S', value: 'S' },
  { label: 'M', value: 'M' },
  { label: 'L', value: 'L' },
  { label: 'XL', value: 'XL' },
  { label: 'XXL', value: 'XXL' },
  { label: '36', value: '36' },
  { label: '37', value: '37' },
  { label: '38', value: '38' },
  { label: '39', value: '39' },
  { label: '40', value: '40' },
  { label: '41', value: '41' },
  { label: '42', value: '42' },
  { label: '43', value: '43' },
  { label: '44', value: '44' },
  { label: 'One Size', value: 'One Size' },
];

const preferredColorsOptions = [
  { label: 'Red', value: 'Red' },
  { label: 'Orange', value: 'Orange' },
  { label: 'Yellow', value: 'Yellow' },
  { label: 'Green', value: 'Green' },
  { label: 'Blue', value: 'Blue' },
  { label: 'Purple', value: 'Purple' },
  { label: 'Pink', value: 'Pink' },
  { label: 'Brown', value: 'Brown' },
  { label: 'Gray', value: 'Gray' },
  { label: 'Black', value: 'Black' },
  { label: 'White', value: 'White' },
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
  { label: 'Business', value: 'Business' },
  { label: 'Party', value: 'Party' },
  { label: 'Wedding', value: 'Wedding' },
  { label: 'Casual', value: 'Casual' },
  { label: 'Formal', value: 'Formal' },
  { label: 'Sport', value: 'Sport' },
  { label: 'Vacation', value: 'Vacation' },
];

const lifestyleOptions = [
  { label: 'Active', value: 'Active' },
  { label: 'Relaxed', value: 'Relaxed' },
  { label: 'Adventurous', value: 'Adventurous' },
];