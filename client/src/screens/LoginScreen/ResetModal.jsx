import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ResetModal = ({ show, onClose }) => {
  const [emailForReset, setEmailForReset] = useState("");
  const [message, setMessage] = useState("");
  const [otp, setOtp] = useState(""); // New state for OTP
  const [showOtpInput, setShowOtpInput] = useState(false); // Show OTP input after sending email
  const [newPassword, setNewPassword] = useState("");  // New password state
  const [showPasswordInput, setShowPasswordInput] = useState(false);  // Show after OTP verified

  const navigate = useNavigate();

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_FORGOT_PASSWORD_URI,
        { email: emailForReset },
        { withCredentials: true }
      );
      setMessage(response.data.message);
      setShowOtpInput(true); // Show OTP input on success
    } catch (error) {
      console.error(error);
      setMessage("Error sending reset email. Please try again.");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_VERIFY_OTP_URI, // Make sure this endpoint exists in your backend
        { email: emailForReset, otp },
        { withCredentials: true }
      );
      setMessage(response.data.message);

      if (response.data.message === "OTP verified successfully.") {
        setShowPasswordInput(true);  // Now show the password input field
      }
    } catch (error) {
      console.error(error);
      setMessage("Invalid or expired OTP. Please try again.");
    }
  };

  const handleSetNewPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        process.env.REACT_APP_UPDATE_PASSWORD_URI,
        {
          email: emailForReset,
          password: newPassword,
        }
      );

      setMessage("Password updated successfully");
      setTimeout(() => {
        onClose();
        navigate("/Feed");
      }, 1500);
    } catch (error) {
      console.error("Password update error:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setMessage(error.response.data.message);
      } else {
        setMessage("An error occurred while updating password.");
      }
    }
  };

  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#213448",
          padding: "20px",
          borderRadius: "6px",
          color: "#ECEFCA",
          width: "300px",
          textAlign: "center",
        }}
      >
        <h3>Reset Your Password</h3>
        <input
          type="email"
          placeholder="Enter your email"
          value={emailForReset}
          onChange={(e) => setEmailForReset(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            marginTop: "10px",
            marginBottom: "15px",
            border: "1px solid #94B4C1",
            borderRadius: "6px",
            backgroundColor: "#213448",
            color: "#ECEFCA",
          }}
        />
        <button
          onClick={handleForgotPassword}
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
          }}
        >
          Send Reset Email
        </button>

        {showOtpInput && (
          <>
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "15px",
                border: "1px solid #94B4C1",
                borderRadius: "6px",
                backgroundColor: "#213448",
                color: "#ECEFCA",
              }}
            />
            <button
              onClick={handleVerifyOtp}
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "10px",
                backgroundColor: "#94B4C1",
                color: "#213448",
                border: "none",
                borderRadius: "6px",
                fontSize: "16px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Verify OTP
            </button>
          </>
        )}

        {showPasswordInput && (
          <>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "15px",
                border: "1px solid #94B4C1",
                borderRadius: "6px",
                backgroundColor: "#213448",
                color: "#ECEFCA",
              }}
            />
            <button
              onClick={handleSetNewPassword}
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "10px",
                backgroundColor: "#94B4C1",
                color: "#213448",
                border: "none",
                borderRadius: "6px",
                fontSize: "16px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Set New Password
            </button>
          </>
        )}

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

        <button
          onClick={onClose}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#f85149",
            color: "#ECEFCA",
            border: "none",
            borderRadius: "6px",
            fontSize: "16px",
            cursor: "pointer",
            fontWeight: "600",
            marginTop: "10px",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ResetModal;
