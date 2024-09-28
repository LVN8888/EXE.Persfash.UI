import React, { useEffect, useState } from "react";
import { getCustomerCurrentSubscription } from "../../../../services/CustomerApi";

const includedFeatures = [
    'Private forum access',
    'Member resources',
    'Entry to annual conference',
    'Official member t-shirt',
  ]

export default function SubscriptionSection() {


  const [customerSubscription, setCustomerSubscription] = useState({
    customerSubscriptionId: 0,   
    customerId: 0,             
    startDate: null,            
    endDate: null,              
    isActive: false,           
    subscription: {
      subscriptionId: 0,        
      subscriptionTitle: "",    
      description: "",           
      durationInDays: null,  
      price: null,               
      status: ""                 
    }
  });

  const fetchCurrentCustomerSubscription = async () => {
      try {
        const response = await getCustomerCurrentSubscription();

        console.log(response.data);

        setCustomerSubscription(response.data[0]);

      }catch(error) {
        const errorMessage = error.response
        ? error.response.data.message
        : "Error occurred";
    console.error("View customer information log:", error);
    message.error({
        content: errorMessage,
        style: {
          marginTop: '10px',
          fontSize: '20px', 
          padding: '10px',
          position: 'absolute',
          right: '10px'
      },
        duration: 2,
    });
      }
  }

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
      if (token) {          
          fetchCurrentCustomerSubscription();
      }
  }, [])

  return (
    <div className="bg-white pt-24 sm:py-16 mb-8">
      <div className="max-w-[1240px] mx-auto">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#B3FF00] sm:text-4xl">Plans</h2>
          <p className="mt-6 text-lg leading-8 text-[#4949e9]">
            "PersFash offers two service packages: Free with outfit and clothing recommendations,
            and Premium with wardrobe management and the option to add clothes to favorite outfits,
            while the 1:1 personalized course with an expert is coming soon. New customers will receive the Premium package for free."
          </p>
        </div>

        {/* Render subscription details only if customerSubscription is available */}
        {customerSubscription && (
          <div className="bg-[#4949e9] mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
            <div className="p-8 sm:p-10 lg:flex-auto">
              <h4 className="text-2xl font-bold tracking-tight text-white">Your current subscription</h4>
              <h2 className="text-2xl py-1 font-bold tracking-tight text-[#B3FF00]">
                {customerSubscription.subscription.subscriptionTitle || "N/A"} Subscription
              </h2>
              {/* Conditional rendering based on subscription type */}
              {customerSubscription.subscription.subscriptionTitle === "Premium" ? (
                <p className="mt-1 text-base leading-7 text-gray-400">
                  Your next bill for {customerSubscription.subscription.price +" VND" || 'N/A'} is on {new Date(customerSubscription.endDate).toISOString().split('T')[0] || 'N/A'}
                </p>
              ) : (
                <p className="mt-1 text-base leading-7 text-gray-400">
                  You are currently using the Free plan with access to basic features.
                </p>
              )}
            </div>
            <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
              <div className="rounded-2xl cursor-pointer bg-gray-50 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                <div className="mx-auto max-w-xs">
                  <p className="text-base font-semibold text-[#4949e9]">Manage payment subscription</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}