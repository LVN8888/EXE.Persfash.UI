import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Select, DatePicker, message } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  GoogleOutlined,
} from "@ant-design/icons";

import logo from "../../../assets/icon/perfash.png";
import registerPic from "../../../assets/img/register_pic.png";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import moment from "moment";
import AxiosHelper from "../../../AxiosHelper";
import { useAuth } from "../../../hooks/useAuth";
import { customerRegister } from "../../../services/CustomerApi";
import { LoginGoogle } from "../../../services/LoginApi";

const Register = () => {
  const navigate = useNavigate();

  // State hooks for each form field
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [loading, setLoading] = useState(false);
  const {setUser, setIsAuthenticated } = useAuth();
  const BaseURL = import.meta.env.VITE_SERVER_URL;
  const apiClient = new AxiosHelper(BaseURL);

  const handleLoginClick = () => {
    navigate("/login-form");
  };

  // Function to handle sign-up form submission
  const handleSignUp = async (values) => {
    // const formattedDateOfBirth = dateOfBirth ? dateOfBirth.format('yyyy-MM-dd') : null;

  // Ensure your request matches the API's expected structure
  const requestBody = {
    customerRegisterReqModel: {
      username: values.username,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
      fullName: values.fullName,
      gender: values.gender,
      dateOfBirth: values.dateOfBirth, // Use the formatted date
    }
  };

  console.log(requestBody);
  setLoading(true);
    try {
      // setDateOfBirth(dateOfBirth.format('YYYY-MM-DD').t)
      // const response = await apiClient.post("/customer/register", requestBody.customerRegisterReqModel);

      const response = await customerRegister(requestBody.customerRegisterReqModel.username, requestBody.customerRegisterReqModel.email, requestBody.customerRegisterReqModel.password, 
        requestBody.customerRegisterReqModel.confirmPassword, requestBody.customerRegisterReqModel.fullName,
        requestBody.customerRegisterReqModel.gender,requestBody.customerRegisterReqModel.dateOfBirth);

      setLoading(false);

      console.log(response);

      message.success({
        content: "Register successfully!",
        style: {
          marginTop: '10px',
          fontSize: '20px', 
          padding: '10px',
          position: 'absolute',
          right: '10px'
      },
        duration: 2, // Optional: duration in seconds
      });

      navigate('/login-form')


    } catch (error) {
      if (error.response) {
        // Log the response data to see the error message
        setLoading(false)
        console.error("Register customer failed log:", error.response.data);
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
        console.error("Register customer failed log: ", error);
      }
    }
  };

  // Function to handle Google Sign-Up
  const googleLogin = useGoogleLogin({
    onSuccess: (token) => {
      console.log(token.access_token);

      handleGoogleLogin(token.access_token);
    },
    onError: () => {
      toast({
        title: "Sign In Error",
        description: "Sign in by Google failed. Try again!!!",
        status: "error",
        duration: 2500,
        position: "top",
        isClosable: true,
      });
    },
  });

  const handleGoogleLogin = async (token) => {
    const tokenModel = {
        token
    };

    try {
        // const response = await apiClient.post("/authentication/login-google", tokenModel);

        const response = await LoginGoogle(tokenModel.token);

        console.log(response);
        
        const { isSuccess, data } = response;
        
          const userData = {
            userId: data.userId,
            username: data.username,
            email: data.email,
            role: data.role,
        };

        console.log(userData);
        

        apiClient.setAccessToken(data.token);
        apiClient.setRefreshToken(data.refreshToken);
        setUser(userData);
        setIsAuthenticated(true);

        localStorage.setItem('user', JSON.stringify(userData));

        message.success({
          content: "Login with google successfully!",
          style: {
            marginTop: '10px',
            fontSize: '20px', 
            padding: '10px',
            position: 'absolute',
            right: '10px'
        },
          duration: 2, // Optional: duration in seconds
        });

        console.log(userData.role);
        
          if (userData.role === "Customer") {
            const profileRes = await checkCustomerProfile();
      
            // console.log(profileRes);
      
            if (profileRes.data === true) {
              navigate("/home");
            }else {
              navigate("/profile-setup")
            }
           }else if (userData.role === "Admin") {
            navigate("/admin")
           }

    } catch (error) {
      if (error.response) {
        // Log the response data to see the error message
        console.error("Login google failed log:", error.response.data);
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
        console.error("Login google failed log: ", error);
      }
    }
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
                  <Option value="Others">Others</Option>
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
                <Input
                  type="date"
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
                className="font-avantgarde flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading ? "Signing up..." : "Sign up"}
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
              icon={<FcGoogle />}
              onClick={() => googleLogin()}
              className="font-avantgarde flex w-full justify-center rounded-md bg-white text-[#4949e9] shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
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
              onClick={() => navigate("/login-form")}
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
