import React from "react";
import styles from "./style.module.scss";
import fbLogo from "../../../assets/icon/facebook_logo.png";
import instagramLogo from "../../../assets/icon/instagram_logo.png";
import tiktokLogo from "../../../assets/icon/tiktok_logo.png";
import loginPic from "../../../assets/img/login_pic.png"; // Import the login image

const Login = () => {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.loginSection}>
        <div
          className={styles.loginImage}
          style={{ backgroundImage: `url(${loginPic})` }}
        >
          <h2>Welcome<br />back</h2>
        </div>

        <div className={styles.loginForm}>
          <h2>Choose platform</h2>
          <div className={styles.socialButtons}>
            <img src={fbLogo} alt="Facebook" />
            <img src={instagramLogo} alt="Instagram" />
            <img src={tiktokLogo} alt="TikTok" />
            <div className={styles.moreButton}>+</div>
          </div>
          <button className={styles.logInButton}>Log in</button>
          <div className={styles.separator}></div>
          <p>
            Don’t have an account? <a href="/register">Sign up</a>
          </p>
          <button className={styles.signUpButton}>Sign up</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
