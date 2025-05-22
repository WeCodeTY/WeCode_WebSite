import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { handleLogout } from "../../utils/Logout";
import Layout from "../../Layout1/Layout";
import Navbar from "../../Layout1/Navbar";

const UserUpdateDetails = () => {
  const [showmenu, setshowmenu] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "", phone: "", bio: "", goals: "", github: "", linkedin: "" });
  const [profileImage, setProfileImage] = useState("");
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [message, setMessage] = useState("");
  const [counts, setCounts] = useState({ following: 0, followers: 0 });

  const { name, email, password, phone, bio, goals, github, linkedin } = formData;

  useEffect(() => {
    (async () => {
      try {
        const profileRes = await axios.get(process.env.REACT_APP_USER_PROFILE, { withCredentials: true });
        const userData = profileRes.data.user;
        setFormData({
          name: userData.name || "", email: userData.email || "", password: "",
          phone: userData.phone || "", bio: userData.bio || "", goals: userData.goals || "",
          github: userData.github || "", linkedin: userData.linkedin || ""
        });
        
        const followRes = await axios.get(process.env.REACT_APP_FOLLOW_DASHBOARD, { withCredentials: true });
        setCounts({ following: followRes.data.following_count, followers: followRes.data.followed_count });
      } catch (error) { console.error("Error fetching data:", error); }
    })();
  }, []);

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) { setProfileImageFile(file); setProfileImage(URL.createObjectURL(file)); }
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    const formPayload = new FormData();
    Object.entries(formData).forEach(([key, value]) => formPayload.append(key, value));
    if (profileImageFile) formPayload.append("profileImage", profileImageFile);

    try {
      await axios.post(process.env.REACT_APP_USER_UPDATE_PROFILE, formPayload, {
        headers: { "Content-Type": "multipart/form-data" }, withCredentials: true,
      });
      setMessage("Profile updated successfully");
    } catch (error) {
      console.error("Update error:", error);
      setMessage(error.response?.data?.message || "An error occurred while updating.");
    }
  };

  // Styles
  const styles = {
    container: { maxWidth: "800px", margin: "100px auto 50px", backgroundColor: "#213448", borderRadius: "12px", boxShadow: "0 0 25px rgba(84, 119, 146, 0.5)", padding: "0", overflow: "hidden" },
    header: { backgroundColor: "#547792", color: "#ECEFCA", padding: "20px 30px", fontSize: "22px", fontWeight: "600", letterSpacing: "0.5px", marginBottom: "0", textAlign: "center", borderBottom: "3px solid #94B4C1" },
    body: { padding: "30px" },
    formGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "25px" },
    formSection: { marginBottom: "25px", borderBottom: "1px solid rgba(148, 180, 193, 0.3)", paddingBottom: "20px" },
    sectionTitle: { fontSize: "16px", color: "#94B4C1", marginBottom: "15px", fontWeight: "500" },
    inputGroup: { marginBottom: "15px", position: "relative" },
    label: { display: "block", color: "#ECEFCA", marginBottom: "8px", fontSize: "14px", fontWeight: "500" },
    input: { padding: "14px", border: "1px solid rgba(148, 180, 193, 0.4)", borderRadius: "6px", backgroundColor: "rgba(33, 52, 72, 0.8)", color: "#ECEFCA", fontSize: "14px", width: "100%", transition: "all 0.3s ease" },
    textarea: { padding: "14px", border: "1px solid rgba(148, 180, 193, 0.4)", borderRadius: "6px", backgroundColor: "rgba(33, 52, 72, 0.8)", color: "#ECEFCA", fontSize: "14px", width: "100%", minHeight: "100px", resize: "vertical" },
    fileInputWrapper: { position: "relative", padding: "20px", border: "2px dashed #94B4C1", borderRadius: "8px", textAlign: "center", marginBottom: "20px", cursor: "pointer", transition: "all 0.2s ease" },
    fileInputLabel: { color: "#ECEFCA", fontWeight: "500", display: "block", marginBottom: "5px" },
    fileInputHint: { color: "#94B4C1", fontSize: "13px" },
    fileInput: { opacity: "0", position: "absolute", top: "0", left: "0", width: "100%", height: "100%", cursor: "pointer" },
    button: { padding: "16px", backgroundColor: "#547792", color: "#ECEFCA", border: "none", borderRadius: "8px", fontWeight: "600", cursor: "pointer", transition: "all 0.3s ease", fontSize: "16px", width: "100%", letterSpacing: "0.5px", textTransform: "uppercase" },
    buttonHover: { backgroundColor: "#638da8" },
    message: { padding: "12px", marginTop: "20px", borderRadius: "6px", textAlign: "center", backgroundColor: message.includes("success") ? "rgba(76, 175, 80, 0.2)" : "rgba(244, 67, 54, 0.2)", color: "#ECEFCA" },
    statsContainer: { display: "flex", justifyContent: "space-between", marginTop: "25px", padding: "20px", backgroundColor: "rgba(84, 119, 146, 0.1)", borderRadius: "8px" },
    statBox: { textAlign: "center", padding: "15px", backgroundColor: "rgba(33, 52, 72, 0.7)", borderRadius: "8px", flex: "1", margin: "0 10px" },
    statValue: { fontSize: "28px", fontWeight: "bold", color: "#ECEFCA", marginBottom: "5px" },
    statLabel: { fontSize: "14px", color: "#94B4C1", textTransform: "uppercase", letterSpacing: "1px" },
    fullWidth: { gridColumn: "span 2" },
  };

  return (
    <Layout>
      <Navbar showMenu={showmenu} onToggleMenu={() => setshowmenu(!showmenu)} onLogout={() => { setshowmenu(false); handleLogout(navigate); }} />

      <div style={styles.container}>
        <h2 style={styles.header}>Professional Profile</h2>
        
        <div style={styles.body}>
          <form onSubmit={updateProfile}>
            <div style={styles.formSection}>
              <h3 style={styles.sectionTitle}>Personal Information</h3>
              <div style={styles.formGrid}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Full Name</label>
                  <input name="name" value={name} onChange={handleChange} placeholder="Enter your full name" required style={styles.input} />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Email Address</label>
                  <input name="email" type="email" value={email} onChange={handleChange} placeholder="Enter your email" required style={styles.input} />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Password</label>
                  <input name="password" type="password" value={password} onChange={handleChange} placeholder="Change password (leave blank to keep current)" style={styles.input} />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Phone Number</label>
                  <input name="phone" value={phone} onChange={handleChange} placeholder="Enter your phone number" style={styles.input} />
                </div>
              </div>
            </div>

            <div style={styles.formSection}>
              <h3 style={styles.sectionTitle}>Professional Details</h3>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Professional Bio</label>
                <textarea name="bio" value={bio} onChange={handleChange} placeholder="Share your professional background, expertise and experience" style={styles.textarea} />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Career Goals</label>
                <textarea name="goals" value={goals} onChange={handleChange} placeholder="Describe your professional aspirations and objectives" style={styles.textarea} />
              </div>
            </div>

            <div style={styles.formSection}>
              <h3 style={styles.sectionTitle}>Social Links</h3>
              <div style={styles.formGrid}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>GitHub Profile</label>
                  <input name="github" value={github} onChange={handleChange} placeholder="https://github.com/username" style={styles.input} />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>LinkedIn Profile</label>
                  <input name="linkedin" value={linkedin} onChange={handleChange} placeholder="https://linkedin.com/in/username" style={styles.input} />
                </div>
              </div>
            </div>

            <div style={{ marginBottom: "25px" }}>
              <h3 style={styles.sectionTitle}>Profile Image</h3>
              <div style={{ ...styles.fileInputWrapper, backgroundColor: profileImage ? "rgba(84, 119, 146, 0.2)" : "transparent" }}>
                <span style={styles.fileInputLabel}>Upload Profile Picture</span>
                <span style={styles.fileInputHint}>{profileImage ? "New image selected" : "Click or drag to upload an image"}</span>
                <input type="file" name="profileImage" accept="image/*" onChange={handleProfileImageChange} style={styles.fileInput} />
              </div>
            </div>

            <button type="submit" style={{ ...styles.button }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#638da8"} onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#547792"}>
              Update Profile
            </button>
          </form>
          
          {message && <div style={styles.message}>{message}</div>}
          
          <div style={styles.statsContainer}>
            <div style={{ ...styles.statBox, margin: "0 5px 0 0" }}>
              <div style={styles.statValue}>{counts.following}</div>
              <div style={styles.statLabel}>Following</div>
            </div>
            <div style={{ ...styles.statBox, margin: "0 0 0 5px" }}>
              <div style={styles.statValue}>{counts.followers}</div>
              <div style={styles.statLabel}>Followers</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserUpdateDetails;