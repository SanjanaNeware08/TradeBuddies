import React, { useState } from 'react';

const VideoLecture = () => {
  // State for comments, rating, uploaded lectures, etc.
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('Engineering');
  const [uploadedLectures, setUploadedLectures] = useState([
    {
      id: 1,
      title: 'Introduction to Programming',
      description: 'Basics of programming concepts for beginners.',
      rating: 4.5,
      uploadDate: '2023-10-01',
      videoSrc: 'path/to/your/video1.mp4', // Replace with actual video path or URL
    },
    {
      id: 2,
      title: 'Advanced JavaScript',
      description: 'In-depth look at JavaScript and ES6 features.',
      rating: 4.7,
      uploadDate: '2023-10-15',
      videoSrc: 'path/to/your/video2.mp4', // Replace with actual video path or URL
    },
  ]);

  // Submit new comment
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment(''); // Reset input
    }
  };

  // Handle rating change
  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  // Handle category change
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Render individual video lecture card
  const renderLectureCard = (lecture) => (
    <div key={lecture.id} className="p-4 border rounded-lg shadow-lg bg-white flex space-x-4">
      <div className="w-1/2">
        <video controls src={lecture.videoSrc} className="w-full h-32 rounded-lg"></video>
      </div>
      <div className="w-1/2 flex flex-col justify-between">
        <h3 className="text-lg font-bold text-gray-800">{lecture.title}</h3>
        <p className="text-gray-600 mb-2">{lecture.description}</p>
        <p className="text-gray-500">Rating: {lecture.rating} / 5</p>
        <p className="text-gray-500">Uploaded on: {lecture.uploadDate}</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Video Upload Section */}
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Uploaded Lectures</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Display each uploaded lecture as a card */}
        {uploadedLectures.map(renderLectureCard)}
        
        {/* Add new lecture card */}
        <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-100">
          <button className="text-blue-500 font-bold">+ Add New Lecture</button>
        </div>
      </div>      
    </div>
  );
};

export default VideoLecture;
