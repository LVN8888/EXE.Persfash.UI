import React from "react";
import styles from "./style.module.scss";
import secondImage from "../../../assets/img/bg_2.png";
import pic3 from "../../../assets/img/pic_3.png";
import pic4 from "../../../assets/img/pic_4.png";

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      {/* First Section */}
      <div className={styles.homeBackground}>
        <div className={styles.homeContent}>
          <h2>Who we are</h2>
          <p>Even though we're going through it</p>
          <p>And it makes you feel alone</p>
        </div>
      </div>

      {/* Gap between sections */}
      <div className={styles.space}></div>

      {/* Second Section */}
      <div className={styles.secondContent}>
        <div className={styles.secondContentText}>
          <h2>What can we do?</h2>
          <p>Just know that I would die for you</p>
          <p>Baby, I would die for you, yeah</p>
        </div>
      </div>

      {/* Third Section with two cards */}
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
    </div>
  );
};

export default Home;
