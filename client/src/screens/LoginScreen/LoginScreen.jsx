import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { loginWithGoogle } from "../../utils/FireBase";
import socket from "../../sockets/socket";
import ResetModal from "./ResetModal";

const LoginScreen = () => {
  const [message, setMessage] = useState(""), [email, setEmail] = useState(""), [password, setPassword] = useState(""), 
  [serverStatus, setServerStatus] = useState(""), [loading, setLoading] = useState(false), [showResetModal, setShowResetModal] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => { checkServerStatus(); }, []);

  const checkServerStatus = async () => {
    try { await axios.get(process.env.REACT_APP_SERVER_CHECK); setServerStatus("🟢 Live Server"); } 
    catch (error) { setServerStatus("🔴 Down Server"); }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(process.env.REACT_APP_LOGIN_URI, { email, password }, { withCredentials: true });
      setMessage(response.data.message);
      const { role, id } = response.data;
      localStorage.setItem("userId", id);
      socket.emit("registerUser", id);
      navigate(role === "admin" ? "/admin-dashboard" : "/Feed");
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "Login failed.");
    }
  };

  // Styles object for cleaner JSX
  const styles = {
    container: { minHeight: "100vh", backgroundColor: "#213448", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", color: "#ECEFCA", fontFamily: "'Segoe UI', 'SF Pro Display', sans-serif" },
    logo: { width: "60px", marginBottom: "10px", filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.2))" },
    title: { marginBottom: "20px", fontWeight: "600", fontSize: "24px", letterSpacing: "0.5px" },
    card: { backgroundColor: "#547792", border: "1px solid #94B4C1", borderRadius: "8px", padding: "24px", width: "340px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" },
    label: { fontSize: "14px", fontWeight: "600", marginBottom: "5px", display: "block" },
    input: { width: "100%", padding: "10px", marginBottom: "15px", border: "1px solid #94B4C1", borderRadius: "6px", backgroundColor: "#213448", color: "#ECEFCA", boxSizing: "border-box" },
    button: { width: "100%", padding: "12px", backgroundColor: "#94B4C1", color: "#213448", border: "none", borderRadius: "6px", fontSize: "16px", cursor: "pointer", fontWeight: "600", marginTop: "10px", transition: "opacity 0.2s" },
    googleButton: { width: "100%", padding: "12px", backgroundColor: "#4285F4", color: "#ECEFCA", border: "none", borderRadius: "6px", fontSize: "16px", fontWeight: "600", marginTop: "15px", cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center", gap: "8px" },
    forgotPassword: { fontSize: "12px", color: "#ECEFCA", textDecoration: "none", cursor: "pointer", opacity: "0.9", float: "right" },
    registerCard: { marginTop: "20px", padding: "16px 20px", border: "1px solid #94B4C1", borderRadius: "8px", backgroundColor: "#547792", fontSize: "14px", width: "340px", textAlign: "center", boxSizing: "border-box", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" },
    registerLink: { color: "#ECEFCA", cursor: "pointer", fontWeight: "600", textDecoration: "underline" },
    footer: { marginTop: "40px", fontSize: "12px", color: "#94B4C1", display: "flex", gap: "20px" },
    footerLink: { color: "#94B4C1", textDecoration: "none", opacity: "0.8", transition: "opacity 0.2s" },
    errorMessage: { marginTop: "16px", color: "#f85149", fontWeight: "500", fontSize: "14px", textAlign: "center" },
    serverStatus: { position: "absolute", bottom: "15px", right: "15px", fontSize: "13px", color: "#94B4C1", padding: "5px 10px", borderRadius: "4px", backgroundColor: "rgba(33, 52, 72, 0.7)" },
    divideLine: { display: "flex", alignItems: "center", margin: "20px 0", color: "#94B4C1" },
    divideText: { margin: "0 10px", fontSize: "12px" },
    divider: { height: "1px", flex: "1", backgroundColor: "#94B4C1", opacity: "0.5" }
  };

  return (
    <>
      <div style={styles.container}>
        <img src="wecode logo.png" alt="WeCode Logo" style={styles.logo} />
        <h2 style={styles.title}>Sign in to WeCode</h2>

        <div style={styles.card}>
          <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
            <label style={styles.label}>Username or email address</label>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "5px" }}>
              <label style={styles.label}>Password</label>
              <a href="#" style={styles.forgotPassword} onClick={() => setShowResetModal(true)}>Forgot password?</a>
            </div>

            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} />

            <button type="submit" style={{ ...styles.button, opacity: loading ? 0.7 : 1 }}>Sign in</button>
          </form>

          <div style={styles.divideLine}>
            <div style={styles.divider}></div>
            <div style={styles.divideText}>OR</div>
            <div style={styles.divider}></div>
          </div>

          <button
            onClick={async () => {
              if (loading) return;
              setLoading(true);
              try {
                const result = await loginWithGoogle();
                const idToken = await result.user.getIdToken();
                const response = await axios.post(`${process.env.REACT_APP_GOOGLE_AUTH_URI}`, { idToken }, { withCredentials: true });
                setMessage("Login successful");
                const { role, id } = response.data;
                localStorage.setItem("userId", id);
                socket.emit("registerUser", id);
                navigate(role === "admin" ? "/admin-dashboard" : "/Feed");
              } catch (error) {
                console.error("Firebase Google login error:", error);
                setMessage("Google Login Failed");
              } finally {
                setLoading(false);
              }
            }}
            disabled={loading}
            style={{ ...styles.googleButton, opacity: loading ? 0.7 : 1 }}
          >
            <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.6 20H24v8h11.3c-1.1 5.4-5.6 8.5-11.3 8.5-6.9 0-12.5-5.6-12.5-12.5S17.1 11.5 24 11.5c3 0 5.7 1.1 7.9 2.9l6.1-6.1C34.2 4.5 29.4 2.5 24 2.5 12.1 2.5 2.5 12.1 2.5 24S12.1 45.5 24 45.5c10.3 0 19.9-7.3 19.9-20 0-1.8-.2-3.5-.5-5.5z"/>
              <path fill="#FF3D00" d="M5.3 14.3l7.1 5.3c1.8-4.9 6.5-8.3 11.6-8.3 3 0 5.7 1.1 7.9 2.9l6.1-6.1C34.2 4.5 29.4 2.5 24 2.5c-8.3 0-15.4 4.9-18.7 11.8z"/>
              <path fill="#4CAF50" d="M24 45.5c5.3 0 10-1.8 13.7-5l-6.7-5.2c-1.8 1.2-4.2 2-7 2-5.6 0-10.4-3.7-12.1-8.7l-7.2 5.5C8.6 40.9 15.7 45.5 24 45.5z"/>
              <path fill="#1976D2" d="M43.6 20H24v8h11.3c-.5 2.5-2 4.8-4.3 6.2l6.7 5.2C42.3 35.6 44.5 29 44.5 24c0-1.8-.2-3.5-.5-5.5z"/>
            </svg>
            {loading ? "Signing in..." : "Sign in with Google"}
          </button>
        </div>

        <div style={styles.registerCard}>
          New to WeCode?{" "}
          <span onClick={() => navigate("/register")} style={styles.registerLink}>Create an account</span>
        </div>

        {message && <div style={styles.errorMessage}>{message}</div>}

        <div style={styles.footer}>
          <a href="#" style={styles.footerLink}>Terms</a>
          <a href="#" style={styles.footerLink}>Privacy</a>
          <a href="#" style={styles.footerLink}>Security</a>
          <a href="#" style={styles.footerLink}>Contact WeCode</a>
        </div>

        <div style={styles.serverStatus}>{serverStatus}</div>
      </div>
      <ResetModal show={showResetModal} onClose={() => setShowResetModal(false)} />
    </>
  );
};

export default LoginScreen;