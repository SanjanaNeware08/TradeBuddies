import React, { useState } from 'react';

const Navbar = () => {
  const [isExploreOpen, setIsExploreOpen] = useState(false);

  // Toggle the dropdown visibility
  const toggleExploreDropdown = () => {
    setIsExploreOpen(!isExploreOpen);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <a href="/" className="text-2xl font-bold text-blue-500">TradeBuddies</a>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="/" className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-lg font-medium">
              Home
            </a>

            {/* Explore Dropdown */}
            <div className="relative">
              <button 
                onClick={toggleExploreDropdown} 
                className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-lg font-medium focus:outline-none">
                Explore
              </button>
              {isExploreOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                  <a href="/explore/option1" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">Cooking</a>
                  <a href="/explore/option2" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">Artistry</a>
                  <a href="/explore/option3" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">Banking</a>
                  <a href="/explore/option3" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">Acting</a>
                  <a href="/explore/option3" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">Engineering</a>
                  <a href="/explore/option3" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">Readers</a>
                </div>
              )}
            </div>

            <a href="/help" className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-lg font-medium">
              Help
            </a>
            <a href="/login" className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-lg font-medium">
              Sign In
            </a>
          </div>
          <div className="md:hidden flex items-center">
            <button className="mobile-menu-button focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className="mobile-menu hidden md:hidden">
        <a href="/" className="block text-gray-600 hover:text-blue-500 px-4 py-2">Home</a>
        <a href="/explore" className="block text-gray-600 hover:text-blue-500 px-4 py-2">Explore</a>
        <a href="/help" className="block text-gray-600 hover:text-blue-500 px-4 py-2">Help</a>
        <a href="/signin" className="block text-gray-600 hover:text-blue-500 px-4 py-2">Sign in</a>
      </div>
    </nav>
  );
};

export default Navbar;
