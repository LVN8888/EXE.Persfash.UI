import React, { useState, useEffect, useRef } from "react";
import { Button, Input, Dropdown, Menu, Switch, message } from "antd";
import { useNavigate } from "react-router-dom";
import { BulbOutlined, MoonOutlined, PlusOutlined } from "@ant-design/icons"; // Import icons
import styles from "./style.module.scss";
import logo from "../../../assets/icon/persfash.png";
import lookupIcon from "../../../assets/icon/lookup.png";
import profileIcon from "../../../assets/icon/profile.png";
import globeIcon from "../../../assets/icon/globe_2.png";
import { useAuth } from "../../../hooks/useAuth";
import { viewCurrentUserInfo } from "../../../services/CustomerApi";
import { addNewWardrobe, viewAllWardrobe } from "../../../services/WardrobeApi";
import Modal from 'antd/lib/modal';

const MainHeader = () => {
  const dropdownRef = useRef(null);
  const [isUserDropdownVisible, setIsUserDropdownVisible] = useState(false); // Trạng thái cho User Menu
  const [isWardrobeDropdownVisible, setIsWardrobeDropdownVisible] = useState(false); // Trạng thái cho User Menu
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // Trạng thái cho Language Menu
  const [language, setLanguage] = useState("EN");
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [darkMode, setDarkMode] = useState(false); // Dark mode state
  const navigate = useNavigate();
  const {user, isAuthenticated, logout} = useAuth();

  const [currCustomer, setCurrCustomer] = useState({})
  const [customerSubscriptions, setCustomerSubscriptions] = useState([]);
  const [isPremium, setIsPremium] = useState(false);
  const [customerWardrobe, setCustomerWardrobe] = useState([{}])
  const [visibleCreateModal, setVisibleCreateModal] = useState(false);
  const [note, setNote] = useState('')

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
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }
    } else {
      // Mặc định là Light Mode
      document.body.classList.remove("dark");
    }

    const token = localStorage.getItem('accessToken')
    if (token) {
      fetchCurrUserInformation();
    }

  }, []);
  
  const fetchWardrobeOfCustomer = async () => {
    try {
      const response = await viewAllWardrobe();

      // console.log(response);
      
      setCustomerWardrobe(response)

    }catch(error) {
      console.log("Failed to load the customer wardrobe",error.message);
      
    }
  }

  const fetchCurrUserInformation = async () => {
    try {
      const response = await viewCurrentUserInfo();

      // console.log(response.data);
      setCurrCustomer(response.data)

      setCustomerSubscriptions(response.data.subscription);

      var isPremium = response.data.subscription.some((subscription) => subscription === "Premium")      

      if (isPremium) {
          setIsPremium(true);          
          fetchWardrobeOfCustomer();
      }
      
    }catch(error) {
      console.log('Failed to load customer information', error);
    }
  }

  const handleAddNewWardrobe = async () => {
    try {

      const response = await addNewWardrobe(note);

      fetchWardrobeOfCustomer();

      message.success({
        content: "Create new wardrobe successfully!",
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
      console.log("Failed to add new wardrobe ", error);
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

  // const customerHasSubscription = (subscriptionTitle) => {
  //   return customerSubscriptions.some(
  //     (subscription) => subscription === subscriptionTitle
  //   );
  // };

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
    setIsDropdownVisible(false);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownVisible(!isUserDropdownVisible); // Toggle User Menu
  };

  const toggleWardrobeDropdown = () => {
    setIsWardrobeDropdownVisible(!isWardrobeDropdownVisible);
  }

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
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
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

    if (isPremium) {
      userMenuItems.push({
        key: "3",
        label: <div onClick={() => navigate("/favorite-outfit")}>View Outfits</div>,
    })
    }

    userMenuItems.push({
      key: "4",
      label: <div onClick={() => handleLogout()}>Log Out</div>,
  });
}

const customerWardrobeMenu = [
  {
    key: "1",
    label: (
      <div type="dashed" className="font-avantgarde font-medium text-[#4949e9]" onClick={() => setVisibleCreateModal(true)}>
        <PlusOutlined /> Add New Wardrobe
      </div>
    ),
  },
];

if (customerWardrobe.length > 0) {
  customerWardrobeMenu.push(
    ...customerWardrobe.map((wardrobe, index) => ({
      key: `${index + 2}`,
      label: <div onClick={() => navigate(`/wardrobe/${wardrobe.wardrobeId}`)} className="font-avantgarde font-medium text-[#4949e9]">{wardrobe.notes}</div>,
    }))
  );
}

  // Sử dụng Menu cho User Icon
  const userMenu = <Menu items={userMenuItems} />;

  const searchMenu = (
    <div style={{ padding: "10px" }}>
      <Input.Search
        placeholder={language === "EN" ? "Search..." : "Tìm kiếm..."}
        onChange={handleSearchInputChange}
        value={searchText}
        onSearch={() => {
          if (!searchText.trim()) {
            // Alert or handle empty input
            message.warning({
              content: language === "EN" ? "Please enter a search term." : "Vui lòng nhập từ khóa tìm kiếm.",
              style: {
                marginTop: '10px',
                fontSize: '20px', 
                padding: '10px',
            },
              duration: 2, // Optional: duration in seconds
            });
            return;
          }
          handleSearch();  // Call your search function if input is valid
        }}
        style={{ width: 250 }}
        required
        enterButton={
          <Button style={{ backgroundColor: "#4949E9", color: "#fff" }}
          disabled={!searchText.trim()}
          >
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

          {isPremium ? (
            <Dropdown
              open={isWardrobeDropdownVisible}
              trigger={["click"]}
              onOpenChange={setIsWardrobeDropdownVisible} // Cập nhật trạng thái cho wardrobe dropdown
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
                  {customerWardrobeMenu.map((item) => (
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
              <div
                className={styles.link}
                onClick={toggleWardrobeDropdown}
                style={{ cursor: "pointer" }}
              >
                Wardrobe
              </div>
            </Dropdown>
          ) : null}

          <Modal
            centered
            title="Create new wardrobe"
            open={visibleCreateModal}
            onCancel={() => {
              setVisibleCreateModal(false)
              setNote('')
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
                  handleAddNewWardrobe();
                  setNote("");
                  setVisibleCreateModal(false); // Close the modal after submission
                }}
              >
                Add wardrobe
              </Button>
            </div>
          </Modal>

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
            {/* <img src={globeIcon} alt="language" onClick={toggleDropdown} />
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
            </div> */}
          </div>
        </nav>
      </header>
    </>
  );
};

export default MainHeader;
