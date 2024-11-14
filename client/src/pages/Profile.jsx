import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [subscribedChannels, setSubscribedChannels] = useState([
    // Example data; replace with a fetch call in a real app
    { id: 1, title: "React for Beginners", channel: "Code Academy" },
    { id: 2, title: "Advanced JavaScript", channel: "TechieTube" },
  ]);

  useEffect(() => {
    // Fetch logged-in user data from API (replace URL with your backend route)
    axios.get('http://localhost:3000/api/users/profile') // Assuming profile route returns user info
      .then(response => {
        setUser(response.data); // Update the user state with API response data
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const handleMenuOption = (option) => {
    switch (option) {
      case "upload":
        // Handle video upload logic here
        break;
      case "editProfile":
        // Handle edit profile logic here
        break;
      case "editChannel":
        // Handle edit channel logic here
        break;
      case "logout":
        // Handle logout logic here
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-1/5 bg-white shadow-md p-6 flex flex-col items-center">
          {user && user.profilePicture ? (
          <img
            src={user.profilePicture} // Make sure this path points to the profile picture URL in your user data
            alt="Profile"
            className="w-24 h-24 rounded-full mb-4"
          />
        ) : (
          <i className="fas fa-user-circle text-6xl text-gray-500 mb-4"></i> // Display icon if no profile picture
        )}
        
        <h2 className="text-xl font-semibold mb-1">
          {user ? user.name : "Loading..."}
        </h2>
        <p className="text-gray-600 mb-4">
          {user ? user.email : "Loading..."}
        </p>

        {/* Dropdown Menu */}
        <select
          className="py-2 px-4 border rounded-md text-gray-700 bg-white shadow-sm w-full"
          onChange={(e) => handleMenuOption(e.target.value)}
        >
          <option value="">Options</option>
          <option value="upload">Upload Video</option>
          <option value="editProfile">Edit Profile</option>
          <option value="editChannel">Edit Channel</option>
          <option value="logout">Logout</option>
        </select>
      </div>

      {/* Main Content */}
      <div className="w-4/5 p-6">
        <h3 className="text-2xl font-semibold mb-4">Subscribed Lectures</h3>

        {subscribedChannels.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subscribedChannels.map((lecture) => (
              <div
                key={lecture.id}
                className="p-4 border rounded-lg shadow-sm bg-gray-50"
              >
                <h4 className="text-lg font-semibold">{lecture.title}</h4>
                <p className="text-gray-600">{lecture.channel}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center p-6 border border-gray-200 rounded-lg text-gray-500">
            <p>No subscribed channels yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
