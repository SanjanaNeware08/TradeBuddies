import React, { useState } from "react";
import axios from "axios";
import Navbar from "../componant/Navbar";
import { useSelector } from "react-redux"; // Import Redux hook

const UploadVideo = () => {
  const [videoLink, setVideoLink] = useState("");
  const [videoId, setVideoId] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState("");

  // Get user data from Redux Persist
  const userState = useSelector((state) => state.user); // Adjust based on your store's structure
  const currentUser = userState?.currentUser; // Directly use currentUser
  const userId = currentUser?._id; // Extract user ID

  // Extract YouTube Video ID
  const extractYouTubeVideoId = (url) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleVideoLinkChange = (e) => {
    const link = e.target.value;
    setVideoLink(link);

    const extractedId = extractYouTubeVideoId(link);
    setVideoId(extractedId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    setMessage("");

    if (!videoId) {
      setMessage("Invalid YouTube link. Please provide a valid URL.");
      setIsUploading(false);
      return;
    }

    if (!userId) {
      setMessage("User not logged in. Please log in to upload a video.");
      setIsUploading(false);
      return;
    }

  const userData = {
    userId, // Pass the logged-in user's ID
    videoLink,
    title,
    description,
  }

    console.log(userData);

    try {
      const response = await axios.post("http://localhost:3000/api/video/upload", userData);

      if (response.status === 201) {
        setMessage("🎉 Video uploaded successfully!");
        setVideoLink("");
        setVideoId("");
        setDescription("");
        setTitle("");
      } else {
        setMessage("❌ Failed to upload the video.");
      }
    } catch (error) {
      console.error("Error uploading video:", error);
      setMessage("❌ Error uploading video.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100 py-8 px-4">
        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm">
          <h2 className="text-2xl font-semibold text-center text-blue-600 mb-4">
            Upload Your Video 🎥
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Video Title Input */}
            <div>
              <label className="block text-gray-800 font-medium mb-1">
                Video Title:
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter the video title"
                required
              />
            </div>

            {/* Video Link Input */}
            <div>
              <label className="block text-gray-800 font-medium mb-1">
                Enter Video Link:
              </label>
              <input
                type="text"
                value={videoLink}
                onChange={handleVideoLinkChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Paste URL here"
                required
              />
            </div>

            {/* YouTube Video Preview */}
            {videoId && (
              <div>
                <label className="block text-gray-800 font-medium mb-1">
                  Video Preview:
                </label>
                <div className="overflow-hidden rounded-lg shadow-md">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    className="w-full h-40 rounded-lg"
                    allowFullScreen
                    title="YouTube Video Preview"
                  ></iframe>
                </div>
              </div>
            )}

            {/* Description Input */}
            <div>
              <label className="block text-gray-800 font-medium mb-1">
                Description:
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows="3"
                placeholder="Add a brief description"
                required
              ></textarea>
            </div>

            {/* Upload Button */}
            <button
              type="submit"
              className={`w-full p-2 rounded-md text-white font-semibold transition duration-300 ${
                isUploading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Upload Video"}
            </button>
          </form>

          {/* Status Message */}
          {message && (
            <p
              className={`mt-4 text-center text-sm font-medium ${
                message.includes("🎉")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadVideo;
