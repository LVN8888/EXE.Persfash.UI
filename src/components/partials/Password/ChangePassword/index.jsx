import { Button, Form, Input, notification, Row, Col, message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../../../services/PasswordApi";

export const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();

  const [form] = Form.useForm();

  const handleChangePassword = async () => {


    // const api = await changePassword(oldPassword, newPassword);
    const data = {
      oldPassword,
      newPassword,
    };

    console.log(data);
    

    try {
      const response = await changePassword(data.oldPassword, data.newPassword);

      console.log(response);

      message.success({
        content: "Change password successfully!",
        style: {
          marginTop: "10px", // Space above the message
          fontSize: "18px", // Increase font size
          padding: "10px", // Optional: add padding for a better look
        },
        duration: 2, // Optional: duration in seconds
      });

      navigate("/customer/customer-info")
      
    } catch (error) {
        if (error.response) {
            // Log the response data to see the error message
            console.error("Change password failed log:", error.response.data);
            message.error({
              content: error.response.data.message,
              style: {
                marginTop: "10px", // Space above the message
                fontSize: "18px", // Increase font size
                padding: "10px", // Optional: add padding for a better look
              },
              duration: 2, // Optional: duration in seconds
            });
          } else {
            message.error({
              content: "Error occurred",
              style: {
                marginTop: "10px", // Space above the message
                fontSize: "18px", // Increase font size
                padding: "10px", // Optional: add padding for a better look
              },
              duration: 2, // Optional: duration in seconds
            });
            console.error("Change password failed log: ", error);
          }
    }
  };

  return (
      <div className="flex min-h-screen flex-1 flex-col justify-center items-center h-screen bg-gradient-to-r from-white to-[#4949e9]">
        <div className="bg-white p-8 rounded-md shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold text-center mb-4 text-[#4949e9]">
            Change Password
          </h2>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleChangePassword}
            className="space-y-6"
          >
            <Form.Item
              label="Old Password"
              name="oldPassword"
              className="font-medium"
              rules={[{ required: true, message: "Please input your old password!" }]}
            >
              <Input.Password
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Enter old password"
              />
            </Form.Item>

            <Form.Item
              label="New Password"
              name="newPassword"
              className="font-medium"
              rules={[
                { required: true, message: "Password is required!" },
                {
                  pattern:
                    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,12}$/,
                  message:
                    "Password must be 6-12 characters with at least one uppercase letter, one number, and one special character (!@#$%^&*).",
                },
              ]}
            >
              <Input.Password
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </Form.Item>

            <Form.Item>
              <button
                type="primary"
                htmlType="submit"
                className="w-full bg-[#4949e9] px-1 py-2 rounded-md font-medium text-[#b3ff00] hover:bg-[#b3ff00] hover:text-[#4949e9] font-avantgarde"
              >
                Change Password
              </button>
            </Form.Item>

            <Form.Item>
              <button
                type="primary"
                htmlType="submit"
                onClick={() => navigate("/customer/customer-info")}
                className="w-full bg-[#4949e9] px-1 py-2 rounded-md font-medium text-[#b3ff00] hover:bg-[#b3ff00] hover:text-[#4949e9] font-avantgarde"
              >
                Back
              </button>
            </Form.Item>
          </Form>
        </div>
      </div>
  );
};
