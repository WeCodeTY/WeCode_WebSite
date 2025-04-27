import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import Layout from "../../Layout1/Layout.jsx";
import { motion, AnimatePresence } from "framer-motion";

const FollowDashboard = () => {
  const [followingName, setFollowingName] = useState("");
  const [followedName, setFollowedName] = useState("");
  const [message, setMessage] = useState("");
  const [isFollowing, setIsFollowing] = useState(false); // Track the following status
  const [followingCount, setFollowingCount] = useState(0);
  const [followerCount, setFollowerCount] = useState(0);
  const [showProfile, setShowProfile] = useState(false); // New state for showing profile
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const dropdownRef = useRef(null);
  const [profileimage, setProfileimage] = useState("");

  const [recentSearches, setRecentSearches] = useState([]);

  // Sample users to show as flashcards before any search is clicked
  const sampleUsers = [
    {
      _id: "sample1",
      name: "APJ Abdul Kalam",
      profileimage: "https://api.dicebear.com/7.x/micah/svg?seed=APJAbdulKalam"
    },
    {
      _id: "sample2",
      name: "Sachin Tendulkar",
      profileimage: "https://api.dicebear.com/7.x/micah/svg?seed=SachinTendulkar"
    },
    {
      _id: "sample3",
      name: "Kalpana Chawla",
      profileimage: "https://api.dicebear.com/7.x/micah/svg?seed=KalpanaChawla"
    },
    {
      _id: "sample4",
      name: "Virat Kohli",
      profileimage: "https://api.dicebear.com/7.x/micah/svg?seed=ViratKohli"
    },
    {
      _id: "sample5",
      name: "Ratan Tata",
      profileimage: "https://api.dicebear.com/7.x/micah/svg?seed=RatanTata"
    },
    {
      _id: "sample6",
      name: "MS Dhoni",
      profileimage: "https://api.dicebear.com/7.x/micah/svg?seed=MSDhoni"
    },
    {
      _id: "sample7",
      name: "PV Sindhu",
      profileimage: "https://api.dicebear.com/7.x/micah/svg?seed=PVSindhu"
    },
    {
      _id: "sample8",
      name: "Neeraj Chopra",
      profileimage: "https://api.dicebear.com/7.x/micah/svg?seed=NeerajChopra"
    },
    {
      _id: "sample9",
      name: "Sundar Pichai",
      profileimage: "https://api.dicebear.com/7.x/micah/svg?seed=SundarPichai"
    },
    {
      _id: "sample10",
      name: "Lata Mangeshkar",
      profileimage: "https://api.dicebear.com/7.x/micah/svg?seed=LataMangeshkar"
    }
  ];

  // Fetch the current user's name and follow counts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(process.env.REACT_APP_USER_PROFILE, {
          withCredentials: true,
        });
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

    if (followedName) {
      checkFollowingStatus();
    }
  }, [followedName]);
    
  // Check if the user is already following the followed user
  const checkFollowingStatus = async () => {
    if (!followingName || !followedName) {
      console.warn("Missing names: skipping follow check");
      return;
    }
    try {
      const response = await axios.post(
        process.env.REACT_APP_CHECK_FOLLOWING,
        {
          following_name: followingName,
          followed_name: followedName,
        },
        {
          withCredentials: true,
        }
      );
      setIsFollowing(response.data.isFollowing); // Set the follow status
    } catch (error) {
      console.error("Error checking following status:", error);
    }
  };

  // Handle following a user
  const handleFollow = async () => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_FOLLOW,
        {
          following_name: followingName,
          followed_name: followedName,
        },
        {
          withCredentials: true,
        }
      );
        setMessage(response.data.message);
        setIsFollowing(true);
      
    } catch (error) {
      setMessage(error.response?.data?.message || "Error following user");
    }
  };

  // Handle unfollowing a user
  const handleUnfollow = async () => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_UNFOLLOW,
        {
          following_name: followingName,
          followed_name: followedName,
        },
        {
          withCredentials: true,
        }
      );
      setMessage(response.data.message);
      checkFollowingStatus(); // Check if we are no longer following the user
    } catch (error) {
      setMessage(error.response?.data?.message || "Error unfollowing user");
    }
  };

  const debouncedSearchUsers = useCallback(
    debounce(async (query) => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_SEARCH_USERS}?searchQuery=${query}`,
          { withCredentials: true }
        );
        const users = res.data?.users || [];
        console.log("Search Results:", users);
        setSearchResults(users);
      } catch (error) {
        console.error("Error searching users:", error);
      }
    }, 400),
    []
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSearchResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ padding: "2rem", backgroundColor: "#213448", color: "#ECEFCA", minHeight: "100vh", fontFamily: "sans-serif" }}
      >
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem", position: "relative" }}>
          <div ref={dropdownRef} style={{ marginTop: "50px", position: "relative", width: "400px" }}>
            {/* Glassmorphism search input with floating label and icon */}
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
                  if (value.trim() !== "") {
                    debouncedSearchUsers(value);
                  } else {
                    setSearchResults([]);
                  }
                }}
                onFocus={e => e.target.parentNode.classList.add("focused")}
                onBlur={e => e.target.parentNode.classList.remove("focused")}
              />
              <label
                htmlFor="follow-search-input"
                className={`floating-label${followedName ? " floated" : ""}`}
              >
                Username to follow/unfollow
              </label>
            </div>
          </div>
        </div>
        {/* Full-width search results grid below the search bar */}
        <div
          style={{
            width: "90%",
            maxWidth: "1200px",
            margin: "0 auto 2rem auto",
            position: "relative",
            minHeight: searchResults && searchResults.length > 0 ? "80px" : undefined
          }}
        >
          <AnimatePresence>
            {(searchResults && searchResults.length > 0) && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                  gap: "1.2rem",
                  backgroundColor: "#547792",
                  border: "1px solid #94B4C1",
                  borderRadius: "8px",
                  width: "100%",
                  zIndex: 1000,
                  color: "#ECEFCA",
                  padding: "1.2rem 0.8rem",
                  marginTop: "0.2rem",
                  boxSizing: "border-box",
                  justifyItems: "center",
                }}
              >
                {searchResults.map((user, idx) => (
                  <motion.div
                    key={user._id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.17, delay: idx * 0.05 }}
                    style={{
                      backgroundColor: "#213448",
                      borderRadius: "10px",
                      padding: "1rem",
                      color: "#ECEFCA",
                      textAlign: "center",
                      border: "1px solid #94B4C1",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      minWidth: "110px",
                      maxWidth: "160px",
                      margin: "0 auto",
                      transition: "background-color 0.3s",
                    }}
                    whileHover={{ scale: 1.05, backgroundColor: "#2a4a6a" }}
                    onClick={() => {
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
                    }}
                  >
                    <img
                      src={
                        user.profileimage
                          ? user.profileimage
                          : `https://api.dicebear.com/7.x/micah/svg?seed=${user.name}`
                      }
                      alt={user.name}
                      style={{ width: "48px", height: "48px", borderRadius: "50%", marginBottom: "0.5rem", objectFit: "cover" }}
                    />
                    <div style={{ fontWeight: "bold", fontSize: "1rem", marginBottom: "0.2rem" }}>
                      {user.name}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {/* Glassmorphism and floating label styles */}
        <style>
        {`
          .glassmorph-search-container {
            position: relative;
            width: 100%;
            display: flex;
            align-items: center;
            background: rgba(84, 119, 146, 0.25);
            border-radius: 16px;
            box-shadow: 0 4px 32px 0 rgba(31, 38, 135, 0.18);
            backdrop-filter: blur(13px);
            -webkit-backdrop-filter: blur(13px);
            border: 1.5px solid rgba(148, 180, 193, 0.44);
            margin-bottom: 0.5rem;
            min-height: 54px;
          }
          .glassmorph-search-input {
            width: 100%;
            padding: 1.1rem 2.5rem 0.6rem 2.5rem;
            border: none;
            outline: none;
            background: transparent;
            color: #ECEFCA;
            font-size: 1.07rem;
            border-radius: 16px;
            z-index: 2;
            transition: background 0.3s;
          }
          .glassmorph-search-input:focus {
            background: rgba(84, 119, 146, 0.32);
          }
          .glassmorph-search-input::placeholder {
            color: transparent;
          }
          .search-icon {
            position: absolute;
            left: 1rem;
            top: 50%;
            transform: translateY(-50%);
            font-size: 1.25rem;
            color: #94B4C1;
            pointer-events: none;
            z-index: 3;
            transition: color 0.25s;
          }
          .glassmorph-search-container.focused .search-icon {
            color: #ECEFCA;
          }
          .floating-label {
            position: absolute;
            left: 2.5rem;
            top: 50%;
            transform: translateY(-50%);
            font-size: 1.07rem;
            color: #ECEFCA;
            pointer-events: none;
            background: transparent;
            transition:
              all 0.21s cubic-bezier(0.4, 0, 0.2, 1),
              color 0.2s;
            z-index: 4;
            padding: 0 2px;
            opacity: 0.92;
          }
          .glassmorph-search-input:focus ~ .floating-label,
          .glassmorph-search-input.has-value ~ .floating-label,
          .floating-label.floated {
            top: 0.34rem;
            left: 2.3rem;
            font-size: 0.89rem;
            color: #94B4C1;
            opacity: 0.97;
            background: rgba(33,52,72,0.79);
            border-radius: 3px;
            padding: 0 5px;
            transform: none;
          }
        `}
        </style>
        <div style={{ maxWidth: "900px", margin: "2.5rem auto 0 auto", padding: "2rem 1rem", background: "rgba(33,52,72,0.6)", borderRadius: "12px" }}>
          <h3 style={{ marginBottom: "1.5rem", color: "#94B4C1", textAlign: "center", letterSpacing: "0.03em" }}>
            Connect with Amazing People!
          </h3>
          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", justifyContent: "center" }}>
            {/* Conditionally render sampleUsers or recentSearches */}
            {(!showProfile && !selectedUser
              ? sampleUsers
              : recentSearches
            ).map((user) => (
              <div
                key={user._id}
                style={{
                  backgroundColor: "#547792",
                  borderRadius: "10px",
                  padding: "1.2rem",
                  width: "210px",
                  minWidth: "180px",
                  color: "#ECEFCA",
                  textAlign: "center",
                  border: "1px solid #94B4C1",
                  transition: "background-color 0.3s ease",
                  cursor: "pointer",
                  marginBottom: "1rem"
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = "#94B4C1"}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = "#547792"}
              >
                <img
                  src={
                    user.profileimage
                      ? user.profileimage
                      : `https://api.dicebear.com/7.x/micah/svg?seed=${user.name}`
                  }
                  alt={user.name}
                  style={{ width: "60px", borderRadius: "50%", marginBottom: "0.5rem" }}
                />
                <div style={{ fontWeight: "bold", marginBottom: "0.5rem", fontSize: "1.1rem" }}>{user.name}</div>
                <button
                  onClick={() => {
                    setFollowedName(user.name);
                    setSelectedUser(user);
                    setProfileimage(user.profileimage);
                    setShowProfile(true);
                    setRecentSearches([]);
                    checkFollowingStatus();
                  }}
                  style={{
                    padding: "0.3rem 0.8rem",
                    backgroundColor: "#547792",
                    color: "#ECEFCA",
                    border: "1px solid #94B4C1",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "0.9rem",
                    transition: "background-color 0.3s ease, color 0.3s ease",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor = "#94B4C1";
                    e.currentTarget.style.color = "#213448";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = "#547792";
                    e.currentTarget.style.color = "#ECEFCA";
                  }}
                >
                  View Profile
                </button>
              </div>
            ))}
          </div>
        </div>
        <br />
        {showProfile && selectedUser && (
          <div style={{
            backgroundColor: "#547792",
            border: "1px solid #94B4C1",
            borderRadius: "12px",
            padding: "2.2rem",
            marginTop: "3rem",
            maxWidth: "900px",
            marginInline: "auto",
            color: "#ECEFCA",
          }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "2rem",
                gap: "2.5rem",
                marginBottom: "2rem"
              }}
            >
              <img
                src={
                  profileimage
                    ? profileimage
                    : `https://api.dicebear.com/7.x/micah/svg?seed=${selectedUser.name}`
                }
                alt="Profile"
                style={{ borderRadius: "50%", width: "150px", height: "150px", objectFit: "cover" }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1.2rem", marginBottom: "1.1rem" }}>
                  <h2 style={{ fontWeight: "normal", fontSize: "1.5rem", margin: 0 }}>{selectedUser.name}</h2>
                  <span style={{ color: "#94B4C1", fontSize: "1.2rem" }}>✔️</span>
                </div>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "1rem", marginBottom: "1.2rem" }}>
                  <button
                    onClick={isFollowing ? handleUnfollow : handleFollow}
                    style={{
                      backgroundColor: "#547792",
                      color: "#ECEFCA",
                      border: "1px solid #94B4C1",
                      borderRadius: "5px",
                      padding: "0.5rem 1.1rem",
                      cursor: "pointer",
                      fontSize: "1rem",
                      transition: "background-color 0.3s ease, color 0.3s ease",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.backgroundColor = "#94B4C1";
                      e.currentTarget.style.color = "#213448";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.backgroundColor = "#547792";
                      e.currentTarget.style.color = "#ECEFCA";
                    }}
                  >
                    {isFollowing ? "Unfollow" : "Follow"}
                  </button>
                  <button
                    style={{
                      backgroundColor: "#547792",
                      color: "#ECEFCA",
                      padding: "0.5rem 1.1rem",
                      borderRadius: "8px",
                      border: "1px solid #94B4C1",
                      cursor: "pointer",
                      fontSize: "1rem",
                      transition: "background-color 0.3s ease, color 0.3s ease"
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.backgroundColor = "#94B4C1";
                      e.currentTarget.style.color = "#213448";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.backgroundColor = "#547792";
                      e.currentTarget.style.color = "#ECEFCA";
                    }}
                  >
                    Message
                  </button>
                  <button
                    style={{
                      backgroundColor: "#547792",
                      color: "#ECEFCA",
                      padding: "0.5rem",
                      borderRadius: "8px",
                      border: "1px solid #94B4C1",
                      cursor: "pointer",
                      fontSize: "1.1rem",
                      transition: "background-color 0.3s ease, color 0.3s ease"
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.backgroundColor = "#94B4C1";
                      e.currentTarget.style.color = "#213448";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.backgroundColor = "#547792";
                      e.currentTarget.style.color = "#ECEFCA";
                    }}
                  >
                    ⋯
                  </button>
                </div>
                <div style={{ display: "flex", gap: "2rem", marginBottom: "1rem" }}>
                  <span><strong>{followerCount}</strong> followers</span>
                  <span><strong>{followingCount}</strong> following</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>
    </Layout>
  );
};

export default FollowDashboard;