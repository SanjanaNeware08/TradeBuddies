import React, { useState } from 'react';

const VideoLecture = () => {
  // State for comments, rating, and form input
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('Engineering');

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

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Video Lecture */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Video Lecture: Introduction to Programming</h2>
        <video
          controls
          className="w-full h-64 rounded-lg"
          src="path/to/your/video.mp4" // Replace with actual video path or URL
        ></video>
      </div>

      {/* Category Selection */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Category:</label>
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
        >
          <option value="Engineering">Engineering</option>
          <option value="Cooking">Cooking</option>
          <option value="Artistry">Artistry</option>
          <option value="Reading">Reading</option>
          <option value="Acting">Acting</option>
        </select>
      </div>

      {/* Rating */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Rate this lecture:</label>
        <input
          type="number"
          value={rating}
          onChange={handleRatingChange}
          min="0"
          max="5"
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
        />
        <p className="text-gray-500 mt-1">Rating: {rating} / 5</p>
      </div>

      {/* Comments Section */}
      <div>
        <h3 className="text-lg font-bold mb-2 text-gray-800">Comments</h3>
        <form onSubmit={handleCommentSubmit} className="mb-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none resize-none"
          ></textarea>
          <button
            type="submit"
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Submit Comment
          </button>
        </form>

        {/* Display Comments */}
        <div className="space-y-4">
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                <p>{comment}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No comments yet. Be the first to comment!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoLecture;
