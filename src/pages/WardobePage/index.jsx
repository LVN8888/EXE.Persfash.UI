import React from "react";
import Wardrobe from "../../components/partials/Wardobe";
import MainHeader from "../../components/layouts/MainHeader";
import Footer from "../../components/layouts/Footer";
import { useAuth } from "../../hooks/useAuth";

const WardrobePage = () => {

  const {user} = useAuth();

  return (
    <div>
      <MainHeader />
      <Wardrobe username={user ? user.username : "Le Nguyen Van"} />
      <Footer/>
    </div>
  );
};

export default WardrobePage;
