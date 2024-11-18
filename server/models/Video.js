const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the 'users' collection
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  videoLink: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now // Automatically set the upload time
  }
});

// Create the Video model
const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
