import React from 'react';
import Home from '../../components/partials/Home';  
import Footer from '../../components/layouts/Footer';

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <div className="flex-grow bg-cover bg-center w-full h-full">
        <Home />
      </div>
      <Footer/>
    </div>
  );
};

export default HomePage;
