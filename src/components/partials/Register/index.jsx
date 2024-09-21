import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Select, DatePicker } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone, GoogleOutlined } from '@ant-design/icons';

import logo from '../../../assets/icon/perfash.png'
import registerPic from "../../../assets/img/register_pic.png";


const Register = () => {
  const navigate = useNavigate();

  // State hooks for each form field
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(null);

  const handleLoginClick = () => {
    navigate("/login-form");
  };

  // Function to handle sign-up form submission
  const handleSignUp = (values) => {
    console.log('Sign-up values:', values);
  };

  // Function to handle Google Sign-Up
  const googleSignUp = () => {
  };

  return (
    <div className="min-h-screen flex">


<div
        className="hidden lg:flex w-1/2 bg-cover bg-center"
        style={{
          backgroundImage: `url(${registerPic})`,
          backgroundSize: "contain", // Adjust the size to prevent overflow
        }}
      >
        <div className="flex items-center justify-center w-full h-full bg-black bg-opacity-10">
          <h2 className="text-white text-4xl font-bold text-center">
            Become a
            <br />
            member now
          </h2>
        </div>
      </div>

      <div className="flex min-h-screen flex-1 flex-col justify-center px-6 pt-24 lg:px-8 bg-white">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img src={logo} alt="persfash-logo" className="mx-auto h-10 w-auto" />
          <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-[#4949e9]">
            Sign up for PersFash
          </h2>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-md">
          <Form
            layout="vertical" // Changed to vertical layout for better responsiveness
            onFinish={handleSignUp}
            className="space-y-4"
          >
            {/* Full Name */}
            <Form.Item
              label="Full Name"
              name="fullName"
              className="font-medium"
              rules={[{ required: true, message: "Full name is required!" }]}
            >
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
              />
            </Form.Item>

            {/* Two-column section for Username and Email */}
            <div className="flex space-x-4">
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  { required: true, message: "Username is required!" },
                  {
                    max: 25,
                    message: "Username must be maximum 25 characters!",
                  },
                ]}
                className="w-1/2 font-medium" // Adjust the width to half
              >
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Email is required!" },
                  { type: "email", message: "Invalid email address format!" },
                ]}
                className="w-1/2 font-medium" // Adjust the width to half
              >
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
              </Form.Item>
            </div>

            {/* Two-column section for Password and Confirm Password */}
            <div className="flex space-x-4">
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Password is required!" },
                  {
                    pattern:
                      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,12}$/,
                    message:
                      "Password must be 6-12 characters with at least one uppercase letter, one number, and one special character (!@#$%^&*).",
                  },
                ]}
                className="w-1/2 font-medium" // Adjust the width to half
              >
                <Input.Password
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </Form.Item>

              <Form.Item
                label="Confirm Password"
                name="confirmPassword"
                rules={[
                  { required: true, message: "Confirm Password is required!" },
                  {
                    validator: (_, value) =>
                      value === password
                        ? Promise.resolve()
                        : Promise.reject("Passwords do not match!"),
                  },
                ]}
                className="w-1/2 font-medium" // Adjust the width to half
              >
                <Input.Password
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                />
              </Form.Item>
            </div>

            {/* Two-column section for Gender and Date of Birth */}
            <div className="flex space-x-4">
              <Form.Item
                label="Gender"
                name="gender"
                rules={[{ required: true, message: "Gender is required!" }]}
                className="w-1/2 font-medium" // Adjust the width to half
              >
                <Select
                  value={gender}
                  onChange={(value) => setGender(value)}
                  placeholder="Select Gender"
                >
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                  <Option value="Other">Other</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Date of Birth"
                name="dateOfBirth"
                rules={[
                  { required: true, message: "Date of birth is required!" },
                ]}
                className="w-1/2 font-medium" // Adjust the width to half
              >
                <DatePicker
                  value={dateOfBirth}
                  onChange={(date) => setDateOfBirth(date)}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </div>

            {/* Sign Up Button */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-[#4949e9]"
              >
                Sign up
              </Button>
            </Form.Item>
          </Form>

          {/* Divider */}
          <div className="relative mt-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-1 text-gray-500">or</span>
            </div>
          </div>

          {/* Google Sign Up Button */}
          <div className="mt-6">
            <Button
              icon={<GoogleOutlined />}
              onClick={googleSignUp}
              className="flex w-full justify-center rounded-md bg-white text-[#4949e9] shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Sign up with Google
            </Button>
          </div>

          {/* Sign-in Link */}
          <p className="mt-8 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <a
              href="#"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              onClick={() => navigate("/login")}
            >
              Sign in
            </a>
          </p>
        </div>
      </div>

      
    </div>
  );
};

export default Register;
