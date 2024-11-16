// UploadVideo.js
import React, { useState } from "react";
import axios from "axios";

const UploadVideo = () => {
  const [videoLink, setVideoLink] = useState("");
  const [videoId, setVideoId] = useState(""); // Extracted YouTube video ID
  const [description, setDescription] = useState("");
  const [allowComments, setAllowComments] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState("");

  // Extract YouTube Video ID
  const extractYouTubeVideoId = (url) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleVideoLinkChange = (e) => {
    const link = e.target.value;
    setVideoLink(link);

    // Extract and set YouTube video ID for preview
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

    try {
      const response = await axios.post("http://localhost:3000/api/video", {
        videoLink, // Full YouTube link
        description,
        allowComments,
      });

      if (response.status === 200) {
        setMessage("Video uploaded successfully!");
        setVideoLink("");
        setVideoId("");
        setDescription("");
        setAllowComments(false);
      } else {
        setMessage("Failed to upload the video.");
      }
    } catch (error) {
      console.error("Error uploading video:", error);
      setMessage("Error uploading video.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Upload YouTube Video</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Video Link Input */}
          <div>
            <label className="block text-gray-700">YouTube Video Link:</label>
            <input
              type="text"
              value={videoLink}
              onChange={handleVideoLinkChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter YouTube video URL"
              required
            />
          </div>

          {/* YouTube Video Preview */}
          {videoId && (
            <div className="mt-4">
              <label className="block text-gray-700 mb-2">Preview:</label>
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                className="w-full h-64 rounded-lg"
                allowFullScreen
                title="YouTube Video Preview"
              ></iframe>
            </div>
          )}

          {/* Description Input */}
          <div>
            <label className="block text-gray-700">Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded-md"
              rows="4"
              placeholder="Add a description for the video"
              required
            ></textarea>
          </div>

          {/* Allow Comments Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={allowComments}
              onChange={(e) => setAllowComments(e.target.checked)}
              className="mr-2"
            />
            <label className="text-gray-700">Allow Comments</label>
          </div>

          {/* Upload Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : "Upload Video"}
          </button>
        </form>

        {/* Status Message */}
        {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
      </div>
    </div>
  );
};

export default UploadVideo;
