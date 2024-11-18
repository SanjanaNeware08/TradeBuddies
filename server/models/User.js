const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true, // Ensure email is unique
    },

    phoneNo: {
      type: Number,
      required: true,
      unique: true, // Ensure phone number is unique
    },

    password: {
      type: String,
      required: true,
    },

    domain: {
      type: String,
      required: true,
    },

    profilePicture: {
      type: String, // Store the URL to the image
      default: "https://via.placeholder.com/150", // Default placeholder image if no profile pic
    },

    // New fields to manage subscriptions
    subscriberId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model to track users who have subscribed to this user
      },
    ],

    subscribedTo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model to track users this user is subscribed to
      },
    ],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt timestamps
  }
);

const User = mongoose.model("User", schema);

module.exports = User;
