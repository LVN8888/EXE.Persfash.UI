import React from "react";
import Home from "../../components/partials/Home";
import Footer from "../../components/layouts/Footer";
import Header from "../../components/partials/Home/Header";
import topImage from "../../assets/img/main.png";
import styles from "./style.module.scss";

const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <div className={styles.topSection}>
        <img src={topImage} alt="persfash top" className={styles.topImage} />
      </div>
      <Header />
      <Home />
      <Footer />
    </div>
  );
};

export default HomePage;
