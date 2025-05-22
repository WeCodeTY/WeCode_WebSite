import React, { useState, useEffect } from "react"; import { useNavigate } from "react-router-dom"; import axios from "axios"; import { handleLogout } from "../../utils/Logout"; import Layout from "../../Layout1/Layout"; import Navbar from "../../Layout1/Navbar"; import ReactECharts from "echarts-for-react"; import * as echarts from 'echarts/core'; import { TooltipComponent, VisualMapComponent, CalendarComponent } from 'echarts/components'; import { HeatmapChart } from 'echarts/charts'; import { CanvasRenderer } from 'echarts/renderers';

echarts.use([TooltipComponent, VisualMapComponent, CalendarComponent, HeatmapChart, CanvasRenderer]);

const UserDetails = () => {
  const [showmenu, setshowmenu] = useState(false), navigate = useNavigate(), 
        [name, setName] = useState(""), [email, setEmail] = useState(""), 
        [bio, setBio] = useState(""), [profileImage, setProfileImage] = useState(""), 
        [userPosts, setUserPosts] = useState([]), [followersCount, setFollowersCount] = useState(0), 
        [followingCount, setFollowingCount] = useState(0), [followers_name, setFollowers_name] = useState([]), 
        [following_name, setFollowing_name] = useState([]), [showFollowersPopup, setShowFollowersPopup] = useState(false), 
        [showFollowingPopup, setShowFollowingPopup] = useState(false), [activityData, setActivityData] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(process.env.REACT_APP_USER_PROFILE, { withCredentials: true });
        const data = res.data.user;
        setName(data.name || ""); setEmail(data.email || ""); setBio(data.bio || "");
        setProfileImage(data.profileimage || ""); setUserPosts(data.posts || []);
      } catch (error) { console.error("Error fetching profile:", error); }
    };

    const fetchFollowDashboard = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_FOLLOW_DASHBOARD, { withCredentials: true });
        setFollowersCount(response.data.followed_count || 0);
        setFollowingCount(response.data.following_count || 0);
        setFollowers_name(response.data.Followers_user_names || []);
        setFollowing_name(response.data.Following_user_names || []);
      } catch (error) { console.error("Error fetching follow dashboard:", error); }
    };

    fetchUserProfile(); fetchFollowDashboard();
  }, []);

  useEffect(() => {
    const fetchActivityData = async () => {
      try {
        const res = await axios.get(process.env.REACT_APP_ACTIVITY_LOG, { withCredentials: true });
        const logins = res.data.logins || {};
        const formatted = Object.entries(logins).map(([day, value]) => ({ day, value }));
        setActivityData(formatted);
      } catch (error) { console.error("Error fetching activity data:", error); }
    };
    fetchActivityData();
  }, []);

  const handleLogoutClick = () => { setshowmenu(false); handleLogout(navigate); };
  const toggleFollowersPopup = () => setShowFollowersPopup(!showFollowersPopup);
  const toggleFollowingPopup = () => setShowFollowingPopup(!showFollowingPopup);
  const handleToggleMenu = () => setshowmenu(!showmenu);
  const handleNavigateToDashboard = () => navigate("/dsadashboard");

  const chartYear = activityData.length > 0 ? activityData[0].day.split("-")[0] : new Date().getFullYear().toString();

  return (
    <Layout>
      <Navbar showMenu={showmenu} onToggleMenu={handleToggleMenu} onLogout={handleLogoutClick} onDashboard={handleNavigateToDashboard} />
      
      {/* Profile Header Section */}
      <div className="profile-header" style={{
        padding: "2.5rem 2rem", backgroundColor: "#213448", color: "#ECEFCA", marginBottom: "1.5rem",
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)", borderBottom: "3px solid #547792"
      }}>
        <div style={{
          display: "flex", alignItems: "center", gap: "2rem", flexWrap: "wrap", maxWidth: "1200px",
          margin: "0 auto", padding: "0 1rem"
        }}>
          <div style={{ position: "relative" }}>
            <img src={profileImage && profileImage.trim() !== "" ? profileImage : `https://api.dicebear.com/7.x/micah/svg?seed=${name}`}
              alt="Profile" style={{
                borderRadius: "50%", width: "140px", height: "140px", objectFit: "cover",
                border: "4px solid #94B4C1", boxShadow: "0 4px 8px rgba(0,0,0,0.3)"
              }}
            />
            <div style={{
              position: "absolute", bottom: "0", right: "0", backgroundColor: "#547792",
              borderRadius: "50%", width: "40px", height: "40px", display: "flex",
              alignItems: "center", justifyContent: "center", cursor: "pointer",
              border: "2px solid #ECEFCA"
            }} onClick={() => navigate("/userupdatedetails")}>
              <span style={{ fontSize: "20px" }}>✏️</span>
            </div>
          </div>
          
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
              <h2 style={{ fontSize: "2.2rem", fontWeight: "bold", color: "#94B4C1", margin: 0 }}>{name}</h2>
              <button onClick={() => navigate("/userupdatedetails")} style={{
                backgroundColor: "#547792", color: "#ECEFCA", border: "none", borderRadius: "6px",
                padding: "0.6rem 1.2rem", cursor: "pointer", fontSize: "0.9rem", fontWeight: "600",
                display: "flex", alignItems: "center", gap: "0.5rem", transition: "all 0.2s ease"
              }} onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#94B4C1")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#547792")}>
                <span>Edit Profile</span>
              </button>
            </div>
            
            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
              <p style={{ fontSize: "1rem", margin: 0 }}><strong>Email:</strong> {email}</p>
              <div style={{ 
                display: "flex", alignItems: "center", gap: "1.5rem", borderLeft: "2px solid #547792", 
                paddingLeft: "1.5rem", height: "24px" 
              }}>
                <p style={{ fontSize: "1rem", margin: 0, cursor: "pointer", transition: "color 0.2s ease" }}
                  onClick={toggleFollowersPopup} onMouseOver={(e) => (e.currentTarget.style.color = "#94B4C1")}
                  onMouseOut={(e) => (e.currentTarget.style.color = "#ECEFCA")}>
                  <strong>{followersCount}</strong> Followers
                </p>
                <p style={{ fontSize: "1rem", margin: 0, cursor: "pointer", transition: "color 0.2s ease" }}
                  onClick={toggleFollowingPopup} onMouseOver={(e) => (e.currentTarget.style.color = "#94B4C1")}
                  onMouseOut={(e) => (e.currentTarget.style.color = "#ECEFCA")}>
                  <strong>{followingCount}</strong> Following
                </p>
              </div>
            </div>
            
            <p style={{ marginTop: "0.5rem", lineHeight: "1.6", fontSize: "1rem", 
              padding: "0.8rem", backgroundColor: "rgba(148, 180, 193, 0.1)", 
              borderRadius: "6px", maxWidth: "800px" }}>{bio || "No bio available"}</p>
          </div>
        </div>
      </div>

      {/* Activity Visualization */}
      <div style={{ 
        padding: "1.5rem 2rem", backgroundColor: "#213448", borderRadius: "10px", 
        margin: "0 auto 2rem auto", maxWidth: "1200px", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" 
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
          <h3 style={{ fontSize: "1.5rem", margin: 0, color: "#94B4C1", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "1.2rem" }}>📅</span> Login Activity
          </h3>
          <p style={{ color: "#ECEFCA", fontSize: "0.9rem", margin: 0 }}>
            <span style={{ backgroundColor: "#547792", padding: "0.3rem 0.6rem", borderRadius: "4px" }}>{chartYear}</span>
          </p>
        </div>
        
        <div style={{ 
          backgroundColor: "#182736", borderRadius: "8px", padding: "1.5rem 1rem", 
          boxShadow: "inset 0 0 10px rgba(0,0,0,0.4)", overflowX: "auto" 
        }}>
          <ReactECharts
            option={{
              tooltip: {
                position: "top",
                formatter: function (params) {
                  if (!params || !params.data) return '';
                  const data = Array.isArray(params.data) ? params.data : [params.data.day, params.data.value];
                  const [day, value] = data;
                  if (!day || typeof value !== 'number') return '';
                  return `${day}: ${value} login${value > 1 ? 's' : ''}`;
                }
              },
              visualMap: {
                show: false, min: 0, max: 10, inRange: { color: ["#213448", "#547792", "#94B4C1", "#ECEFCA"] }
              },
              calendar: [...Array(12).keys()].map((m, idx) => ({
                top: 20, left: idx * 90 + 20, cellSize: [10, 10], range: `${chartYear}-${(m + 1).toString().padStart(2, "0")}`,
                yearLabel: { show: false },
                monthLabel: {
                  show: true, nameMap: "en", color: "#ECEFCA", fontSize: 12, margin: 10, position: "top",
                  formatter: (value) => {
                    const date = new Date(value);
                    if (isNaN(date)) return "";
                    const shortMonthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                    return shortMonthNames[date.getMonth()] || "";
                  },
                },
                dayLabel: {
                  show: true, nameMap: "en", color: "#ECEFCA", fontSize: 8,
                  formatter: (value, index) => {
                    const days = ["S", "M", "T", "W", "T", "F", "S"];
                    return days[index];
                  }
                },
                itemStyle: { borderColor: "#94B4C1", borderWidth: 0.4 },
                splitLine: { show: false },
                orient: "horizontal"
              })),
              series: [...Array(12).keys()].map((m, idx) => ({
                type: "heatmap", coordinateSystem: "calendar", calendarIndex: idx,
                data: activityData
                  .filter((d) => d.day.startsWith(`${chartYear}-${(m + 1).toString().padStart(2, "0")}`))
                  .map((d) => [d.day, d.value])
              }))
            }}
            style={{ height: "100px", minWidth: "1200px" }}
          />
        </div>
      </div>

      {/* Posts Section */}
      <div style={{ 
        padding: "2rem", backgroundColor: "#213448", color: "#ECEFCA", maxWidth: "1200px", 
        margin: "0 auto", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" 
      }}>
        <h3 style={{ 
          fontSize: "1.5rem", marginBottom: "1.5rem", color: "#94B4C1", 
          borderBottom: "2px solid #547792", paddingBottom: "0.5rem", display: "flex", 
          alignItems: "center", justifyContent: "space-between" 
        }}>
          <span>Your Posts</span>
          <span style={{ 
            fontSize: "0.9rem", backgroundColor: "#547792", padding: "0.3rem 0.8rem", 
            borderRadius: "20px", color: "#ECEFCA" 
          }}>
            {userPosts.length} posts
          </span>
        </h3>
        
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem",
          maxHeight: "800px", overflowY: "auto", paddingRight: "10px"
        }}>
          {userPosts.length > 0 ? userPosts.map((item, idx) => (
            <div key={idx} style={{
              backgroundColor: "#2c4359", borderRadius: "10px", overflow: "hidden",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)", transition: "transform 0.2s ease",
              display: "flex", flexDirection: "column"
            }} onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}>
              <div style={{ padding: "1rem", borderBottom: "1px solid rgba(148, 180, 193, 0.2)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <div style={{ 
                    width: "32px", height: "32px", borderRadius: "50%", overflow: "hidden", 
                    border: "2px solid #94B4C1", flexShrink: 0 
                  }}>
                    <img src={profileImage || `https://api.dicebear.com/7.x/micah/svg?seed=${name}`} 
                      alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <strong style={{ color: "#94B4C1" }}>{name}</strong>
                </div>
                <p style={{ margin: "0", fontSize: "0.9rem", lineHeight: "1.4" }}>{item.caption}</p>
              </div>
              <div style={{ flex: 1, position: "relative", minHeight: "200px" }}>
                <img src={item.post?.mediaUrl} alt="user-post" style={{ 
                  width: "100%", height: "100%", objectFit: "cover", position: "absolute",
                  top: 0, left: 0, right: 0, bottom: 0
                }} />
              </div>
            </div>
          )) : (
            <div style={{ 
              gridColumn: "1/-1", textAlign: "center", padding: "3rem", 
              backgroundColor: "rgba(148, 180, 193, 0.1)", borderRadius: "8px" 
            }}>
              <p>No posts yet. Share your first post!</p>
            </div>
          )}
        </div>
      </div>

      {/* Followers Popup */}
      {showFollowersPopup && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
          backgroundColor: "rgba(33, 52, 72, 0.8)", backdropFilter: "blur(5px)", display: "flex",
          alignItems: "center", justifyContent: "center", zIndex: 999
        }} onClick={() => setShowFollowersPopup(false)}>
          <div style={{
            backgroundColor: "#213448", padding: "1.5rem", borderRadius: "10px", minWidth: "320px",
            maxHeight: "500px", overflowY: "auto", boxShadow: "0 0 25px rgba(0,0,0,0.5)",
            border: "1px solid #547792"
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
              <h4 style={{ color: "#94B4C1", margin: 0, fontSize: "1.2rem" }}>Followers</h4>
              <button onClick={() => setShowFollowersPopup(false)} style={{
                backgroundColor: "transparent", border: "none", color: "#ECEFCA", cursor: "pointer",
                fontSize: "1.2rem", padding: "0.2rem"
              }}>✕</button>
            </div>
            <div style={{ borderTop: "1px solid #547792", paddingTop: "0.5rem" }}>
              {followers_name.length > 0 ? (
                followers_name.map((follower, idx) => (
                  <div key={idx} style={{ 
                    padding: "0.8rem", display: "flex", alignItems: "center", gap: "1rem",
                    borderBottom: "1px solid rgba(148, 180, 193, 0.1)", 
                    transition: "background-color 0.2s ease"
                  }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(84, 119, 146, 0.3)")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}>
                    <div style={{ 
                      width: "40px", height: "40px", borderRadius: "50%", overflow: "hidden", 
                      backgroundColor: "#547792", flexShrink: 0 
                    }}>
                      <img src={`https://api.dicebear.com/7.x/micah/svg?seed=${follower?.following_id?.name || "unknown"}`} 
                        alt="Follower" style={{ width: "100%", height: "100%" }} />
                    </div>
                    <div>
                      <p style={{ color: "#ECEFCA", margin: 0, fontWeight: "500" }}>
                        {follower?.following_id?.name || "Unknown"}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ padding: "2rem 0", textAlign: "center", color: "#ECEFCA" }}>
                  <p>No followers yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Following Popup */}
      {showFollowingPopup && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
          backgroundColor: "rgba(33, 52, 72, 0.8)", backdropFilter: "blur(5px)", display: "flex",
          alignItems: "center", justifyContent: "center", zIndex: 999
        }} onClick={() => setShowFollowingPopup(false)}>
          <div style={{
            backgroundColor: "#213448", padding: "1.5rem", borderRadius: "10px", minWidth: "320px",
            maxHeight: "500px", overflowY: "auto", boxShadow: "0 0 25px rgba(0,0,0,0.5)",
            border: "1px solid #547792"
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
              <h4 style={{ color: "#94B4C1", margin: 0, fontSize: "1.2rem" }}>Following</h4>
              <button onClick={() => setShowFollowingPopup(false)} style={{
                backgroundColor: "transparent", border: "none", color: "#ECEFCA", cursor: "pointer",
                fontSize: "1.2rem", padding: "0.2rem"
              }}>✕</button>
            </div>
            <div style={{ borderTop: "1px solid #547792", paddingTop: "0.5rem" }}>
              {following_name.length > 0 ? (
                following_name.map((followed, idx) => (
                  <div key={idx} style={{ 
                    padding: "0.8rem", display: "flex", alignItems: "center", gap: "1rem",
                    borderBottom: "1px solid rgba(148, 180, 193, 0.1)", 
                    transition: "background-color 0.2s ease"
                  }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(84, 119, 146, 0.3)")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}>
                    <div style={{ 
                      width: "40px", height: "40px", borderRadius: "50%", overflow: "hidden", 
                      backgroundColor: "#547792", flexShrink: 0 
                    }}>
                      <img src={`https://api.dicebear.com/7.x/micah/svg?seed=${followed?.followed_id?.name || "unknown"}`} 
                        alt="Following" style={{ width: "100%", height: "100%" }} />
                    </div>
                    <div>
                      <p style={{ color: "#ECEFCA", margin: 0, fontWeight: "500" }}>
                        {followed?.followed_id?.name || "Unknown"}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ padding: "2rem 0", textAlign: "center", color: "#ECEFCA" }}>
                  <p>Not following anyone.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default UserDetails;