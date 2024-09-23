import React from 'react';
import { Form, Input, Button } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ onLogin }) => {
  const onFinish = (values) => {
    if (values.username === 'admin' && values.password === 'admin') {
      toast.success('Login successful!');
      onLogin();
    } else {
      toast.error('Login failed! Invalid credentials.');
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="p-8 bg-white shadow-lg rounded-lg max-w-md w-full">
        <h1 className="text-center text-3xl font-bold mb-6 text-blue-600">Admin Login</h1>
        <Form
          name="login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button w-full"
              size="large"
              style={{ backgroundColor: '#4949E9', borderColor: '#4949E9' }}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
      {/* Toast container nằm góc phải trên cùng */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Login;
