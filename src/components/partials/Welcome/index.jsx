import React, { useEffect } from "react";

import bg1 from '../../../assets/img/login_pic.png'
import bg2 from '../../../assets/img/register_pic.png'
import bg3 from '../../../assets/img/bg_2.png'
import bg4 from '../../../assets/img/support_2.png'
import bg5 from '../../../assets/img/bg.png'
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useAuth } from "../../../hooks/useAuth";
import { checkCustomerProfile } from "../../../services/CustomerApi";

export const Welcome = () => {

    const navigate = useNavigate();
    const {user, isAuthenticated, setUser, setIsAuthenticated} = useAuth();

    useEffect(() => {

      const handleCustomer = async () => {
        try {
          // Check if the customer has completed the profile setup
          const profileRes = await checkCustomerProfile();
          // console.log(profileRes);
    
          if (profileRes.data !== true) {
            navigate("/profile-setup")
          }
    
        } catch (error) {
          if (error.response) {
            console.error("Check customer failed log:", error.response.data);
            message.error({
              content: error.response.data.message,
              style: {
                marginTop: "10px",
                fontSize: "18px",
                padding: "10px",
              },
              duration: 2,
            });
          } else {
            message.error({
              content: "Error occurred",
              style: {
                marginTop: "10px",
                fontSize: "18px",
                padding: "10px",
              },
              duration: 2,
            });
            console.error("Check customer failed log: ", error);
          }
        }
      };

      const storedUser = JSON.parse(localStorage.getItem('user'));
      const token = localStorage.getItem('accessToken');
      if (storedUser && token) {
        setUser(storedUser);
        setIsAuthenticated(true);

        if (storedUser.role === "Admin"){
          navigate("/admin")
        }else if (storedUser.role === "Customer") {
          handleCustomer();
        }

      }else {
        navigate("/login-form")
      }
    }, [navigate]);

   
  
    return (
        <div className="min-h-screen bg-gradient-to-r from-[#4949e9] to-[#b3ff00] flex justify-center items-center">
          
          {/* Main Container */}
          <div className="relative w-full max-w-7xl ml-52 overflow-hidden">
    
            {/* Overlay Text */}
            <div className="absolute top-1/4 left-1 z-10 text-white">
              <h1 className="text-9xl font-medium leading-none">
                Welcome<br />
                <span className="text-8xl">{user ? user.username : "John Doe"}</span>
              </h1>
              <p className="mt-2 text-lg font-light">
                Thanks for being a member of <span className="font-semibold">@persfash</span>
              </p>
              <button className="mt-5 bg-lime-400 text-gray-900 font-bold py-3 px-8 rounded-full hover:bg-lime-500 transition-all"
              onClick={() => navigate("/Home")}>
                Start now
              </button>
            </div>
    
            {/* Image Grid */}
            <div className="flex h-screen">
              {/* First Image */}
              <div className="w-[336px] h-[450px] bg-white bg-cover bg-center" style={{ backgroundImage: `url(${bg1})`}}></div>
    
              {/* Second Image */}
              <div className="w-[336px] h-[550px] bg-black bg-cover bg-center" style={{ backgroundImage: `url(${bg2})`}}></div>
    
             {/* Third Image with slight left shift */}
             <div className="w-[336px] h-[610px] bg-white bg-cover" style={{ backgroundImage: `url(${bg3})`, backgroundPosition: '20% 0' }}></div>
    
    {/* Fourth Image with slight right shift */}
    <div className="w-[336px] h-[670px] bg-black bg-cover" style={{ backgroundImage: `url(${bg4})`, backgroundPosition: '85% 0' }}></div>
    
              {/* Fifth Image */}
              <div className="w-[336px] h-[730px] bg-white bg-cover bg-center" style={{ backgroundImage: `url(${bg5})`}}></div>
            </div>
    
          </div>
        </div>
    );
}