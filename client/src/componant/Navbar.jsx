import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  // Toggle Explore dropdown
  const toggleExploreDropdown = () => {
    setIsExploreOpen(!isExploreOpen);
  };

  // Toggle Profile dropdown
  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  // Logout Handler
  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user data from local storage
    setUser(null); // Clear user state
    navigate("/"); // Redirect to the homepage
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-blue-500">
              TradeBuddies
            </Link>
          </div>

          {/* Navbar Links */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link
              to="/"
              className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-lg font-medium"
            >
              Home
            </Link>

            {/* Explore Dropdown */}
            <div className="relative">
              <button
                onClick={toggleExploreDropdown}
                className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-lg font-medium focus:outline-none"
              >
                Explore
              </button>
              {isExploreOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                  <Link
                    to="/explore/cooking"
                    className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                  >
                    Cooking
                  </Link>
                  <Link
                    to="/explore/artistry"
                    className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                  >
                    Artistry
                  </Link>
                  <Link
                    to="/explore/banking"
                    className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                  >
                    Banking
                  </Link>
                  <Link
                    to="/explore/acting"
                    className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                  >
                    Acting
                  </Link>
                  <Link
                    to="/explore/engineering"
                    className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                  >
                    Engineering
                  </Link>
                  <Link
                    to="/explore/readers"
                    className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                  >
                    Readers
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/help"
              className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-lg font-medium"
            >
              Help
            </Link>

            {/* Profile Picture or Sign In */}
            {user ? (
              <div className="relative">
                {/* Profile Picture Button */}
                <button
                  onClick={toggleProfileDropdown}
                  className="flex items-center focus:outline-none"
                >
                  <img
                    src={user.profilePicture || "https://via.placeholder.com/40"}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                </button>

                {/* Profile Dropdown */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      View Profile
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsProfileDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/signin"
                className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-lg font-medium"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button className="mobile-menu-button focus:outline-none">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="mobile-menu hidden md:hidden">
        <Link
          to="/"
          className="block text-gray-600 hover:text-blue-500 px-4 py-2"
        >
          Home
        </Link>
        <Link
          to="/explore"
          className="block text-gray-600 hover:text-blue-500 px-4 py-2"
        >
          Explore
        </Link>
        <Link
          to="/help"
          className="block text-gray-600 hover:text-blue-500 px-4 py-2"
        >
          Help
        </Link>
        <Link
          to="/signin"
          className="block text-gray-600 hover:text-blue-500 px-4 py-2"
        >
          Sign in
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
