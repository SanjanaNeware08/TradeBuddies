import React from 'react';
import Navbar from '../componant/Navbar';
import Footer from '../componant/Footer';
import learn from './learn.jpg';

function Home() {
  return (
    <div
      className="flex flex-col min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${learn})` }}
    >
      <Navbar />
      This is home page
      <div className="flex-grow">
        {/* Additional main content area if needed */}
        This is home page
      </div>
      <div className="relative">
        <Footer />
      </div>
    </div>
  );
}

export default Home;
