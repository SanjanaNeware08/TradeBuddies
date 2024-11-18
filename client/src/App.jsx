import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";

import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import VideoLecture from "./pages/Videolec";
import Profile from "./pages/Profile";
import PrivateRoute from "./componant/PrivateRoute";
import UploadVideo from "./pages/UploadVideo";
import Register from "./pages/Register";
import Explore from "./pages/Explore";
import SearchPage from "./pages/SearchPage";
import PublicRoute from "./componant/PublicRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Router path="/" element={<Home />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/about" element={<About />} />
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/mylec" element={<VideoLecture />} />
          <Route path="/upload" element={<UploadVideo />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/searchpage" element={<SearchPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
