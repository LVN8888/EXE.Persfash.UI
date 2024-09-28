import React, { useState } from "react";
import { Form, Input, Button, message, Row, Col } from "antd";
import { MailOutlined } from "@ant-design/icons";
import bg from '../../../../assets/img/bg.png'
import { Navigate, useNavigate } from "react-router-dom";
import { forgotPassword } from "../../../../services/PasswordApi";

export const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form submission
  const onFinish = async (values) => {
    setLoading(true);

    console.log(values.email);

    try {
      const response = await forgotPassword(values.email);

      console.log(response);

      setTimeout(() => {
        setLoading(false);
        message.success("Password reset email sent!");
        navigate("/password/reset-password", {state: {email: values.email}})
      }, 2000);

    } catch (error) {
      setLoading(false);
      if (error.response) {
        // Log the response data to see the error message
        console.error("Login failed log:", error.response.data);
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
        console.error("Login failed log: ", error);
      }
    }
  };

  return (
    <div className="min-h-screen flex">


<div
        className="hidden lg:flex w-1/2 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover", // Adjust the size to prevent overflow
        }}
      >
        <div className="flex items-center justify-center w-full h-full bg-black bg-opacity-10">
          <h2 className="text-white text-4xl font-bold text-center">
            Support
            <br />
          </h2>
        </div>
      </div>

      <div className="flex min-h-screen flex-1 flex-col justify-center items-center h-screen bg-gradient-to-r from-white to-[#4949e9]">
        <div className="bg-white p-8 rounded-md shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold text-center mb-4 text-[#4949e9]">
            Forgot Password
          </h2>
          <p className="text-center text-[#4949e9] mb-8">
            Enter your email address to receive a password OTP code
          </p>

          <Form
            name="forgot_password"
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              name="email"
              label="Email"
              className="font-medium"
              rules={[
                {
                  required: true,
                  message: "Please input your email address!",
                },
                {
                  type: "email",
                  message: "Please enter a valid email address!",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>

            <Form.Item>
              <button
                htmlType="submit"
                loading={loading}
                className="w-full bg-[#4949e9] px-1 py-2 rounded-md font-medium text-[#b3ff00] hover:bg-[#b3ff00] hover:text-[#4949e9] font-avantgarde"
              >
                {loading ? 'Sending Reset Link...' : 'Send Reset Link'}
              </button>
            </Form.Item>


            <Form.Item>
            <button onClick={() => (window.location.href = "/login-form")}
                className="w-full bg-[#4949e9] px-1 py-2 rounded-md font-medium text-[#b3ff00] hover:bg-[#b3ff00] hover:text-[#4949e9] font-avantgarde"
              >
                Back
              </button>
            </Form.Item>

          </Form>

        </div>
      </div>
    </div>
  );
};
