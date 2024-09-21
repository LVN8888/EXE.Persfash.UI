import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Divider, Form, Input, Typography, message } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  GoogleOutlined,
} from "@ant-design/icons";
import logo from "../../../../assets/icon/perfash.png";
import loginPic from "../../../../assets/img/login_pic.png";
import { useAuth } from "../../../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";

export default function LoginForm() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, user, isAuthenticated } = useAuth();

  const handleLogin = async (e) => {
    // e.preventDefault();
    setLoading(true);
    try {
      const res = await login(username, password);
      setLoading(false);
      
      if (res.isSuccess === false) {
        toast.error(res.message || "Login failed. Please try again.");
        return;
      }

      message.success({
        content: "Login successfully!",
        style: {
            marginTop: '10px', // Space above the message
            fontSize: '18px', // Increase font size
            padding: '10px', // Optional: add padding for a better look
        },
        duration: 2, // Optional: duration in seconds
    });

      navigate("/home");
    } catch (error) {
      setLoading(false)
      if (error.response) {
        // Log the response data to see the error message
        console.error('Login failed log:', error.response.data);
        message.error({
          content: error.response.data.message,
          style: {
              marginTop: '10px', // Space above the message
              fontSize: '18px', // Increase font size
              padding: '10px', // Optional: add padding for a better look
          },
          duration: 2, // Optional: duration in seconds
      });
        // throw new Error(error.response.data.message || 'Login failed');
    } else {
        console.error('Login failed log:', error);
        throw new Error('Login failed. Please try again.');
    };
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: (token) => {
      console.log(token.access_token);

      // navigate("/home");
      // handleGoogleLogin(token.access_token);
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

  //   const handleGoogleLogin = async (token) => {
  //     const api = new ApiClient<any>('/auth/login-google');
  //     const data = {
  //         token
  //     };

  //     try {
  //         const response = await api.postUnauthen(data);

  //         if (response.success) {
  //             localStorage.setItem('access_token', response.data.token);
  //             localStorage.setItem('refresh_token', response.data.refreshToken);
  //             const decoded = jwtDecode<DecodeJWTRole>(response.data.token);
  //             const decodedRole = formatRoleString(decoded.role[0]);

  //             setIsAuthenticated(true);
  //             setRole(decodedRole);
  //             if (decodedRole === 'Customer') {
  //                 navigate('/');
  //             } else {
  //                 return;
  //             }
  //         } else {
  //             toast({
  //                 title: "Error",
  //                 description: response.message,
  //                 status: "error",
  //                 duration: 2500,
  //                 position: 'top',
  //                 isClosable: true,
  //             });
  //         }
  //     } catch (error) {

  //         if (error instanceof AxiosError) {
  //             toast({
  //                 title: "Error",
  //                 description: error.response?.data?.message || "An error occurred",
  //                 status: "error",
  //                 duration: 2500,
  //                 position: 'top',
  //                 isClosable: true,
  //             });
  //         }
  //     }
  // };

  return (
    <div className="min-h-screen flex">
      {/* Left Section - Login Image */}
      <div
        className="hidden lg:flex w-1/2 bg-cover bg-center"
        style={{
          backgroundImage: `url(${loginPic})`,
          backgroundSize: "contain", // Adjust the size to prevent overflow
        }}
      >
        <div className="flex items-center justify-center w-full h-full bg-black bg-opacity-20">
          <h2 className="text-white text-4xl font-bold text-center">
            Welcome
            <br />
            back
          </h2>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="flex min-h-screen flex-1 flex-col justify-center px-6 pt-24 lg:px-8 bg-white">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img src={logo} alt="persfash-logo" className="mx-auto h-10 w-auto" />
          <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-[#4949e9]">
            Sign in to PersFash
          </h2>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <Form layout="vertical" onFinish={handleLogin} className="space-y-6">
            {/* Username with Validation */}
            <Form.Item
              label="Username"
              name="username"
              className="text-[#4949e9] font-medium"
              rules={[
                { required: true, message: "Please input your username!" },
                {
                  min: 3,
                  message: "Username must be at least 3 characters long!",
                },
              ]}
            >
              <Input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </Form.Item>

            {/* Password with Validation */}
            <Form.Item
              label="Password"
              name="password"
              className="font-medium"
              rules={[
                { required: true, message: "Please input your password!" },
                {
                  min: 3,
                  message: "Password must be at least 3 characters long!",
                },
              ]}
            >
              <Input.Password
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </Form.Item>

            {/* Forgot Password */}
            <div className="flex items-center justify-between">
              <a
                href="#"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
                onClick={() => navigate("/password/forgot-password")}
              >
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <div>
              <Button
                type="primary"
                htmlType="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading ? "Signing in..." : "Sign in"}
              </Button>
            </div>
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

          {/* Google Login Button */}
          <div className="mt-6">
            <Button
              icon={<FcGoogle />}
              onClick={() => googleLogin()}
              className="flex w-full justify-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-[#4949e9] shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Sign in with Google
            </Button>
          </div>

          {/* Sign-up Link */}
          <p className="mt-8 text-center text-sm text-gray-400">
            Don’t have an account?{" "}
            <a
              href="#"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              onClick={() => navigate("/register")}
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
