import React from 'react';
import Navbar from '../componant/Navbar';
import Footer from '../componant/Footer';

function Home() {
  return (
    <div className="flex flex-col min-h-screen"> {/* Use flex and min-h-screen to make the container full height */}
      <Navbar />
      <div className="flex-grow"> {/* This ensures the main content area takes up available space */}
        {/* Main content goes here */}
      </div>
      <Footer /> {/* Footer will now be at the bottom */}
    </div>
  );
}

export default Home;
