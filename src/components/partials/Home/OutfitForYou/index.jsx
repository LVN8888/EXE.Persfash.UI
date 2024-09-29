import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel"; 
import "react-responsive-carousel/lib/styles/carousel.min.css";
import image3 from "../../../../assets/img/main.png";
import { message } from "antd";
import { genCustomerOutfitRecommendation, viewCurrentUserInfo, viewCustomerItemRecommendation, viewCustomerItemRecommendationFilter, viewCustomerOutfitRecommendation } from "../../../../services/CustomerApi";
import { useNavigate } from "react-router-dom";

const OutfitForYou = () => {
  const outfitImages = new Array(10).fill(image3);

  const [filter, setFilter] = useState("All");

  const filterOptions = ["Fashion", "Occasion", "Color", "All"];

  const [currCustomer, setCurrCustomer] = useState({})

  const [fashionitems, setFashionItems] = useState([{}])

  const [outfits, setOutifts] = useState([{}])

  const navigate = useNavigate();

  const handleFilterChange = (option) => {
    setFilter(option);
    if (option === 'All'){
      // console.log("Fashion item");
      fetchCustomerFashionItemRecommendation();
      
    }else {
      // console.log("Fashion item filter");
      fetchCustomerItemRecommendationFilter(option);
    }
  };

  const fetchCustomerInfo = async () => {
    try {
      const response = await viewCurrentUserInfo();

      // console.log(response.data);

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

      // console.log(response.data);
      
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

  const fetchCustomerOutfitRecommendation = async () => {
    try {

      const response = await genCustomerOutfitRecommendation();

      // console.log(response);
      

      if (response.isSuccess === true) {
        const outfit = await viewCustomerOutfitRecommendation();

        // console.log(outfit.data);

        setOutifts(outfit.data);
        
      }

    }catch(error) {
      console.log("Failed to fetch customer outfit recommendation", error);
    }
  }

  const fetchCustomerItemRecommendationFilter = async (filter) => {
    try {
      const response = await viewCustomerItemRecommendationFilter(1, 10, filter);

      // console.log(response);
      
      setFashionItems(response.data)

    }catch(error) {
      console.log("Failed to fetch customer item filter recommendation", error);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      fetchCustomerInfo();
      fetchCustomerFashionItemRecommendation();
      fetchCustomerOutfitRecommendation();
    } 
  }, [])

  return (
    <div className="mb-16 w-full px-8 flex flex-col items-center">
      <div className="text-center text-[#4949E9] font-bold text-3xl mb-6">
        <span>ITEMS FOR YOU</span>
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
          {/* Check if fashionItems has more than 0 items */}
          {fashionitems.length > 0 ? (
            // If there are items, map through them and display each outfit
            fashionitems.map((outfit, index) => (
              <div key={index} className="p-2">
                <img
                  id={outfit.itemId}
                  src={outfit.thumbnailURL}
                  alt={`Outfit ${index}`}
                  className="rounded-lg w-full h-[450px] object-cover shadow-lg"
                />
              </div>
            ))
          ) : (
            // If no items, display a "No result found" message
            <div className="text-center py-10">
              <p className="text-lg font-semibold text-gray-500">
                No result found
              </p>
            </div>
          )}
        </Carousel>
      </div>

      <div className="text-center text-[#4949E9] font-bold text-3xl mb-6 mt-6">
        <span>OUTFITS FOR YOU</span>
        <div className="h-1 w-30 bg-[#4949E9] mx-auto mt-2"></div>
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
          {outfits.length > 0 ? (
            outfits.map((outfit, index) => (
              <div key={index} className="p-2">
                {/* Main Outfit Thumbnail */}
                {/* Fashion items inside the outfit */}
                <div className="grid grid-cols-1 gap-2 mt-3 w-full h-[450px] border rounded-lg object-cover shadow-lg">
                  <div className="grid grid-cols-2 gap-2 h-1/2">
                    {/* Display Top and Bottom Images */}
                    {outfit.topItem && (
                      <div className="flex justify-center items-center m-2">
                        <img
                          id={outfit.topItem.itemId}
                          src={outfit.topItem.thumbnailURL}
                          alt={`Top - ${outfit.topItem.itemName}`}
                          className="w-full h-[200px] object-cover border rounded-lg transition-transform duration-300 ease-in-out cursor-pointer"
                        />
                      </div>
                    )}
                    {outfit.bottomItem && (
                      <div className="flex justify-center items-center m-2">
                        <img
                          id={outfit.bottomItem.itemId}
                          src={outfit.bottomItem.thumbnailURL}
                          alt={`Bottom - ${outfit.bottomItem.itemName}`}
                          className="w-full h-[200px] object-cover border rounded-lg transition-transform duration-300 ease-in-out cursor-pointer"
                        />
                      </div>
                    )}
                  </div>

                  {/* Display Shoes and Accessories Images */}
                  <div className="grid grid-cols-2 gap-2 h-1/2">
                    {outfit.shoesItem && (
                      <div className="flex justify-center items-center m-2">
                        <img
                          id={outfit.shoesItem.itemId}
                          src={outfit.shoesItem.thumbnailURL}
                          alt={`Shoes - ${outfit.shoesItem.itemName}`}
                          className="w-full h-[200px] object-cover border rounded-lg transition-transform duration-300 ease-in-out cursor-pointer"
                        />
                      </div>
                    )}
                    {outfit.accessoriesItem && (
                      <div className="flex justify-center items-center m-2">
                        <img
                          id={outfit.accessoriesItem.itemId}
                          src={outfit.accessoriesItem.thumbnailURL}
                          alt={`Accessories - ${outfit.accessoriesItem.itemName}`}
                          className="w-full h-[200px] object-cover border rounded-lg transition-transform duration-300 ease-in-out cursor-pointer"
                        />
                      </div>
                    )}
                  </div>

                  {/* If a dress item exists, display the dress */}
                  {outfit.dressItem && (
                    <div className="flex justify-center items-center mt-2">
                      <img
                        id={outfit.dressItem.itemId}
                        src={outfit.dressItem.thumbnailURL}
                        alt={`Dress - ${outfit.dressItem.itemName}`}
                        className="w-full h-[200px] object-cover border rounded-lg transition-transform duration-300 ease-in-out cursor-pointer"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-lg font-semibold text-gray-500">
                No result found
              </p>
            </div>
          )}
        </Carousel>
      </div>
    </div>
  );
};

export default OutfitForYou;
