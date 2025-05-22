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
      bio: "Passionate about building scalable backend systems and ensuring smooth project coordination, Tanush is the powerhouse behind WeCode's real-time collaboration engine.",
      github: "https://github.com/Tanushh18",
      image: "/tanush-photo.jpeg",
    },
    // Team members array remains open for adding more team members
  ];

  // Color palette
  const colors = {
    primary: "#213448",
    secondary: "#547792",
    tertiary: "#94B4C1",
    accent: "#ECEFCA",
    text: "#ECEFCA",
    textDark: "#213448",
    cardBg: "#FFFFFF0D" // Semi-transparent white for glass effect
  };

  return (
    <div
      style={{
        backgroundColor: colors.primary,
        minHeight: "100vh",
        overflowX: "hidden",
        color: colors.text,
      }}
    >
      <Navbar />
      
      {/* Hero Section */}
      <div 
        style={{
          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
          padding: "5rem 2rem",
          textAlign: "center",
          borderBottom: `4px solid ${colors.tertiary}`
        }}
        data-aos="fade-up"
      >
        <h1 style={{ 
          fontSize: "3.5rem", 
          fontWeight: "700",
          color: colors.accent,
          marginBottom: "1.5rem"
        }}>
          About WeCode
        </h1>
        <p style={{ 
          fontSize: "1.4rem", 
          maxWidth: "800px",
          margin: "0 auto",
          color: colors.text,
          lineHeight: "1.8"
        }}>
          Empowering developers to collaborate, learn, and innovate in a seamless environment
        </p>
      </div>

      {/* Team Section */}
      <div style={{ 
        padding: "5rem 2rem", 
        textAlign: "center",
        background: `linear-gradient(180deg, ${colors.primary} 0%, ${colors.secondary}30 100%)`,
      }}>
        <h2
          style={{ 
            fontSize: "2.5rem", 
            fontWeight: "600",
            color: colors.accent,
            marginBottom: "3rem",
            position: "relative",
            display: "inline-block"
          }}
          data-aos="fade-up"
        >
          <span style={{
            position: "relative",
            zIndex: "1"
          }}>Meet Our Team</span>
          <div style={{
            position: "absolute",
            height: "12px",
            width: "50%",
            backgroundColor: colors.tertiary,
            bottom: "8px",
            left: "25%",
            zIndex: "0",
            opacity: "0.4"
          }}></div>
        </h2>
        
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "2.5rem",
            flexWrap: "wrap",
            marginTop: "2rem",
          }}
        >
          {team.map((member, idx) => (
            <div
              style={{
                background: colors.cardBg,
                backdropFilter: "blur(10px)",
                borderRadius: "12px",
                padding: "2rem",
                textAlign: "center",
                color: colors.text,
                width: "320px",
                boxShadow: `0 8px 32px 0 rgba(0,0,0,0.2)`,
                border: `1px solid ${colors.tertiary}40`,
                transition: "transform 0.3s, box-shadow 0.3s",
                cursor: "pointer",
                marginBottom: "2rem",
              }}
              key={idx}
              data-aos="fade-up"
              data-aos-delay={idx * 100}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.boxShadow = `0 12px 32px 0 rgba(0,0,0,0.3)`;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = `0 8px 32px 0 rgba(0,0,0,0.2)`;
              }}
            >
              <div style={{
                width: "140px",
                height: "140px",
                margin: "0 auto 1.5rem",
                borderRadius: "50%",
                padding: "5px",
                background: `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.tertiary} 100%)`,
              }}>
                <img
                  src={member.image ? member.image : "/default-image.jpg"}
                  alt={member.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "50%",
                    border: `3px solid ${colors.accent}`,
                  }}
                />
              </div>
              <h2 style={{ fontSize: "1.6rem", marginBottom: "0.5rem", fontWeight: "600" }}>
                {member.name}
              </h2>
              <h4
                style={{
                  fontSize: "1rem",
                  fontWeight: "500",
                  marginBottom: "1.2rem",
                  color: colors.tertiary,
                }}
              >
                {member.role}
              </h4>
              <p style={{ fontSize: "0.95rem", lineHeight: "1.6", marginBottom: "1.5rem" }}>
                {member.bio}
              </p>
              <a
                href={member.github !== "#" ? member.github : "#"}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  padding: "0.6rem 1.5rem",
                  borderRadius: "30px",
                  background: `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.tertiary} 100%)`,
                  color: colors.accent,
                  textDecoration: "none",
                  fontWeight: "500",
                  transition: "transform 0.2s, opacity 0.2s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.opacity = "0.95";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.opacity = "1";
                }}
              >
                GitHub Profile
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Mission Section */}
      <div style={{ 
        padding: "5rem 2rem", 
        textAlign: "center",
        background: colors.secondary,
      }}>
        <div 
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            background: colors.primary,
            borderRadius: "16px",
            padding: "3rem",
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          }}
          data-aos="fade-up"
        >
          <h2
            style={{ 
              fontSize: "2.5rem", 
              fontWeight: "600",
              color: colors.accent,
              marginBottom: "2rem"
            }}
          >
            Our Mission
          </h2>
          <p
            style={{
              fontSize: "1.2rem",
              lineHeight: "1.8",
              color: colors.tertiary,
            }}
          >
            At WeCode, our mission is to empower developers around the world to
            collaborate, learn, and innovate seamlessly. We believe that coding
            should be accessible, interactive, and fun. By combining real-time
            collaboration, video conferencing, and structured learning
            resources, we aim to build a global community of passionate coders.
          </p>
        </div>
      </div>

      {/* Timeline Section */}
      <div style={{ 
        padding: "5rem 2rem", 
        background: `linear-gradient(0deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
      }}>
        <h2
          style={{ 
            fontSize: "2.5rem", 
            fontWeight: "600",
            color: colors.accent,
            marginBottom: "3rem",
            textAlign: "center",
            position: "relative",
            display: "inline-block",
            left: "50%",
            transform: "translateX(-50%)"
          }}
          data-aos="fade-right"
        >
          <span style={{
            position: "relative",
            zIndex: "1"
          }}>Project Timeline</span>
          <div style={{
            position: "absolute",
            height: "12px",
            width: "50%",
            backgroundColor: colors.tertiary,
            bottom: "8px",
            left: "25%",
            zIndex: "0",
            opacity: "0.4"
          }}></div>
        </h2>

        <div style={{
          maxWidth: "800px",
          margin: "0 auto",
          position: "relative",
        }}>
          {/* Vertical line */}
          <div style={{
            position: "absolute",
            width: "4px",
            backgroundColor: colors.tertiary,
            top: "0",
            bottom: "0",
            left: "50%",
            marginLeft: "-2px",
          }}></div>

          {/* Timeline items */}
          {[
            { date: "December 2024", event: "Initial idea generation and project brainstorming for WeCode." },
            { date: "January 2025", event: "Architecture design and technology stack finalization." },
            { date: "February 2025", event: "Core backend and frontend development begins." },
            { date: "March 2025", event: "Integration of real-time collaboration and live coding features." },
            { date: "April 2025", event: "Testing, bug fixing, and preparation for early access release." }
          ].map((item, idx) => (
            <div 
              key={idx}
              style={{
                padding: "20px 40px",
                position: "relative",
                width: "50%",
                left: idx % 2 === 0 ? "0" : "50%",
                marginBottom: "30px",
              }}
              data-aos={idx % 2 === 0 ? "fade-right" : "fade-left"}
              data-aos-delay={idx * 100}
            >
              {/* Timeline content */}
              <div style={{
                padding: "20px",
                backgroundColor: colors.cardBg,
                borderRadius: "10px",
                border: `1px solid ${colors.tertiary}40`,
                backdropFilter: "blur(10px)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
              }}>
                <h3 style={{
                  fontSize: "1.3rem",
                  color: colors.accent,
                  marginBottom: "10px",
                }}>
                  {item.date}
                </h3>
                <p style={{
                  fontSize: "1rem",
                  lineHeight: "1.6",
                  color: colors.text,
                }}>
                  {item.event}
                </p>
              </div>
              
              {/* Circle marker */}
              <div style={{
                position: "absolute",
                width: "20px",
                height: "20px",
                backgroundColor: colors.accent,
                borderRadius: "50%",
                top: "30px",
                right: idx % 2 === 0 ? "-10px" : "auto",
                left: idx % 2 === 0 ? "auto" : "-10px",
                zIndex: "1",
              }}></div>
            </div>
          ))}
        </div>
      </div>

      {/* Platform Highlights */}
      <div style={{ 
        padding: "5rem 2rem", 
        textAlign: "center",
        background: colors.primary,
      }}>
        <h2
          style={{ 
            fontSize: "2.5rem", 
            fontWeight: "600",
            color: colors.accent,
            marginBottom: "3rem",
            position: "relative",
            display: "inline-block"
          }}
          data-aos="fade-left"
        >
          <span style={{
            position: "relative",
            zIndex: "1"
          }}>Platform Highlights</span>
          <div style={{
            position: "absolute",
            height: "12px",
            width: "50%",
            backgroundColor: colors.tertiary,
            bottom: "8px",
            left: "25%",
            zIndex: "0",
            opacity: "0.4"
          }}></div>
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "1.5rem",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {[
            { number: "500+", text: "Rooms Created" },
            { number: "1200+", text: "Collaborations Happened" },
            { number: "800+", text: "Users Connected" },
            { number: "99.9%", text: "Server Uptime" },
            { number: "50+", text: "Countries Reached" },
            { number: "150+", text: "Open Source Contributions" }
          ].map((stat, idx) => (
            <div
              key={idx}
              style={{
                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                padding: "2rem",
                borderRadius: "12px",
                textAlign: "center",
                width: "220px",
                boxShadow: `0 8px 25px rgba(0,0,0,0.15)`,
                border: `1px solid ${colors.tertiary}40`,
                color: colors.text,
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
              data-aos="zoom-in"
              data-aos-delay={idx * 75}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.boxShadow = `0 12px 30px rgba(0,0,0,0.3)`;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = `0 8px 25px rgba(0,0,0,0.15)`;
              }}
            >
              <h3 style={{ 
                fontSize: "2.5rem", 
                marginBottom: "1rem",
                color: colors.accent,
                fontWeight: "700"
              }}>
                {stat.number}
              </h3>
              <p style={{ 
                fontSize: "1.1rem",
                color: colors.tertiary
              }}>
                {stat.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Why WeCode Section */}
      <div style={{ 
        padding: "5rem 2rem", 
        textAlign: "center",
        background: `linear-gradient(45deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
      }}>
        <h2
          style={{ 
            fontSize: "2.5rem", 
            fontWeight: "600",
            color: colors.accent,
            marginBottom: "3rem",
            position: "relative",
            display: "inline-block"
          }}
          data-aos="fade-right"
        >
          <span style={{
            position: "relative",
            zIndex: "1"
          }}>Why WeCode?</span>
          <div style={{
            position: "absolute",
            height: "12px",
            width: "50%",
            backgroundColor: colors.tertiary,
            bottom: "8px",
            left: "25%",
            zIndex: "0",
            opacity: "0.4"
          }}></div>
        </h2>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "2rem",
            justifyContent: "center",
          }}
        >
          {[
            {
              title: "Video-First Collaboration",
              description: "Connect face-to-face while coding together in real-time."
            },
            {
              title: "All-in-One Learning Hub",
              description: "Resources, tools, and guidance all in one seamless platform."
            },
            {
              title: "Real-Time Collaboration Engine",
              description: "Work on code simultaneously with zero latency."
            },
            {
              title: "Build, Connect, and Grow",
              description: "Join a community of like-minded developers."
            }
          ].map((feature, idx) => (
            <div
              key={idx}
              style={{
                background: colors.cardBg,
                backdropFilter: "blur(10px)",
                borderRadius: "12px",
                padding: "2rem",
                width: "280px",
                border: `1px solid ${colors.tertiary}40`,
                boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
                transition: "transform 0.3s",
              }}
              data-aos="fade-up"
              data-aos-delay={idx * 100}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <h3 style={{ 
                fontSize: "1.5rem", 
                marginBottom: "1rem",
                color: colors.accent,
                fontWeight: "600"
              }}>
                {feature.title}
              </h3>
              <p style={{ 
                fontSize: "1rem",
                lineHeight: "1.6",
                color: colors.text
              }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Technology Stack */}
      <div style={{ 
        padding: "5rem 2rem", 
        textAlign: "center",
        background: colors.primary,
      }}>
        <h2
          style={{ 
            fontSize: "2.5rem", 
            fontWeight: "600",
            color: colors.accent,
            marginBottom: "3rem",
            position: "relative",
            display: "inline-block"
          }}
          data-aos="fade-up"
        >
          <span style={{
            position: "relative",
            zIndex: "1"
          }}>Technology Stack</span>
          <div style={{
            position: "absolute",
            height: "12px",
            width: "50%",
            backgroundColor: colors.tertiary,
            bottom: "8px",
            left: "25%",
            zIndex: "0",
            opacity: "0.4"
          }}></div>
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "1.5rem",
            maxWidth: "1000px",
            margin: "0 auto",
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
                background: `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.tertiary} 100%)`,
                borderRadius: "50px",
                padding: "0.8rem 1.8rem",
                color: colors.primary,
                fontWeight: "600",
                fontSize: "1.1rem",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
              data-aos="zoom-in"
              data-aos-delay={idx * 50}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.08)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.15)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)";
              }}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>

      {/* Key Achievements */}
      <div style={{ 
        padding: "5rem 2rem", 
        textAlign: "center",
        background: `linear-gradient(0deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
      }}>
        <h2
          style={{ 
            fontSize: "2.5rem", 
            fontWeight: "600",
            color: colors.accent,
            marginBottom: "3rem",
            position: "relative",
            display: "inline-block"
          }}
          data-aos="fade-up"
        >
          <span style={{
            position: "relative",
            zIndex: "1"
          }}>Key Achievements</span>
          <div style={{
            position: "absolute",
            height: "12px",
            width: "50%",
            backgroundColor: colors.tertiary,
            bottom: "8px",
            left: "25%",
            zIndex: "0",
            opacity: "0.4"
          }}></div>
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "2.5rem",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {[
            {
              title: "Top 10 Collaboration Tools",
              description: "Recognized among top 10 collaboration platforms for coders.",
              icon: "🏆"
            },
            {
              title: "Global Expansion",
              description: "Users across 50+ countries actively collaborating.",
              icon: "🌍"
            },
            {
              title: "Innovation Award 2025",
              description: "Awarded for excellence in real-time communication solutions.",
              icon: "🎯"
            },
          ].map((achievement, idx) => (
            <div
              key={idx}
              style={{
                background: colors.cardBg,
                backdropFilter: "blur(10px)",
                borderRadius: "16px",
                padding: "2.5rem 2rem",
                width: "320px",
                textAlign: "center",
                border: `1px solid ${colors.tertiary}40`,
                boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
                transition: "transform 0.3s",
              }}
              data-aos="fade-up"
              data-aos-delay={idx * 100}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{
                fontSize: "3rem",
                marginBottom: "1.5rem"
              }}>
                {achievement.icon}
              </div>
              <h3 style={{ 
                fontSize: "1.6rem", 
                marginBottom: "1rem",
                color: colors.accent,
                fontWeight: "600"
              }}>
                {achievement.title}
              </h3>
              <p style={{ 
                fontSize: "1.05rem",
                lineHeight: "1.6",
                color: colors.tertiary
              }}>
                {achievement.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Community Initiatives */}
      <div style={{ 
        padding: "5rem 2rem", 
        textAlign: "center",
        background: colors.primary,
        borderTop: `4px solid ${colors.tertiary}40`,
      }}>
        <h2
          style={{ 
            fontSize: "2.5rem", 
            fontWeight: "600",
            color: colors.accent,
            marginBottom: "3rem",
            position: "relative",
            display: "inline-block"
          }}
          data-aos="fade-up"
        >
          <span style={{
            position: "relative",
            zIndex: "1"
          }}>Community Initiatives</span>
          <div style={{
            position: "absolute",
            height: "12px",
            width: "50%",
            backgroundColor: colors.tertiary,
            bottom: "8px",
            left: "25%",
            zIndex: "0",
            opacity: "0.4"
          }}></div>
        </h2>

        <div style={{
          maxWidth: "800px",
          margin: "0 auto",
          background: `linear-gradient(135deg, ${colors.secondary}40 0%, ${colors.primary} 100%)`,
          borderRadius: "16px",
          padding: "3rem",
          border: `1px solid ${colors.tertiary}40`,
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        }} data-aos="fade-up">
          <p
            style={{
              fontSize: "1.2rem",
              lineHeight: "1.8",
              color: colors.text,
              marginBottom: "2rem"
            }}
          >
            WeCode is committed to giving back to the coding community. Through
            free mentorship programs, open-source contributions, and global
            hackathons, we strive to build an inclusive environment where every
            coder, beginner or expert, finds opportunities to grow and excel.
          </p>
          <a
            href="#"
            style={{
              display: "inline-block",
              padding: "1rem 2rem",
              backgroundColor: colors.accent,
              color: colors.primary,
              fontWeight: "600",
              borderRadius: "30px",
              textDecoration: "none",
              fontSize: "1.1rem",
              transition: "transform 0.2s, box-shadow 0.2s",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.15)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)";
            }}
          >
            Join Our Community
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutScreen;