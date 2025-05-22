import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ResetModal = ({ show, onClose }) => {
  const [emailForReset, setEmailForReset] = useState(""), [message, setMessage] = useState(""), 
  [otp, setOtp] = useState(""), [showOtpInput, setShowOtpInput] = useState(false),
  [newPassword, setNewPassword] = useState(""), [showPasswordInput, setShowPasswordInput] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post("http://localhost:2000/forgotpass", { email: emailForReset });
      setMessage(response.data.message); setShowOtpInput(true);
    } catch (error) {
      console.error(error);
      setMessage("Error sending reset email. Please try again.");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post(process.env.REACT_APP_VERIFY_OTP_URI, { email: emailForReset, otp });
      setMessage(response.data.message);
      if (response.data.message === "OTP verified successfully.") setShowPasswordInput(true);
    } catch (error) {
      console.error(error);
      setMessage("Invalid or expired OTP. Please try again.");
    }
  };

  const handleSetNewPassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post(process.env.REACT_APP_UPDATE_PASSWORD_URI, { email: emailForReset, password: newPassword });
      setMessage("Password updated successfully");
      setTimeout(() => { onClose(); navigate("/Feed"); }, 1500);
    } catch (error) {
      console.error("Password update error:", error);
      setMessage(error.response?.data?.message || "An error occurred while updating password.");
    }
  };

  if (!show) return null;

  // Styles object for cleaner JSX
  const styles = {
    overlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0, 0, 0, 0.7)", 
              display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 },
    modal: { backgroundColor: "#213448", padding: "28px", borderRadius: "10px", color: "#ECEFCA", 
            width: "340px", boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)", border: "1px solid #547792" },
    title: { fontSize: "20px", fontWeight: "600", marginBottom: "20px", color: "#ECEFCA", textAlign: "center" },
    input: { width: "100%", padding: "12px", marginBottom: "15px", border: "1px solid #94B4C1", 
            borderRadius: "6px", backgroundColor: "#213448", color: "#ECEFCA", boxSizing: "border-box",
            fontSize: "14px", transition: "all 0.2s ease" },
    primaryBtn: { width: "100%", padding: "12px", backgroundColor: "#94B4C1", color: "#213448", border: "none", 
                borderRadius: "6px", fontSize: "15px", cursor: "pointer", fontWeight: "600",
                transition: "all 0.2s ease", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.15)" },
    cancelBtn: { width: "100%", padding: "12px", backgroundColor: "#f85149", color: "#ECEFCA", border: "none", 
                borderRadius: "6px", fontSize: "15px", cursor: "pointer", fontWeight: "600",
                marginTop: "15px", transition: "opacity 0.2s ease" },
    message: { margin: "15px 0", padding: "10px", borderRadius: "5px", 
              fontSize: "14px", fontWeight: "500", textAlign: "center" },
    successMsg: { backgroundColor: "rgba(34, 197, 94, 0.2)", color: "#22c55e", border: "1px solid #22c55e" },
    errorMsg: { backgroundColor: "rgba(248, 81, 73, 0.1)", color: "#f85149", border: "1px solid rgba(248, 81, 73, 0.3)" },
    neutralMsg: { backgroundColor: "rgba(148, 180, 193, 0.2)", color: "#ECEFCA", border: "1px solid rgba(148, 180, 193, 0.3)" },
    inputContainer: { position: "relative", marginBottom: "15px" },
    inputLabel: { position: "absolute", left: "12px", top: "12px", color: "#94B4C1", 
                fontSize: "14px", pointerEvents: "none", transition: "all 0.2s ease" },
    stepIndicator: { display: "flex", justifyContent: "center", marginBottom: "20px" },
    stepDot: { width: "10px", height: "10px", borderRadius: "50%", margin: "0 5px", 
              backgroundColor: "#547792", transition: "all 0.3s ease" },
    activeStep: { backgroundColor: "#94B4C1", transform: "scale(1.2)" }
  };

  const isSuccess = message.includes("success") || message.includes("verified") || message.includes("updated");
  const msgStyle = isSuccess ? styles.successMsg : message ? styles.errorMsg : styles.neutralMsg;
  
  // Determine which step we're on (1=email, 2=OTP, 3=password)
  const currentStep = showPasswordInput ? 3 : showOtpInput ? 2 : 1;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3 style={styles.title}>Reset Your Password</h3>
        
        {/* Step indicator */}
        <div style={styles.stepIndicator}>
          {[1, 2, 3].map(step => (
            <div key={step} style={{
              ...styles.stepDot,
              ...(step === currentStep ? styles.activeStep : {}),
              ...(step < currentStep ? { backgroundColor: "#94B4C1" } : {})
            }}></div>
          ))}
        </div>
        
        {/* Step 1: Email input */}
        <div style={{ display: currentStep === 1 ? "block" : "none" }}>
          <input
            type="email"
            placeholder="Enter your email address"
            value={emailForReset}
            onChange={(e) => setEmailForReset(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleForgotPassword} style={styles.primaryBtn}>
            Send Reset Code
          </button>
        </div>

        {/* Step 2: OTP verification */}
        {showOtpInput && (
          <div style={{ display: currentStep === 2 ? "block" : "none" }}>
            <input
              type="text"
              placeholder="Enter 6-digit verification code"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              style={styles.input}
            />
            <button onClick={handleVerifyOtp} style={styles.primaryBtn}>
              Verify Code
            </button>
          </div>
        )}

        {/* Step 3: New password */}
        {showPasswordInput && (
          <div style={{ display: currentStep === 3 ? "block" : "none" }}>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={styles.input}
            />
            <button onClick={handleSetNewPassword} style={styles.primaryBtn}>
              Update Password
            </button>
          </div>
        )}

        {/* Status message */}
        {message && (
          <div style={{...styles.message, ...msgStyle}}>
            {message}
          </div>
        )}

        {/* Close button */}
        <button onClick={onClose} style={styles.cancelBtn}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ResetModal;