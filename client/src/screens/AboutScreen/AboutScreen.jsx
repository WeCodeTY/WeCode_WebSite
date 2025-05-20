import React from "react";
import Navbar from "../../Layout1/Navbar";
import Footer from "../../Layout1/Footer";
import AOS from "aos";
import "aos/dist/aos.css";

const AboutScreen = () => {
  React.useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  const team = [
    {
      name: "Tanush Chawla",
      role: "Lead Backend Engineer & Project Coordinator",
      bio: "Passionate about building scalable backend systems and ensuring smooth project coordination, Tanush is the powerhouse behind WeCode’s real-time collaboration engine.",
      github: "https://github.com/Tanushh18",
      image: "/tanush-photo.jpeg",
    },
    
  ];

  return (
    <div
      style={{
        backgroundColor: "#111827",
        minHeight: "100vh",
        overflowX: "hidden",
        marginTop: "25px",
      }}
    >
      <Navbar />
      <div style={{ padding: "2rem", textAlign: "center", marginTop: "25px" }}>
        <h1
          style={{ color: "#d1d5db", marginBottom: "3rem" }}
          data-aos="fade-up"
        >
          Meet Our Team
        </h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
            flexWrap: "wrap",
            marginTop: "25px",
          }}
        >
          {team.map((member, idx) => (
            <div
              style={{
                background: "linear-gradient(135deg, #1f2937 0%, #374151 100%)",
                backdropFilter: "blur(10px)",
                borderRadius: "16px",
                padding: "20px",
                textAlign: "center",
                color: "#d1d5db",
                width: "280px",
                boxShadow: "0 8px 32px 0 rgba(0,0,0,0.4)",
                border: "1px solid rgba(255,255,255,0.18)",
                transition: "transform 0.3s, box-shadow 0.3s",
                cursor: "pointer",
                marginBottom: "2rem",
              }}
              key={idx}
              data-aos="fade-up"
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.03)";
                e.currentTarget.style.boxShadow =
                  "0 8px 32px 0 rgba(99, 102, 241, 0.4)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 8px 32px 0 rgba(0,0,0,0.4)";
              }}
            >
              <img
                src={member.image ? member.image : "/default-image.jpg"}
                alt={member.name}
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "cover",
                  borderRadius: "50%",
                  marginBottom: "16px",
                  border: "3px solid #6366f1",
                }}
              />
              <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
                {member.name}
              </h2>
              <h4
                style={{
                  fontSize: "1rem",
                  fontWeight: "normal",
                  marginBottom: "1rem",
                }}
              >
                {member.role}
              </h4>
              <p style={{ fontSize: "0.9rem", lineHeight: "1.4" }}>
                {member.bio}
              </p>
              <a
                href={member.github !== "#" ? member.github : "#"}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  marginTop: "12px",
                  display: "inline-block",
                  color: "#6366f1",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                GitHub
              </a>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "5rem", color: "#d1d5db", marginTop: "25px" }}>
          <h2
            data-aos="fade-right"
            style={{ fontSize: "2rem", marginBottom: "1rem" }}
          >
            Project Timeline
          </h2>
          <div
            style={{
              textAlign: "left",
              margin: "2rem auto",
              maxWidth: "600px",
              fontSize: "1rem",
              lineHeight: "1.6",
            }}
          >
            <div>
              <b>December 2024:</b> Initial idea generation and project
              brainstorming for WeCode.
            </div>
            <div>
              <b>January 2025:</b> Architecture design and technology stack
              finalization.
            </div>
            <div>
              <b>February 2025:</b> Core backend and frontend development
              begins.
            </div>
            <div>
              <b>March 2025:</b> Integration of real-time collaboration and live
              coding features.
            </div>
            <div>
              <b>April 2025:</b> Testing, bug fixing, and preparation for early
              access release.
            </div>
          </div>
        </div>

        <div style={{ marginTop: "5rem", color: "#d1d5db", marginTop: "25px" }}>
          <h2
            data-aos="fade-right"
            style={{ fontSize: "2rem", marginBottom: "1rem" }}
          >
            Why WeCode?
          </h2>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "2rem",
              justifyContent: "center",
              marginTop: "2rem",
              marginTop: "25px",
            }}
          >
            {[
              "Video-First Collaboration",
              "All-in-One Learning Hub",
              "Real-Time Collaboration Engine",
              "Build, Connect, and Grow",
            ].map((title, idx) => (
              <div
                key={idx}
                style={{
                  background:
                    "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                  borderRadius: "20px",
                  padding: "20px",
                  width: "250px",
                  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                  color: "#ffffff",
                  fontWeight: "bold",
                  animation: "fadeIn 2s ease-in-out",
                  fontSize: "1.1rem",
                  textAlign: "center",
                }}
              >
                {title}
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: "5rem", color: "#d1d5db", marginTop: "25px" }}>
          <h2
            data-aos="fade-left"
            style={{ fontSize: "2rem", marginBottom: "1.5rem" }}
          >
            Platform Highlights
          </h2>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "2rem",
              marginTop: "2rem",
              marginTop: "25px",
            }}
          >
            <div
              style={{
                background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                padding: "20px",
                borderRadius: "12px",
                textAlign: "center",
                width: "180px",
                boxShadow: "0 4px 15px rgba(99, 102, 241, 0.4)",
                color: "#fff",
                transition: "transform 0.3s, box-shadow 0.3s",
                cursor: "pointer",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.03)";
                e.currentTarget.style.boxShadow =
                  "0 6px 20px rgba(99, 102, 241, 0.5)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 4px 15px rgba(99, 102, 241, 0.4)";
              }}
            >
              <h3 style={{ fontSize: "1.8rem", marginBottom: "8px" }}>500+</h3>
              <p style={{ fontSize: "1rem" }}>Rooms Created</p>
            </div>
            <div
              style={{
                background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                padding: "20px",
                borderRadius: "12px",
                textAlign: "center",
                width: "180px",
                boxShadow: "0 4px 15px rgba(99, 102, 241, 0.4)",
                color: "#fff",
                transition: "transform 0.3s, box-shadow 0.3s",
                cursor: "pointer",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.03)";
                e.currentTarget.style.boxShadow =
                  "0 6px 20px rgba(99, 102, 241, 0.5)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 4px 15px rgba(99, 102, 241, 0.4)";
              }}
            >
              <h3 style={{ fontSize: "1.8rem", marginBottom: "8px" }}>1200+</h3>
              <p style={{ fontSize: "1rem" }}>Collaborations Happened</p>
            </div>
            <div
              style={{
                background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                padding: "20px",
                borderRadius: "12px",
                textAlign: "center",
                width: "180px",
                boxShadow: "0 4px 15px rgba(99, 102, 241, 0.4)",
                color: "#fff",
                transition: "transform 0.3s, box-shadow 0.3s",
                cursor: "pointer",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.03)";
                e.currentTarget.style.boxShadow =
                  "0 6px 20px rgba(99, 102, 241, 0.5)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 4px 15px rgba(99, 102, 241, 0.4)";
              }}
            >
              <h3 style={{ fontSize: "1.8rem", marginBottom: "8px" }}>800+</h3>
              <p style={{ fontSize: "1rem" }}>Users Connected</p>
            </div>
            <div
              style={{
                background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                padding: "20px",
                borderRadius: "12px",
                textAlign: "center",
                width: "180px",
                boxShadow: "0 4px 15px rgba(99, 102, 241, 0.4)",
                color: "#fff",
                transition: "transform 0.3s, box-shadow 0.3s",
                cursor: "pointer",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.03)";
                e.currentTarget.style.boxShadow =
                  "0 6px 20px rgba(99, 102, 241, 0.5)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 4px 15px rgba(99, 102, 241, 0.4)";
              }}
            >
              <h3 style={{ fontSize: "1.8rem", marginBottom: "8px" }}>99.9%</h3>
              <p style={{ fontSize: "1rem" }}>Server Uptime</p>
            </div>
            <div
              style={{
                background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                padding: "20px",
                borderRadius: "12px",
                textAlign: "center",
                width: "180px",
                boxShadow: "0 4px 15px rgba(99, 102, 241, 0.4)",
                color: "#fff",
                transition: "transform 0.3s, box-shadow 0.3s",
                cursor: "pointer",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.03)";
                e.currentTarget.style.boxShadow =
                  "0 6px 20px rgba(99, 102, 241, 0.5)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 4px 15px rgba(99, 102, 241, 0.4)";
              }}
            >
              <h3 style={{ fontSize: "1.8rem", marginBottom: "8px" }}>50+</h3>
              <p style={{ fontSize: "1rem" }}>Countries Reached</p>
            </div>
            <div
              style={{
                background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                padding: "20px",
                borderRadius: "12px",
                textAlign: "center",
                width: "180px",
                boxShadow: "0 4px 15px rgba(99, 102, 241, 0.4)",
                color: "#fff",
                transition: "transform 0.3s, box-shadow 0.3s",
                cursor: "pointer",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.03)";
                e.currentTarget.style.boxShadow =
                  "0 6px 20px rgba(99, 102, 241, 0.5)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 4px 15px rgba(99, 102, 241, 0.4)";
              }}
            >
              <h3 style={{ fontSize: "1.8rem", marginBottom: "8px" }}>150+</h3>
              <p style={{ fontSize: "1rem" }}>Open Source Contributions</p>
            </div>
          </div>
        </div>

        <div style={{ marginTop: "5rem", color: "#d1d5db", marginTop: "25px" }}>
          <h2
            data-aos="fade-up"
            style={{ fontSize: "2rem", marginBottom: "1rem" }}
          >
            Our Mission
          </h2>
          <p
            style={{
              maxWidth: "700px",
              margin: "2rem auto",
              fontSize: "1.2rem",
              lineHeight: "1.8",
              color: "#9ca3af",
            }}
          >
            At WeCode, our mission is to empower developers around the world to
            collaborate, learn, and innovate seamlessly. We believe that coding
            should be accessible, interactive, and fun. By combining real-time
            collaboration, video conferencing, and structured learning
            resources, we aim to build a global community of passionate coders.
          </p>
        </div>

        <div style={{ marginTop: "5rem", color: "#d1d5db", marginTop: "25px" }}>
          <h2
            data-aos="fade-up"
            style={{ fontSize: "2rem", marginBottom: "1rem" }}
          >
            Technology Stack
          </h2>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "2rem",
              marginTop: "2rem",
              marginTop: "25px",
            }}
          >
            {[
              "ReactJS",
              "NodeJS",
              "ExpressJS",
              "MongoDB",
              "Socket.IO",
              "WebRTC",
              "Firebase",
            ].map((tech, idx) => (
              <div
                key={idx}
                style={{
                  background:
                    "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                  borderRadius: "20px",
                  padding: "15px 25px",
                  color: "#ffffff",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  cursor: "pointer",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
                data-aos="fade-up"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: "5rem", color: "#d1d5db", marginTop: "25px" }}>
          <h2
            data-aos="fade-up"
            style={{ fontSize: "2rem", marginBottom: "1rem" }}
          >
            Key Achievements
          </h2>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "2rem",
              marginTop: "2rem",
              marginTop: "25px",
            }}
          >
            {[
              {
                title: "Top 10 Collaboration Tools",
                description:
                  "Recognized among top 10 collaboration platforms for coders.",
              },
              {
                title: "Global Expansion",
                description:
                  "Users across 50+ countries actively collaborating.",
              },
              {
                title: "Innovation Award 2025",
                description:
                  "Awarded for excellence in real-time communication solutions.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  background:
                    "linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%)",
                  borderRadius: "20px",
                  padding: "20px",
                  width: "280px",
                  color: "#ffffff",
                  textAlign: "center",
                  fontWeight: "bold",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  cursor: "pointer",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
                data-aos="fade-up"
              >
                <h3 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>
                  {item.title}
                </h3>
                <p style={{ fontWeight: "normal", fontSize: "1rem" }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: "5rem", color: "#d1d5db", marginTop: "25px" }}>
          <h2
            data-aos="fade-up"
            style={{ fontSize: "2rem", marginBottom: "1rem" }}
          >
            Community Initiatives
          </h2>
          <p
            style={{
              maxWidth: "700px",
              margin: "2rem auto",
              fontSize: "1.2rem",
              lineHeight: "1.8",
              color: "#9ca3af",
            }}
          >
            WeCode is committed to giving back to the coding community. Through
            free mentorship programs, open-source contributions, and global
            hackathons, we strive to build an inclusive environment where every
            coder, beginner or expert, finds opportunities to grow and excel.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutScreen;
