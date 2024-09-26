import React, { useState, useEffect, useRef } from "react";
import { Button, Input, Dropdown, Menu, Switch, message } from "antd";
import { useNavigate } from "react-router-dom";
import { BulbOutlined, MoonOutlined } from "@ant-design/icons"; // Import icons
import styles from "./style.module.scss";
import logo from "../../../assets/icon/persfash.png";
import lookupIcon from "../../../assets/icon/lookup.png";
import profileIcon from "../../../assets/icon/profile.png";
import globeIcon from "../../../assets/icon/globe_2.png";
import { useAuth } from "../../../hooks/useAuth";

const MainHeader = () => {
  const dropdownRef = useRef(null);
  const [isUserDropdownVisible, setIsUserDropdownVisible] = useState(false); // Trạng thái cho User Menu
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // Trạng thái cho Language Menu
  const [language, setLanguage] = useState("EN");
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [darkMode, setDarkMode] = useState(false); // Dark mode state
  const navigate = useNavigate();
  const {user, isAuthenticated, logout} = useAuth();

  // Thiết lập mặc định chế độ Light Mode nếu chưa có trong localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }

    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
      if (JSON.parse(savedDarkMode)) {
        document.body.classList.add("dark-mode");
      } else {
        document.body.classList.remove("dark-mode");
      }
    } else {
      // Mặc định là Light Mode
      document.body.classList.remove("dark-mode");
    }
  }, []);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
    setIsDropdownVisible(false);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownVisible(!isUserDropdownVisible); // Toggle User Menu
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleSearch = () => {
    navigate("/search-results", { state: { query: searchText } });
  };

  const handleLogout = () => {
    logout();
    message.success({
      content: "Logout successfully!",
      style: {
        marginTop: '10px',
        fontSize: '20px', 
        padding: '10px',
        position: 'absolute',
        right: '10px'
    },
      duration: 2, // Optional: duration in seconds
  });
    navigate('/')
  }

  const handleSearchInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
    localStorage.setItem("darkMode", checked);
    if (checked) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  };

  // Menu cho user icon (Dark/Light Mode và Profile)
  const userMenuItems = [
    {
      key: "1",
      label: (
        <>
          {darkMode ? <MoonOutlined /> : <BulbOutlined />}
          <Switch
            checked={darkMode}
            onChange={toggleDarkMode}
            style={{ marginLeft: 10 }}
          />
        </>
      ),
    },
  ];

  if (user !== null && isAuthenticated) {


    userMenuItems.push({
        key: "2",
        label: <div onClick={() => navigate("/customer/customer-info")}>View Profile</div>,
    })

    userMenuItems.push({
      key: "3",
      label: <div onClick={() => handleLogout()}>Log Out</div>,
  });
}

  // Sử dụng Menu cho User Icon
  const userMenu = <Menu items={userMenuItems} />;

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

          <Dropdown
            open={isUserDropdownVisible}
            trigger={["click"]}
            onOpenChange={setIsUserDropdownVisible} // Cập nhật trạng thái cho User Menu
            placement="bottom"
            dropdownRender={() => (
              <div
                style={{
                  padding: "10px",
                  backgroundColor: "#fff",
                  borderRadius: "4px",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
                  marginTop: "8px",
                }}
              >
                {/* Nội dung của menu */}
                {userMenuItems.map((item) => (
                  <div
                    key={item.key}
                    style={{ marginBottom: "10px", cursor: "pointer" }}
                    onClick={item.onClick}
                  >
                    {item.label}
                  </div>
                ))}
              </div>
            )}
          >
            <div className={styles.userIcon}>
              <img
                src={profileIcon}
                alt="User"
                onClick={toggleUserDropdown}
                style={{ cursor: "pointer" }}
              />
            </div>
          </Dropdown>

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
