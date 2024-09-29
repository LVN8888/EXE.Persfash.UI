import React from "react";
import { ThreeDots } from "react-loader-spinner"; // Import spinner mới

const Loading = ({ tip = "Loading..." }) => {
  return (
    <div className="flex justify-center items-center h-screen bg-[#4949E9]">
      <div className="flex flex-col items-center">
        {/* Sử dụng spinner Circles với màu sắc tùy chỉnh */}
        <ThreeDots 
          height="80" 
          width="80" 
          color="#B3FF00" // Đổi màu spinner thành xanh neon
          ariaLabel="loading"
        />
        <p className="mt-6 text-2xl font-semibold" style={{ color: '#B3FF00' }}>
          {tip}
        </p>
      </div>
    </div>
  );
};

export default Loading;
