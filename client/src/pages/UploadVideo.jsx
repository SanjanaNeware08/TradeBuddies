// UploadVideo.js
import React, { useState } from 'react';
import axios from 'axios';

const UploadVideo = () => {
  const [videoLink, setVideoLink] = useState('');
  const [description, setDescription] = useState('');
  const [allowComments, setAllowComments] = useState(false);
  const [likes, setLikes] = useState(0);
  const [isSubscribed, setIsSubscribed] = useState(true); // Replace with actual subscription check
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    setMessage('');

    try {
      const response = await axios.post('http://localhost:3000/api/video', {
        videoLink,
        description,
        allowComments,
      });

      if (response.status === 200) {
        setMessage('Video uploaded successfully!');
      } else {
        setMessage('Failed to upload the video.');
      }
    } catch (error) {
      console.error('Error uploading video:', error);
      setMessage('Error uploading video.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleLike = async () => {
    if (!isSubscribed) {
      alert("You must be subscribed to like this video.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/video/like', { videoLink });
      if (response.status === 200) {
        setLikes(likes + 1);
      }
    } catch (error) {
      console.error('Error liking video:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Upload Video</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Video Link:</label>
            <input
              type="text"
              value={videoLink}
              onChange={(e) => setVideoLink(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded-md"
              rows="4"
              required
            ></textarea>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={allowComments}
              onChange={(e) => setAllowComments(e.target.checked)}
              className="mr-2"
            />
            <label className="text-gray-700">Allow Comments</label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            disabled={isUploading}
          >
            {isUploading ? 'Uploading...' : 'Upload Video'}
          </button>
        </form>

        {message && <p className="mt-4 text-center text-gray-700">{message}</p>}

        {/* Like Button and Counter */}
        <div className="mt-6 flex items-center justify-between">
          
        </div>
      </div>
    </div>
  );
};

export default UploadVideo;
