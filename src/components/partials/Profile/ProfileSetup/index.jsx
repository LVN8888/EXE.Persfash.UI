import { Select, Form, Button, Card, message} from 'antd';
import { useEffect, useState } from 'react';
import bg from '../../../../assets/img/fa.png'
import { useAuth } from '../../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { checkCustomerProfile, setupCustomerProfile } from '../../../../services/CustomerApi';

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

  const { Option } = Select;

  export const ProfileSetup = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {user, isAuthenticated, setUser, setIsAuthenticated} = useAuth();

  useEffect(() => {

    const handleCustomer = async () => {
        try {
          // Check if the customer has completed the profile setup
          const profileRes = await checkCustomerProfile();
          console.log(profileRes);
    
          if (profileRes.data === true) {
            navigate("/home");
          }
    
        } catch (error) {
          if (error.response) {
            console.error("Check customer failed log:", error.response.data);
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
          } else {
            message.error({
              content: "Error occurred",
              style: {
                marginTop: '10px',
                fontSize: '20px', 
                padding: '10px',
                position: 'absolute',
                right: '10px'
            },
              duration: 2,
            });
            console.error("Check customer failed log: ", error);
          }
        }
      };

    // const storedUser = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('accessToken');
    console.log(user);
    
    if (user && token) {
      setUser(user);
      setIsAuthenticated(true);

      if (user.role === "Admin"){
        navigate("/admin")
      }
      
      if (user.role === "Customer") {
        handleCustomer();
      }

    }else {
      navigate("/login-form")
    }
  }, [navigate]);


  const handleSubmit = async (values) => {

    const customerProfileSetupReqModel = {
        bodyType : values.BodyType,
        fashionStyle : values.FashionStyle,
        fitPreferences: values.FitPreferences,
        preferredSize: values.PreferredSize,
        preferredColors: values.PreferredColors,
        preferredMaterials: values.PreferredMaterials,
        occasion: values.Occasion,
        lifestyle: values.Lifestyle
    }

    setIsLoading(true)

    console.log('Form Submitted:', customerProfileSetupReqModel);

    try {
        const response = await setupCustomerProfile(customerProfileSetupReqModel.bodyType, customerProfileSetupReqModel.fashionStyle, customerProfileSetupReqModel.fitPreferences
            , customerProfileSetupReqModel.preferredSize, customerProfileSetupReqModel.preferredColors, customerProfileSetupReqModel.preferredMaterials,
            customerProfileSetupReqModel.occasion, customerProfileSetupReqModel.lifestyle
        );
    
        message.success({
            content: "Set up customer profile successfully!",
            style: {
              marginTop: '10px',
              fontSize: '20px', 
              padding: '10px',
              position: 'absolute',
              right: '10px'
          },
            duration: 2, // Optional: duration in seconds
          });
    
        setIsLoading(false)

        navigate("/welcome")

    }catch(error) {
        if (error.response) {
            // Log the response data to see the error message
            setLoading(false)
            console.error("Setup customer profile failed log:", error.response.data);
            message.error({
              content: error.response.data.message,
              style: {
                marginTop: '10px',
                fontSize: '20px', 
                padding: '10px',
                position: 'absolute',
                right: '10px'
            },
              duration: 2, // Optional: duration in seconds
            });
          } else {
            setLoading(false)
            message.error({
              content: "Error occurred",
              style: {
                marginTop: '10px',
                fontSize: '20px', 
                padding: '10px',
                position: 'absolute',
                right: '10px'
            },
              duration: 2, // Optional: duration in seconds
            });
            console.error("Setup customer profile failed log: ", error);
          }
    }
  };

  return (
    <div className="min-h-screen flex">

<div
        className="hidden lg:flex w-1/2 bg-center"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover", // Adjust the size to prevent overflow
        }}
      >
        <div className="flex items-center justify-center w-full h-full bg-black bg-opacity-10">
          <h2 className="text-white text-9xl font-medium text-center">
            Profile
            <br />
            setup
          </h2>
        </div>
      </div>

        <div className="flex min-h-screen flex-1 justify-center px-6 py-6 lg:px-8 bg-white">
      <div className="max-w-7xl w-full">
        <Card className="p-6 shadow-lg rounded-xl">
          <h2 className="text-4xl font-bold mb-4 text-[#4949e9] font-avantgarde">Profile Setup</h2>
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            {/* Body Type */}
            <Form.Item
              label="Body Type"
              name="BodyType"
              className='font-avantgarde font-medium'
              rules={[{ required: true, message: 'Body Type is required.' }]}
            >
              <Select
                placeholder="Select Body Type"
                className="w-full className='font-avantgarde font-medium'"
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

            <div className="flex justify-end">
              <button type="primary" htmlType="submit" 
              className="bg-[#4949e9] px-4 py-2 rounded-md font-medium text-[#b3ff00] hover:bg-[#b3ff00] hover:text-[#4949e9] font-avantgarde"

              >
                {isLoading ? 'Submitting Profile...' : 'Submit Profile'}
              </button>
            </div>
          </Form>
        </Card>
      </div>
    </div>

    </div>

    
  );
}