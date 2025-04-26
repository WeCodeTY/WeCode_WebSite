import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { handleLogout } from "../utils/Logout.js";
import { createroom, joinroom } from "../Rooms/room.jsx";
import { io } from "socket.io-client";
import axios from "axios";
import solvedproblemslist from "../screens/solvedproblemslist.jsx";
const socket = io(process.env.REACT_APP_SOCKET_URL);

const linkStyle = {
  color: "#ECEFCA",
  textDecoration: "none",
};

// Responsive navbar styles
const navbarStyles = {
  nav: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "80px",
    backgroundColor: "#213448",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: "20px",
    paddingRight: "5px",
    color: "#ECEFCA",
    zIndex: 10,
    boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
    backdropFilter: "blur(10px)",
  },
};

const Navbar = () => {
  const [showmenu, setShowmenu] = React.useState(false);
  const [joinRoomId, setJoinRoomId] = React.useState("");
  const [showJoinModal, setShowJoinModal] = React.useState(false);
  const [userPoints, setUserPoints] = useState(0);
  const [showCoursesMenu, setShowCoursesMenu] = useState(false);
  // Responsive state for window width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const isMobile = windowWidth <= 768;
  const navigate = useNavigate();
  const location = useLocation();
  const isDsaDashboard = location.pathname.startsWith("/dsadashboard");

  useEffect(() => {
    const fetchUserPoints = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_USER_POINTS_VIEW, { withCredentials: true });
        if (response.data && typeof response.data.points === "number") {
          setUserPoints(response.data.points);
        }
      } catch (error) {
        console.error("Failed to fetch user points:", error);
      }
    };

    fetchUserPoints();
  }, []);

  const handleToggleMenu = () => setShowmenu(!showmenu);
  const handleLogoutClick = () => {
    setShowmenu(false);
    handleLogout(navigate);
  };
  const handleNavigateTouser = () => {
    navigate("/userdetails");
  };

  const NavigateFeed = () => {
    navigate("/Feed");
  };
  const NavigatedDSADashboard = () => {
    navigate("/dsadashboard");
  };

  const handleCreateRoom = async () => {
    try {
      const roomId = await createroom({ isReadOnly: true, fromNavbar: true });

      console.log("✅ Room Created in navbar:", roomId);
      navigate(`/room/${roomId}`, {
        state: {
          isReadOnly: true,
          fromNavbar: true,
        },
      });
    } catch (error) {
      console.error("Failed to create room:", error);
    }
  };

  const handleJoinRoom = async () => {
    if (!joinRoomId) {
      alert("Please enter a Room ID!");
      return;
    }
    try {
      const roomId = await joinroom(joinRoomId);

      console.log("✅ Room Joined in navbar:", roomId);
      setShowJoinModal(false);
      navigate(`/room/${roomId}`, {
        state: {
          isReadOnly: true,
          fromNavbar: true,
        },
      });
    } catch (error) {
      console.error("❌ Failed to join room:", error);
      alert("Failed to join the room. Please check the Room ID and try again.");
    }
  };

  const handleNavigateToFollowDashboard = () => {
    navigate("/follow-dashboard");
  };

  const handleproblemsolved = () => {
    navigate("/solvedproblemslist");
  };

  const handleNavigateToUploadPost = () => {
    navigate("/upload-post");
  };
  const navigatetoabout = () => {
    navigate("/about");
  };
  const NavigatetoWebDev = () => {
    navigate("/webdev");
  };
  const NavigatetoWebDevprojects = () => {
    navigate("/webdevprojects");
  };
  const navigatetodevops = () => {
    navigate("/devops");
  };
  const navigatetodevopsprojects = () => {
    navigate("/devopsprojects");
  };
  const NavigateDsaCourses = () => {
    navigate("/dsacourses");
  };

  return (
    <nav style={navbarStyles.nav}>
      <div
        onClick={NavigateFeed}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          cursor: "pointer",
        }}
      >
        <img
          src="/wecode logo.png"
          alt="WeCode Logo"
          style={{ height: "40px" }}
        />
        <span style={{ fontSize: "2rem", fontWeight: "bold", color: "#ECEFCA" }}>
          WeCode
        </span>
      </div>

      {/* Hamburger menu and mobile menu */}
      {isMobile && (
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setShowMobileMenu((prev) => !prev)}
            style={{
              background: "transparent",
              border: "none",
              color: "#ECEFCA",
              fontSize: "2rem",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            ☰
          </button>
          {showMobileMenu && (
            <div
              style={{
                position: "absolute",
                top: "70px",
                right: 0,
                backgroundColor: "#213448",
                borderRadius: "8px",
                padding: "15px",
                minWidth: "180px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
                zIndex: 20,
              }}
            >
              <span style={{ ...linkStyle, display: "block", marginBottom: "10px" }} onClick={NavigateFeed}>Home</span>
              <span style={{ ...linkStyle, display: "block", marginBottom: "10px" }} onClick={NavigateDsaCourses}>DSA Course</span>
              <span style={{ ...linkStyle, display: "block", marginBottom: "10px" }} onClick={NavigatetoWebDev}>Web Dev Course</span>
              <span style={{ ...linkStyle, display: "block", marginBottom: "10px" }} onClick={navigatetodevops}>DevOps Course</span>
              <span style={{ ...linkStyle, display: "block", marginBottom: "10px" }} onClick={navigatetoabout}>About</span>
              <span style={{ ...linkStyle, display: "block", marginBottom: "10px" }} onClick={NavigatetoWebDevprojects}>Web Dev</span>
              <span style={{ ...linkStyle, display: "block", marginBottom: "10px" }} onClick={NavigatedDSADashboard}>DSA</span>
              <span style={{ ...linkStyle, display: "block", marginBottom: "10px" }} onClick={navigatetodevopsprojects}>DevOps</span>
            </div>
          )}
        </div>
      )}

      {!isMobile && (
        <div
          style={{
            display: "flex",
            gap: "25px",
            fontSize: "15px",
          }}
        >
          <span style={linkStyle} onClick={NavigateFeed}>
            Home
          </span>
          <div style={{ position: "relative" }}>
            <span
              style={{ ...linkStyle, cursor: "pointer" }}
              onClick={() => setShowCoursesMenu((prev) => !prev)}
            >
              Courses ▼
            </span>
            {showCoursesMenu && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  backgroundColor: "rgba(33, 52, 72, 0.95)",
                  borderRadius: "8px",
                  padding: "10px",
                  minWidth: "150px",
                  zIndex: 20,
                  marginTop: "5px",
                }}
              >
                <button
                  onClick={NavigateDsaCourses}
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "8px 10px",
                    background: "none",
                    color: "#ECEFCA",
                    border: "none",
                    textAlign: "left",
                    cursor: "pointer",
                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = "#1a1a1a")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "transparent")}
                >
                  DSA Course
                </button>
                <button
                  onClick={NavigatetoWebDev}
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "8px 10px",
                    background: "none",
                    color: "#ECEFCA",
                    border: "none",
                    textAlign: "left",
                    cursor: "pointer",
                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = "#1a1a1a")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "transparent")}
                >
                  Web Dev Course
                </button>
                <button
                  onClick={navigatetodevops}
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "8px 10px",
                    background: "none",
                    color: "#ECEFCA",
                    border: "none",
                    textAlign: "left",
                    cursor: "pointer",
                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = "#1a1a1a")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "transparent")}
                >
                  DevOps Course
                </button>
              </div>
            )}
          </div>
          <a href="#about" style={linkStyle} onClick={navigatetoabout}>
            About
          </a>
          <a href="#webdev" style={linkStyle} onClick={NavigatetoWebDevprojects}>
            Web Dev
          </a>
          <a href="#dsa" style={linkStyle} onClick={NavigatedDSADashboard}>
            DSA
          </a>
          <a href="#devops" style={linkStyle} onClick={navigatetodevopsprojects}>
            DevOps
          </a>
        </div>
      )}
      {isDsaDashboard && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginRight: "10px",
          }}
        >
          <button
            onClick={handleCreateRoom}
            style={{
              padding: "8px 14px",
              color: "#ECEFCA",
              backgroundColor: "#547792",
              border: "none",
              borderRadius: "6px",
              fontWeight: "500",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(84, 119, 146, 0.4)",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#94B4C1")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#547792")}
          >
            Create Room
          </button>
          <button
            onClick={() => setShowJoinModal(true)}
            style={{
              padding: "8px 14px",
              color: "#ECEFCA",
              backgroundColor: "#547792",
              border: "none",
              borderRadius: "6px",
              fontWeight: "500",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(84, 119, 146, 0.4)",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#94B4C1")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#547792")}
          >
            Join Room
          </button>
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={{ color: "#ECEFCA", fontWeight: "bold", marginRight: "10px" }}>
          Points: {userPoints}
        </span>
        <div style={{ position: "relative" }}>
          <button
            onClick={handleToggleMenu}
            style={{
              background: "rgba(255,255,255,0.1)",
              padding: "15px 30px",
              backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.9), rgba(9, 21, 125, 0.6))`,
              borderRadius: "50%",
              color: "#ECEFCA",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              cursor: "pointer",
              backdropFilter: "blur(5px)",
              marginRight: "40px",
            }}
          >
            Profile ▼
          </button>

          {showmenu && (
            <div
              style={{
                position: "absolute",
                top: "110%",
                right: 0,
                backgroundColor: "rgba(33, 52, 72, 0.95)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "8px",
                padding: "10px",
                minWidth: "160px",
                zIndex: 20,
              }}
            >
              <button
                onClick={handleNavigateTouser}
                style={{
                  padding: "10px",
                  color: "#ECEFCA",
                  backgroundColor: "transparent",
                  border: "none",
                  textAlign: "left",
                  width: "100%",
                  cursor: "pointer",
                  transition: "background 0.2s",
                  borderRadius: "4px",
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#1a1a1a")
                }
                onMouseOut={(e) =>
                  (e.target.style.backgroundColor = "transparent")
                }
              >
                User Details
              </button>
              <button
                onClick={handleNavigateToFollowDashboard}
                style={{
                  padding: "10px",
                  color: "#ECEFCA",
                  backgroundColor: "transparent",
                  border: "none",
                  textAlign: "left",
                  width: "100%",
                  cursor: "pointer",
                  transition: "background 0.2s",
                  borderRadius: "4px",
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#1a1a1a")
                }
                onMouseOut={(e) =>
                  (e.target.style.backgroundColor = "transparent")
                }
              >
                Follow Dashboard
              </button>
              <button
                onClick={handleNavigateToUploadPost}
                style={{
                  padding: "10px",
                  color: "#ECEFCA",
                  backgroundColor: "transparent",
                  border: "none",
                  textAlign: "left",
                  width: "100%",
                  cursor: "pointer",
                  transition: "background 0.2s",
                  borderRadius: "4px",
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#1a1a1a")
                }
                onMouseOut={(e) =>
                  (e.target.style.backgroundColor = "transparent")
                }
              >
                Upload Post
              </button>

              <button
                onClick={handleproblemsolved}
                style={{
                  padding: "10px",
                  color: "#ECEFCA",
                  backgroundColor: "transparent",
                  border: "none",
                  textAlign: "left",
                  width: "100%",
                  cursor: "pointer",
                  transition: "background 0.2s",
                  borderRadius: "4px",
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#1a1a1a")
                }
                onMouseOut={(e) =>
                  (e.target.style.backgroundColor = "transparent")
                }
              >
                Problem Solved
              </button>
              <button
                onClick={handleLogoutClick}
                style={{
                  padding: "10px",
                  color: "#ECEFCA",
                  backgroundColor: "transparent",
                  border: "none",
                  textAlign: "left",
                  width: "100%",
                  cursor: "pointer",
                  transition: "background 0.2s",
                  borderRadius: "4px",
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#1a1a1a")
                }
                onMouseOut={(e) =>
                  (e.target.style.backgroundColor = "transparent")
                }
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
      {isDsaDashboard && showJoinModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(33, 52, 72, 0.8)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#547792",
              padding: "30px",
              borderRadius: "12px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "15px",
              border: "1px solid #94B4C1",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
              maxWidth: "300px",
              width: "90%",
            }}
          >
            <input
              type="text"
              placeholder="Enter Room ID"
              value={joinRoomId}
              onChange={(e) => setJoinRoomId(e.target.value)}
              style={{
                backgroundColor: "#94B4C1",
                color: "#213448",
                border: "1px solid #213448",
                borderRadius: "8px",
                padding: "12px",
                outline: "none",
                width: "100%",
                fontSize: "1rem",
              }}
            />
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={handleJoinRoom}
                style={{
                  padding: "8px 14px",
                  color: "#ECEFCA",
                  backgroundColor: "#547792",
                  border: "none",
                  borderRadius: "6px",
                  fontWeight: "500",
                  cursor: "pointer",
                  boxShadow: "0 2px 8px rgba(84, 119, 146, 0.4)",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#94B4C1")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#547792")}
              >
                Join Room
              </button>
              <button
                onClick={() => setShowJoinModal(false)}
                style={{
                  padding: "8px 14px",
                  color: "#ECEFCA",
                  backgroundColor: "#547792",
                  border: "none",
                  borderRadius: "6px",
                  fontWeight: "500",
                  cursor: "pointer",
                  boxShadow: "0 2px 8px rgba(84, 119, 146, 0.4)",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#94B4C1")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#547792")}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
