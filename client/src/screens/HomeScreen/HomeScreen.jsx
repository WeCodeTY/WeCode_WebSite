import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Typewriter = ({ text = "", speed = 80 }) => {
  const [index, setIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text.charAt(index));
        setIndex(index + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [index, text, speed]);

  return (
    <div style={{ fontSize: "64px", fontWeight: "bold", color: "#ECEFCA", whiteSpace: "pre-wrap", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <span>{displayedText}</span>
      {index < text.length && <span className="blinking-cursor" style={{ width: "10px", height: "64px", marginLeft: "2px", backgroundColor: "#ECEFCA", animation: "blink 1s step-end infinite" }}></span>}
      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
    </div>
  );
};

const HomeScreen = () => {
  const navigate = useNavigate();
  
  // Common styles as constants to reduce repetition and compress code
  const colors = { primary: "#213448", accent: "#547792", text: "#94B4C1", highlight: "#ECEFCA" };
  const btnStyles = {
    common: { borderRadius: "6px", cursor: "pointer", fontWeight: "500", transition: "all 0.2s ease" },
    primary: { backgroundColor: colors.accent, color: colors.highlight, border: "none", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" },
    secondary: { backgroundColor: "transparent", color: colors.highlight, border: `1px solid ${colors.text}`, boxShadow: "0 2px 4px rgba(0,0,0,0.1)" },
    cta: { padding: "16px 36px", fontSize: "20px", borderRadius: "8px", backgroundColor: colors.text, color: colors.primary, border: "none", fontWeight: "600", boxShadow: "0 4px 14px rgba(0,0,0,0.2)", transform: "translateY(0)", transition: "all 0.3s ease" }
  };

  // Feature cards data to compress rendering logic
  const features = [
    { title: "Live Code Editor", icon: "🧠", desc: "Collaborative editor with syntax highlighting and auto-completion." },
    { title: "Video & Audio Rooms", icon: "🎥", desc: "Crystal clear communication with your coding partners." },
    { title: "DSA Practice Hub", icon: "📚", desc: "Hundreds of curated problems to solve together." },
    { title: "Run Code Instantly", icon: "⚙️", desc: "Test your solutions with a single click." },
    { title: "LeetCode Sync", icon: "🔗", desc: "Import and solve problems from your LeetCode account." },
    { title: "Secure Sessions", icon: "🔐", desc: "End-to-end encryption for all your coding sessions." }
  ];

  // Footer links to compress rendering
  const footerLinks = ["About", "Features", "Pricing", "Blog", "Contact", "Terms", "Privacy"];

  return (
    <div style={{ fontFamily: "'Montserrat', 'Segoe UI', sans-serif", backgroundColor: colors.primary, color: colors.text, minHeight: "100vh", padding: 0, margin: 0, lineHeight: 1.6 }}>
      {/* Navbar - Streamlined with consistent styling */}
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 40px", borderBottom: `1px solid ${colors.accent}`, backgroundColor: "#1a2735", boxShadow: "0 2px 10px rgba(0,0,0,0.15)" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src="/wecode logo.png" alt="WeCode" style={{ width: "38px", height: "38px", marginRight: "10px" }} />
          <span style={{ fontSize: "26px", fontWeight: "700", color: colors.highlight, letterSpacing: "0.5px" }}>WeCode</span>
        </div>
        <div>
          <button onClick={() => navigate("/login")} style={{ ...btnStyles.common, ...btnStyles.primary, padding: "10px 20px", fontSize: "15px", marginRight: "12px" }}
            onMouseOver={e => e.target.style.backgroundColor = colors.text} onMouseOut={e => e.target.style.backgroundColor = colors.accent}>
            Login
          </button>
          <button onClick={() => navigate("/register")} style={{ ...btnStyles.common, ...btnStyles.secondary, padding: "10px 20px", fontSize: "15px" }}
            onMouseOver={e => e.target.style.backgroundColor = "rgba(148, 180, 193, 0.15)"} onMouseOut={e => e.target.style.backgroundColor = "transparent"}>
            Register
          </button>
        </div>
      </nav>

      {/* Hero Section - Modern gradient with enhanced typography */}
      <section style={{ textAlign: "center", padding: "120px 20px 100px", maxWidth: "1100px", margin: "0 auto", backgroundImage: "radial-gradient(circle at top, #2e475f 0%, #213448 70%)", borderRadius: "0 0 60% 60% / 20%" }}>
        <Typewriter text="Code Together. Learn Faster." speed={80} />
        <p style={{ fontSize: "22px", color: colors.text, maxWidth: "760px", margin: "28px auto 50px", lineHeight: 1.5, letterSpacing: "0.3px" }}>
          WeCode is a collaborative platform for developers to code together in real-time, solve DSA problems, and ace interviews — all with seamless video chat and LeetCode integration.
        </p>
        <button onClick={() => navigate("/login")} style={btnStyles.cta}
          onMouseOver={e => {e.target.style.backgroundColor = colors.highlight; e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 6px 20px rgba(0,0,0,0.25)";}}
          onMouseOut={e => {e.target.style.backgroundColor = colors.text; e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 4px 14px rgba(0,0,0,0.2)";}}>
          Start Coding Now
        </button>
      </section>

      {/* Feature Grid - Enhanced with consistent hover effects and proper spacing */}
      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "28px", padding: "60px 40px", maxWidth: "1200px", margin: "40px auto" }}>
        {features.map(feature => (
          <div key={feature.title} 
            style={{ backgroundColor: "#2e475f", padding: "32px 24px", borderRadius: "12px", border: `1px solid ${colors.accent}`, textAlign: "center", 
                     transition: "all 0.3s ease", color: colors.highlight, boxShadow: "0 6px 16px rgba(0,0,0,0.15)", display: "flex", flexDirection: "column", alignItems: "center" }}
            onMouseOver={e => {e.currentTarget.style.transform = "translateY(-8px)"; e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.2)";}}
            onMouseOut={e => {e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.15)";}}>
            <div style={{ fontSize: "44px", marginBottom: "15px" }}>{feature.icon}</div>
            <h3 style={{ fontSize: "22px", color: colors.highlight, margin: "0 0 12px 0", letterSpacing: "0.5px" }}>{feature.title}</h3>
            <p style={{ fontSize: "15px", color: colors.text, margin: "0", lineHeight: "1.5" }}>{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* CTA Section - Enhanced with more professional look */}
      <section style={{ textAlign: "center", padding: "80px 20px", backgroundColor: "#1a2735", margin: "40px 0 0 0", boxShadow: "inset 0 4px 15px rgba(0,0,0,0.1)" }}>
        <h2 style={{ color: colors.highlight, fontSize: "34px", marginBottom: "20px", letterSpacing: "0.5px", fontWeight: "600" }}>Ready to elevate your coding skills?</h2>
        <p style={{ color: colors.text, fontSize: "18px", maxWidth: "700px", margin: "0 auto 35px", lineHeight: "1.6" }}>Join thousands of developers who are already using WeCode to collaborate and learn together.</p>
        <button onClick={() => navigate("/register")} 
          style={{ padding: "14px 32px", fontSize: "18px", borderRadius: "8px", backgroundColor: colors.accent, color: colors.highlight, 
                   border: "none", cursor: "pointer", transition: "all 0.3s ease", fontWeight: "600", boxShadow: "0 4px 14px rgba(0,0,0,0.2)" }}
          onMouseOver={e => {e.target.style.backgroundColor = colors.text; e.target.style.color = colors.primary;}}
          onMouseOut={e => {e.target.style.backgroundColor = colors.accent; e.target.style.color = colors.highlight;}}>
          Create Free Account
        </button>
      </section>

      {/* Footer - Streamlined with professional links */}
      <footer style={{ textAlign: "center", padding: "40px 20px 20px", color: colors.text, borderTop: `1px solid ${colors.accent}`, fontSize: "14px", backgroundColor: colors.primary }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px", flexWrap: "wrap" }}>
          {footerLinks.map(item => (
            <a key={item} href="#" style={{ color: colors.text, margin: "5px 15px", textDecoration: "none", transition: "color 0.2s ease" }} 
               onMouseOver={e => e.target.style.color = colors.highlight} onMouseOut={e => e.target.style.color = colors.text}>{item}</a>
          ))}
        </div>
        <div style={{ marginTop: "20px" }}>Built with ❤️ by the WeCode Team • © 2025</div>
      </footer>
    </div>
  );
};

export default HomeScreen;