import React from "react";
import Wardrobe from "../../components/partials/Wardobe";
import MainHeader from "../../components/layouts/MainHeader";
import Footer from "../../components/layouts/Footer";

const WardrobePage = () => {
  return (
    <div>
      <MainHeader />
      <Wardrobe username={"Huhuhu"} />
      <Footer/>
    </div>
  );
};

export default WardrobePage;
