import React, { useState } from "react";
import Navbar from "../componant/Navbar"; // Assuming Navbar component exists

// Sample data for profiles
const profileData = [
  { id: 1, name: "Anushka Sahu", domain: "Reading", image: "/images/anushka.jpg" },
  { id: 4, name: "Neel Baghel", domain: "Engineering", image: "/images/neelesh.jpg" },
  { id: 2, name: "Adwitiya Khare", domain: "Engineering", image: "/images/adwitiya.jpg" },
  { id: 3, name: "Mansi Birle", domain: "Cooking", image: "/images/mansi.jpg" },
  { id: 5, name: "Shivm Rajput", domain: "Acting", image: "/images/shivam.jpg" },
  { id: 6, name: "Sanjana Neware", domain: "Reading", image: "/images/sanjana.jpg" },
];

const SearchPage = () => {
  const [searchText, setSearchText] = useState(""); // State to track search input

  // Filter profiles based on the search text
  const filteredProfiles = profileData.filter((profile) =>
    profile.name.toLowerCase().includes(searchText.toLowerCase()) ||
    profile.domain.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6">
        {/* Search Section */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <h2 className="text-3xl font-bold text-gray-800">Get Your Buddy!</h2>
          <input
            type="text"
            placeholder="Search by name or domain..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="flex-grow max-w-md p-3 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Profile Cards */}
        <div className="space-y-6">
          {filteredProfiles.map((profile) => (
            <div
              key={profile.id}
              className="flex items-center bg-white p-4 shadow-lg rounded-lg"
            >
              {/* Profile Image */}
              <img
                src={profile.image}
                alt={profile.name}
                className="w-32 h-32 rounded-full object-cover flex-shrink-0"
              />

              {/* Profile Details */}
              <div className="ml-6">
                <h3 className="text-2xl font-bold text-gray-800">{profile.name}</h3>
                <p className="text-lg text-gray-600">{profile.domain}</p>
              </div>
            </div>
          ))}

          {/* Message if no profiles are found */}
          {filteredProfiles.length === 0 && (
            <p className="text-center text-gray-500 mt-6">No profiles found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
