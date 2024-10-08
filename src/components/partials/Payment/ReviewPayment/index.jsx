import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { Form, Button, message } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { viewDetailsSubscription } from "../../../../services/SubscriptionApi";
import { createPaymentSubscriptionUrl } from "../../../../services/PaymentApi";
import { viewPaymentResult } from "../../../../services/PayOSApi";

const ReviewPayment = () => {

  const {subscriptionId} = useParams();

  const [loading, setLoading] = useState(false);

  const [currSubscription, setCurrSubscription] = useState({});

  const navigate = useNavigate();

  const fetchSubscriptionInformation = async (subscriptionId) => {
     try {
        const response = await viewDetailsSubscription(subscriptionId);

        console.log(response.data);

        setCurrSubscription(response.data);
        
     }catch(error) {
      console.log("Failed to load subscription information", error);
     }
  }

  useEffect(() => {
    fetchSubscriptionInformation(subscriptionId);
  }, [])

    const handleSubmit = async () => {
        // Handle form submission logic here
        setLoading(true)
        try {
          const response = await createPaymentSubscriptionUrl(subscriptionId, "https://persfash.store/payment/payment-success")

          // console.log(response);

          window.location.href = response.paymentUrl;

          setLoading(false);
          
        }catch(error) {
          setLoading(false)
          console.log("Failed to update wardrobe ", error);
         message.error({
        content: error.response.data.message,
        style: {
          marginTop: '10px',
          fontSize: '16px',   // Slightly smaller font size for better readability
          backgroundColor: '#fff3f3', // Light background color for better visibility
          position: 'absolute',
          right: '10px',
          whiteSpace: 'pre-line', // Allow line breaks in the message
        },
        duration: 2,
    });
        }
      };

    const handleCancel = () => {
      navigate("/plan")
    }

      return (
        <div className="min-h-screen bg-gradient-to-r from-[#4949e9] to-white flex flex-col items-center justify-center dark:bg-gradient-to-tr dark:from-[#4949e9] dark:to-[#7979c9]">
          {/* Review Your Plan Heading */}
          <div className="mb-6 text-center">
            <h1 className="text-4xl font-bold text-[#4949e9] dark:text-white">
              Review Your Plan
            </h1>
          </div>

          {/* Subscription Form */}
          <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg flex flex-col">
            {/* Form Header */}
            <h2 className="text-3xl font-medium mb-4 text-[#4949e9] text-left bg-[#b3ff00] p-6 rounded-sm rounded-t-lg">
              Start PersFash <br />
              {currSubscription.subscriptionTitle}
            </h2>

            <div className="flex justify-between">
              {/* Left Section: Subscription Details */}
              <div className="w-1/2 p-6">
                {/* Subscription Plan Title */}

                <div className="bg-gray-100 p-4 rounded-md">
                  <h3 className="font-semibold text-gray-800">Title Plan:</h3>
                  <p className="text-lg font-medium text-gray-800">
                    {currSubscription.subscriptionTitle} Plan
                  </p>
                </div>

                <div className="bg-gray-100 p-4 rounded-md">
                  <h3 className="font-semibold text-gray-800">Price:</h3>
                  <p className="text-lg font-medium text-gray-800">
                    {currSubscription.price ? new Intl.NumberFormat('vi-VN').format(currSubscription.price) : null} VND/ month
                  </p>
                </div>

                <div className="bg-gray-100 p-4 rounded-md">
                  <h3 className="font-semibold text-gray-800">Date:</h3>
                  <p className="text-lg font-medium text-gray-800">
                    {getFormattedDate()}
                  </p>
                </div>
              </div>

              {/* Right Section: Feature Details */}
              <div className="w-1/2 p-6">
                {/* Feature Details */}
                <div className="bg-gray-100 p-4 rounded-md">
                  <h3 className="font-semibold text-gray-800">
                    Features of the {currSubscription.subscriptionTitle} Plan:
                  </h3>
                  <ul className="list-disc list-inside text-gray-800 mt-2">
                    {currSubscription.description ? currSubscription.description.map((desc, idx) => (
                      <li key={idx}>{desc}</li>
                    )) : null}
                  </ul>
                </div>
              </div>
            </div>

            {/* Confirm Button */}
            <div className="flex justify-end pb-6">
              <button
                className="bg-[#b3ff00] mr-2 hover:bg-blue-600 hover:text-[#b3ff00] text-[#4949e9] rounded-md p-3 font-medium"
                onClick={handleCancel}
              >
                Cancel
              </button>

              <button
                disabled = {loading}
                className="bg-[#b3ff00] mr-6 hover:bg-blue-600 hover:text-[#b3ff00] text-[#4949e9] rounded-md p-3 font-medium"
                onClick={() => handleSubmit()}
              >
                {loading ? "Proceeding..." : "Confirm and Proceed"}
              </button>
            </div>
          </div>
        </div>
      );
}

const getFormattedDate = () => {
  const date = new Date(); // Get the current date

  // Define month names
  const monthNames = [
    "January", "February", "March", "April", "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];

  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  // Function to add ordinal suffix to day
  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return "th"; // Applies to 11th - 19th
    switch (day % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  };

  const dayWithSuffix = `${day}${getOrdinalSuffix(day)}`;

  return `${month} ${dayWithSuffix}, ${year}`;
};

export default ReviewPayment