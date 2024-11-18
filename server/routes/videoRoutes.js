const express = require('express');
const Video = require('../models/Video'); // Import the Video model
const router = express.Router();

// POST route to upload a video
router.post('/upload', async (req, res) => {
  try {
    const { userId, title, description, videoLink } = req.body;

    // Validate the required fields
    if (!userId || !title || !description || !videoLink) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new video
    const newVideo = new Video({
      userId,
      title,
      description,
      videoLink,
      createdAt: new Date(),
    });

    // Save the video to the database
    const savedVideo = await newVideo.save();

    res.status(201).json({
      message: "Video uploaded successfully",
      video: savedVideo,
    });
  } catch (error) {
    console.error("Error uploading video:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// GET route to fetch videos by userId
router.get('/videos', async (req, res) => {
  try {
    const { userId } = req.query; // Get userId from the query parameters

    // Validate userId
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Find videos matching the userId
    const videos = await Video.find({ userId });

    if (!videos.length) {
      return res.status(404).json({ message: "No videos found for this user" });
    }

    res.status(200).json({
      message: "Videos fetched successfully",
      videos,
    });
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});


module.exports = router;
