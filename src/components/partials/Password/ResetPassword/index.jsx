import { Button, Form, Input, notification, Row, Col, message } from "antd";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import bg from "../../../../assets/img/bg.png";
import { forgotPassword, resetPassword } from "../../../../services/PasswordApi";

export const ResetPassword = () => {
  const location = useLocation();
  const { email } = location.state || {};
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [timeLeft, setTimeLeft] = useState(120);

  const navigate = useNavigate();

  const [form] = Form.useForm();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          setIsButtonDisabled(false); // Enable button after countdown
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [timeLeft]); // Add timeLeft as a dependency

  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handleChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to the next input when a digit is entered
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }

    // Move to the previous input when the backspace is pressed
    if (!value && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      notification.error({
        message: "Error",
        description: "Passwords do not match!",
        placement: "top",
        duration: 2.5,
      });
      return;
    }
   
    const currOTP = otp.join("");

    console.log(otp.join(""));
    
    try {
      const response = await resetPassword(currOTP, newPassword, confirmPassword, email);

      console.log(response);
      
      setTimeout(() => {
        message.success({
          content: "Reset password successfully!",
          style: {
              marginTop: '10px', // Space above the message
              fontSize: '18px', // Increase font size
              padding: '10px', // Optional: add padding for a better look
          },
          duration: 2, // Optional: duration in seconds
      });
        navigate("/login-form")
      }, 2000);

    } catch (error) {
      if (error.response) {
        // Log the response data to see the error message
        console.error("Reset password failed log:", error.response.data);
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
        console.error("Reset password failed log: ", error);
      }
    }
  };

  const resendOtp = async () => {
    // Logic to resend the OTP
    try {
      const response = await forgotPassword(email);

      console.log(response);

      setTimeout(() => {
        message.success("Resent reset email successfully!");
        navigate("/password/reset-password", {state: {email: values.email}})
      }, 2000);

    } catch (error) {
      if (error.response) {
        // Log the response data to see the error message
        console.error("Login failed log:", error.response.data);
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
        console.error("Login failed log: ", error);
      }
    }

    setIsButtonDisabled(true); // Disable the button again
    setTimeLeft(120); // Reset timer
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex min-h-screen flex-1 flex-col justify-center items-center h-screen bg-gradient-to-r from-white to-[#4949e9]">
        <div className="bg-white p-8 rounded-md shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold text-center mb-4 text-[#4949e9]">
            Forgot Password
          </h2>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleResetPassword}
            className="space-y-6"
          >
             <Form.Item
      label="OTP Code"
      rules={[{ required: true, message: "Please input the OTP code!" }]}
      className="font-medium "
    >
      <Row gutter={[16, 16]} justify="center">
        {otp.map((code, index) => (
          <Col key={index}>
            <Input
              id={`otp-input-${index}`}
              maxLength={1}
              value={code}
              onChange={(e) => handleChange(index, e.target.value)}
              className="text-center border border-gray-300 rounded-lg transition duration-300 ease-in-out focus:border-blue-500 focus:ring-2 focus:ring-blue-500 w-12 font-avantgarde"
              style={{
                width: '50px',
                height: '50px',
                fontSize: '24px',
                backgroundColor: '#f9f9f9',
              }}
            />
          </Col>
        ))}
      </Row>
    </Form.Item>

            <Form.Item
              label="New Password"
              name="newPassword"
              className="font-medium "
              rules={[
                { required: true, message: "Please input your new password!" },
              ]}
            >
              <Input.Password
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              className="font-medium "
              rules={[
                { required: true, message: "Please confirm your password!" },
              ]}
            >
              <Input.Password
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
              />
            </Form.Item>

            <Form.Item>
              <button
                type="primary"
                htmlType="submit"
                className="w-full bg-[#4949e9] px-1 py-2 rounded-md font-medium text-[#b3ff00] hover:bg-[#b3ff00] hover:text-[#4949e9] font-avantgarde"
              >
                Reset Password
              </button>
            </Form.Item>

            <Form.Item>
              <button
                type="button" // Use "button" instead of "default" for button type
                onClick={resendOtp}
                disabled={isButtonDisabled}
                className={`w-full px-1 py-2 rounded-md font-medium ${
                  isButtonDisabled
                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                    : "bg-[#4949e9] text-[#b3ff00] hover:bg-[#b3ff00] hover:text-[#4949e9] font-avantgarde"
                }`}
              >
                Resend OTP
              </button>
              {isButtonDisabled && (
                <p className="text-center mt-4 font-avantgarde">
                  Please wait {timeLeft}s before resending the OTP.
                </p>
              )}
            </Form.Item>

            <Form.Item>
              <button
                type="primary"
                htmlType="submit"
                onClick={() =>
                  (window.location.href = "/password/forgot-password")
                }
                className="w-full bg-[#4949e9] px-1 py-2 rounded-md font-medium text-[#b3ff00] hover:bg-[#b3ff00] hover:text-[#4949e9] font-avantgarde"
              >
                Back
              </button>
            </Form.Item>
          </Form>
        </div>
      </div>

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
    </div>
  );
};
