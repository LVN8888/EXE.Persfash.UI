import React, { useState, useEffect, useRef } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom"; // Updated to useNavigate
import styles from "./style.module.scss";
import logo from "../../../assets/icon/perfash.png";
import globeIcon from "../../../assets/icon/globe.png";
import arrowIcon from "../../../assets/icon/arrow.png"; 

const AuthHeader = () => {
  const [language, setLanguage] = useState("EN");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      setLanguage(savedLanguage);
    } else {
      setLanguage("EN");
    }
  }, []);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
    setIsDropdownVisible(false); 
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleArrowClick = () => {
    navigate("/"); 
  };

  const handleLoginClick = () => {
    navigate("/login-form");
  };

  const handleSignUpClick = () => {
    navigate("/register"); 
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={arrowIcon} alt="back arrow" onClick={handleArrowClick} className={styles.arrowIcon} />
        <img src={logo} alt="persfash logo" />
        <span>persfash</span>
      </div>
      <nav className={styles.nav}>
        {/* <a href="/support" className={styles.support}>
          Support
        </a> */}
        <Button className={styles.loginButton} onClick={handleLoginClick}>Log in</Button>
        <Button className={styles.signUpButton} onClick={handleSignUpClick}>Sign up</Button>
        <div className={styles.languageIcon} ref={dropdownRef}>
          {/* <img src={globeIcon} alt="language" onClick={toggleDropdown} />
          <div className={`${styles.languageDropdown} ${isDropdownVisible ? styles.show : ""}`}>
            <Button.Group>
              <Button
                type={language === "VN" ? "primary" : "default"}
                onClick={() => changeLanguage("VN")}
                className={styles.languageButton}
              >
                VN
              </Button>
              <Button
                type={language === "EN" ? "primary" : "default"}
                onClick={() => changeLanguage("EN")}
                className={styles.languageButton}
              >
                EN
              </Button>
            </Button.Group>
          </div> */}
        </div>
      </nav>
    </header>
  );
};

export default AuthHeader;