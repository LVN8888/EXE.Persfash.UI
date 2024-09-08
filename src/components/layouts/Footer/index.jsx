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
        <p>perfsfash@fpt.edu.vn</p>
        <p>perfsash.com.vn</p>
      </div>
      <div className={styles.column}>
        <h3>Connect</h3>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
        <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">Tiktok</a>
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
