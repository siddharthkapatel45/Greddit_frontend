import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import Navbar_OG from "./components/Navbar_OG";
import Profile from './components/Profile';
import Create from './components/Create';
import Home from "./components/Home";
import Login from './components/Login';
import Signup from './components/Signup';
import EditProfile from './components/Edit_Profile';
import CreateCommunity from './components/CreateCommunity';
import CommunityMembers from './components/CommunityMembers';
import Accept from './components/Accept';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check for the authentication token in cookies
    const token = Cookies.get("authToken");
    setIsLoggedIn(!!token); // Set to true if token exists, otherwise false
  }, []);

  return (
    <Router>
      {/* Show Navbar only if logged in */}
      {isLoggedIn && <Navbar_OG />}
      <div className={isLoggedIn ? "mt-14 p-4" : ""}>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          {isLoggedIn ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/profile/*" element={<Profile />} />
              <Route path="/create" element={<Create />} />
              <Route path="/profile/edit_profile" element={<EditProfile />} />
              <Route path="/create-community" element={<CreateCommunity />} />
              <Route path='/community-names' element={<CommunityMembers />} />
              <Route path='/accept' element={<Accept />} />
            </>
          ) : (
            // Redirect to login if not logged in
            <Route path="*" element={<Navigate to="/login" replace />} />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
