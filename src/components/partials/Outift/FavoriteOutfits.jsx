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
import { viewFavoriteOutfitOfCustomer } from "../../../services/OutfitApi";


export const FavoriteOutift = () => {
    const [currCustomer, setCurrCustomer] = useState();
    const [customerSubscriptions, setCustomerSubscriptions] = useState([]);
    const [customerFavoriteOutfit, setCustomerFavoriteOutfit] = useState([{}])

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
                  <div key={index} className="p-2">
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
                            className="w-full h-[200px] object-cover border rounded-lg transition-transform duration-300 ease-in-out cursor-pointer"
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