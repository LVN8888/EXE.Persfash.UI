import React, { useEffect, useState } from "react";
import { Result, Button } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import logo from "../../../../assets/icon/perfash.png";
import styles from '../../Payment/PaymentSuccess/style.module.scss'
import { viewPaymentResult } from "../../../../services/PayOSApi";
import { UpdatePaymentSubscriptionStatus } from "../../../../services/PaymentApi";

const PaymentSuccess = () => {

  const [orderResult, setOrderResult] = useState({});

  const queryParams = new URLSearchParams(window.location.search);
  const orderCode = queryParams.get("orderCode");

  const fetchOrderDetails = async (orderCode) => {
    try {
      const response = await viewPaymentResult(orderCode);

      console.log(response.data);

      setOrderResult(response.data)

      const currStatus = response.data.status === "PAID" ? "Paid" : "Unpaid"

      handleUpdateStatusOfPayment(orderCode, currStatus);
      
    }catch(error){
      console.log("Failed to load order details information", error);
    }
   }

   const handleUpdateStatusOfPayment = async (paymentId, paymentStatus) => {
    try {
      const response = UpdatePaymentSubscriptionStatus(paymentId, paymentStatus);

    }catch(error) {
      console.log("Fail to update payment status", error);
    }
   }

   useEffect(() => {
    if (orderCode) {
      fetchOrderDetails(orderCode);
    }
   }, [orderCode])

   console.log(orderResult);

   const { status, amount, transactions } = orderResult;
   const isPaid = status === "PAID";

   return (
    <div className="min-h-screen bg-gradient-to-r from-white to-[#4949e9] flex justify-center items-center">
      <div className="flex flex-col md:flex-row justify-center items-center space-y-10 md:space-y-0 md:space-x-16 p-6 md:p-10 max-w-7xl w-full">
        {/* Left side - Form */}
        <div className="w-full md:w-1/2 bg-white shadow-lg rounded-lg">
          {/* Header - Logo */}
          <header className="text-left mb-10 bg-gradient-to-l from-white to-[#4949e9] p-4 rounded-sm rounded-t-lg">
            <div className="flex items-center">
              <div className={styles.logo}>
                <img src={logo} alt="persfash logo" />
              </div>
              <span className="text-3xl md:text-5xl font-light text-[#4949e9] ml-10 md:ml-56">
                Receiptify
              </span>
            </div>
          </header>
  
          {/* Styled Payment Details */}
          <div className="my-6 p-6 md:p-8 bg-white">
            <h3 className="text-xl md:text-2xl font-semibold mb-4 text-blue-700">
              Payment information:
            </h3>
            <ul className="space-y-5">
              <li className="flex flex-wrap items-center">
                <span className="font-medium mr-4">Payment Status:</span>
                <span className={`text-lg font-bold ${isPaid ? 'text-green-600' : 'text-red-600'}`}>
                  {isPaid ? "Successful" : "Cancelled"}
                </span>
              </li>
              {isPaid && transactions.length > 0 && (
                <>
                  <li className="flex flex-wrap items-center">
                    <span className="font-medium mr-4">Bank:</span>
                    <span className="text-lg">{transactions[0].counterAccountBankName || "Unknown Bank"}</span>
                  </li>
                  <li className="flex flex-wrap items-center">
                    <span className="font-medium mr-4">Bank Transaction ID:</span>
                    <span className="text-lg">{transactions[0].reference}</span>
                  </li>
                  <li className="flex flex-wrap items-center">
                    <span className="font-medium mr-4">Account Number:</span>
                    <span className="text-lg">{transactions[0].counterAccountNumber}</span>
                  </li>
                </>
              )}
              <li className="flex flex-wrap items-center">
                <span className="font-medium mr-4">Order Information:</span>
                <span className="text-lg">{orderCode}</span>
              </li>
              <li className="flex flex-wrap items-center">
                <span className="font-medium mr-4">Amount:</span>
                <span className="text-lg text-blue-700 font-bold">
                  {amount ? amount : 49000} VND
                </span>
              </li>
              {isPaid && transactions.length > 0 && (
                <li className="flex flex-wrap items-center">
                  <span className="font-medium mr-4">Payment Date:</span>
                  <span className="text-lg">
                    {new Date(transactions[0].transactionDateTime).toLocaleDateString()}
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>
  
        {/* Right side - Thank You Message */}
        <div className="w-full md:w-1/2 text-left">
          <p className="text-3xl md:text-5xl font-medium text-[#b3ff00] mb-4">
            {isPaid ? "Thank you for your purchase!" : "Your order was cancelled."}
          </p>
  
          {isPaid && (
            <p className="text-3xl md:text-5xl font-medium text-[#b3ff00] mb-4">
              Enjoy your Persfash subscription.
            </p>
          )}
  
          <button
            type="button"
            className="bg-[#b3ff00] hover:bg-[#4949e9] hover:text-[#b3ff00] text-[#4949e9] py-2 md:py-3 px-8 md:px-12 mt-4 rounded-full font-medium text-lg"
            onClick={() => (window.location.href = "/home")}
          >
            {isPaid ? "Start PersFash Premium" : "Return Home"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
