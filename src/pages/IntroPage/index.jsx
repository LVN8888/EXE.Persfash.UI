import React from "react";
import Intro from "../../components/partials/Intro";
import Footer from "../../components/layouts/Footer";
import Header from "../../components/partials/Intro/Header";
import topImage from "../../assets/img/main.png";
import styles from "./style.module.scss";

const IntroPage = () => {
  return (
    <div className={styles.introPage}>
      <div className={styles.topSection}>
        <img src={topImage} alt="persfash top" className={styles.topImage} />
      </div>
      <div className={styles.space}></div>
      <Header />
      <Intro />
      <Footer />
    </div>
  );
};

export default IntroPage;
