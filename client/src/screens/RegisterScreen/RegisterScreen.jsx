import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { loginWithGoogle } from "../../utils/FireBase";

const RegisterUserScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        process.env.REACT_APP_REGISTER_URI,
        { name, email, password },
        { withCredentials: true }
      );
      setMessage(res.data.message);
      navigate("/login");
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed.");
    }
  };

  const handleGoogleSignup = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const result = await loginWithGoogle();
      const idToken = await result.user.getIdToken();
      await axios.post(
        `${process.env.REACT_APP_GOOGLE_AUTH_URI}`,
        { idToken },
        { withCredentials: true }
      );
      setMessage("Registration successful");
      navigate("/Feed");
    } catch (error) {
      console.error("Firebase Google signup error:", error);
      setMessage("Google Signup Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#213448", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", color: "#ECEFCA", fontFamily: "Segoe UI, sans-serif" }}>
      <div style={{ maxWidth: "400px", width: "90%", backgroundColor: "#547792", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)", overflow: "hidden", border: "1px solid #94B4C1" }}>
        <div style={{ padding: "25px 30px", textAlign: "center" }}>
          <img src="wecode logo.png" alt="wecode Logo" style={{ width: "60px", marginBottom: "15px" }} />
          <h1 style={{ fontSize: "24px", fontWeight: "500", marginBottom: "5px" }}>Sign up to WeCode</h1>
          <p style={{ fontSize: "14px", color: "#ECEFCA", opacity: "0.8", marginBottom: "20px" }}>Start your coding journey with us</p>
          
          <form onSubmit={handleRegister}>
            <div style={{ marginBottom: "16px", textAlign: "left" }}>
              <label style={{ display: "block", fontWeight: "600", fontSize: "14px", marginBottom: "6px" }}>Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required 
                style={{ width: "100%", padding: "12px", fontSize: "14px", borderRadius: "6px", border: "1px solid #94B4C1", backgroundColor: "#213448", color: "#ECEFCA", outline: "none", transition: "border 0.2s" }} />
            </div>
            
            <div style={{ marginBottom: "16px", textAlign: "left" }}>
              <label style={{ display: "block", fontWeight: "600", fontSize: "14px", marginBottom: "6px" }}>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required 
                style={{ width: "100%", padding: "12px", fontSize: "14px", borderRadius: "6px", border: "1px solid #94B4C1", backgroundColor: "#213448", color: "#ECEFCA", outline: "none", transition: "border 0.2s" }} />
            </div>
            
            <div style={{ marginBottom: "20px", textAlign: "left" }}>
              <label style={{ display: "block", fontWeight: "600", fontSize: "14px", marginBottom: "6px" }}>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required 
                style={{ width: "100%", padding: "12px", fontSize: "14px", borderRadius: "6px", border: "1px solid #94B4C1", backgroundColor: "#213448", color: "#ECEFCA", outline: "none", transition: "border 0.2s" }} />
            </div>
            
            <button type="submit" style={{ width: "100%", padding: "12px", fontSize: "15px", borderRadius: "6px", backgroundColor: "#94B4C1", color: "#213448", border: "none", fontWeight: "600", cursor: "pointer", transition: "background-color 0.3s ease", marginBottom: "12px" }}>
              Create Account
            </button>
            
            <div style={{ display: "flex", alignItems: "center", margin: "15px 0" }}>
              <div style={{ flex: 1, height: "1px", backgroundColor: "#ECEFCA", opacity: 0.3 }}></div>
              <span style={{ margin: "0 10px", color: "#ECEFCA", fontSize: "14px", opacity: 0.8 }}>or</span>
              <div style={{ flex: 1, height: "1px", backgroundColor: "#ECEFCA", opacity: 0.3 }}></div>
            </div>
            
            <button type="button" onClick={handleGoogleSignup} disabled={loading}
              style={{ width: "100%", padding: "12px", backgroundColor: "#4285F4", color: "#ECEFCA", border: "none", borderRadius: "6px", fontSize: "15px", fontWeight: "600", cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center" }}>
              {loading ? "Signing up..." : "Sign up with Google"}
            </button>
          </form>
          
          {message && <div style={{ marginTop: "15px", color: "#ECEFCA", backgroundColor: "rgba(33, 52, 72, 0.5)", padding: "12px", borderRadius: "6px", fontSize: "14px", fontWeight: "500" }}>{message}</div>}
          
          <div style={{ marginTop: "20px", fontSize: "14px", textAlign: "center" }}>
            Already have an account?{" "}
            <span onClick={() => navigate("/login")} style={{ color: "#ECEFCA", fontWeight: "600", cursor: "pointer", textDecoration: "underline" }}>
              Log in
            </span>
          </div>
        </div>
      </div>
      <div style={{ marginTop: "20px", fontSize: "12px", color: "#ECEFCA", opacity: 0.7 }}>
        © {new Date().getFullYear()} WeCode. All rights reserved.
      </div>
    </div>
  );
};

export default RegisterUserScreen;