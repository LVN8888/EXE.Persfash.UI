import { toast } from "react-toastify";
import React from "react";
import { Form, Button } from "antd";
import { SmileOutlined } from "@ant-design/icons";

const ReviewPayment = () => {

    const handleSubmit = () => {
        // Handle form submission logic here
        toast.success("Chuyển sang trang thanh toán");
      };

      return (
        <div className="min-h-screen bg-gradient-to-r from-[#4949e9] to-white flex flex-col items-center justify-start pt-36">
          {/* Review Your Plan Heading */}
          <div className="mb-6 text-center">
            <h1 className="text-4xl font-bold text-[#4949e9]">
              Review Your Plan
            </h1>
          </div>
    
          {/* Subscription Form */}
          <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg flex flex-col">
            {/* Form Header */}
            <h2 className="text-3xl font-medium mb-4 text-[#4949e9] text-left bg-[#b3ff00] p-6 rounded-sm rounded-t-lg">
              Start PersFash <br />
              Subscription Name
            </h2>
            
    
            <div className="flex justify-between">
              {/* Left Section: Subscription Details */}
              <div className="w-1/2 p-6">
                {/* Subscription Plan Title */}

                <div className="bg-gray-100 p-4 rounded-md">
                  <h3 className="font-semibold text-gray-800">Title Plan:</h3>
                  <p className="text-lg font-medium text-gray-800">
                        Premium Plan
                      </p>
                </div>

                <div className="bg-gray-100 p-4 rounded-md">
                <h3 className="font-semibold text-gray-800">Price:</h3>
                  <p className="text-lg font-medium text-gray-800">
                  49.000 VND/ month
                      </p>
                </div>

                <div className="bg-gray-100 p-4 rounded-md">
                <h3 className="font-semibold text-gray-800">Date:</h3>
                  <p className="text-lg font-medium text-gray-800">
                    September 20th, 2024
                  </p>
                </div>

              </div>
    
              {/* Right Section: Feature Details */}
              <div className="w-1/2 p-6">
                {/* Feature Details */}
                <div className="bg-gray-100 p-4 rounded-md">
                  <h3 className="font-semibold text-gray-800">Features of the Premium Plan:</h3>
                  <ul className="list-disc list-inside text-gray-800 mt-2">
                    <li>Unlimited AI fashion consultation</li>
                    <li>Exclusive wardrobe management tools</li>
                    <li>Up to 30 outfit recommendations</li>
                    <li>Free 30-minute session with experts</li>
                  </ul>
                </div>                
              </div>
            </div>
    
            {/* Confirm Button */}
            <div className="flex justify-center pb-6">
              <button
                className="bg-[#b3ff00] hover:bg-blue-600 hover:text-[#b3ff00] text-[#4949e9] rounded-md p-3 font-medium"
                onClick={handleSubmit}
              >
                Confirm and Proceed
              </button>
            </div>
          </div>
        </div>
      );
}

export default ReviewPayment