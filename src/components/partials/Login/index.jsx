import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.scss";
import fbLogo from "../../../assets/icon/facebook_logo.png";
import instagramLogo from "../../../assets/icon/instagram_logo.png";
import tiktokLogo from "../../../assets/icon/tiktok_logo.png";
import loginPic from "../../../assets/img/login_pic.png";

const Login = () => {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate("/login-form")
  }

  const handleSignUpClick = () => {
    navigate("/register");
  };

  return (
    <div className={styles.homeContainer}>
      <div className={styles.loginSection}>
        <div
          className={styles.loginImage}
          style={{ backgroundImage: `url(${loginPic})` }}
        >
          <h2>
            Welcome
            <br />
            back
          </h2>
        </div>

        <div className={styles.loginForm}>
          <h2>Choose platform</h2>
          <div className={styles.socialButtons}>
            <img src={fbLogo} alt="Facebook" />
            <img src={instagramLogo} alt="Instagram" />
            <img src={tiktokLogo} alt="TikTok" />
            <div className={styles.moreButton} onClick={handleSignInClick}>+</div>
          </div>
          <button className={styles.logInButton} onClick={handleSignInClick}>Log in</button>
          <div className={styles.separator}></div>
          <p>Don’t have an account?</p>
          <button className={styles.signUpButton} onClick={handleSignUpClick}>
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
