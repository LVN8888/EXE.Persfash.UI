import React, { useContext, useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Importing carousel styles
import image3 from "../../../assets/img/main.png"; // Placeholder image
import { useNavigate, useParams } from "react-router-dom";
import { removeWardrobe, updateWardrobe, viewAllWardrobe, viewDetailWardrobe } from "../../../services/WardrobeApi";
import { AuthContext } from "../../../context/AuthContext";
import { viewCurrentUserInfo } from "../../../services/CustomerApi";
import Modal from 'antd/lib/modal';
import { Button, Input, message } from "antd";
import { removeFavoriteOutfit, viewDetailsFavoriteOutfit, viewFavoriteOutfitOfCustomer } from "../../../services/OutfitApi";


export const FavoriteOutift = () => {
    const [currCustomer, setCurrCustomer] = useState();
    const [customerSubscriptions, setCustomerSubscriptions] = useState([]);
    const [customerFavoriteOutfit, setCustomerFavoriteOutfit] = useState([{}])

    const [currOutfit, setCurrOutfit] = useState({});
    const [visibleOutfitModal, setVisibleOutfitModal] = useState(false);


    const navigate = useNavigate();

    useEffect(() => {
        fetchCurrUserInformation();
          
      }, [])

      const fetchCurrUserInformation = async () => {
        try {
          const response = await viewCurrentUserInfo();

          setCurrCustomer(response.data)
    
          setCustomerSubscriptions(response.data.subscription);
    
          var isPremium = response.data.subscription.some((subscription) => subscription === "Premium")      
    
          if (isPremium) {        
            fetchFavoriteOutfitOfCustomer();
          }else {
            navigate("*")
          }
          
        }catch(error) {
          console.log('Failed to load customer information', error);
        }
      }

      const fetchFavoriteOutfitOfCustomer = async () => {
        try {
          const response = await viewFavoriteOutfitOfCustomer();

          console.log(response);
        
          setCustomerFavoriteOutfit(response)
    
        //   const isOwned = response.some(wardrobe => wardrobe.wardrobeId === parseInt(wardrobeId));
    
        //   if (isOwned){
        //     fetchCurrentUserWardrobe(wardrobeId)
        //   }else {
        //     navigate("*")
        //   }
        
        }catch(error) {
          console.log("Failed to load the customer favorite outfit",error.message);
        }
      }

      const fetchOutfit = async (outfitId) => {
        try {
          const response = await viewDetailsFavoriteOutfit(outfitId);
    
          console.log(response);
    
          setCurrOutfit(response);
          
        }catch(error) {
          console.log("Failed to fetch detail outfit", error);
        }
      }

      const removeOutfitFromFavoriteOutfitList  = async (outfitId) => {
        try {

          // message.info(`Removing ${outfitId}`)
          const response = await removeFavoriteOutfit(outfitId);

          message.success({
            content: "Remove item from wardrobe successfully!",
            style: {
              marginTop: '10px',
              fontSize: '18px', 
              padding: '10px',
              position: 'absolute',
              right: '10px'
          },
            duration: 2,
        });

        fetchFavoriteOutfitOfCustomer();

        }catch (error) {
          console.log("Failed to remove selected item from wardrobe ", error);
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
      }

      const handleClickOutfit = (outfitId) => {
        setVisibleOutfitModal(true);
        fetchOutfit(outfitId);
      }

      const handleClickRemoveOutfit = (outfitId) => {
        removeOutfitFromFavoriteOutfitList(outfitId);
        setVisibleOutfitModal(false);
      }
    

      return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 py-10">
          {/* Main Wardrobe Section */}
          <div className="text-left px-8 w-full">
            {/* Welcome Text */}
            <h1 className="text-6xl font-bold text-[#4949E9]">
              Here your favorite outfit, {currCustomer ? currCustomer.username : "John doe"}
            </h1>
      
            {/* Subtext */}
            <h2 className="text-5xl font-semibold mt-4 text-[#4949E9]">
              What is your favorite outfit of the day
            </h2>
          </div>
      
          <div className="w-full px-8 mt-10">
            <div className="text-center text-[#4949E9] font-bold text-3xl mb-6 mt-6">
              <span>YOUR FAVORITE OUTFITS</span>
              <div className="h-1 w-[300px] bg-[#4949E9] mx-auto mt-2"></div>
            </div>

            <Modal
        centered
        title="Outfit Details"
        open={visibleOutfitModal}
        onCancel={() => setVisibleOutfitModal(false)}
        footer={null}
        className="font-medium text-[#4949e9] font-avantgarde"
        width={500}
      >
        {currOutfit ? (
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
                    onClick={() => window.open(currOutfit.topItem.productUrl, "_blank")}
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
                  <h3 className="font-bold">{currOutfit.bottomItem.itemName}</h3>
                  <p>
                    <strong>Brand:</strong> {currOutfit.bottomItem.brand}
                  </p>
                  <p>
                    <strong>Category:</strong> {currOutfit.bottomItem.category}
                  </p>
                  <button
                    className="bg-[#4949e9] text-[#b3ff00] py-2 px-4 rounded-full font-medium mr-4 mb-4"
                    onClick={() => window.open(currOutfit.bottomItem.productUrl, "_blank")}
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
                    onClick={() => window.open(currOutfit.shoesItem.productUrl, "_blank")}
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
                  <h3 className="font-bold">{currOutfit.accessoriesItem.itemName}</h3>
                  <p>
                    <strong>Brand:</strong> {currOutfit.accessoriesItem.brand}
                  </p>
                  <p>
                    <strong>Category:</strong> {currOutfit.accessoriesItem.category}
                  </p>
                  <button
                    className="bg-[#4949e9] text-[#b3ff00] py-2 px-4 rounded-full font-medium mr-4 mb-4"
                    onClick={() =>
                      window.open(currOutfit.accessoriesItem.productUrl, "_blank")
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
                    onClick={() => window.open(currOutfit.dressItem.productUrl, "_blank")}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ) : null}

              <div className="mt-4">
                <button className="bg-[#4949e9] text-[#b3ff00] py-2 px-4 rounded-full font-medium mr-4 mb-4"
                onClick={() => handleClickRemoveOutfit(currOutfit.outfitId)}>
                  Remove outfit
                </button>
              </div>
          </div>
        ) : (
          <p>No outfit details available.</p>
        )}
      </Modal>
      
            {customerFavoriteOutfit.length > 0 ? (
              <Carousel
                showThumbs={false}
                showStatus={false}
                infiniteLoop={false}
                swipeable={false}
                stopOnHover={false}
                dynamicHeight={false}
                showArrows={true}
                centerMode={true}
                centerSlidePercentage={25}
                emulateTouch={false}
                transitionTime={500}
              >
                {customerFavoriteOutfit.map((outfit, index) => (
                  <div key={index} className="p-2" 
                  onClick={() => handleClickOutfit(outfit.outfitId)}>
                    <div className="grid grid-cols-1 gap-2 mt-3 w-full h-[450px] border rounded-lg object-cover shadow-lg">
                      <div className="grid grid-cols-2 gap-2 h-1/2">
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
                ))}
              </Carousel>
            ) : (
                <div className="text-center py-10">
                  <p className="text-center text-5xl font-semibold text-[#4949E9]">
                    No favorite outfits to show
                  </p>
                </div>
            )}
          </div>
        </div>
      );
}