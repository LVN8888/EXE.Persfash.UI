import React, { useEffect, useState } from "react";
import { Card, Avatar, Form, Input, Row, Col, DatePicker, Button, Divider, message, Select} from "antd";
import { useAuth } from "../../../hooks/useAuth";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { customerUpdateInformation, viewCurrentUserInfo, viewCustomerInformation } from "../../../services/CustomerApi";
import { uploadImages } from "../../../services/FileApi";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

const { Option } = Select;

export const CustomerInformation = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [avatar, setAvatar] = useState(null);
  const [currentAvatar, setCurrentAvatar] = useState(null);
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const [customer, setCustomer] = useState({
      customerId: 0,
      username: "",
      email: "",
      fullName: "",
      gender: "",
      dateOfBirth: "",
      profilePicture: "",
      dateJoined: "",
      status: "",
      isDoneProfileSetup: ""
  });

  const navigate = useNavigate();

  const fetchCustomerInformation = async (customerId) => {
      try {
          const response = await viewCustomerInformation(customerId);
          console.log(response.data);
          
          setCustomer(response.data);
      } catch (error) {
          const errorMessage = error.response
              ? error.response.data.message
              : "Error occurred";
          console.error("View customer information log:", error);
          message.error({
              content: errorMessage,
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
  };

  useEffect(() => {
      const storedUser = localStorage.getItem("accessToken");
      if (storedUser) {          
          fetchCustomerInformation(user.userId);
      }
  }, []);

  useEffect(() => {
      if (customer) {
          const formattedDOB = customer.dateOfBirth ? moment(customer.dateOfBirth) : null;
          const formattedDJ = customer.dateJoined ? moment(customer.dateJoined) : null;

          form.setFieldsValue({
              Username: customer.username || "N/A",
              Email: customer.email || "N/A",
              FullName: customer.fullName || "N/A",
              Gender: customer.gender || "N/A",
              DateOfBirth: formattedDOB,
              DateJoined: formattedDJ,
          });
          setCurrentAvatar(customer.profilePicture);
          setAvatar(customer.profilePicture);
      }
  }, [customer, form]);

  const handleUpdateClick = () => setIsEditing(true);

  const handleSaveClick = async () => {
      const values = await form.validateFields();      

      const updatedData = {
        customerId: customer.customerId,
        email: values.Email,
        fullName: values.FullName,
        gender: values.Gender,
        dateOfBirth: values.DateOfBirth.format('YYYY-MM-DD'),
        profilePicture: avatar
      }

      try {

        console.log(updatedData);
        
        setLoading(true)
        const response = await customerUpdateInformation(updatedData.customerId, updatedData.email, updatedData.fullName, 
          updatedData.gender, updatedData.dateOfBirth, updatedData.profilePicture)

          console.log(response);
          setLoading(false)
        
          message.success({
            content: "Update customer information successfully!",
            style: { marginTop: '10px', fontSize: '18px', padding: '10px' },
            duration: 2,
        });

        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
          fetchCustomerInformation(storedUser.userId);
        }

        setIsEditing(false);

      }catch(error) {
        setLoading(false)
        console.error("Update customer information failed:", error);
              message.error({
                  content: error.response.data.message,
                  style: { marginTop: '10px', fontSize: '18px', padding: '10px' },
                  duration: 2,
              });
      }
  };

  const handleCancelClick = () => {
      setIsEditing(false);
      const formattedDOB = customer.dateOfBirth ? moment(customer.dateOfBirth) : null;
      const formattedDJ = customer.dateJoined ? moment(customer.dateJoined) : null;

    form.setFieldsValue({
        Username: customer.username || "N/A",
        Email: customer.email || "N/A",
        FullName: customer.fullName || "N/A",
        Gender: customer.gender || "N/A",
        DateOfBirth: formattedDOB,
        DateJoined: formattedDJ,
    });
    setCurrentAvatar(customer.profilePicture);
          setAvatar(customer.profilePicture);
  };

  const handleDatePickerOpenChange = (open) => {
    if (open && isEditing) {
        form.setFieldsValue({ DateOfBirth: null });
    }
};

  const handleAvatarChange = async (e) => {
      const file = e.target.files[0];
      if (file) {
          const formData = new FormData();
          formData.append("avatar", file);
          try {
              const response = await uploadImages(formData);
              console.log(response.data[0]);
              
              setAvatar(response.data[0]); 
              message.success({
                  content: "Avatar uploaded successfully!",
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
      <div className="flex justify-center p-10 bg-gray-100 min-h-screen bg-gradient-to-tr from-white to-[#4949e9]">
        <div className="max-w-7xl w-full">
          <div className="flex flex-col md:flex-row justify-between items-start space-y-4 md:space-y-0 md:space-x-20">
            {/* Avatar and Details Card */}
            <div className="flex flex-col w-full max-w-xs space-y-4">
              {/* Avatar Card */}
              <Card className="p-6 shadow-lg shadow-[#4949e9] rounded-xl flex flex-col items-center justify-center">
                <Avatar
                  size={160}
                  src={avatar}
                  className="shadow-lg cursor-pointer"
                  onClick={() =>
                    isEditing && document.getElementById("avatarInput").click()
                  } // Click to change avatar
                />
                {isEditing && (
                  <input
                    type="file"
                    id="avatarInput"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="mt-4 hidden" // Hide the input
                  />
                )}
              </Card>

              {/* New Card Below Avatar */}
              <Card className="p-1 shadow-lg shadow-[#4949e9] rounded-xl">
              <h2 className="text-xl font-bold mb-4 text-[#4949e9] font-avantgarde">Manage profile</h2>
                <div className="flex justify-around space-x-4">
                {customer.isDoneProfileSetup === true ? (
                  <button
                  type="button"
                  className="bg-[#4949e9] px-4 py-2 rounded-md font-medium text-[#b3ff00] hover:bg-[#b3ff00] hover:text-[#4949e9] font-avantgarde"
                  onClick={() => navigate("/customer/edit-profile-setup")}
                >
                  Profile
                </button>
                ) : (<button
                  type="button"
                  className="bg-[#4949e9] px-4 py-2 rounded-md font-medium text-[#b3ff00] hover:bg-[#b3ff00] hover:text-[#4949e9] font-avantgarde"
                  onClick={() => navigate("/profile-setup")}
                >
                  Profile
                </button>)}

                <button
                  type="button"
                  onClick={() => navigate("/password/change-password")}
                  className="bg-[#4949e9] px-4 py-2 rounded-md font-medium text-[#b3ff00] hover:bg-[#b3ff00] hover:text-[#4949e9] font-avantgarde"
                >
                  Change password
                </button>
                </div>
              </Card>
            </div>

            {/* Information Form */}
            <Card className="w-full flex-grow p-6 shadow-lg shadow-[#4949e9] rounded-xl">
            <h2 className="text-4xl font-bold mb-4 text-[#4949e9] font-avantgarde">Edit Customer Information</h2>
              <Form form={form} layout="vertical">
                {/* Username */}
                <Form.Item
                  label="Username"
                  name="Username"
                  rules={[
                    { required: true, message: "Please enter your username" },
                  ]}
                  className="font-medium font-avantgard"
                >
                  <Input
                    className="border border-[#4949e9]"
                    // onChange={(e) => setUsername(e.target.value)}
                    disabled={true}
                  />
                </Form.Item>
                <Divider />

                {/* Full Name */}
                <Form.Item
                  label="Full Name"
                  name="FullName"
                  rules={[
                    { required: true, message: "Please enter your full name" },
                  ]}
                  className="font-medium font-avantgard"
                >
                  <Input
                    className="border border-[#4949e9]"
                    disabled={!isEditing}
                    // onChange={(e) => setFullName(e.target.value)}
                  />
                </Form.Item>
                <Divider />

                {/* Gender */}
                <Form.Item
                  label="Gender"
                  name="Gender"
                  rules={[
                    { required: true, message: "Gender is required" },
                  ]}
                  className="font-medium font-avantgard"
                >
                  <Select
                  // value={gender}
                  // onChange={(value) => setGender(value)}
                  placeholder="Select Gender"
                  disabled={!isEditing}
                  className="w-full border border-[#4949e9] rounded-md "
                >
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                  <Option value="Others">Others</Option>
                </Select>
                </Form.Item>
                <Divider />

                {/* Date of Birth */}
                <Form.Item
                  label="Date of Birth"
                  name="DateOfBirth"
                  rules={[
                    {
                      required: true,
                      message: "Please select your date of birth",
                    },
                  ]}
                  className="font-medium font-avantgard"
                >
                  <DatePicker
                    // format={dateFormat}
                    className="w-full border border-[#4949e9] rounded-md p-2"
                    disabled={!isEditing}
                    onOpenChange={handleDatePickerOpenChange} // Clear on open
                  />
                </Form.Item>
                <Divider />

                {/* Email */}
                <Form.Item
                  label="Email"
                  name="Email"
                  rules={[
                    { required: true, message: "Please enter your email" },
                  ]}
                  className="font-medium font-avantgard"
                >
                  <Input className="border border-[#4949e9]" disabled={!isEditing} />
                </Form.Item>
                <Divider />

                {/* Date Joined */}
                <Form.Item
                  label="Date Joined"
                  name="DateJoined"
                  className="font-medium font-avantgard"
                >
                  <DatePicker
                    // format={dateFormat}
                    className="w-full border border-[#4949e9] rounded-md p-2"
                    disabled={true}
                  />
                </Form.Item>
                <Divider />

                {/* Buttons */}
                <div className="flex justify-end space-x-4">
                  {!isEditing ? (
                    <button
                      type="button"
                      className="bg-[#4949e9] px-4 py-2 rounded-md font-medium text-[#b3ff00] hover:bg-[#b3ff00] hover:text-[#4949e9] font-avantgarde"
                      onClick={handleUpdateClick}
                    >
                      Update
                    </button>
                  ) : (
                    <>
                      <button
                        type="button"
                        className="bg-[#4949e9] px-4 py-2 rounded-md font-medium text-[#b3ff00] hover:bg-[#b3ff00] hover:text-[#4949e9] font-avantgarde"
                        onClick={handleCancelClick}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="bg-[#4949e9] px-4 py-2 rounded-md font-medium text-[#b3ff00] hover:bg-[#b3ff00] hover:text-[#4949e9] font-avantgarde"
                        onClick={handleSaveClick}
                      >
                        {loading ? "Saving... profile" : "Save profile"}
                      </button>
                    </>
                  )}
                </div>
              </Form>
            </Card>
          </div>
        </div>
      </div>
    );
}