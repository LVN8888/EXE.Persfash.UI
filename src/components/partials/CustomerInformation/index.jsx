import React, { useEffect, useState } from "react";
import { Card, Avatar, Form, Input, Row, Col, DatePicker, Button, Divider, message } from "antd";
import { useAuth } from "../../../hooks/useAuth";
import moment from "moment";

export const CustomerInformation = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [form] = Form.useForm();
    const [avatar, setAvatar] = useState(null);
    const [currentAvatar, setCurrentAvatar] = useState(null);
    const {user} = useAuth();

    // Retrieve user data from localStorage
    const sampleCustomerData = {
        Username: "johndoe",
        Email: "john.doe@example.com",
        FullName: "John Doe",
        Gender: "Male",
        DateOfBirth: "1990-01-01",
        ProfilePicture: currentAvatar || "https://scontent.fsgn15-1.fna.fbcdn.net/v/t39.30808-6/319750984_1175591466413987_4938157360962132268_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=so_TIG40ftwQ7kNvgHjhv7X&_nc_ht=scontent.fsgn15-1.fna&_nc_gid=Adz7asnSQgZJwi9kLtMssb9&oh=00_AYDPdV2U-IzIetoxvzTccYWpoacuQAyEAwtvskh7WuSYHw&oe=66F5B74F",
        DateJoined: "2023-09-01T12:00:00Z",
    };

    const customerData = sampleCustomerData;

    const dateFormat = "YYYY-MM-DD";

    useEffect(() => {
        const formattedDOB = customerData.DateOfBirth 
        ? moment(customerData.DateOfBirth) 
        : null;

        const formattedDJ = customerData.DateJoined 
        ? moment(customerData.DateJoined) 
        : null;

        form.setFieldsValue({
            Username: customerData.Username || "N/A",
            Email: customerData.Email || "N/A",
            FullName: customerData.FullName || "N/A",
            Gender: customerData.Gender || "N/A",
            DateOfBirth: formattedDOB,
            DateJoined: formattedDJ,
        });
        setCurrentAvatar(customerData.ProfilePicture);
        setAvatar(customerData.ProfilePicture);
    }, [customerData, form]);

    const handleUpdateClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        form.validateFields().then((values) => {
            console.log("Saved values:", values);
            // Handle saving other profile data logic
            setIsEditing(false);
        });
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        form.resetFields();
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
                const response = await axios.post("YOUR_API_URL/upload-avatar", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                
                setAvatar(response.data.avatarUrl); // Assuming the API responds with the URL
                message.success({
                    content: "Avatar uploaded successfully!",
                    style: {
                        marginTop: '10px', // Space above the message
                        fontSize: '18px', // Increase font size
                        padding: '10px', // Optional: add padding for a better look
                    },
                    duration: 2, // Optional: duration in seconds
                });
            } catch (error) {
                console.error("Error uploading avatar:", error);
                message.error({
                    content: 'Failed to upload avatar',
                    style: {
                        marginTop: '10px', // Space above the message
                        fontSize: '18px', // Increase font size
                        padding: '10px', // Optional: add padding for a better look
                    },
                    duration: 2, // Optional: duration in seconds
                });
            }
        }
    };


    return (
      <div className="flex justify-center p-10 bg-gray-100 min-h-screen bg-gradient-to-tr from-[#b3ff00] to-[#4949e9]">
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
                <button
                  type="button"
                  className="bg-[#4949e9] px-4 py-2 rounded-md font-medium text-[#b3ff00] hover:bg-[#b3ff00] hover:text-[#4949e9] font-avantgarde"
                >
                  Profile
                </button>

                <button
                  type="button"
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
                    disabled={!isEditing}
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
                  />
                </Form.Item>
                <Divider />

                {/* Gender */}
                <Form.Item
                  label="Gender"
                  name="Gender"
                  rules={[
                    { required: true, message: "Please enter your gender" },
                  ]}
                  className="font-medium font-avantgard"
                >
                  <Input
                    className="border border-[#4949e9]"
                    disabled={!isEditing}
                  />
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
                    format={dateFormat}
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
                  <Input className="border border-[#4949e9]" disabled={true} />
                </Form.Item>
                <Divider />

                {/* Date Joined */}
                <Form.Item
                  label="Date Joined"
                  name="DateJoined"
                  className="font-medium font-avantgard"
                >
                  <DatePicker
                    format={dateFormat}
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
                        Save profile
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