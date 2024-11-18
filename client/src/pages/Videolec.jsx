import React, { useEffect, useState } from 'react';
import Navbar from '../componant/Navbar';
import axios from 'axios'; // Import Axios for making API calls
import { useSelector } from 'react-redux'; // Import useSelector to get user data from Redux

const VideoLecture = () => {
  // State for storing uploaded lectures
  const [uploadedLectures, setUploadedLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Extract logged-in user details from Redux store
  const currentUser = useSelector((state) => state.user?.currentUser);

  // Function to extract YouTube Video ID
  const extractYouTubeVideoID = (url) => {
    const regExp = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null; // Return the video ID or null if invalid
  };

  console.log(currentUser);

  // Fetch videos from the backend
  useEffect(() => {
    const fetchVideos = async () => {
      if (!currentUser?._id) {
        setError('User is not logged in');
        setLoading(false);
        return;
      }

      try {
        console.log('Fetching videos for userId:', currentUser._id);

        // Make API call to fetch videos
        const response = await axios.get('http://localhost:3000/api/video/videos', {
          params: { userId: currentUser._id }, // Pass userId as a query parameter
        });

        // Handle the successful response
        setUploadedLectures(response.data.videos);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch videos');
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchVideos();
    } else {
      setLoading(false); // If user is not logged in, stop loading
    }
  }, [currentUser]);

  // Render individual video lecture card
  const renderLectureCard = (lecture) => {
    const videoID = extractYouTubeVideoID(lecture.videoLink); // Extract video ID from YouTube link
    const videoEmbedURL = `https://www.youtube.com/embed/${videoID}`; // Generate embed URL

    return (
      <div
        key={lecture._id}
        className="bg-white shadow-lg rounded-lg overflow-hidden w-full mb-6 flex items-center space-x-4 p-4"
      >
        {/* Video Section (20-30% width) */}
        <div className="w-1/4">
          {videoID ? (
            <iframe
              src={videoEmbedURL}
              className="w-full h-32 rounded-lg"
              allowFullScreen
              title={lecture.title}
            ></iframe>
          ) : (
            <p className="text-red-500">Invalid video link</p>
          )}
        </div>

        {/* Details Section (Remaining 70-80%) */}
        <div className="w-3/4 flex flex-col space-y-2">
          <h3 className="text-xl font-semibold text-gray-800">{lecture.title}</h3>
          <p className="text-gray-600">{lecture.description}</p>
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>Uploaded on: {new Date(lecture.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          My Lectures
        </h2>

        {/* Display Loading */}
        {loading && <p className="text-center text-gray-500">Loading...</p>}

        {/* Display Error */}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Display Video Lectures */}
        {!loading && !error && uploadedLectures.length > 0 ? (
          uploadedLectures.map(renderLectureCard)
        ) : (
          !loading &&
          !error && (
            <p className="text-center text-gray-500">No videos uploaded yet.</p>
          )
        )}
      </div>
    </div>
  );
};

export default VideoLecture;
