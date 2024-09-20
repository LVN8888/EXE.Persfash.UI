import React from "react";

const includedFeatures = [
    'Private forum access',
    'Member resources',
    'Entry to annual conference',
    'Official member t-shirt',
  ]

export default function SubscriptionSection() {

    return (
        <div className="bg-white pt-24 sm:py-16">
      <div className="max-w-[1240px] mx-auto">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#B3FF00] sm:text-4xl">Welcome</h2>
          <p className="mt-6 text-lg leading-8 text-[#4949e9]">
          "PersFash offers two service packages: Free with outfit and clothing recommendations, 
          and Premium with wardrobe management and the option to add clothes to favorite outfits, 
          while the 1:1 personalized course with an expert is coming soon. New customers will receive the Premium package for free."
          </p>
        </div>
        <div className="bg-[#4949e9] mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
          <div className="p-8 sm:p-10 lg:flex-auto">
            <h4 className="text-2xl font-bold tracking-tight text-white">Your current subscription</h4>
            <h2 className="text-2xl py-1 font-bold tracking-tight text-[#B3FF00]">PersFash Subscription</h2>
            <p className="mt-1 text-base leading-7 text-gray-400">
              Your next bill for Price is on EndDate
            </p>
          </div>
          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
            <div className="rounded-2xl cursor-pointer bg-gray-50 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
              <div className="mx-auto max-w-xs">
                <p className="text-base font-semibold text-[#4949e9]">Manage payment subscription</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}