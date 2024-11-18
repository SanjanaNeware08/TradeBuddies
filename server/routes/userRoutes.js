const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Sign-in (registration) route
router.post("/register", async (req, res) => {
  console.log(req.body.data);
  try {
    const { name, email, phoneNo, password, domain, profilePicture } = req.body;

    // Create a new user object
    const newUser = new User({
      name,
      email,
      phoneNo,
      password,
      domain,
      profilePicture, // Save the Firebase URL directly
    });

    // Save user to the database
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(400).json({ message: error.message });
  }
});

// Profile route to fetch user by ID
router.get('/profile/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" }); // Corrected "Status" to "status"
    }

    res.status(200).json(user); // Corrected "Status" to "status"
  } catch (error) {
    res.status(500).json({ message: error.message }); // Corrected "Status" to "status"
  }
});

// Login route to authenticate user by email and password
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user by email and password (ensure hashing is handled if used)
    const user = await User.findOne({ email, password });
    console.log(user, "this is user");
    if (!user) {
      return res.status(404).json({ message: "Invalid email or password" });
    }
    
    res.status(200).json(user); // Respond with user data on successful login
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/users', async (req, res) => {
  try {
    const { userId } = req.query; // Get the logged-in user's ID from query params

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Fetch all users except the logged-in user
    const users = await User.find({ _id: { $ne: userId } }); // Exclude logged-in user

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json(users); // Send users as response
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.post("/subscribe", async (req, res) => {
  try {
    const { currentUserId, profileId } = req.body;

    // Validate both IDs
    if (!currentUserId || !profileId) {
      return res.status(400).json({ message: "Both user IDs are required" });
    }

    // Check if currentUserId is trying to subscribe to itself
    if (currentUserId === profileId) {
      return res.status(400).json({ message: "You cannot subscribe to yourself" });
    }

    // Add the profileId to the current user's subscribedTo array
    const currentUser = await User.findByIdAndUpdate(
      currentUserId,
      { $addToSet: { subscribedTo: profileId } }, // Use $addToSet to avoid duplicates
      { new: true }
    );

    // Add the currentUserId to the profile user's subscribers array
    const profileUser = await User.findByIdAndUpdate(
      profileId,
      { $addToSet: { subscribers: currentUserId } }, // Use $addToSet to avoid duplicates
      { new: true }
    );

    // Check if both users were updated
    if (!currentUser || !profileUser) {
      return res.status(404).json({ message: "One or both users not found" });
    }

    res.status(200).json({ message: "Subscribed successfully" });
  } catch (error) {
    console.error("Subscription error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

router.get("/subscribed", async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the current user and get the subscribedTo array
    const currentUser = await User.findById(userId).select("subscribedTo");
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch the details of all users in the subscribedTo array
    const subscribedUsers = await User.find({
      _id: { $in: currentUser.subscribedTo },
    }).select("name domain profilePicture");

    res.status(200).json(subscribedUsers);
  } catch (error) {
    console.error("Error fetching subscribed users:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

router.get("/getcourses", async (req, res) => {
  try {
    const { userId } = req.query; // Extract userId from query parameters

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // Fetch the user from the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    console.log(user);

    // Fetch the full objects for all subscribedTo IDs
    const subscribedCourses = await User.find({
      _id: { $in: user.subscribedTo},
    });

    console.log(subscribedCourses);

    // Send back the full objects of subscribed courses
    res.json(subscribedCourses);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;
