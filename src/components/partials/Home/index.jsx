import React from 'react';
import styles from './style.module.scss';

const Home = () => {
  return (
    <div className={styles.homeBackground}>
      <div className={styles.homeContent}>
        <h2>Who we are</h2>
        <p>Even though we're going through it</p>
        <p>And it makes you feel alone</p>
      </div>
    </div>
  );
};

export default Home;
