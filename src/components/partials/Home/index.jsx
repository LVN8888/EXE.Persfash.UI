import React from 'react';
import styles from './style.module.scss';
import secondImage from '../../../assets/img/bg_2.png'; // Import the second background image

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

      {/* Second Section with Background Image */}
      <div className={styles.secondContent}>
        <div className={styles.secondContentText}>
          <h2>What can we do?</h2>
          <p>Just know that I would die for you</p>
          <p>Baby, I would die for you, yeah</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
