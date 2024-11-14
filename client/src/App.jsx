import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import '@fortawesome/fontawesome-free/css/all.min.css';


import Signin from './pages/Signin';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Help from './pages/Help';
import Login from './pages/Login'
import VideoLecture from './pages/Videolec'
import Profile from './pages/Profile'
import PrivateRoute from './componant/PrivateRoute';
import UploadVideo from './pages/UploadVideo';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Router path="/" element={<Home />} /> */}
        <Route path="/home" element={<Profile />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/help" element={<Help />} />
        <Route path="/login" element={<Login/>}/>
        
        <Route path="/" exact component={Login} />
        <Route element={<PrivateRoute />}>
        <Route path="/profile/:userId" element={<Profile/>} />
        <Route path="/video" element={<VideoLecture/>} />
        <Route path="/upload-video" element={<UploadVideo />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
