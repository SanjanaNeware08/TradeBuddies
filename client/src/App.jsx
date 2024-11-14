import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";

import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Help from "./pages/Help";
import Login from "./pages/Login";
import VideoLecture from "./pages/Videolec";
import Profile from "./pages/Profile";
import PrivateRoute from "./componant/PrivateRoute";
import UploadVideo from "./pages/UploadVideo";
import Register from "./pages/Register";
import PublicRoute from "./componant/PublicRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Router path="/" element={<Home />} /> */}
        <Route path="/home" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/help" element={<Help />} />
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/video" element={<VideoLecture />} />
          <Route path="/upload-video" element={<UploadVideo />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
