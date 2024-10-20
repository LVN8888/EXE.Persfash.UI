import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel"; 
import "react-responsive-carousel/lib/styles/carousel.min.css";
import image3 from "../../../../assets/img/main.png";
import { Button, Input, message, Spin } from "antd";
import { genCustomerOutfitRecommendation, viewCurrentUserInfo, viewCustomerItemRecommendation, viewCustomerItemRecommendationFilter, viewCustomerOutfitRecommendation } from "../../../../services/CustomerApi";
import { useNavigate } from "react-router-dom";
import Modal from 'antd/lib/modal';
import { viewDetailsFashionItem } from "../../../../services/FashionItemApi";
import { addItemToWardrobe, viewAllWardrobe } from "../../../../services/WardrobeApi";
import { addFavoriteOutfit, viewDetailsRecommendationOutfit } from "../../../../services/OutfitApi";

const OutfitForYou = () => {
  const outfitImages = new Array(10).fill(image3);

  const [filter, setFilter] = useState("All");

  const filterOptions = ["Fashion", "Occasion", "Color", "All"];

  const [currCustomer, setCurrCustomer] = useState({})

  const [fashionitems, setFashionItems] = useState([{}])

  const [outfits, setOutifts] = useState([{}])

  const [visibleItemModal, setVisibleItemModal] = useState(false);

  const [visibleOutfitModal, setVisibleOutfitModal] = useState(false);

  const [currFashionItem, setCurrFashionItem] = useState({});

  const [currOutfit, setCurrOutfit] = useState({});

  const [isPremium, setIsPremium] = useState(false);

  const [customerWardrobe, setCustomerWardrobe] = useState([{}])

  const [selectedWardrobe, setSelectedWardrobe] = useState("");

  const [isloading, setIsLoading] = useState(false);

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
      
      // if (response.data.isDoneProfileSetup === false) {
      //   navigate("/profile-setup")
      // }

      var isPremium = response.data.subscription.some((subscription) => subscription === "Premium")      

      if (isPremium) {
          setIsPremium(true);          
          fetchWardrobeOfCustomer();
      }

      return (response.data.isDoneProfileSetup)

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

  const fetchWardrobeOfCustomer = async () => {
    try {
      const response = await viewAllWardrobe();

      // console.log(response);
      
      setCustomerWardrobe(response)

    }catch(error) {
      console.log("Failed to load the customer wardrobe",error.message);
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

  const fetchFashionItem = async (itemId) => {
    try {
      const response = await viewDetailsFashionItem(itemId);

      // console.log(response);

      setCurrFashionItem(response);
      
    }catch(error) {
      console.log("Failed to fetch detail fashion item", error);
    }
  }

  const fetchOutfit = async (outfitId) => {
    try {

      setIsLoading(true);

      const response = await viewDetailsRecommendationOutfit(outfitId);

      // console.log(response);

      setIsLoading(false);
      setCurrOutfit(response);
      
    }catch(error) {
      console.log("Failed to fetch detail fashion item", error);
    }
  }

  const handleClickFashionItem = (itemId) => {
    setVisibleItemModal(true);
    if(isPremium) {
       fetchWardrobeOfCustomer();
    }
    fetchFashionItem(itemId)
  }

  const handleClickOutfit = (outfitId) => {
    setVisibleOutfitModal(true);
    fetchOutfit(outfitId);
  }

  const handleAddToFavoriteList = (outfitId) => {
    // message.info(`Outfit ${outfitId}`)
    
    addOutfitToFavoriteList(outfitId);
  }

  const addOutfitToFavoriteList = async (outfitId) => {
    try {
      
      const response = await addFavoriteOutfit(outfitId);

      message.success({
        content: "Add favorite outfit successfully!",
        style: {
          marginTop: '10px',
          fontSize: '20px', 
          padding: '10px',
          position: 'absolute',
          right: '10px'
      },
        duration: 2, // Optional: duration in seconds
      });


    }catch(error) {
      console.log("Failed to add new favorite outfit", error);
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

  const handleAddToWardrobe = (itemId) => {
    if (!selectedWardrobe) {
      message.info({
        content: "Please select wardrobe before adding new item",
        style: {
          marginTop: '10px',
          fontSize: '20px', 
          padding: '10px',
          position: 'absolute',
          right: '10px',
      },
        duration: 2, // Optional: duration in seconds
      }); // Show alert if no wardrobe selected
      return;
    }
    // Proceed with adding the item to the selected wardrobe
    // console.log(`Adding item to wardrobe ID: ${selectedWardrobe} with item: ${itemId}`);
    // Implement the logic to add the item to the selected wardrobe
    addNewItemToWardrobe(selectedWardrobe, itemId);
  };

  const addNewItemToWardrobe = async (wardrobeId, itemId) => {
    try {

      const response = await addItemToWardrobe(wardrobeId, itemId);

      message.success({
        content: "Add new item to wardrobe successfully!",
        style: {
          marginTop: '10px',
          fontSize: '20px', 
          padding: '10px',
          position: 'absolute',
          right: '10px'
      },
        duration: 2, // Optional: duration in seconds
      });

    }catch(error) {
      console.log("Failed to add new item to wardrobe", error);
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
    const fetchAllData = async () => {
      if (token) {
        var res = await fetchCustomerInfo();
 
        if (res === true) {
         fetchCustomerFashionItemRecommendation();
         fetchCustomerOutfitRecommendation();
        }else {
         navigate("/profile-setup")
        }
 
     } 
    }
    fetchAllData();
  }, [])

  return (
    <div className="w-full px-8 pb-8 flex flex-col items-center dark:bg-gradient-to-br dark:from-[#4949e9] dark:to-[#7979c9]">
      <div className="text-center text-[#4949E9] font-bold text-3xl mb-6 mt-6 dark:text-white">
        <span>ITEMS FOR YOU</span>
        <div className="h-1 w-30 bg-[#4949E9] mx-auto mt-2 dark:bg-white"></div>
      </div>

      <div className="mb-4 flex justify-center space-x-4">
        {filterOptions.map((option) => (
          <button
            key={option}
            onClick={() => handleFilterChange(option)}
            className={`${
              filter === option
                ? "bg-[#4949E9] text-white dark:bg-[#B3FF00] dark:text-[#4949e9]"
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
              <div
                key={index}
                className="p-2"
                onClick={() => handleClickFashionItem(outfit.itemId)}
              >
                <img
                  id={outfit.itemId}
                  src={outfit.thumbnailURL}
                  alt={`Outfit ${index}`}
                  className="rounded-lg w-full h-[450px] object-top object-cover shadow-lg"
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

      <Modal
        centered
        title="Fashion Item Details"
        open={visibleItemModal}
        onCancel={() => {
          setVisibleItemModal(false);
        }}
        footer={null}
        className="font-medium text-[#4949e9] font-avantgarde"
        // style={{width: "80%", maxWidth: "800px"}}
        width={750}
      >
        {currFashionItem ? (
          <div className="flex">
            {/* Left side: Thumbnail */}
            <div className="w-2/5">
              <img
                src={currFashionItem.thumbnailURL}
                alt={`${currFashionItem.itemName} Thumbnail`}
                className="w-full h-[350px] object-cover rounded-lg shadow-lg"
              />
            </div>

            {/* Right side: Item details */}
            <div className="w-3/5 pl-6">
              <h2 className="font-bold text-xl mb-2">
                {currFashionItem.itemName}
              </h2>
              <p>
                <strong>Brand:</strong> {currFashionItem.brand}
              </p>
              <p>
                <strong>Category:</strong> {currFashionItem.category}
              </p>
              <p>
                <strong>Color:</strong> {currFashionItem.color}
              </p>
              <p>
                <strong>Material:</strong> {currFashionItem.material}
              </p>
              <p>
                <strong>Size:</strong> {currFashionItem.size}
              </p>
              <p>
                <strong>Fit Type:</strong> {currFashionItem.fitType}
              </p>
              <p>
                <strong>Fashion Trend:</strong> {currFashionItem.fashionTrend}
              </p>
              <p>
                <strong>Gender:</strong> {currFashionItem.genderTarget}
              </p>
              <p>
                <strong>Occasion:</strong> {currFashionItem.occasion}
              </p>
              <p>
                <strong>Price:</strong> {new Intl.NumberFormat('vi-VN').format(currFashionItem.price)} VND
              </p>

              {/* Item Images */}
              {currFashionItem.itemImages &&
                currFashionItem.itemImages.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">More Images</h3>
                    <div className="flex">
                      {currFashionItem.itemImages.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Item Image ${index + 1}`}
                          className="w-[60px] h-[60px] object-cover rounded-lg mr-2"
                        />
                      ))}
                    </div>
                  </div>
                )}

              {/* Buttons */}
              <div className="mt-6">
                <Button
                  style={{ backgroundColor: "#4949e9", color: "#b3ff00" }}
                  className="bg-[#4949e9] text-[#b3ff00] py-2 px-4 rounded-full font-medium mr-4 mb-4"
                  onClick={() => {
                    window.open(currFashionItem.productUrl, "_blank");
                  }}
                >
                  Buy Now
                </Button>

                {/* Conditionally render Add to Wardrobe and Wardrobe Dropdown */}
                {isPremium && customerWardrobe.length > 0 && (
                  <>
                    <Button
                      style={{ backgroundColor: "#4949e9", color: "#ffffff" }}
                      className="bg-[#4949e9] text-white py-2 px-4 rounded-full font-medium mr-4 mb-4"
                      onClick={() => {
                        handleAddToWardrobe(currFashionItem.itemId);
                        // setVisibleItemModal(false);
                      }}
                    >
                      Add to Wardrobe
                    </Button>

                    {/* Dropdown for selecting a wardrobe */}
                    <select
                      className="py-2 px-4 border rounded-full"
                      onChange={(e) => {
                        // Handle wardrobe selection
                        const selectedWardrobe = e.target.value;
                        setSelectedWardrobe(selectedWardrobe);
                        // console.log(selectedWardrobe);

                        // Example: handleWardrobeSelection(selectedWardrobe);
                      }}
                    >
                      <option value="">Select Wardrobe</option>
                      {customerWardrobe.map((wardrobe) => (
                        <option
                          key={wardrobe.wardrobeId}
                          value={wardrobe.wardrobeId}
                        >
                          {wardrobe.notes || `Wardrobe ${wardrobe.wardrobeId}`}{" "}
                          {/* Display notes or default text */}
                        </option>
                      ))}
                    </select>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <p>Loading item details...</p>
        )}
      </Modal>

      <Modal
        centered
        title="Outfit Details"
        open={visibleOutfitModal}
        onCancel={() => {
          setVisibleOutfitModal(false)
          setIsLoading(false);
        }}
        footer={null}
        className="font-medium text-[#4949e9] font-avantgarde"
        width={500}
      >
        {isloading ? (
          <div className="flex justify-center items-center h-[300px]">
            <Spin size="large" tip="Loading..." /> {/* Loading spinner */}
          </div>
        ) : currOutfit ? (
          <div>
            {/* Render each outfit item if it exists */}
            {currOutfit.topItem ? (
              <div className="flex mb-4">
                <div className="w-2/5">
                  <img
                    src={currOutfit.topItem.thumbnailURL}
                    alt={currOutfit.topItem.itemName}
                    className="w-[80%] h-[100%] rounded-lg shadow-lg object-cover"
                  />
                </div>
                <div className="w-3/5 pl-4">
                  <h3 className="font-bold">{currOutfit.topItem.itemName}</h3>
                  <p>
                    <strong>Brand:</strong> {currOutfit.topItem.brand}
                  </p>
                  <p>
                    <strong>Category:</strong> {currOutfit.topItem.category}
                  </p>
                  <button
                    className="bg-[#4949e9] text-[#b3ff00] py-2 px-4 rounded-full font-medium mr-4 mb-4"
                    onClick={() =>
                      window.open(currOutfit.topItem.productUrl, "_blank")
                    }
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ) : null}

            {currOutfit.bottomItem ? (
              <div className="flex mb-4">
                <div className="w-2/5">
                  <img
                    src={currOutfit.bottomItem.thumbnailURL}
                    alt={currOutfit.bottomItem.itemName}
                    className="w-[80%] h-[100%] rounded-lg shadow-lg object-cover"
                  />
                </div>
                <div className="w-3/5 pl-4">
                  <h3 className="font-bold">
                    {currOutfit.bottomItem.itemName}
                  </h3>
                  <p>
                    <strong>Brand:</strong> {currOutfit.bottomItem.brand}
                  </p>
                  <p>
                    <strong>Category:</strong> {currOutfit.bottomItem.category}
                  </p>
                  <button
                    className="bg-[#4949e9] text-[#b3ff00] py-2 px-4 rounded-full font-medium mr-4 mb-4"
                    onClick={() =>
                      window.open(currOutfit.bottomItem.productUrl, "_blank")
                    }
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ) : null}

            {currOutfit.shoesItem ? (
              <div className="flex mb-4">
                <div className="w-2/5">
                  <img
                    src={currOutfit.shoesItem.thumbnailURL}
                    alt={currOutfit.shoesItem.itemName}
                    className="w-[80%] h-[100%] rounded-lg shadow-lg object-cover"
                  />
                </div>
                <div className="w-3/5 pl-4">
                  <h3 className="font-bold">{currOutfit.shoesItem.itemName}</h3>
                  <p>
                    <strong>Brand:</strong> {currOutfit.shoesItem.brand}
                  </p>
                  <p>
                    <strong>Category:</strong> {currOutfit.shoesItem.category}
                  </p>
                  <button
                    className="bg-[#4949e9] text-[#b3ff00] py-2 px-4 rounded-full font-medium mr-4 mb-4"
                    onClick={() =>
                      window.open(currOutfit.shoesItem.productUrl, "_blank")
                    }
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ) : null}

            {currOutfit.accessoriesItem ? (
              <div className="flex mb-4">
                <div className="w-2/5">
                  <img
                    src={currOutfit.accessoriesItem.thumbnailURL}
                    alt={currOutfit.accessoriesItem.itemName}
                    className="w-[80%] h-[100%] rounded-lg shadow-lg object-cover"
                  />
                </div>
                <div className="w-3/5 pl-4">
                  <h3 className="font-bold">
                    {currOutfit.accessoriesItem.itemName}
                  </h3>
                  <p>
                    <strong>Brand:</strong> {currOutfit.accessoriesItem.brand}
                  </p>
                  <p>
                    <strong>Category:</strong>{" "}
                    {currOutfit.accessoriesItem.category}
                  </p>
                  <button
                    className="bg-[#4949e9] text-[#b3ff00] py-2 px-4 rounded-full font-medium mr-4 mb-4"
                    onClick={() =>
                      window.open(
                        currOutfit.accessoriesItem.productUrl,
                        "_blank"
                      )
                    }
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ) : null}

            {currOutfit.dressItem ? (
              <div className="flex mb-4">
                <div className="w-2/5">
                  <img
                    src={currOutfit.dressItem.thumbnailURL}
                    alt={currOutfit.dressItem.itemName}
                    className="w-[80%] h-[100%] rounded-lg shadow-lg object-cover"
                  />
                </div>
                <div className="w-3/5 pl-4">
                  <h3 className="font-bold">{currOutfit.dressItem.itemName}</h3>
                  <p>
                    <strong>Brand:</strong> {currOutfit.dressItem.brand}
                  </p>
                  <p>
                    <strong>Category:</strong> {currOutfit.dressItem.category}
                  </p>
                  <button
                    className="bg-[#4949e9] text-[#b3ff00] py-2 px-4 rounded-full font-medium mr-4 mb-4"
                    onClick={() =>
                      window.open(currOutfit.dressItem.productUrl, "_blank")
                    }
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ) : null}

            {/* Add to Favorite button for premium users */}
            {isPremium && (
              <div className="mt-4">
                <button
                  className="bg-[#4949e9] text-[#b3ff00] py-2 px-4 rounded-full font-medium mr-4 mb-4"
                  onClick={() => handleAddToFavoriteList(currOutfit.outfitId)}
                >
                  Add to Favorite Outfit List
                </button>
              </div>
            )}
          </div>
        ) : (
          <p>No outfit details available.</p>
        )}
      </Modal>

      <div className="text-center text-[#4949E9] font-bold text-3xl mb-6 mt-6 dark:text-white">
        <span>OUTFITS FOR YOU</span>
        <div className="h-1 w-30 bg-[#4949E9] mx-auto mt-2 dark:bg-white"></div>
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
              <div
                key={index}
                className="p-2"
                onClick={() => handleClickOutfit(outfit.outfitId)}
              >
                {/* Main Outfit Thumbnail */}
                {/* Fashion items inside the outfit */}
                <div className="grid grid-cols-1 gap-2 mt-3 w-full h-[450px] border rounded-lg object-cover shadow-lg dark:border-none dark:bg-white">
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
                    <div className="flex justify-center items-center m-2">
                      <img
                        id={outfit.dressItem.itemId}
                        src={outfit.dressItem.thumbnailURL}
                        alt={`Dress - ${outfit.dressItem.itemName}`}
                        className="w-full h-[200px] object-cover border rounded-lg transition-transform duration-300 ease-in-out cursor-pointer object-top"
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
