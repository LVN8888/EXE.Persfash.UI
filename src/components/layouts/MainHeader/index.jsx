import React, { useState, useEffect, useRef } from "react";
import { Button, Input, Dropdown } from "antd";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.scss";
import logo from "../../../assets/icon/persfash.png";
import lookupIcon from "../../../assets/icon/lookup.png";
import profileIcon from "../../../assets/icon/profile.png";
import globeIcon from "../../../assets/icon/globe_2.png";

const MainHeader = () => {
  const dropdownRef = useRef(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [language, setLanguage] = useState("EN");
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
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

  const handleSearch = () => {
    console.log("Tìm kiếm:", searchText);
  };

  const handleSearchInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const searchMenu = (
    <div style={{ padding: "10px" }}>
      <Input.Search
        placeholder={language === "EN" ? "Search..." : "Tìm kiếm..."}
        onChange={handleSearchInputChange}
        value={searchText}
        onSearch={handleSearch}
        style={{ width: 250 }}
        enterButton={
          <Button style={{ backgroundColor: "#4949E9", color: "#fff" }}>
            {language === "EN" ? "Search" : "Tìm kiếm"}
          </Button>
        }
      />
    </div>
  );

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src={logo} alt="persfash logo" />
          <span>persfash</span>
        </div>
        <nav className={styles.nav}>
          <div
            className={styles.link}
            onClick={() => navigate("/home")}
            style={{ cursor: "pointer" }}
          >
            Home
          </div>
          <div
            className={styles.link}
            onClick={() => navigate("/plan")}
            style={{ cursor: "pointer" }}
          >
            Plan
          </div>
          <div
            className={styles.link}
            onClick={() => navigate("/support")}
            style={{ cursor: "pointer" }}
          >
            Support
          </div>

          <Dropdown
            open={searchVisible}
            trigger={["click"]}
            onOpenChange={(flag) => setSearchVisible(flag)}
            placement="bottom"
            dropdownRender={() => searchMenu}
          >
            <div className={styles.searchIcon}>
              <img
                src={lookupIcon}
                alt="Search"
                onClick={() => setSearchVisible(!searchVisible)}
              />
            </div>
          </Dropdown>

          <div className={styles.userIcon}>
            <img src={profileIcon} alt="User" />
          </div>

          <div className={styles.languageIcon} ref={dropdownRef}>
            <img src={globeIcon} alt="language" onClick={toggleDropdown} />
            <div
              className={`${styles.languageDropdown} ${
                isDropdownVisible ? styles.show : ""
              }`}
            >
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
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default MainHeader;
