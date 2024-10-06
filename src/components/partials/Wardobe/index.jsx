import React, { useContext, useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Importing carousel styles
import image3 from "../../../assets/img/main.png"; // Placeholder image
import { useNavigate, useParams } from "react-router-dom";
import { removeItemFromWardrobe, removeWardrobe, updateWardrobe, viewAllWardrobe, viewDetailWardrobe } from "../../../services/WardrobeApi";
import { AuthContext } from "../../../context/AuthContext";
import { viewCurrentUserInfo } from "../../../services/CustomerApi";
import Modal from 'antd/lib/modal';
import { Button, Input, message } from "antd";
import { viewDetailsFashionItem } from "../../../services/FashionItemApi";

const Wardrobe = ({ username }) => {
  // Categories of wardrobe items like shirts, pants, shoes, etc.
  const categories = ["Tops", "Bottoms", "Shoes", "Accessories", "Dresses"];

  // Data for each category (using placeholder image3 for all items for now)
  const wardrobeData = {
    Tops: [image3, image3, image3, image3, image3, image3, image3, image3],
    Bottoms: [image3, image3, image3],
    Shoes: [image3, image3, image3],
    Accessories: [image3, image3],
    Dresses: [image3, image3],
  };

  const {wardrobeId} = useParams();

  const [customerWardrobe, setCustomerWardrobe] = useState([])

  const [currWardrobe, setCurrWardrobe] = useState({});

  const [customerSubscriptions, setCustomerSubscriptions] = useState([]);

  const [visibleUpdateModal, setVisibleUpdateModal] = useState(false);
  const [visibleRemoveModal, setVisibleRemoveModal] = useState(false);

  const [visibleItemModal, setVisibleItemModal] = useState(false);

  const [currFashionItem, setCurrFashionItem] = useState({})

  const [note, setNote] = useState('');

  const [currWardrobeItem, setCurrWardrobeItem] = useState(0)

  const navigate = useNavigate();

  useEffect(() => {
    fetchCurrUserInformation();
      
  }, [wardrobeId])

  const fetchCurrUserInformation = async () => {
    try {
      const response = await viewCurrentUserInfo();

      setCustomerSubscriptions(response.data.subscription);

      var isPremium = response.data.subscription.some((subscription) => subscription === "Premium")      

      if (isPremium) {        
          fetchWardrobeOfCustomer();
      }else {
        navigate("*")
      }
      
    }catch(error) {
      console.log('Failed to load customer information', error);
    }
  }

  const fetchWardrobeOfCustomer = async () => {
    try {
      const response = await viewAllWardrobe();
    
      setCustomerWardrobe(response)

      const isOwned = response.some(wardrobe => wardrobe.wardrobeId === parseInt(wardrobeId));

      if (isOwned){
        fetchCurrentUserWardrobe(wardrobeId)
      }else {
        navigate("*")
      }
    
    }catch(error) {
      console.log("Failed to load the customer wardrobe",error.message);
    }
  }

  const fetchCurrentUserWardrobe = async (wardrobeId) => {
    try {
      const response = await viewDetailWardrobe(wardrobeId);     
      
      console.log(response);
      

      setCurrWardrobe(response);        
      setNote(response.notes)
      // console.log(response);
      

    }catch(error) {
      console.log("Failed to load subscription information", error);
    }
  }

  const handleRemoveWardrobe = async () => {
    try {
      const response = removeWardrobe(wardrobeId);

      navigate("/home")

      message.success({
        content: "Remove wardrobe successfully!",
        style: {
          marginTop: '10px',
          fontSize: '18px', 
          padding: '10px',
          position: 'absolute',
          right: '10px'
      },
        duration: 2,
    });

    }catch(error) {
      console.log("Failed to remove wardrobe ", error);
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

  const handleUpdateWardrobe = async () => {
    try {
      const response = await updateWardrobe(wardrobeId, note);

      window.location.reload()

      message.success({
        content: "Update wardrobe successfully!",
        style: {
          marginTop: '10px',
          fontSize: '18px', 
          padding: '10px',
          position: 'absolute',
          right: '10px'
      },
        duration: 2,
    });

    }catch(error) {
      console.log("Failed to update wardrobe ", error);
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

  const handleClickItem = (itemId, wardrobeItemId) => {
    setCurrWardrobeItem(wardrobeItemId);
    setVisibleItemModal(true);
    fetchDetailsFashionItem(itemId)
  }

  const handleClickRemoveItem = (wardrobeItemId) => {
    removeFashionItemFromWardrobe(wardrobeItemId);
    setVisibleItemModal(false);
  }

  const fetchDetailsFashionItem = async (itemId) => {
    try {
      const response = await viewDetailsFashionItem(itemId);

      console.log(response);

      setCurrFashionItem(response);

    }catch(error) {
      console.log("Failed to fetch details information  wardrobe ", error);
    }
  }

  const removeFashionItemFromWardrobe = async (wardrobeItemId) => {
    try {      
      const response = await removeItemFromWardrobe(wardrobeItemId);

      fetchCurrentUserWardrobe(wardrobeId);

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

    }catch(error) {
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
  
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 py-10">
      {/* Main Wardrobe Section */}
      <div className="text-left px-8 w-full">
        {/* Welcome Text */}
        <h1 className="text-6xl font-bold text-[#4949E9]">
          Welcome back, {username}
        </h1>

        {/* Subtext */}
        <h2 className="text-5xl font-semibold mt-4 text-[#4949E9]">
          Let’s get dressed with
        </h2>

        <h2 className="text-5xl font-bold mt-4 text-[#b3ff00]">
          {currWardrobe.notes} Wardrobe
        </h2>

        <button 
        onClick={() => setVisibleUpdateModal(true)}
        className="bg-[#4949e9] px-4 py-2 my-2 mr-2 rounded-md font-medium text-[#b3ff00] hover:bg-[#b3ff00] hover:text-[#4949e9] font-avantgarde">
          Update
        </button>

        <button 
        onClick={() => setVisibleRemoveModal(true)}
        className="bg-[#4949e9] px-4 py-2 my-2 rounded-md font-medium text-[#b3ff00] hover:bg-[#b3ff00] hover:text-[#4949e9] font-avantgarde">
          Remove wardrobe
        </button>
      </div>

      {/* Wardrobe Categories */}
      <div className="w-full px-8 mt-10">
        {/* Check if wardrobeItems is null */}
        {currWardrobe.wardrobeItems && (currWardrobe.wardrobeItems.Tops.length > 0 ||
          currWardrobe.wardrobeItems.Bottoms.length > 0 || currWardrobe.wardrobeItems.Shoes.length > 0
          || currWardrobe.wardrobeItems.Accessories.length > 0 || currWardrobe.wardrobeItems.Dresses.length > 0
        ) ? (
          categories.map((category) => {
            const items = currWardrobe.wardrobeItems[category];
            // console.log(category);
            // console.log(items);

            // Check if items for the current category are null or empty
            if (!items || items.length === 0) {
              return null; // Skip rendering this category if items are null or empty
            }

            return (
              <div key={category} className="mb-16">
                {/* Category Title */}
                <div className="text-center text-[#4949E9] font-bold text-3xl mb-6">
                  <span>{category}</span>
                  <div className="h-1 w-28 bg-[#4949E9] mx-auto mt-2"></div>
                </div>

                {/* Carousel for Category Items */}
                <Carousel
                  showThumbs={false} // Disable thumbnails
                  showStatus={false} // Disable status text
                  infiniteLoop={false} // No infinite loop
                  swipeable={true} // Enable swipe for better UX
                  stopOnHover={false} // Disable stop on hover
                  dynamicHeight={false} // Fixed height
                  showArrows={true} // Show navigation arrows
                  centerMode={true} // Center items
                  centerSlidePercentage={25} // Display 25% of each item (to show 4 items)
                  emulateTouch={false} // Disable touch interactions
                  transitionTime={500} // Smooth transition
                >
                  {items.map((item) => (
                    <div key={item.item.itemId} className="p-4" 
                    onClick={() => handleClickItem(item.item.itemId, item.wardrobeItemId)}>
                      <img
                        id={item.item.itemId}
                        src={item.item.thumbnailURL}
                        alt={`Wardrobe item ${item.item.itemName}`}
                        className="rounded-lg w-full h-[450px] object-cover shadow-lg"
                      />
                    </div>
                  ))}
                </Carousel>
              </div>
            );
          })
        ) : (
          // Render message if wardrobeItems is null
          <div className="text-center text-5xl font-semibold text-[#4949E9]">
            No wardrobe items to show.
          </div>
        )}
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
                className="w-full h-[350px]rounded-lg shadow-lg"
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
                <strong>Price:</strong> {currFashionItem.price} VND
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

                <Button
                  style={{ backgroundColor: "#4949e9", color: "#b3ff00" }}
                  className="bg-[#4949e9] text-[#b3ff00] py-2 px-4 rounded-full font-medium mr-4 mb-4"
                  onClick={() => handleClickRemoveItem(currWardrobeItem)}
                >
                  Remove from wardrobe
                </Button>


              </div>
            </div>
          </div>
        ) : (
          <p>Loading item details...</p>
        )}
      </Modal>

      <Modal
        centered
        title="Update wardrobe"
        open={visibleUpdateModal}
        onCancel={() => {
          setVisibleUpdateModal(false);
          setNote(currWardrobe.notes);
        }}
        footer={null}
        className="font-medium text-[#4949e9] font-avantgarde"
      >
        <div>
          <Input
            rows={4}
            placeholder="Type your new wardrobe here..."
            value={note}
            onChange={(e) => setNote(e.target.value)} // Update state on input change
            className="mb-4"
          />
          <Button
            style={{ backgroundColor: "#4949e9", color: "#b3ff00" }}
            className="bg-[#4949e9] text-[#b3ff00] py-2 px-4 rounded-full font-medium"
            disabled={!note.trim()}
            onClick={() => {
              handleUpdateWardrobe();
              setNote("");
              setVisibleUpdateModal(false); // Close the modal after submission
            }}
          >
            Update wardrobe
          </Button>
        </div>
      </Modal>

      <Modal
        centered
        title="Confirming remove wardrobe"
        open={visibleRemoveModal}
        onCancel={() => {
          setVisibleRemoveModal(false);
        }}
        footer={null}
        className="font-medium text-[#4949e9] font-avantgarde"
      >
        <div>
          <Button
            style={{ backgroundColor: "#4949e9", color: "#b3ff00" }}
            className="bg-[#4949e9] text-[#b3ff00] py-2 px-4 mr-2 rounded-full font-medium"
            onClick={() => {
              handleRemoveWardrobe();
              setVisibleRemoveModal(false); // Close the modal after submission
            }}
          >
            Remove wardrobe
          </Button>

          <Button
            style={{ backgroundColor: "#4949e9", color: "#b3ff00" }}
            className="bg-[#4949e9] text-[#b3ff00] py-2 px-4 rounded-full font-medium"
            onClick={() => {
              setVisibleRemoveModal(false); // Close the modal after submission
            }}
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Wardrobe;
