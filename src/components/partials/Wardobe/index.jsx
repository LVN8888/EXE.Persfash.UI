import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Importing carousel styles
import image3 from "../../../assets/img/main.png"; // Placeholder image

const Wardrobe = ({ username }) => {
  // Categories of wardrobe items like shirts, pants, shoes, etc.
  const categories = ["Shirts", "Pants", "Shoes", "Bags", "Accessories"];

  // Data for each category (using placeholder image3 for all items for now)
  const wardrobeData = {
    Shirts: [image3, image3, image3, image3],
    Pants: [image3, image3, image3],
    Shoes: [image3, image3, image3],
    Bags: [image3, image3],
    Accessories: [image3, image3],
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 py-10">
      {/* Main Wardrobe Section */}
      <div className="text-left px-8 w-full">
        {/* Welcome Text */}
        <h1 className="text-6xl font-bold text-[#4949E9]">Welcome back</h1>
        {/* Dynamic Username */}
        <h1 className="text-6xl font-bold mt-4 text-[#4949E9]">
          {username}
        </h1>
        {/* Subtext */}
        <h2 className="text-4xl font-semibold mt-4 text-[#4949E9]">
          Let’s get dressed
        </h2>
      </div>

      {/* Wardrobe Categories */}
      <div className="w-full px-8 mt-10">
        {categories.map((category) => (
          <div key={category} className="mb-16">
            {/* Category Title */}
            <div className="text-center">
              <h2 className="inline-block text-3xl font-semibold bg-[#4949E9] text-white px-6 py-3 rounded-lg uppercase tracking-widest shadow-md hover:bg-[#B3FF00] transition-all duration-300">
                {category}
              </h2>
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
              transitionTime={700} // Smooth transition
            >
              {wardrobeData[category].map((item, index) => (
                <div key={index} className="p-4">
                  <img
                    src={item}
                    alt={`Wardrobe item ${index}`}
                    className="rounded-lg w-[150px] h-[300px] object-cover mx-auto shadow-lg"
                  />
                </div>
              ))}
            </Carousel>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wardrobe;
