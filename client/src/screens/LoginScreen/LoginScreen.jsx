import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { loginWithGoogle } from "../../utils/FireBase";
import socket from "../../sockets/socket";

const LoginScreen = () => {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [serverStatus, setServerStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkServerStatus();
  }, []);

  const checkServerStatus = async () => {
    try {
      await axios.get(process.env.REACT_APP_SERVER_CHECK);
      setServerStatus("🟢 Live Server");
    } catch (error) {
      setServerStatus("🔴 Down Server");
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_LOGIN_URI,
        { email, password },
        { withCredentials: true }
      );
      setMessage(response.data.message);

      const { role , id } = response.data;  // Get role from the response
      socket.emit("registerUser", id);
      if (role === "admin") {
        navigate("/admin-dashboard");  // Redirect to admin dashboard
      } else {
        navigate("/Feed");  // Redirect to user dashboard
      }
      
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "Login failed.");
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#213448",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          color: "#ECEFCA",
          fontFamily: "Segoe UI, sans-serif",
        }}
      >
        <img
          src="wecode logo.png"
          alt="wecode Logo"
          style={{ width: "50px", marginBottom: "20px" }}
        />
        <h2 style={{ marginBottom: "20px", fontWeight: "500" }}>
          Sign in to WeCode
        </h2>

        <div
          style={{
            backgroundColor: "#547792",
            border: "1px solid #94B4C1",
            borderRadius: "6px",
            padding: "20px",
            width: "300px",
            textAlign: "left",
          }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <label style={{ fontSize: "14px", fontWeight: "600" }}>
              Username or email address
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "5px",
                marginBottom: "15px",
                border: "1px solid #94B4C1",
                borderRadius: "6px",
                backgroundColor: "#213448",
                color: "#ECEFCA",
              }}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <label style={{ fontSize: "14px", fontWeight: "600" }}>
                Password
              </label>
              <a
                href="#"
                style={{
                  fontSize: "12px",
                  color: "#94B4C1",
                  textDecoration: "none",
                }}
              >
                Forgot password?
              </a>
            </div>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "5px",
                marginBottom: "15px",
                border: "1px solid #94B4C1",
                borderRadius: "6px",
                backgroundColor: "#213448",
                color: "#ECEFCA",
              }}
            />

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "10px",
                backgroundColor: "#94B4C1",
                color: "#213448",
                border: "none",
                borderRadius: "6px",
                fontSize: "16px",
                cursor: "pointer",
                fontWeight: "600",
                marginTop: "10px",
              }}
            >
              Sign in
            </button>
          </form>

          <div style={{ marginTop: "15px", textAlign: "center" }}>
            <button
              onClick={async () => {
                if (loading) return;
                setLoading(true);
                try {
                  const result = await loginWithGoogle();
                  const idToken = await result.user.getIdToken();

                  


                  const response = await axios.post(
                    `${process.env.REACT_APP_GOOGLE_AUTH_URI}`,
                    { idToken },
                    { withCredentials: true }
                  );
                  
                  setMessage("Login successful");
                  const { role } = response.data;  // Get role from the response
                  const { id } = response.data;
                  socket.emit("registerUser", id);
                  if (role === "admin") {
                    navigate("/admin-dashboard");  // Redirect to admin dashboard
                  } else {
                    navigate("/Feed");  // Redirect to user dashboard
                  }
                } catch (error) {
                  console.error("Firebase Google login error:", error);
                  setMessage("Google Login Failed");
                } finally {
                  setLoading(false);
                }
              }}
              disabled={loading}
              style={{
                width: "100%",
                padding: "10px",
                backgroundColor: "#4285F4",
                color: "#ECEFCA",
                border: "none",
                borderRadius: "6px",
                fontSize: "16px",
                fontWeight: "600",
                marginTop: "10px",
                cursor: "pointer",
              }}
            >
              {loading ? "Signing in..." : "Sign in with Google"}
            </button>
          </div>
        </div>

        <div
          style={{
            marginTop: "15px",
            padding: "12px 20px",
            border: "1px solid #94B4C1",
            borderRadius: "6px",
            backgroundColor: "#547792",
            fontSize: "14px",
          }}
        >
          New to WeCode?{" "}
          <span
            onClick={handleRegister}
            style={{
              color: "#ECEFCA",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Create an account.
          </span>
        </div>

        {message && (
          <div
            style={{
              marginTop: "20px",
              color: "#f85149",
              fontWeight: "bold",
            }}
          >
            {message}
          </div>
        )}

        <div
          style={{
            marginTop: "40px",
            fontSize: "12px",
            color: "#94B4C1",
            display: "flex",
            gap: "15px",
          }}
        >
          <a href="#" style={{ color: "#94B4C1", textDecoration: "none" }}>
            Terms
          </a>
          <a href="#" style={{ color: "#94B4C1", textDecoration: "none" }}>
            Privacy
          </a>
          <a href="#" style={{ color: "#94B4C1", textDecoration: "none" }}>
            Security
          </a>
          <a href="#" style={{ color: "#94B4C1", textDecoration: "none" }}>
            Contact GitHub
          </a>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            fontSize: "13px",
            color: "#94B4C1",
          }}
        >
          {serverStatus}
        </div>
      </div>
    </>
  );
};

export default LoginScreen;