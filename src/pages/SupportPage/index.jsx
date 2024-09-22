// App.js
import React from 'react';
import Support from '../../components/partials/Support';
import AuthHeader from '../../components/partials/AuthHeader';
import Footer from '../../components/layouts/Footer';


const SupportPage = () => {
  return (
    <div>
        <AuthHeader/>
        <Support/>
        <Footer/>
    </div>
  );
};

export default SupportPage;
