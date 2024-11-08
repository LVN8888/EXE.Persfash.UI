// App.js
import React from 'react';
import Support from '../../components/partials/Support';
import AuthHeader from '../../components/partials/AuthHeader';
import Footer from '../../components/layouts/Footer';
import MainHeader from '../../components/layouts/MainHeader';


const SupportPage = () => {
  return (
    <div>
        <MainHeader/>
        <Support/>
        <Footer/>
    </div>
  );
};

export default SupportPage;
