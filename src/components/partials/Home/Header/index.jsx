import React from "react";
import styles from "./style.module.scss";
import logo from "../../../../assets/icon/perfash.png";
import globeIcon from "../../../../assets/icon/globe.png";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={logo} alt="persfash logo" />
        <span>persfash</span>
      </div>
      <nav className={styles.nav}>
        <a href="#support" className={styles.support}>
          Support
        </a>
        <button className={styles.loginButton}>Log in</button>
        <button className={styles.signUpButton}>Sign up</button>
        <div className={styles.languageIcon}>
          <img src={globeIcon} alt="language" />
        </div>
      </nav>
    </header>
  );
};

export default Header;
