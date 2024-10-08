import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import image1 from "../../../assets/img/bg.png";
import image2 from "../../../assets/img/bg_2.png";
import OutfitForYou from "./OutfitForYou";
import ServiceDetails from "./ServiceDetails";
import { useAuth } from "../../../hooks/useAuth";

const Home = () => {
  // State để lưu ảnh hiện tại và chuyển đổi ảnh
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [image1, image2];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className={`${styles.homeContainer} dark:bg-gradient-to-tr dark:from-[#4949e9] dark:to-[#7979c9] dark:min-w-full`}>
        <div className={`${styles.textContainer}`}>
          <h1 className={`${styles.heading} text-[#4949e9] dark:text-white`}>
            How
            <br />
            are
            <br />
            you
          </h1>
        </div>
        <div className={`${styles.imageSection}`}>
          <div className={styles.imageSlider}>
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Slide ${index}`}
                className={`${styles.image} ${
                  index === currentImageIndex ? styles.active : ""
                }`}
              />
            ))}
          </div>
          <div className={styles.textBelow}>
            <div className={`${styles.line} bg-[#4949e9] dark:bg-white`}></div>
            <h1 className={`${styles.headingBelow} text-[#4949e9] dark:text-white`}>these day?</h1>
          </div>
        </div>
      </div>
      <OutfitForYou />
      <ServiceDetails/>
    </div>
  );
};

export default Home;
