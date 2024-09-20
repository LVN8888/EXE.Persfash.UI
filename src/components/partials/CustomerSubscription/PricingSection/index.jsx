import React from "react";
import { FaCheck } from "react-icons/fa6";
import { toast } from "react-toastify";

export default function PricingSection() {
  return (
    <div className="w-full pt-0 pb-32 px-4 bg-white">
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8">
        {/* Basic Plan */}
        <div className="w-full flex flex-col justify-between p-5 h-full border border-gray-300 rounded-lg text-center shadow-lg shadow-[#4949e9] text-[#4949e9] hover:scale-105 duration-300">
          <h2 className="text-2xl font-bold mb-2">Free</h2>
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
          <div className="my-6"></div>
        </div>

        {/* Premium Plan */}
        <div className="w-full flex flex-col justify-between p-5 h-full border border-gray-300 rounded-lg text-center bg-gray-100 shadow-lg shadow-[#4949e9] text-[#4949e9] hover:scale-105 duration-300">
          <h2 className="text-2xl font-bold mb-2">Premium</h2>
          <p className="text-center text-3xl font-bold">49.000 VND/month</p>
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
          <button className="bg-[#B3FF00] text-[#4949e9] w-[200px] rounded-full font-medium my-6 px-6 mx-auto py-3" onClick={() => {
            toast.success("Chuyển trang sang review plan trước")
          }}>
            Upgrade
          </button>
        </div>

        {/* Growth Plan */}
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
