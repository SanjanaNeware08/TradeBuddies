import React, { useState } from "react";
import Navbar from '../componant/Navbar';

// Sample data for domains and their videos
const domainData = {
  Engineering: [
    { id: 1, title: "Basics of Programming", thumbnail: "/images/1.jpg" },
    { id: 2, title: "Advanced JavaScript", thumbnail: "/images/2.jpg" },
  ],
  Cooking: [
    { id: 3, title: "How to Make Pasta", thumbnail: "/images/food2.jpg" },
    { id: 4, title: "A Savory Delight", thumbnail: "/images/food1.jpg" },
  ],
  Artistry: [
    { id: 5, title: "Painting 101", thumbnail: "https://via.placeholder.com/150" },
    { id: 6, title: "Sketching Techniques", thumbnail: "https://via.placeholder.com/150" },
  ],
  Acting: [
    { id: 7, title: "Acting for Beginners", thumbnail: "https://via.placeholder.com/150" },
    { id: 8, title: "Improvisation Tips", thumbnail: "https://via.placeholder.com/150" },
  ],
  Reading: [
    { id: 9, title: "Speed Reading Techniques", thumbnail: "https://via.placeholder.com/150" },
    { id: 10, title: "Analyzing Literature", thumbnail: "https://via.placeholder.com/150" },
  ],
};

const ExplorePage = () => {
  const [selectedDomain, setSelectedDomain] = useState(null); // State to track selected domain

  // Handle domain selection
  const handleDomainClick = (domain) => {
    setSelectedDomain(domain);
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto p-8">
        {/* Explore Header */}
        <h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
          Explore Videos by Domain
        </h2>

        {/* Domain Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {Object.keys(domainData).map((domain) => (
            <button
              key={domain}
              onClick={() => handleDomainClick(domain)}
              className={`px-6 py-3 rounded-lg text-white font-semibold transition duration-300 transform ${
                selectedDomain === domain ? "bg-blue-600" : "bg-blue-300"
              } hover:bg-blue-500 hover:scale-105`}
            >
              {domain}
            </button>
          ))}
        </div>

        {/* Display Selected Domain */}
        {selectedDomain && (
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              {selectedDomain} Videos
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* Render cards for the selected domain */}
              {domainData[selectedDomain].map((video) => (
                <div
                  key={video.id}
                  className="border rounded-lg shadow-lg p-4 bg-white hover:shadow-2xl transform hover:scale-105 transition duration-300"
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-48 object-cover rounded-md"
                  />
                  <h4 className="text-lg font-medium text-gray-800 mt-4">
                    {video.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer /> 
      
    </div>
  );
};

export default ExplorePage;
