import React from "react";
import Footer from "./layouts/Footer";

function About() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header section */}
      <header>
        <h1 className="text-center text-2xl">About Us 🤔</h1>
        <p className="text-center">We are just having some fun with React components!</p>
      </header>

      {/* Main content area, flex-grow will make sure it takes up the remaining space */}
      <main className="flex-grow bg-gray-100">
        {/* Your main content here */}
      </main>

      {/* Footer always at the bottom */}
      <Footer />
    </div>
  );
}

export default About;
