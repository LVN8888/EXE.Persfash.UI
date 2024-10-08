import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate từ react-router-dom
import styles from "./style.module.scss"; // Import file SCSS module

// Import both language JSON files
import enContent from "../../../../translation/en/global.json";
import vnContent from "../../../../translation/vn/global.json";

const ServiceDetails = () => {
  const [content, setContent] = useState(enContent); // Set default to English
  const navigate = useNavigate(); // Sử dụng hook useNavigate để điều hướng

  useEffect(() => {
    // Check for the language setting in localStorage
    const language = localStorage.getItem('language') || 'EN'; // Default to 'EN' if no value is set
    if (language === 'VN') {
      setContent(vnContent);
    } else {
      setContent(enContent);
    }
  }, []);

  const handleUpgradeClick = () => {
    navigate('/plan'); // Điều hướng đến trang /plans khi nhấn nút Upgrade Now
  };

  return (
    <div className={`${styles.serviceDetailsContainer} dark:bg-gradient-to-tr dark:from-[#4949e9] dark:to-[#7979c9]`}>
      <div className={styles.upgradeSection}> {/* Gom tất cả vào phần này */}
        <div className={styles.titleColumn}>
          <span>{content["What our services appoinment cover"]}</span>
        </div>
        <div className={styles.line}></div>

        {/* Nội dung tổng hợp */}
        <div className={styles.contentColumns}>
          <p>{content["Content 1"]}</p>
          <p>{content["Content 2"]}</p>
          <p>{content["Content 3"]}</p>
          <br />

          {/* Tiêu đề Special Upgradation */}
          <div className={styles.titleColumn}>
            <span>{content["Special upgradation"].toUpperCase()}</span> {/* In hoa */}
          </div>
          <div className={styles.line}></div>
          <p>{content["Content 4"]}</p>
          <p>{content["Content 5"]}</p>
          <br />

          {/* Tiêu đề Key Look */}
          <div className={styles.titleColumn}>
            <span>{content["Key look"].toUpperCase()}</span> {/* In hoa */}
          </div>
          <div className={styles.line}></div>
          <p>{content["Content 6"]}</p>
          <p>{content["Content 5"]}</p>
          <br />

          {/* Tiêu đề Wardrobe Refresh */}
          <div className={styles.titleColumn}>
            <span>{content["Wardrobe refresh"].toUpperCase()}</span> {/* In hoa */}
          </div>
          <div className={styles.line}></div>
          <p>{content["Content 7"]}</p>
          <p>{content["Content 8"]}</p>
        </div>

        {/* Nút Upgrade Now */}
        <button className={styles.upgradeButton} onClick={handleUpgradeClick}> {/* Thêm sự kiện onClick */}
          <span role="img" aria-label="upgrade">✨</span>
          {content["Upgrade now"]}
        </button>
      </div>
    </div>
  );
};

export default ServiceDetails;
