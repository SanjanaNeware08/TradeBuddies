import React, { useState, useEffect } from "react";
import Navbar from "../componant/Navbar"; // Assuming Navbar component exists
import axios from "axios"; // Import axios for API calls
import { useSelector } from "react-redux"; // Import useSelector for Redux state access

const SearchPage = () => {
  const [searchText, setSearchText] = useState(""); // State to track search input
  const [profiles, setProfiles] = useState([]); // State for all profiles
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Get the logged-in user's ID from Redux state
  const currentUser = useSelector((state) => state.user?.currentUser);
  const currentUserId = currentUser?._id;

  // Fetch all users except the logged-in user
  useEffect(() => {
    const fetchUsers = async () => {
      if (!currentUserId) {
        setError("Logged-in user ID not found");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:3000/api/users/users", {
          params: { userId: currentUserId }, // Pass currentUserId as a query parameter
        });
        setProfiles(response.data); // Set profiles from API response
        setLoading(false); // Stop loading
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch users");
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentUserId]); // Fetch users whenever currentUserId changes

  // Filter profiles based on the search text
  const filteredProfiles = profiles.filter((profile) =>
    profile.name.toLowerCase().includes(searchText.toLowerCase()) ||
    profile.domain.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSubscribe = async (profileId) => {
    try {
      const response = await axios.post("http://localhost:3000/api/users/subscribe", {
        currentUserId, // Pass the logged-in user's ID
        profileId, // Pass the ID of the user to subscribe to
      });

      alert(response.data.message); // Show success message
    } catch (err) {
      console.error("Subscription error:", err);
      alert(err.response?.data?.message || "Failed to subscribe");
    }
  };

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

        {/* Display Loading */}
        {loading && <p className="text-center text-gray-500">Loading...</p>}

        {/* Display Error */}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Profile Cards */}
        <div className="space-y-6">
          {filteredProfiles.map((profile) => (
            <div
              key={profile._id}
              className="flex items-center bg-white p-4 shadow-lg rounded-lg"
            >
              {/* Profile Image */}
              <img
                src={profile.profilePicture || "/default-profile.png"}
                alt={profile.name}
                className="w-32 h-32 rounded-full object-cover flex-shrink-0"
              />

              {/* Profile Details */}
              <div className="ml-6">
                <h3 className="text-2xl font-bold text-gray-800">{profile.name}</h3>
                <p className="text-lg text-gray-600">{profile.domain}</p>

                {/* Subscribe Button */}
                <button
                  onClick={() => handleSubscribe(profile._id)}
                  className="mt-4 bg-blue-500 text-white p-2 rounded-lg"
                >
                  Subscribe
                </button>
              </div>
            </div>
          ))}

          {/* Message if no profiles are found */}
          {!loading && filteredProfiles.length === 0 && (
            <p className="text-center text-gray-500 mt-6">No profiles found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
