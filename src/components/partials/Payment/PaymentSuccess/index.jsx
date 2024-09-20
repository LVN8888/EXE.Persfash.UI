import React from "react";
import { Result, Button } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import logo from "../../../../assets/icon/perfash.png";
import styles from '../../Payment/PaymentSuccess/style.module.scss'

const PaymentSuccess = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-white to-[#4949e9] flex justify-center items-center">
      {/* Container for form and thank you message */}
      <div className="flex flex-row justify-center items-center space-x-16 p-10 max-w-7xl w-full">
        {/* Left side - Form */}
        <div className="w-1/2 bg-white shadow-lg rounded-lg ">
          {/* Header - Logo G Receiptify */}
          <header className="text-left mb-10 bg-gradient-to-l from-white to-[#4949e9] p-4 rounded-sm rounded-t-lg">
            <div className="flex items-center">
              <div className={styles.logo}>
                <img src={logo} alt="persfash logo" />
              </div>
              <span className="text-5xl font-light text-[#4949e9] ml-56">
                Receiptify
              </span>
            </div>
          </header>

          {/* Styled Payment Details */}
          <div className="my-6 p-8 bg-white">
            <h3 className="text-2xl font-semibold mb-4 text-blue-700">
              Payment information:
            </h3>
            <ul className="space-y-5">
              <li className="flex items-center">
                <span className="font-medium mr-4">Payment Status:</span>
                <span className="text-lg text-green-600 font-bold">
                  Successful
                </span>
              </li>
              <li className="flex items-center">
                <span className="font-medium mr-4">Bank:</span>
                <span className="text-lg">ABC Bank</span>
              </li>
              <li className="flex items-center">
                <span className="font-medium mr-4">Bank Transaction ID:</span>
                <span className="text-lg">123456789</span>
              </li>
              <li className="flex items-center">
                <span className="font-medium mr-4">Card Type:</span>
                <span className="text-lg">Credit Card</span>
              </li>
              <li className="flex items-center">
                <span className="font-medium mr-4">Order Information:</span>
                <span className="text-lg">ABC123XYZ</span>
              </li>
              <li className="flex items-center">
                <span className="font-medium mr-4">Amount:</span>
                <span className="text-lg text-blue-700 font-bold">
                  2,000,000 VND
                </span>
              </li>
              <li className="flex items-center">
                <span className="font-medium mr-4">Payment Date:</span>
                <span className="text-lg">20th Sep 2024</span>
              </li>
              <li className="flex items-center">
                <span className="font-medium mr-4">
                  Transaction Response Code:
                </span>
                <span className="text-lg">987654321</span>
              </li>
              <li className="flex items-center">
                <span className="font-medium mr-4">Merchant ID:</span>
                <span className="text-lg">00112233</span>
              </li>
              <li className="flex items-center">
                <span className="font-medium mr-4">Transaction ID:</span>
                <span className="text-lg">2023092001</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right side - Thank You Message */}
        <div className="w-1/2 text-left">
          {/* Thank You Message */}
          <p className="text-5xl font-medium text-[#b3ff00] mb-4">Thank you</p>

          <p className="text-5xl font-medium text-[#b3ff00] mb-4">
            for Purchasing
          </p>

          <p className="text-5xl font-medium text-[#b3ff00] mb-4">
            Persfash subscription
          </p>

          {/* Button below the p tag */}
          <button
            type="primary"
            className="bg-[#b3ff00] hover:bg-[#4949e9] hover:text-[#b3ff00] text-[#4949e9] py-3 px-12 mt-4 rounded-full font-medium text-lg"
            onClick={() => (window.location.href = "/home")}
          >
            Start PersFash Premium
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
