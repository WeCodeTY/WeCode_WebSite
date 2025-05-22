import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { handleLogout } from "../utils/Logout.js";
import { createroom, joinroom } from "../Rooms/room.jsx";
import { io } from "socket.io-client";
import axios from "axios";
import solvedproblemslist from "../screens/solvedproblemslist/solvedproblemslist";
const socket = io(process.env.REACT_APP_SOCKET_URL);

// Enhanced styles with animations
const styles = {
  nav: { position: "fixed", top: 0, left: 0, width: "100%", height: "70px", backgroundColor: "#213448", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 20px", color: "#ECEFCA", zIndex: 10, boxShadow: "0 3px 10px rgba(0,0,0,0.2)", backdropFilter: "blur(10px)" },
  logo: { display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", transition: "transform 0.3s ease" },
  logoText: { fontSize: "1.8rem", fontWeight: "bold", color: "#ECEFCA", letterSpacing: "0.5px", transition: "color 0.3s ease" },
  logoImg: { height: "40px", transition: "transform 0.3s ease" },
  menuContainer: { display: "flex", alignItems: "center", gap: "20px" },
  link: { color: "#ECEFCA", textDecoration: "none", fontSize: "15px", fontWeight: "500", padding: "5px 10px", borderRadius: "4px", transition: "all 0.3s ease" },
  activeLink: { color: "#ECEFCA", textDecoration: "none", fontSize: "15px", fontWeight: "600", padding: "5px 10px", borderRadius: "4px", backgroundColor: "rgba(148, 180, 193, 0.15)", transition: "all 0.3s ease" },
  dropdownContainer: { position: "relative", transition: "transform 0.2s ease" },
  dropdownButton: { background: "none", border: "none", color: "#ECEFCA", fontSize: "15px", fontWeight: "500", cursor: "pointer", padding: "5px 10px", display: "flex", alignItems: "center", gap: "4px", borderRadius: "4px", transition: "all 0.3s ease" },
  dropdownMenu: { position: "absolute", top: "calc(100% + 5px)", backgroundColor: "rgba(33, 52, 72, 0.95)", backdropFilter: "blur(10px)", borderRadius: "8px", padding: "6px", boxShadow: "0 5px 15px rgba(0,0,0,0.3)", zIndex: 20, minWidth: "180px", border: "1px solid rgba(148, 180, 193, 0.2)", animation: "fadeIn 0.3s ease-out forwards" },
  dropdownItem: { display: "block", width: "100%", padding: "8px 12px", background: "none", color: "#ECEFCA", border: "none", textAlign: "left", cursor: "pointer", borderRadius: "4px", transition: "background 0.2s ease, transform 0.2s ease", fontSize: "14px" },
  points: { color: "#ECEFCA", fontWeight: "600", padding: "6px 15px", backgroundColor: "rgba(148, 180, 193, 0.15)", borderRadius: "20px", fontSize: "14px", display: "flex", alignItems: "center", gap: "5px", transition: "transform 0.2s ease, background-color 0.3s ease",marginRight: "30px" },
  profileButton: { background: "linear-gradient(135deg, #547792, #213448)", padding: "8px 16px", borderRadius: "20px", color: "#ECEFCA", border: "1px solid rgba(148, 180, 193, 0.3)", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", fontSize: "14px", fontWeight: "500", transition: "all 0.3s ease", marginRight: "20px" },
  roomButton: { padding: "8px 14px", color: "#ECEFCA", backgroundColor: "#547792", border: "none", borderRadius: "6px", fontWeight: "500", cursor: "pointer", boxShadow: "0 2px 8px rgba(84, 119, 146, 0.4)", transition: "all 0.3s ease", fontSize: "14px", display: "flex", alignItems: "center", gap: "5px" },
  modalOverlay: { position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(33, 52, 72, 0.8)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", animation: "fadeIn 0.3s ease-out forwards"  },
  modalContent: { backgroundColor: "#213448", padding: "25px", borderRadius: "12px", display: "flex", flexDirection: "column", alignItems: "center", gap: "15px", border: "1px solid #547792", boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)", maxWidth: "300px", width: "90%", animation: "slideDown 0.3s ease-out forwards" },
  modalInput: { backgroundColor: "rgba(84, 119, 146, 0.3)", color: "#ECEFCA", border: "1px solid rgba(148, 180, 193, 0.3)", borderRadius: "8px", padding: "12px", outline: "none", width: "100%", fontSize: "1rem", transition: "border-color 0.3s ease, box-shadow 0.3s ease" },
  hamburgerButton: { background: "transparent", border: "none", color: "#ECEFCA", fontSize: "2rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "transform 0.3s ease",  marginRight: "25px" },
  mobileMenu: { position: "absolute", top: "70px", right: "10px", backgroundColor: "#213448", borderRadius: "8px", padding: "10px", minWidth: "250px", boxShadow: "0 4px 20px rgba(0,0,0,0.5)", zIndex: 20, display: "flex", flexDirection: "column", gap: "5px", border: "1px solid rgba(148, 180, 193, 0.2)", animation: "slideDown 0.3s ease-out forwards" },
  mobileMenuDivider: { height: "1px", backgroundColor: "rgba(148, 180, 193, 0.2)", margin: "5px 0" },
  rightSection: { display: "flex", alignItems: "center", gap: "15px" },
  '@keyframes fadeIn': { from: { opacity: 0 }, to: { opacity: 1 } },
  '@keyframes slideDown': { from: { opacity: 0, transform: 'translateY(-20px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
  '@keyframes pulse': { '0%': { transform: 'scale(1)' }, '50%': { transform: 'scale(1.05)' }, '100%': { transform: 'scale(1)' } }
};

const Navbar = () => {
  // States compressed into one area
  const [state, setState] = useState({
    showMenu: false,
    joinRoomId: "",
    showJoinModal: false,
    userPoints: 0,
    showCoursesMenu: false,
    windowWidth: window.innerWidth,
    showMobileMenu: false,
    hoverLogo: false,
    focusedInput: false
  });
  
  // Helpers & hooks
  const navigate = useNavigate();
  const location = useLocation();
  const isDsaDashboard = location.pathname.startsWith("/dsadashboard");
  const isMobile = state.windowWidth <= 768;
  
  // Simplified state updates
  const updateState = (newState) => setState(prev => ({ ...prev, ...newState }));
  
  // Effect for window resize and user points
  useEffect(() => {
    const handleResize = () => updateState({ windowWidth: window.innerWidth });
    window.addEventListener("resize", handleResize);
    
    const fetchUserPoints = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_USER_POINTS_VIEW, { withCredentials: true });
        if (response.data && typeof response.data.points === "number") updateState({ userPoints: response.data.points });
      } catch (error) { console.error("Failed to fetch user points:", error); }
    };
    
    fetchUserPoints();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  // Navigation handlers - compressed
  const navTo = (path) => () => navigate(path);
  const toggleMenu = (menuName) => () => updateState({ [menuName]: !state[menuName] });
  
  // Room handlers
  const handleCreateRoom = async () => {
    try {
      const roomId = await createroom({ isReadOnly: true, fromNavbar: true });
      console.log("✅ Room Created:", roomId);
      navigate(`/room/${roomId}`, { state: { isReadOnly: true, fromNavbar: true } });
    } catch (error) { console.error("Failed to create room:", error); }
  };
  
  const handleJoinRoom = async () => {
    if (!state.joinRoomId) { alert("Please enter a Room ID!"); return; }
    try {
      const roomId = await joinroom(state.joinRoomId);
      console.log("✅ Room Joined:", roomId);
      updateState({ showJoinModal: false });
      navigate(`/room/${roomId}`, { state: { isReadOnly: true, fromNavbar: true } });
    } catch (error) {
      console.error("❌ Failed to join room:", error);
      alert("Failed to join the room. Please check the Room ID and try again.");
    }
  };
  
  const handleLogoutClick = () => {
    updateState({ showMenu: false });
    handleLogout(navigate);
  };

  // Menu items for reusability
  const courseItems = [
    { label: "DSA Course", action: navTo("/dsacourses") },
    { label: "Web Dev Course", action: navTo("/webdev") },
    { label: "DevOps Course", action: navTo("/devops") }
  ];
  
  const profileItems = [
    { label: "User Details", action: navTo("/userdetails") },
    { label: "Follow Dashboard", action: navTo("/follow-dashboard") },
    { label: "Upload Post", action: navTo("/upload-post") },
    { label: "Problem Solved", action: navTo("/solvedproblemslist") },
    { label: "Logout", action: handleLogoutClick }
  ];
  
  const navLinks = [
    { label: "Home", path: "/Feed", action: navTo("/Feed") },
    { label: "About", path: "/about", action: navTo("/about") },
    { label: "Web Dev", path: "/webdevprojects", action: navTo("/webdevprojects") },
    { label: "DSA", path: "/dsadashboard", action: navTo("/dsadashboard") },
    { label: "DevOps", path: "/devopsprojects", action: navTo("/devopsprojects") }
  ];

  // Render helper functions
  const renderDropdownMenu = (items) => (
    <div style={{
      ...styles.dropdownMenu,
      animation: "fadeIn 0.3s ease-out forwards"
    }}>
      {items.map((item, idx) => (
        <button 
          key={idx} 
          onClick={item.action} 
          style={styles.dropdownItem}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "rgba(148, 180, 193, 0.2)";
            e.target.style.transform = "translateX(5px)";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "transparent";
            e.target.style.transform = "translateX(0)";
          }}>
          {item.label}
        </button>
      ))}
    </div>
  );

  // Dynamic logo style based on hover state
  const logoStyle = {
    ...styles.logo,
    transform: state.hoverLogo ? "scale(1.05)" : "scale(1)"
  };
  
  const logoImgStyle = {
    ...styles.logoImg,
    transform: state.hoverLogo ? "rotate(5deg)" : "rotate(0deg)"
  };

  return (
    <>
      {/* Add global keyframes */}
      <style>
        {`
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes slideDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.05); } 100% { transform: scale(1); } }
        `}
      </style>
      
      <nav style={styles.nav}>
        {/* Logo with hover effect */}
        <div 
          onClick={navTo("/Feed")} 
          style={logoStyle}
          onMouseEnter={() => updateState({ hoverLogo: true })}
          onMouseLeave={() => updateState({ hoverLogo: false })}>
          <img src="/wecode logo.png" alt="WeCode" style={logoImgStyle} />
          <span style={{
            ...styles.logoText,
            color: state.hoverLogo ? "#FFFFFF" : "#ECEFCA"
          }}>WeCode</span>
        </div>

        {/* Mobile hamburger menu */}
        {isMobile && (
          <div style={{ position: "relative" }}>
            <button 
              onClick={toggleMenu("showMobileMenu")} 
              style={{
                ...styles.hamburgerButton,
                transform: state.showMobileMenu ? "rotate(90deg)" : "rotate(0deg)"
              }}>
              ☰
            </button>
            
            {state.showMobileMenu && (
              <div style={styles.mobileMenu}>
                <div style={{ padding: "5px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: "600", color: "#ECEFCA" }}>Menu</span>
                  <span style={{
                    ...styles.points,
                    animation: "pulse 1.5s infinite"
                  }}>Points: {state.userPoints}</span>
                </div>
                
                <div style={styles.mobileMenuDivider} />
                
                {isDsaDashboard && (
                  <>
                    <div style={{ display: "flex", gap: "8px", padding: "5px" }}>
                      <button 
                        onClick={handleCreateRoom} 
                        style={styles.roomButton}
                        onMouseOver={(e) => {
                          e.target.style.backgroundColor = "#94B4C1";
                          e.target.style.transform = "translateY(-2px)";
                        }}
                        onMouseOut={(e) => {
                          e.target.style.backgroundColor = "#547792";
                          e.target.style.transform = "translateY(0)";
                        }}>
                        Create Room
                      </button>
                      <button 
                        onClick={() => updateState({ showJoinModal: true })} 
                        style={styles.roomButton}
                        onMouseOver={(e) => {
                          e.target.style.backgroundColor = "#94B4C1";
                          e.target.style.transform = "translateY(-2px)";
                        }}
                        onMouseOut={(e) => {
                          e.target.style.backgroundColor = "#547792";
                          e.target.style.transform = "translateY(0)";
                        }}>
                        Join Room
                      </button>
                    </div>
                    <div style={styles.mobileMenuDivider} />
                  </>
                )}
                
                {/* Mobile navigation links */}
                {[...navLinks, ...courseItems, ...profileItems].map((item, idx) => (
                  <span 
                    key={idx} 
                    onClick={item.action} 
                    style={{ ...styles.link, display: "block", padding: "8px 12px" }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = "rgba(148, 180, 193, 0.15)";
                      e.target.style.paddingLeft = "15px";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = "transparent";
                      e.target.style.paddingLeft = "12px";
                    }}>
                    {item.label}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Desktop navigation */}
        {!isMobile && (
          <>
            <div style={styles.menuContainer}>
              {navLinks.map((link, idx) => (
                <span 
                  key={idx} 
                  style={location.pathname === link.path ? styles.activeLink : styles.link} 
                  onClick={link.action}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = "rgba(148, 180, 193, 0.15)";
                    e.target.style.transform = "translateY(-2px)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = location.pathname === link.path ? "rgba(148, 180, 193, 0.15)" : "transparent";
                    e.target.style.transform = "translateY(0)";
                  }}>
                  {link.label}
                </span>
              ))}
              
              {/* Courses dropdown */}
              <div 
                style={{
                  ...styles.dropdownContainer,
                  transform: state.showCoursesMenu ? "translateY(-2px)" : "translateY(0)"
                }}>
                <button 
                  onClick={toggleMenu("showCoursesMenu")} 
                  style={styles.dropdownButton}
                  onMouseOver={(e) => e.target.style.backgroundColor = "rgba(148, 180, 193, 0.15)"}
                  onMouseOut={(e) => e.target.style.backgroundColor = "transparent"}>
                  Courses <span style={{ 
                    fontSize: "10px", 
                    marginTop: "2px",
                    transform: state.showCoursesMenu ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.3s ease"
                  }}>▼</span>
                </button>
                {state.showCoursesMenu && renderDropdownMenu(courseItems)}
              </div>
            </div>
            
            <div style={styles.rightSection}>
              {/* Profile dropdown (moved left) */}
              <div style={styles.dropdownContainer}>
                <button 
                  onClick={toggleMenu("showMenu")} 
                  style={styles.profileButton}
                  onMouseOver={(e) => {
                    e.target.style.boxShadow = "0 2px 10px rgba(84, 119, 146, 0.6)";
                    e.target.style.transform = "translateY(-2px)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.boxShadow = "none";
                    e.target.style.transform = "translateY(0)";
                  }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  Profile
                </button>
                {state.showMenu && renderDropdownMenu(profileItems)}
              </div>
              
              {/* Room buttons (conditional) */}
              {isDsaDashboard && (
                <div style={{ display: "flex", gap: "10px" }}>
                  <button 
                    onClick={handleCreateRoom} 
                    style={styles.roomButton}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = "#94B4C1";
                      e.target.style.transform = "translateY(-2px)";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = "#547792";
                      e.target.style.transform = "translateY(0)";
                    }}>
                    Create Room
                  </button>
                  <button 
                    onClick={() => updateState({ showJoinModal: true })} 
                    style={styles.roomButton}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = "#94B4C1";
                      e.target.style.transform = "translateY(-2px)";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = "#547792";
                      e.target.style.transform = "translateY(0)";
                    }}>
                    Join Room
                  </button>
                </div>
              )}
              
              {/* Points display with pulsing animation */}
              <div 
                style={{
                  ...styles.points,
                  animation: "pulse 2s infinite"
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "rgba(148, 180, 193, 0.3)";
                  e.target.style.animation = "none";
                  e.target.style.transform = "scale(1.1)";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "rgba(148, 180, 193, 0.15)";
                  e.target.style.animation = "pulse 2s infinite";
                  e.target.style.transform = "scale(1)";
                }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                </svg>
                {state.userPoints}
              </div>
            </div>
          </>
        )}
        
        {/* Join Room Modal with enhanced animations */}
        {state.showJoinModal && (
          <div 
            style={styles.modalOverlay} 
            onClick={() => updateState({ showJoinModal: false })}>
            <div 
              style={styles.modalContent} 
              onClick={(e) => e.stopPropagation()}>
              <h3 style={{ margin: "0 0 10px 0", color: "#ECEFCA", textAlign: "center" }}>Join Room</h3>
              <input
                type="text"
                placeholder="Enter Room ID"
                value={state.joinRoomId}
                onChange={(e) => updateState({ joinRoomId: e.target.value })}
                style={{
                  ...styles.modalInput,
                  borderColor: state.focusedInput ? "#94B4C1" : "rgba(148, 180, 193, 0.3)",
                  boxShadow: state.focusedInput ? "0 0 0 2px rgba(148, 180, 193, 0.2)" : "none"
                }}
                onFocus={() => updateState({ focusedInput: true })}
                onBlur={() => updateState({ focusedInput: false })}
              />
              <div style={{ display: "flex", gap: "10px", width: "100%", justifyContent: "center" }}>
                <button 
                  onClick={handleJoinRoom} 
                  style={styles.roomButton}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = "#94B4C1";
                    e.target.style.transform = "translateY(-2px)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = "#547792";
                    e.target.style.transform = "translateY(0)";
                  }}>
                  Join
                </button>
                <button 
                  onClick={() => updateState({ showJoinModal: false })} 
                  style={{ ...styles.roomButton, backgroundColor: "rgba(148, 180, 193, 0.2)" }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = "rgba(148, 180, 193, 0.3)";
                    e.target.style.transform = "translateY(-2px)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = "rgba(148, 180, 193, 0.2)";
                    e.target.style.transform = "translateY(0)";
                  }}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;