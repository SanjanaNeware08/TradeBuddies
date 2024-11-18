import React from "react";
import Navbar from "../componant/Navbar";
import Footer from "../componant/Footer";

function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-100 via-white to-green-100">
      <Navbar />

      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-center text-center p-6">
        {/* Title with Shadow */}
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4 drop-shadow-lg">
          Welcome to <span className="text-blue-500">TradeBuddies!</span>
        </h1>
        {/* Subtitle */}
        <p className="text-2xl text-gray-700 mb-8">
          Learn and grow together.
        </p>

        {/* Image */}
        <img
          src="/images/9.jpg"
          alt="Study Environment"
          className="w-1/4 max-w-md rounded-lg shadow-md"
        />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
