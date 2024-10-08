import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { toast } from "react-toastify";
import { useAuth } from "../../../../hooks/useAuth";
import { viewSubscription } from "../../../../services/SubscriptionApi";
import { viewCurrentUserInfo } from "../../../../services/CustomerApi";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

export default function PricingSection() {

  const {user} = useAuth();
  const [subscriptions, setSubscriptions] = useState([]);
  const [customerSubscriptions, setCustomerSubscriptions] = useState([]);
  const navigate = useNavigate();

  const fetchSubsctiption = async () => {
    try {
      const response = await viewSubscription(1, 10);
      // console.log(response.data);
      setSubscriptions(response.data);
    
    }catch {
      console.error("Error fetching subscriptions:", error);
    }
  }

  const fetchCustomerInfo = async () => {
    try {
      const response = await viewCurrentUserInfo();

      // console.log(response.data.subscription);

      setCustomerSubscriptions(response.data.subscription);
    
    }catch(error) {
      console.log("Error fetching user info", error);
    }
  }

  useEffect(() => {
    fetchSubsctiption();
    fetchCustomerInfo();
  }, [])

  const customerHasSubscription = (subscriptionTitle) => {
    return customerSubscriptions.some(
      (subscription) => subscription === subscriptionTitle
    );
  };

  const handleUpgradeClick = (subscriptionId) => {
    console.log(subscriptionId);
    
    message.success({
      content: "View details plan successfully!",
      style: {
          marginTop: '10px',
          fontSize: '20px', 
          padding: '10px',
          position: 'absolute',
          right: '10px'
      },
      duration: 2, // Optional: duration in seconds
  });    

     navigate(`/payment/payment-review/${subscriptionId}`)
  }

  const renderSubscription = (subscription) => {
    const { subscriptionId, subscriptionTitle, price, description } = subscription;
    const isOwned = customerHasSubscription(subscriptionTitle);

    return (
      <div
        key={subscriptionId}
        className="w-full flex flex-col justify-between p-5 h-full border border-gray-300 rounded-lg text-center shadow-lg shadow-[#4949e9] text-[#4949e9] hover:scale-105 duration-300 dark:text-white"
      >
        <h2 className="text-2xl font-bold mb-2">{subscriptionTitle}</h2>
        {price ? (<p className="text-center text-3xl font-bold">{new Intl.NumberFormat('vi-VN').format(price)} VND/month</p>) : null}
        <div className="text-left font-medium">
          {description.map((desc, idx) => (
            <p key={idx} className="py-2 border-b mx-8 flex items-center">
              <FaCheck className="mr-2" /> {desc}
            </p>
          ))}
        </div>
        {subscriptionTitle === "Premium" ? (
          isOwned ? (
            <button className="bg-[#B3FF00] text-[#4949e9] w-[200px] rounded-full font-medium my-6 px-6 mx-auto py-3">Subscribed</button>
          ) : (
            <button
              className="bg-[#B3FF00] text-[#4949e9] w-[200px] rounded-full font-medium my-6 px-6 mx-auto py-3"
              onClick={() => {
                handleUpgradeClick(subscriptionId)
                // Redirect to payment page or handle upgrade logic
              }}
            >
              Upgrade Now
            </button>
          )
        ) :  <div className="my-6"></div>} {/* Render nothing for non-Premium subscriptions */}
      </div>
    );
  }

  return (
    <div className="w-full pt-8 pb-32 px-4 bg-white dark:bg-gradient-to-br from-[#4949e9] to-[#7979c9]">
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8">
        {subscriptions.map(renderSubscription)}

        <div className="relative w-full flex flex-col justify-between p-5 h-full border border-gray-300 rounded-lg text-center shadow-lg shadow-[#4949e9] text-[#4949e9] hover:scale-105 duration-300">
          {/* Overlay for 'Coming Soon' */}
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-lg">
            <h3 className="text-4xl font-bold text-white">Coming Soon</h3>
          </div>
          

          {/* Card content */}
          <div className="blur-sm ">
          <h2 className="text-2xl font-bold mb-2">Course</h2>
          <p className="text-center text-3xl font-bold">$x.xxx.000 VND/month</p>
          <div className="text-left font-medium">
            <p className="py-2 border-b mx-8 mt-8 flex items-center">
              <FaCheck className="mr-2" /> 25 products
            </p>
            <p className="py-2 border-b mx-8 flex items-center">
              <FaCheck className="mr-2" /> Up to 10,000 subscribers
            </p>
            <p className="py-2 border-b mx-8 flex items-center">
              <FaCheck className="mr-2" /> Advanced analytics
            </p>
            <p className="py-2 border-b mx-8 flex items-center">
              <FaCheck className="mr-2" /> 24-hour support response time
            </p>
            <p className="py-2 border-b mx-8 flex items-center">
              <FaCheck className="mr-2" /> Marketing automations
            </p>
          </div>
          <button className="bg-[#B3FF00] text-[#4949e9] w-[200px] rounded-full font-medium my-6 px-6 mx-auto py-3">
            Upgrade
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}
