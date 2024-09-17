import React from "react";
import styles from "./style.module.scss";
import fbLogo from "../../../assets/icon/facebook_logo.png";
import instagramLogo from "../../../assets/icon/instagram_logo.png";
import tiktokLogo from "../../../assets/icon/tiktok_logo.png";                                                                                                                                                                                                      
import registerPic from "../../../assets/img/register_pic.png";

const Register = () => {
    return (                                                                                                                                                                                                                                          
      <div className={styles.homeContainer}>  
        <div className={styles.registerSection}>
          <div
            className={styles.registerImage}
            style={{ backgroundImage: `url(${registerPic})` }}
          >
            <h2>Become a member now</h2>
          </div>
  
          <div className={styles.registerForm}>
            <h2>Create Account</h2>
            <div className={styles.socialButtons}>
              <img src={fbLogo} alt="Facebook" />
              <img src={instagramLogo} alt="Instagram" />
              <img src={tiktokLogo} alt="TikTok" />
              <div className={styles.moreButton}>+</div>
            </div>
            <button className={styles.signUpButton}>Sign up</button>
            <div className={styles.separator}></div>
            <p>
              Already have an account? <a href="/login">Log in</a>
            </p>
            <button className={styles.logInButton}>Log in</button>
          </div>
        </div>
     
      </div>
    );
  };
  
  export default Register;