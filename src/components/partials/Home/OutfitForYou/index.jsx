import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel"; 
import "react-responsive-carousel/lib/styles/carousel.min.css";
import image3 from "../../../../assets/img/main.png";
import { message } from "antd";
import { viewCurrentUserInfo, viewCustomerItemRecommendation } from "../../../../services/CustomerApi";
import { useNavigate } from "react-router-dom";

const OutfitForYou = () => {
  const outfitImages = new Array(10).fill(image3);

  const [filter, setFilter] = useState("All");

  const filterOptions = ["Weather", "Event", "Color", "All"];

  const [currCustomer, setCurrCustomer] = useState({})

  const [fashionitems, setFashionItems] = useState([{}])

  const navigate = useNavigate();

  const handleFilterChange = (option) => {
    setFilter(option);
  };

  const fetchCustomerInfo = async () => {
    try {
      const response = await viewCurrentUserInfo();

      console.log(response.data);

      setCurrCustomer(response.data)
      
      if (response.data.isDoneProfileSetup === false) {
        navigate("/profile-setup")
      }

    }catch(error){
      console.log("Failed to fetch customer information", error);
      message.error({
        content: error.response.data.message,
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

  const fetchCustomerFashionItemRecommendation = async () => {
    try {

      const response = await viewCustomerItemRecommendation(1, 10);

      console.log(response.data);
      
      setFashionItems(response.data)

    }catch {
      console.log("Failed to fetch customer recommendation", error);
      message.error({
        content: error.response.data.message,
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
      fetchCustomerInfo();
      fetchCustomerFashionItemRecommendation();
    } 
  }, [])

  return (
    <div className="mb-16 w-full px-8 flex flex-col items-center">
      <div className="text-center text-[#4949E9] font-bold text-3xl mb-6">
        <span>OUTFIT FOR YOU</span>
        <div className="h-1 w-30 bg-[#4949E9] mx-auto mt-2"></div>
      </div>

      <div className="mb-4 flex justify-center space-x-4">
        {filterOptions.map((option) => (
          <button
            key={option}
            onClick={() => handleFilterChange(option)}
            className={`${
              filter === option
                ? "bg-[#4949E9] text-white"
                : "bg-gray-200 text-black"
            } px-4 py-2 rounded-full hover:bg-[#B3FF00] transition-all duration-300`}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="w-full">
        <Carousel
          showThumbs={false} // Tắt hiển thị hình thu nhỏ
          showStatus={false} // Tắt hiển thị trạng thái
          infiniteLoop={false} // Không vòng lặp vô tận
          swipeable={false} // Tắt chức năng kéo swipe
          stopOnHover={false} // Tắt chức năng dừng khi hover
          dynamicHeight={false} // Chiều cao cố định
          showArrows={true} // Hiển thị mũi tên điều hướng
          centerMode={true} // Để các ảnh ở trung tâm
          centerSlidePercentage={25} // Hiển thị 25% của mỗi slide (tương ứng 4 ảnh cùng lúc)
          emulateTouch={false} // Tắt chức năng tương tác chạm
          transitionTime={500} // Tăng thời gian chuyển slide để mượt hơn
        >
          {outfitImages.map((outfit, index) => (
            <div key={index} className="p-2">
              <img
                src={outfit}
                alt={`Outfit ${index}`}
                className="rounded-lg w-full h-[450px] object-cover"
              />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default OutfitForYou;
