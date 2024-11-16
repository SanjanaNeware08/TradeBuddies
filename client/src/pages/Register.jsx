import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../componant/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");
  const [domain, setDomain] = useState("");
  const [profilePicture, setProfilePicture] = useState(null); // New state for profile picture
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phoneNo", phoneNo);
    formData.append("password", password);
    formData.append("domain", domain);
    if (profilePicture) {
      formData.append("profilePicture", profilePicture); // Append the profile picture
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set the correct header
          },
        }
      );
      console.log("Data sent", response.data);

      // Show success notification
      toast.success("Registration successful!");

      // Clear the form
      setName("");
      setEmail("");
      setPhoneNo("");
      setPassword("");
      setDomain("");
      setProfilePicture(null);

      // Redirect to login page after a short delay
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Failed to save data.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-blue-300">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg"
          encType="multipart/form-data" // Add encoding type for file upload
        >
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
            Register
          </h2>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />

          <input
            type="number"
            placeholder="Phone no."
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
            required
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />

          {/* Domain Dropdown */}
          <select
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            required
            className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          >
            <option value="" disabled>
              Select your domain
            </option>
            <option value="cooking">Cooking</option>
            <option value="artistry">Artistry</option>
            <option value="engineering">Engineering</option>
            <option value="reading">Reading</option>
            <option value="acting">Acting</option>
          </select>

          {/* Profile Picture Upload */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Profile Picture
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfilePicture(e.target.files[0])}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded-md font-semibold hover:bg-indigo-600 transition duration-200"
          >
            Register
          </button>

          <p className="text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-indigo-500 hover:underline">
              Login here
            </a>
          </p>
        </form>

        <ToastContainer />
      </div>
    </>
  );
};

export default Register;
