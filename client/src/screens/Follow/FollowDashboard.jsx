import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import Layout from "../../Layout1/Layout.jsx";
import { motion, AnimatePresence } from "framer-motion";

const FollowDashboard = () => {
  const [followingName, setFollowingName] = useState(""), [followedName, setFollowedName] = useState(""), [message, setMessage] = useState("");
  const [isFollowing, setIsFollowing] = useState(false), [followingCount, setFollowingCount] = useState(0), [followerCount, setFollowerCount] = useState(0);
  const [showProfile, setShowProfile] = useState(false), [searchResults, setSearchResults] = useState([]), [selectedUser, setSelectedUser] = useState(null);
  const dropdownRef = useRef(null), [profileimage, setProfileimage] = useState(""), [recentSearches, setRecentSearches] = useState([]);

  // Sample users to show as flashcards before any search is clicked
  const sampleUsers = [
    { _id: "sample1", name: "APJ Abdul Kalam", profileimage: "https://api.dicebear.com/7.x/micah/svg?seed=APJAbdulKalam" },
    { _id: "sample2", name: "Sachin Tendulkar", profileimage: "https://api.dicebear.com/7.x/micah/svg?seed=SachinTendulkar" },
    { _id: "sample3", name: "Kalpana Chawla", profileimage: "https://api.dicebear.com/7.x/micah/svg?seed=KalpanaChawla" },
    { _id: "sample4", name: "Virat Kohli", profileimage: "https://api.dicebear.com/7.x/micah/svg?seed=ViratKohli" },
    { _id: "sample5", name: "Ratan Tata", profileimage: "https://api.dicebear.com/7.x/micah/svg?seed=RatanTata" },
    { _id: "sample6", name: "MS Dhoni", profileimage: "https://api.dicebear.com/7.x/micah/svg?seed=MSDhoni" },
    { _id: "sample7", name: "PV Sindhu", profileimage: "https://api.dicebear.com/7.x/micah/svg?seed=PVSindhu" },
    { _id: "sample8", name: "Neeraj Chopra", profileimage: "https://api.dicebear.com/7.x/micah/svg?seed=NeerajChopra" },
    { _id: "sample9", name: "Sundar Pichai", profileimage: "https://api.dicebear.com/7.x/micah/svg?seed=SundarPichai" },
    { _id: "sample10", name: "Lata Mangeshkar", profileimage: "https://api.dicebear.com/7.x/micah/svg?seed=LataMangeshkar" }
  ];

  // Fetch the current user's name and follow counts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(process.env.REACT_APP_USER_PROFILE, { withCredentials: true });
        const user = res.data.user;
        setFollowingName(user.name);
        setFollowerCount(user.followed_count || 0);
        setFollowingCount(user.following_count || 0);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setMessage("Error fetching user data");
      }
    };
    fetchUserData();
    if (followedName) checkFollowingStatus();
  }, [followedName]);
    
  // Check if the user is already following the followed user
  const checkFollowingStatus = async () => {
    if (!followingName || !followedName) return;
    try {
      const response = await axios.post(process.env.REACT_APP_CHECK_FOLLOWING, 
        { following_name: followingName, followed_name: followedName }, { withCredentials: true });
      setIsFollowing(response.data.isFollowing);
    } catch (error) {
      console.error("Error checking following status:", error);
    }
  };

  // Handle following a user
  const handleFollow = async () => {
    try {
      const response = await axios.post(process.env.REACT_APP_FOLLOW,
        { following_name: followingName, followed_name: followedName }, { withCredentials: true });
      setMessage(response.data.message);
      setIsFollowing(true);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error following user");
    }
  };
  
  const handleUnfollow = async () => {
    try {
      const response = await axios.post(process.env.REACT_APP_UNFOLLOW,
        { following_name: followingName, followed_name: followedName }, { withCredentials: true });
      setMessage(response.data.message);
      checkFollowingStatus();
    } catch (error) {
      setMessage(error.response?.data?.message || "Error unfollowing user");
    }
  };
  
  const debouncedSearchUsers = useCallback(debounce(async (query) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_SEARCH_USERS}?searchQuery=${query}`, { withCredentials: true });
      setSearchResults(res.data?.users || []);
    } catch (error) {
      console.error("Error searching users:", error);
    }
  }, 400), []);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setSearchResults([]);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleUserSelect = (user) => {
    setFollowedName(user.name);
    setSelectedUser(user);
    setProfileimage(user.profileimage);
    setShowProfile(true);
    setSearchResults([]);
    setRecentSearches((prev) => {
      const updated = [user, ...prev.filter((u) => u._id !== user._id)];
      return updated.slice(0, 5);
    });
    checkFollowingStatus();
  };

  const renderUserCard = (user, isSearchResult = false) => (
    <motion.div
      key={user._id}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.17 }}
      className={`user-card ${isSearchResult ? 'search-result-card' : 'sample-card'}`}
      onClick={() => handleUserSelect(user)}
      whileHover={{ scale: 1.03 }}
    >
      <img
        src={user.profileimage || `https://api.dicebear.com/7.x/micah/svg?seed=${user.name}`}
        alt={user.name}
        className="user-avatar"
      />
      <div className="user-name">{user.name}</div>
      {!isSearchResult && (
        <button className="view-profile-btn">
          View Profile
        </button>
      )}
    </motion.div>
  );

  return (
    <Layout>
      <div className="dashboard-container">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="dashboard-content">
          <div className="search-wrapper">
            <div ref={dropdownRef} className="search-container">
              <div className="glassmorph-search-container">
                <span className="search-icon" role="img" aria-label="search">🔍</span>
                <input
                  type="text"
                  id="follow-search-input"
                  className={`glassmorph-search-input${followedName ? " has-value" : ""}`}
                  value={followedName}
                  autoComplete="off"
                  onChange={(e) => {
                    const value = e.target.value;
                    setFollowedName(value);
                    setShowProfile(false);
                    if (value.trim() !== "") debouncedSearchUsers(value);
                    else setSearchResults([]);
                  }}
                  onFocus={e => e.target.parentNode.classList.add("focused")}
                  onBlur={e => e.target.parentNode.classList.remove("focused")}
                />
                <label htmlFor="follow-search-input" className={`floating-label${followedName ? " floated" : ""}`}>
                  Find people to connect with
                </label>
              </div>
            </div>
          </div>
          
          <div className="search-results-container">
            <AnimatePresence>
              {(searchResults && searchResults.length > 0) && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="search-results-grid"
                >
                  {searchResults.map((user, idx) => renderUserCard(user, true))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="recommendations-section">
            <h3 className="section-title">Connect with Amazing People!</h3>
            <div className="users-grid">
              {(!showProfile && !selectedUser ? sampleUsers : recentSearches).map(user => renderUserCard(user))}
            </div>
          </div>
          
          {showProfile && selectedUser && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="profile-card"
            >
              <div className="profile-header">
                <img
                  src={profileimage || `https://api.dicebear.com/7.x/micah/svg?seed=${selectedUser.name}`}
                  alt="Profile"
                  className="profile-avatar"
                />
                <div className="profile-info">
                  <div className="profile-name-container">
                    <h2 className="profile-name">{selectedUser.name}</h2>
                    <span className="verified-badge">✔️</span>
                  </div>
                  <div className="profile-actions">
                    <button
                      onClick={isFollowing ? handleUnfollow : handleFollow}
                      className={`follow-button ${isFollowing ? 'unfollow' : 'follow'}`}
                    >
                      {isFollowing ? "Unfollow" : "Follow"}
                    </button>
                  </div>
                  <div className="profile-stats">
                    <span><strong>{followerCount}</strong> followers</span>
                    <span><strong>{followingCount}</strong> following</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
      
      <style jsx>{`
        .dashboard-container { padding: 0; box-sizing: border-box; overflow-x: hidden; }
        .dashboard-content { padding: 2rem; background-color: #213448; color: #ECEFCA; min-height: 100vh; font-family: 'Segoe UI', Arial, sans-serif; }
        
        /* Search Styles */
        .search-wrapper { display: flex; justify-content: center; margin-bottom: 1.5rem; position: relative; }
        .search-container { margin-top: 30px; position: relative; width: 90%; max-width: 500px; }
        .glassmorph-search-container { position: relative; width: 100%; display: flex; align-items: center; background: rgba(84, 119, 146, 0.25); border-radius: 12px; box-shadow: 0 4px 20px 0 rgba(31, 38, 135, 0.15); backdrop-filter: blur(13px); -webkit-backdrop-filter: blur(13px); border: 1.5px solid rgba(148, 180, 193, 0.44); margin-bottom: 0.5rem; min-height: 56px; transition: all 0.3s ease; }
        .glassmorph-search-container.focused { border-color: #ECEFCA; box-shadow: 0 4px 25px 0 rgba(31, 38, 135, 0.25); }
        .glassmorph-search-input { width: 100%; padding: 1.1rem 2.5rem 0.6rem 2.5rem; border: none; outline: none; background: transparent; color: #ECEFCA; font-size: 1.07rem; border-radius: 12px; z-index: 2; transition: background 0.3s; }
        .glassmorph-search-input:focus { background: rgba(84, 119, 146, 0.32); }
        .glassmorph-search-input::placeholder { color: transparent; }
        .search-icon { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); font-size: 1.25rem; color: #94B4C1; pointer-events: none; z-index: 3; transition: color 0.25s; }
        .glassmorph-search-container.focused .search-icon { color: #ECEFCA; }
        .floating-label { position: absolute; left: 2.5rem; top: 50%; transform: translateY(-50%); font-size: 1.07rem; color: #ECEFCA; pointer-events: none; background: transparent; transition: all 0.21s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s; z-index: 4; padding: 0 2px; opacity: 0.92; }
        .glassmorph-search-input:focus ~ .floating-label, .glassmorph-search-input.has-value ~ .floating-label, .floating-label.floated { top: 0.34rem; left: 2.3rem; font-size: 0.83rem; color: #94B4C1; opacity: 0.97; background: rgba(33,52,72,0.79); border-radius: 3px; padding: 0 5px; transform: none; }
        
        /* Search Results */
        .search-results-container { width: 90%; max-width: 1200px; margin: 0 auto 1.5rem auto; position: relative; }
        .search-results-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 1rem; background-color: #547792; border: 1px solid #94B4C1; border-radius: 8px; width: 100%; z-index: 1000; color: #ECEFCA; padding: 1rem 0.8rem; margin-top: 0.2rem; box-sizing: border-box; box-shadow: 0 6px 15px rgba(0,0,0,0.15); }
        
        /* Recommendations Section */
        .recommendations-section { max-width: 1100px; margin: 2.5rem auto 0 auto; padding: 2rem 1rem; background: rgba(33,52,72,0.6); border-radius: 12px; box-shadow: 0 6px 20px rgba(0,0,0,0.1); }
        .section-title { margin-bottom: 1.5rem; color: #94B4C1; text-align: center; letter-spacing: 0.03em; font-weight: 500; font-size: 1.4rem; }
        .users-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1.2rem; justify-content: center; }
        
        /* User Cards */
        .user-card { background-color: #547792; border-radius: 10px; padding: 1.2rem; color: #ECEFCA; text-align: center; border: 1px solid #94B4C1; transition: all 0.3s ease; cursor: pointer; display: flex; flex-direction: column; align-items: center; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .user-card:hover { background-color: #94B4C1; color: #213448; transform: translateY(-3px); box-shadow: 0 6px 12px rgba(0,0,0,0.15); }
        .search-result-card { padding: 0.8rem; min-width: 120px; background-color: #213448; border: 1px solid #94B4C1; }
        .search-result-card:hover { background-color: #2a4a6a; }
        .user-avatar { width: 65px; height: 65px; border-radius: 50%; margin-bottom: 0.8rem; object-fit: cover; border: 2px solid #94B4C1; }
        .search-result-card .user-avatar { width: 48px; height: 48px; }
        .user-name { font-weight: 600; margin-bottom: 0.8rem; font-size: 1.1rem; }
        .search-result-card .user-name { font-size: 0.9rem; margin-bottom: 0.3rem; }
        .view-profile-btn { padding: 0.4rem 1rem; background-color: rgba(33,52,72,0.7); color: #ECEFCA; border: 1px solid #94B4C1; border-radius: 5px; cursor: pointer; font-size: 0.9rem; transition: all 0.3s ease; margin-top: 0.5rem; width: 100%; }
        .view-profile-btn:hover { background-color: #213448; color: #ECEFCA; }
        
        /* Profile Card */
        .profile-card { background-color: #547792; border: 1px solid #94B4C1; border-radius: 12px; padding: 2rem; margin-top: 3rem; max-width: 900px; margin-inline: auto; color: #ECEFCA; box-shadow: 0 8px 24px rgba(0,0,0,0.15); }
        .profile-header { display: flex; align-items: center; gap: 2.5rem; }
        .profile-avatar { border-radius: 50%; width: 160px; height: 160px; object-fit: cover; border: 3px solid #94B4C1; box-shadow: 0 5px 15px rgba(0,0,0,0.2); }
        .profile-info { flex: 1; }
        .profile-name-container { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.2rem; }
        .profile-name { font-weight: 500; font-size: 1.8rem; margin: 0; }
        .verified-badge { color: #94B4C1; font-size: 1.2rem; }
        .profile-actions { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; }
        .follow-button { background-color: #213448; color: #ECEFCA; border: 1px solid #94B4C1; border-radius: 6px; padding: 0.6rem 1.6rem; cursor: pointer; font-size: 1rem; font-weight: 500; transition: all 0.3s ease; }
        .follow-button:hover { background-color: #94B4C1; color: #213448; transform: translateY(-2px); }
        .profile-stats { display: flex; gap: 2rem; color: #ECEFCA; font-size: 1.05rem; }
        
        @media (max-width: 768px) {
          .profile-header { flex-direction: column; text-align: center; gap: 1rem; }
          .profile-avatar { width: 120px; height: 120px; }
          .profile-actions, .profile-stats { justify-content: center; }
          .users-grid { grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); }
        }
        
        @media (max-width: 600px) {
          .glassmorph-search-container { flex-direction: column; align-items: stretch; }
          .search-icon { margin-bottom: 0.5rem; }
          .users-grid { grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); }
        }
      `}</style>
    </Layout>
  );
};

export default FollowDashboard;