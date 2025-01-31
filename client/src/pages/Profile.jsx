import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Navbar from "../componant/Navbar";
import {
  signOutUserStart,
  signOutUserSuccess,
} from "../../redux/user/userSlice";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Retrieve user data from persisted Redux state
  const currentUser = useSelector((state) => state.user.currentUser);
  const userId = currentUser?._id;

  const [user, setUser] = useState(currentUser); // Local state for user data
  const [subscribedSections, setSubscribedSections] = useState([]); // Subscribed user data

  useEffect(() => {
    if (userId) {
      // Send the userId to the backend to fetch the subscribedTo array
      axios
        .get(`http://localhost:3000/api/users/getcourses`, {
          params: { userId: userId }, // Sending userId as query parameter
        })
        .then((response) => {
          console.log("Response from backend:", response.data);
          setSubscribedSections(response.data); // Store subscribed user data
        })
        .catch((error) => {
          console.error("Error fetching subscribed users:", error);
        });
    } else {
      navigate("/login"); // Redirect to login if no userId is available
    }
  }, [userId, navigate]);

  const handleMenuOption = (option) => {
    switch (option) {
      case "upload":
        navigate("/upload"); // Redirect to video upload page
        break;
      case "mylecture":
        navigate(`/mylec`); // Redirect to profile editing page
        break;
      case "logout":
        dispatch(signOutUserStart()); // Trigger loading for sign-out
        dispatch(signOutUserSuccess()); // Clear user data in Redux
        localStorage.removeItem("user"); // Optionally clear any user-related local storage
        navigate("/"); // Redirect to login page
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-green-50 flex">
        {/* Sidebar */}
        <div className="w-1/5 bg-white shadow-lg p-6 flex flex-col items-center">
          {user && user.profilePicture ? (
            <img
              src={user.profilePicture}
              alt="Profile"
              className="w-24 h-24 rounded-full mb-4 shadow-md"
            />
          ) : (
            <i className="fas fa-user-circle text-6xl text-gray-500 mb-4"></i>
          )}

          <h2 className="text-xl font-semibold mb-1">
            {user ? user.name : "Loading..."}
          </h2>
          <p className="text-gray-600 mb-6">{user ? user.email : "Loading..."}</p>

          {/* Navbar Menu */}
          <div className="flex flex-col w-full space-y-2">
            <button
              className="py-2 px-4 bg-blue-500 text-white rounded-md shadow-sm w-full hover:bg-blue-600 transition"
              onClick={() => handleMenuOption("upload")}
            >
              Upload Video
            </button>
            <button
              className="py-2 px-4 bg-blue-500 text-white rounded-md shadow-sm w-full hover:bg-blue-600 transition"
              onClick={() => handleMenuOption("mylecture")}
            >
              My Videos
            </button>
            <button
              className="py-2 px-4 bg-red-500 text-white rounded-md shadow-sm w-full hover:bg-red-600 transition"
              onClick={() => handleMenuOption("logout")}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        {/* Main Content */}
<div className="w-4/5 p-6">
  <h3 className="text-3xl font-semibold mb-6 text-gray-700">
    Subscribed Users
  </h3>

  {subscribedSections.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {subscribedSections.map((section) => (
        <div
          key={section._id} // Use the unique _id from the backend response
          className="flex items-center p-4 bg-white border rounded-lg shadow-lg hover:shadow-xl transition"
        >
          {/* Left Side: Profile Picture */}
          <img
            src={section.profilePicture || "/default-profile.png"} // Default image fallback
            alt={section.name}
            className="w-16 h-16 rounded-full object-cover mr-4"
          />

          {/* Right Side: Name and Domain */}
          <div className="flex flex-col">
            <h4 className="text-lg font-semibold text-gray-800 mb-1">
              {section.name} {/* Render the user's name */}
            </h4>
            <p className="text-sm text-gray-600">
              {section.domain} {/* Render the user's domain */}
            </p>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="flex items-center justify-center p-6 border border-gray-200 rounded-lg text-gray-500">
      <p>No subscribed users yet.</p>
    </div>
  )}
</div>

      </div>
    </div>
  );
};

export default Profile;
