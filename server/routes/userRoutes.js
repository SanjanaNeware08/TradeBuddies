const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/signin', async (req, res) => {
  try {
    // Print incoming user data from the request body
    console.log("Received user data:", req.body);
    
    // Create a new user instance with the incoming data
    const newUser = new User(req.body);
    
    // Save the user to the database
    await newUser.save();
    
    // Respond with the saved user data
    res.status(201).json(newUser);
  } catch (error) {
    // Handle and send back any errors
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
