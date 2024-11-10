import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../componant/Navbar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignIn = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [password, setPassword] = useState('');
  const [domain, setDomain] = useState(''); // New state for domain

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/users/login', { name, email, phoneNo, password, domain });
      console.log("Data sent", response.data);

      // Show success notification
      toast.success("Saved successfully!");

      // Clear the form
      setName('');
      setEmail('');
      setPhoneNo('');
      setPassword('');
      setDomain('');

      // Refresh the page after successful submission
      setTimeout(() => {
        window.location.reload();
      }, 1000); // Wait for 1 seconds before refreshing

    } catch (error) {
      console.error('Sign-in failed:', error);
      toast.error("Failed to save data.");
    }
  };

  return (
    <>
      <Navbar/>
      <div className="flex items-center justify-center min-h-screen bg-blue-300">
        <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Sign In</h2>

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

          {/* New dropdown for domain */}
          <select
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            required
            className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          >
            <option value="" disabled>Select your domain</option>
            <option value="cooking">Cooking</option>
            <option value="artistry">Artistry</option>
            <option value="engineering">Engineering</option>
            <option value="reading">Reading</option>
            <option value="acting">Acting</option>
          </select>

          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded-md font-semibold hover:bg-indigo-600 transition duration-200"
          >
            Sign In
          </button>

          {/* Login link for existing users */}
          <p className="text-center text-gray-600 mt-4">
            Already have an account? <a href="/login" className="text-indigo-500 hover:underline">Login here</a>
          </p>
        </form>

        {/* Toast Container for notifications */}
        <ToastContainer />
      </div>
    </>
  );
};

export default SignIn;
