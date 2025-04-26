import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import Dashboard from "./screens/DSA/DsaDashboard";
import UserDetails from "./screens/UserDetails/UserDetails";
import CustomRoom from "./screens/CustomRoom";
import Livechatroom from "./screens/LiveChatRoom";
import FollowDashboard from "./screens/FollowDashboard";
import UserUpdateDetails from "./screens/UserDetails/UsersUpdateDetails";
import Feed from "./screens/Feed";
import "./App.css";
import UploadPosts from "./screens/UploadPosts";
import SolvedProblemsList from "./screens/solvedproblemslist";
import AdminDashboard from "./screens/AdminDashboard";
import AboutScreen from "./screens/AboutScreen";
import DevopsScreen from "./screens/DevOps/DevOpsScreen";
import WebDevScreen from "./screens/WebDev/WebDevScreen";
import WebDevProjectsScreen from "./screens/WebDev/WebDevProjectsScreen";
import DevopsProjectsScreen from "./screens/DevOps/DevOpsProjectsScreen";
import DsaCoursesScreen from "./screens/DSA/DsaCoursesScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/userdetails" element={<UserDetails />} />
        <Route path="/userupdatedetails" element={<UserUpdateDetails />} />
        <Route path="/dsadashboard" element={<Dashboard />} />
        <Route path="/follow-dashboard" element={<FollowDashboard />} />
        <Route path="/upload-post" element={<UploadPosts />} />
        <Route path="/room/:roomId" element={<CustomRoom />} />
        <Route path="/questionroom/:publicroomID" element={<Livechatroom />} />
        <Route path="/Feed" element={<Feed />} />
        <Route
          path="/customroom/:publicRoomId/:privateRoomId"
          element={<CustomRoom />}
        />
        <Route path="/solvedproblemslist" element={<SolvedProblemsList />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/about" element={<AboutScreen />} />
        <Route path="/webdev" element={<WebDevScreen />} />
        <Route path="/devops" element={<DevopsScreen />} />
        <Route path="/webdevprojects" element={<WebDevProjectsScreen />} />
        <Route path="/devopsprojects" element={<DevopsProjectsScreen />} />
        <Route path="/dsacourses" element={<DsaCoursesScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
