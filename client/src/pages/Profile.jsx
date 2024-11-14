import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { logout } from '../../redux/actions'; // Logout action to clear user data

const Profile = () => {
  const { userId: userIdParam } = useParams(); // userId from URL
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Retrieve user ID from Redux or fallback to URL param
  const userId = useSelector((state) => state.user?.user?._id) || userIdParam;
  const [user, setUser] = useState(null);
  const [subscribedChannels, setSubscribedChannels] = useState([
    { id: 1, title: "React for Beginners", channel: "Code Academy" },
    { id: 2, title: "Advanced JavaScript", channel: "TechieTube" },
  ]);

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:3000/api/users/profile/${userId}`)
        .then(response => {
          setUser(response.data);
        })
        .catch(error => {
          console.error("Error fetching user data:", error);
        });
    } else {
      // Redirect to login if no userId is available
      navigate('/login');
    }
  }, [userId, navigate]);

  const handleMenuOption = (option) => {
    switch (option) {
      case "upload":
        navigate('/upload'); // Redirect to video upload page
        break;
      case "editProfile":
        navigate(`/edit-profile/${userId}`); // Redirect to profile editing page
        break;
      case "logout":
        dispatch(logout()); // Clear user data from Redux
        navigate('/login'); // Redirect to login page
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
            src={user.profilePicture}
            alt="Profile"
            className="w-24 h-24 rounded-full mb-4"
          />
        ) : (
          <i className="fas fa-user-circle text-6xl text-gray-500 mb-4"></i>
        )}
        
        <h2 className="text-xl font-semibold mb-1">
          {user ? user.name : "Loading..."}
        </h2>
        <p className="text-gray-600 mb-4">
          {user ? user.email : "Loading..."}
        </p>

        {/* Navbar Menu */}
        <div className="flex flex-col w-full space-y-2">
          <button
            className="py-2 px-4 bg-blue-500 text-white rounded-md shadow-sm w-full"
            onClick={() => handleMenuOption("upload")}
          >
            Upload Video
          </button>
          <button
            className="py-2 px-4 bg-blue-500 text-white rounded-md shadow-sm w-full"
            onClick={() => handleMenuOption("editProfile")}
          >
            Edit Profile
          </button>
          <button
            className="py-2 px-4 bg-red-500 text-white rounded-md shadow-sm w-full"
            onClick={() => handleMenuOption("logout")}
          >
            Logout
          </button>
        </div>
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
