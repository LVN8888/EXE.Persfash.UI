import React from 'react';
import styles from './style.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.column}>
        <h3 className={styles.logo}>Persfash</h3>
        <p>Support 24/7</p>
        <p>FAQs</p>
        <p className={styles.specialText}>2024</p>
        <p className={styles.specialText}>Data Privacy</p>
      </div>
      <div className={styles.column}>
        <h3>Get in touch</h3>
        <p>support@persfash.store</p>
        <p>perfsash.store</p>
      </div>
      <div className={styles.column}>
        <h3>Connect</h3>
        <a href="https://www.facebook.com/persfash" target="_blank" rel="noopener noreferrer">Facebook</a>
        <a href="https://www.instagram.com/pers.fash/" target="_blank" rel="noopener noreferrer">Instagram</a>
      </div>
      <div className={styles.column}>
        <h3>Address</h3>
        <p>Vinhomes Grand Park</p>
        <p>Nguyen Xien Str, Long Thanh My District</p>
        <p>Thu Duc City, Ho Chi Minh City ,Vietnam</p>
      </div>
    </footer>
  );
};

export default Footer;
