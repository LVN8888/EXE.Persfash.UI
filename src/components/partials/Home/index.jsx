import React from "react";
import styles from "./style.module.scss";
import pic3 from "../../../assets/img/pic_3.png";
import pic4 from "../../../assets/img/pic_4.png";
import fbLogo from "../../../assets/icon/facebook_logo.png";
import instagramLogo from "../../../assets/icon/instagram_logo.png";
import tiktokLogo from "../../../assets/icon/tiktok_logo.png";
import registerPic from "../../../assets/img/register_pic.png";

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.homeBackground}>
        <div className={styles.homeContent}>
          <h2>Who we are</h2>
          <p>Even though we're going through it</p>
          <p>And it makes you feel alone</p>
        </div>
      </div>

      <div className={styles.space}></div>

      <div className={styles.secondContent}>
        <div className={styles.secondContentText}>
          <h2>What can we do?</h2>
          <p>Just know that I would die for you</p>
          <p>Baby, I would die for you, yeah</p>
        </div>
      </div>

      <div className={styles.thirdContent}>
        <div
          className={styles.card}
          style={{ backgroundImage: `url(${pic3})` }}
        >
          <div className={styles.cardTitle}>
            <h2>A.I</h2>
          </div>
          <div className={styles.cardText}>
            <p>
              Simultaneously, your long-term vision encompasses the
              establishment of your own studio. Armed with the knowledge and
              experience gained from your early career, you envision a space
              where you can cater to both individual clients and larger-scale
              projects.
            </p>
          </div>
        </div>
        <div
          className={styles.card}
          style={{ backgroundImage: `url(${pic4})` }}
        >
          <div className={styles.cardTitle}>
            <h2>
              Consulting <span className={styles.experts}>with experts</span>
            </h2>
          </div>
          <div className={styles.cardText}>
            <p>
              Simultaneously, your long-term vision encompasses the
              establishment of your own studio. Armed with the knowledge and
              experience gained from your early career, you envision a space
              where you can cater to both individual clients and larger-scale
              projects.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.registerSection}>
        <div
          className={styles.registerImage}
          style={{ backgroundImage: `url(${registerPic})` }}
        >
          <h2>Become a member now.</h2>
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
            Already have an account? <a href="#">Log in</a>
          </p>
          <button className={styles.logInButton}>Log in</button>
        </div>
      </div>
      <div className={styles.spaceBottom}></div>
      <div className={styles.space}></div>
    </div>
  );
};

export default Home;
