import React, { useState } from 'react';
import Navbar from '../componant/Navbar';

const VideoLecture = () => {
  // Extract YouTube Video ID
  const extractYouTubeVideoID = (url) => {
    const regExp = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null; // Return the video ID or null if invalid
  };

  const [uploadedLectures] = useState([
    {
      id: 1,
      title: 'Introduction to Programming',
      description: 'Basics of programming concepts for beginners.',
      rating: 4.5,
      uploadDate: '2023-10-01',
      videoLink: 'https://youtu.be/ifo76VyrBYo?si=TMvpGpR4CZ28b6xA', // YouTube video link
    },
    {
      id: 2,
      title: 'Advanced JavaScript',
      description: 'In-depth look at JavaScript and ES6 features.',
      rating: 4.7,
      uploadDate: '2023-10-15',
      videoLink: 'https://youtu.be/R9I85RhI7Cg?si=M459G8iDtjpCWiam', // YouTube video link
    },
  ]);

  // Render individual video lecture card
  const renderLectureCard = (lecture) => {
    const videoID = extractYouTubeVideoID(lecture.videoLink); // Extract video ID from YouTube link
    const videoEmbedURL = `https://www.youtube.com/embed/${videoID}`; // Generate embed URL

    return (
      <div key={lecture.id} className="bg-white shadow-lg rounded-lg overflow-hidden w-full mb-6 flex items-center space-x-4 p-4">
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
            <span>Rating: {lecture.rating} / 5</span>
            <span>Uploaded on: {lecture.uploadDate}</span>
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

        {/* Display each uploaded lecture as a full-width card */}
        {uploadedLectures.map(renderLectureCard)}
      </div>
    </div>
  );
};

export default VideoLecture;
