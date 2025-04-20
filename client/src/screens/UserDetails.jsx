import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { handleLogout } from "../utils/Logout";
import Layout from "../Layout1/Layout";
import Navbar from "../Layout1/Navbar";
import ReactECharts from "echarts-for-react";

const UserDetails = () => {
  const [showmenu, setshowmenu] = React.useState(false);
  const navigate = useNavigate();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [userPosts, setUserPosts] = useState([]);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [followers_name, setFollowers_name] = useState([]);
  const [following_name, setFollowing_name] = useState([]);
  const [showFollowersPopup, setShowFollowersPopup] = useState(false);
  const [showFollowingPopup, setShowFollowingPopup] = useState(false);
  const [activityData, setActivityData] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(process.env.REACT_APP_USER_PROFILE, {
          withCredentials: true,
        });

        const data = res.data.user;
        setName(data.name || "");
        setEmail(data.email || "");
        setBio(data.bio || "");
        setProfileImage(data.profileimage || "");
        setUserPosts(data.posts || []);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchUserProfile();

    const fetchFollowDashboard = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_FOLLOW_DASHBOARD, {
          withCredentials: true,
        });
        setFollowersCount(response.data.followed_count || 0);
        setFollowingCount(response.data.following_count || 0);
        setFollowers_name(response.data.Followers_user_names || []);
        setFollowing_name(response.data.Following_user_names || []);
      } catch (error) {
        console.error("Error fetching follow dashboard:", error);
      }
    };

    fetchFollowDashboard();
  }, []);

  useEffect(() => {
    const fetchActivityData = async () => {
      try {
        const res = await axios.get(process.env.REACT_APP_ACTIVITY_LOG, {
          withCredentials: true,
        });
        const logins = res.data.logins || {};
        const loginKeys = Object.keys(logins);
        if (loginKeys.length > 0) {
          console.log("Login data keys:", loginKeys);
        } else {
          console.log("Login data appears empty.");
        }
        const formatted = Object.entries(logins).map(([day, value]) => ({ day, value }));
        console.log("Fetched activity data:", formatted);
        setActivityData(formatted);
      } catch (error) {
        console.error("Error fetching activity data:", error);
      }
    };

    console.log("Fetching activity data...");
    fetchActivityData();
  }, []);

  const handleLogoutClick = () => {
    setshowmenu(false);
    handleLogout(navigate);
  };

  const toggleFollowersPopup = () => setShowFollowersPopup(!showFollowersPopup);
  const toggleFollowingPopup = () => setShowFollowingPopup(!showFollowingPopup);

  const handleToggleMenu = () => {
    setshowmenu(!showmenu);
  };

  const handleNavigateToDashboard = () => {
    navigate("/dsadashboard");
  };

  const chartYear = activityData.length > 0 ? activityData[0].day.split("-")[0] : new Date().getFullYear().toString();

  const today = new Date();
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(today.getDate() - 29); // So 30 days including today
  const range = [
    thirtyDaysAgo.toISOString().split("T")[0],
    today.toISOString().split("T")[0]
  ];

  return (
    <Layout>
      <Navbar
        showMenu={showmenu}
        onToggleMenu={handleToggleMenu}
        onLogout={handleLogoutClick}
        onDashboard={handleNavigateToDashboard}
      />

      <div style={{ padding: "2rem", backgroundColor: "#000", color: "#fff", marginBottom: "2rem", fontFamily: "sans-serif", display: "flex", justifyContent: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "3rem", maxWidth: "900px", width: "100%", backgroundColor: "#111", padding: "2rem", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0,0,0,0.4)" }}>
          <img
            src={profileImage && profileImage.trim() !== "" ? profileImage : `https://api.dicebear.com/7.x/micah/svg?seed=${name}`}
            alt="Profile"
            style={{ borderRadius: "50%", width: "150px", height: "150px", objectFit: "cover", border: "3px solid #8a2be2" }}
          />
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
              <h2 style={{ fontSize: "2rem", fontWeight: "bold", color: "#8a2be2" }}>{name}</h2>
              <button
                onClick={() => navigate("/userupdatedetails")}
                style={{
                  backgroundColor: "#8a2be2",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  padding: "0.5rem 1rem",
                  cursor: "pointer",
                  fontSize: "1rem",
                  transition: "0.3s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.opacity = "0.8")}
                onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Edit Profile
              </button>
            </div>
            <p style={{ fontSize: "1rem", marginBottom: "0.5rem" }}><strong>Email:</strong> {email}</p>
            <p style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>
              <strong style={{ cursor: "pointer" }} onClick={toggleFollowersPopup}>Followers: {followersCount}</strong>
              &nbsp;&nbsp;|&nbsp;&nbsp;
              <strong style={{ cursor: "pointer" }} onClick={toggleFollowingPopup}>Following: {followingCount}</strong>
            </p>
            <p style={{ marginTop: "0.5rem", lineHeight: "1.4" }}>{bio}</p>
          </div>
        </div>
      </div>

      {showFollowersPopup && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.6)", backdropFilter: "blur(5px)", display: "flex",
          alignItems: "center", justifyContent: "center", zIndex: 999
        }}
          onClick={() => setShowFollowersPopup(false)}
        >
          <div style={{
            backgroundColor: "#111", padding: "20px", borderRadius: "10px", minWidth: "300px",
            maxHeight: "400px", overflowY: "auto", boxShadow: "0 0 15px rgba(0,0,0,0.5)"
          }}
            onClick={(e) => e.stopPropagation()}
          >
            <h4 style={{ color: "#8a2be2", marginBottom: "10px" }}>Followers</h4>
            {followers_name.length > 0 ? (
              followers_name.map((follower, idx) => (
                <p key={idx} style={{ color: "#fff", marginBottom: "6px" }}>{follower.following_id.name}</p>
              ))
            ) : (
              <p style={{ color: "#888" }}>No followers found.</p>
            )}
          </div>
        </div>
      )}

      {showFollowingPopup && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.6)", backdropFilter: "blur(5px)", display: "flex",
          alignItems: "center", justifyContent: "center", zIndex: 999
        }}
          onClick={() => setShowFollowingPopup(false)}
        >
          <div style={{
            backgroundColor: "#111", padding: "20px", borderRadius: "10px", minWidth: "300px",
            maxHeight: "400px", overflowY: "auto", boxShadow: "0 0 15px rgba(0,0,0,0.5)"
          }}
            onClick={(e) => e.stopPropagation()}
          >
            <h4 style={{ color: "#8a2be2", marginBottom: "10px" }}>Following</h4>
            {following_name.length > 0 ? (
              following_name.map((followed, idx) => (
                <p key={idx} style={{ color: "#fff", marginBottom: "6px" }}>{followed.followed_id.name}</p>
              ))
            ) : (
              <p style={{ color: "#888" }}>Not following anyone.</p>
            )}
          </div>
        </div>
      )}

      <div style={{ padding: "2rem", backgroundColor: "#000", color: "#fff" }}>
        <h3 style={{ fontSize: "1.8rem", marginBottom: "1rem", color: "#8a2be2" }}>Your Posts</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
            gap: "1.5rem",
            maxHeight: "400px",
            paddingRight: "10px",
          }}
        >
          {userPosts.map((item, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: "#1a1a1a",
                borderRadius: "10px",
                padding: "1.5rem",
                color: "#fff",
                boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <strong style={{ color: "#8a2be2" }}>You ({name})</strong>
              <p style={{ margin: "0.5rem 0" }}>{item.caption}</p>
              <img
                src={item.post?.mediaUrl}
                alt="user-post"
                style={{ width: "100%", borderRadius: "8px", objectFit: "cover", maxHeight: "400px" }}
              />
            </div>
          ))}
        </div>
      </div>
      
      <div style={{ padding: "2rem", backgroundColor: "#111", color: "#fff", borderRadius: "10px", margin: "2rem", boxShadow: "0 4px 12px rgba(0,0,0,0.4)" }}>
        <h3 style={{ fontSize: "2rem", marginBottom: "1rem", color: "#8a2be2", borderLeft: "5px solid #8a2be2", paddingLeft: "0.5rem" }}>
          📅 Login Activity
        </h3>
        <p style={{ color: "#bbb", fontSize: "0.9rem", marginBottom: "1rem" }}>
          Showing login activity for <strong>{chartYear}</strong>
        </p>
        <div style={{ height: "180px", backgroundColor: "#1a1a1a", borderRadius: "8px", padding: "1.9rem", boxShadow: "inset 0 0 10px rgba(138, 43, 226, 0.2)", overflowX: "auto", overflowY: "hidden", whiteSpace: "nowrap" }}>
          <ReactECharts
            option={{
              tooltip: {
                position: "top",
                formatter: (params) =>
                  `${params.data[0]}: ${params.data[1]} login${params.data[1] > 1 ? "s" : ""}`
              },
              visualMap: {
                show: false,
                min: 0,
                max: 10,
                inRange: {
                  color: ["#3f007d", "#6a51a3", "#9e9ac8", "#dadaeb"]
                }
              },
              calendar: [...Array(12).keys()].map((m, idx) => ({
                top: 20,
                left: idx * 90 + 20,
                cellSize: [10, 10],
                range: `${chartYear}-${(m + 1).toString().padStart(2, "0")}`,
                yearLabel: { show: false },
                  monthLabel: {
                    show: true,
                    nameMap: "en",
                    color: "#fff",
                    fontSize: 12,
                    margin: 10,
                    position: "top",
                    formatter: (value) => {
                      const date = new Date(value);
                      if (isNaN(date)) return "";
                      const shortMonthNames = [
                        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                      ];
                      return shortMonthNames[date.getMonth()] || "";
                    },
                  },
                dayLabel: {
                  show: true,
                  nameMap: "en",
                  color: "#fff",
                  fontSize: 8,
                  formatter: (value, index) => {
                    const date = new Date(value);
                    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                    return `${monthNames[date.getMonth()]} ${date.getDate()}`;
                  }
                },
                itemStyle: { borderColor: "#333", borderWidth: 0.4 },
                splitLine: { show: false },
                orient: "horizontal"
              })),
              series: [...Array(12).keys()].map((m, idx) => ({
                type: "heatmap",
                coordinateSystem: "calendar",
                calendarIndex: idx,
                data: activityData
                  .filter((d) =>
                    d.day.startsWith(`${chartYear}-${(m + 1).toString().padStart(2, "0")}`)
                  )
                  .map((d) => [d.day, d.value])
              }))
            }}
          style={{ height: "100px", minWidth: "1200px" }}
          />
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            padding: '1rem',
            width: '1000px', // Increased width
            margin: '0 auto',
            marginLeft: '1rem'
          }}>
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((month, idx) => (
            <div key={idx} style={{ flex: "0 9 auto", textAlign: "center", color: "#aaa", fontSize: "0.75rem" }}>{month}</div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

const inputStyle = {
  padding: "12px",
  border: "1px solid #8a2be2",
  borderRadius: "5px",
  backgroundColor: "#111",
  color: "#fff",
  fontSize: "14px",
};

const buttonStyle = {
  padding: "12px",
  backgroundColor: "#8a2be2",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  fontWeight: "bold",
  cursor: "pointer",
};

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
};

export default UserDetails;
