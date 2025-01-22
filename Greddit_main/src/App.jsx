// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar_OG from "./components/Navbar_OG";
import Profile from './components/Profile';
import Create from './components/Create';
import Home from "./components/Home";
import Login  from './components/Login';
import Signup from './components/Signup';
import EditProfile from './components/Edit_Profile';
import CreateCommunity from './components/CreateCommunity';
import CommunityMembers from './components/CommunityMembers';
import Accept from './components/Accept';
function App() {
  return (
    <Router>
      <Navbar_OG />
      <div className="mt-14 p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/*" element={<Profile />}>
            {/* <Route path="post" element={<Post />} />
            <Route path="comment" element={<Comment />} /> */}
          </Route>
          <Route path="/create" element={<Create />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile/edit_profile" element={<EditProfile />} />
          <Route path="/create-community" element={<CreateCommunity />} />
          <Route path='/community-names' element={<CommunityMembers />} />
          <Route path='/accept' element={<Accept />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
