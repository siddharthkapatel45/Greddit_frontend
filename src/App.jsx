import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
  return (
    <Router>
      {/* Navbar will always be shown */}
      <Navbar_OG />
      
      <div className="mt-14 p-4">
        <Routes>
          {/* Public Routes */}
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />

          {/* Other Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/profile/*" element={<Profile />} />
          <Route path="/create" element={<Create />} />
          <Route path="/profile/edit_profile" element={<EditProfile />} />
          <Route path="/create-community" element={<CreateCommunity />} />
          <Route path="/community-names" element={<CommunityMembers />} />
          <Route path="/accept" element={<Accept />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
