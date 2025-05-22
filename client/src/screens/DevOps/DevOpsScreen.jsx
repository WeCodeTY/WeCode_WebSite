import React, { useState } from "react";
import Layout from "../../Layout1/Layout";
import Navbar from "../../Layout1/Navbar";

const DevopsScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const videoData = [
    {
      title: "Day-1 | Fundamentals of DevOps | Free DevOps Course | 45 days | #devopscourse #learning",
      url: "https://www.youtube.com/watch?v=Ou9j73aWgyE&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=1&pp=iAQB",
      uploaded: "2 years ago",
      views: "1.6M",
    },
    {
      title: "Day-2 | Improve SDLC with DevOps | Free DevOps Course | 45 days | #devopscourse #learning",
      url: "https://www.youtube.com/watch?v=jRqBIpcgO4g&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=2&pp=iAQB",
      uploaded: "2 years ago",
      views: "434K",
    },
    {
      title: "Day-3 | Virtual Machines Part-1 | Free DevOps Course | 45 days | #devopscourse #learning #vm",
      url: "https://www.youtube.com/watch?v=lgUwYwBozow&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=3&pp=iAQB",
      uploaded: "2 years ago",
      views: "385K",
    },
    {
      title: "Day-4 | AWS & Azure - How to Create Virtual Machines | Free DevOps Course | 45 days |#devops #aws",
      url: "https://www.youtube.com/watch?v=NJkMe9cdYEQ&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=4&pp=iAQB",
      uploaded: "2 years ago",
      views: "386K",
    },
    {
      title: "HOW TO CONNECT TO EC2 INSTANCE FROM WINDOWS LAPTOP | MOBAXTERM | #aws #devops #abhishekveeramalla",
      url: "https://www.youtube.com/watch?v=MkIRh1mi8Ms&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=5&pp=iAQB",
      uploaded: "1 year ago",
      views: "320K",
    },
    {
      title: "Day-5 | AWS CLI Full Guide | How to connect to EC2 Instance from UI & Terminal | AWS CFT walk though",
      url: "https://www.youtube.com/watch?v=cN4pt5KQ9eA&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=6&pp=iAQB",
      uploaded: "2 years ago",
      views: "351K",
    },
    {
      title: "Day-6 | Linux & Shell Scripting | Complete Shell Scripting Playlist| #aws #azure | #devops",
      url: "https://www.youtube.com/watch?v=9jw9F6mcQDo&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=7&pp=iAQB",
      uploaded: "2 years ago",
      views: "321K",
    },
    {
      title: "Shell Scripting for DevOps|Shell Scripting Zero 2 Hero|Shell Scripting Interview Questions| #devops",
      url: "https://www.youtube.com/watch?v=zsajhz2_50g&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=8&pp=iAQB0gcJCYQJAYcqIYzv",
      uploaded: "2 years ago",
      views: "451K",
    },
    {
      title: "Shell Scripting for DevOps | Zero 2 Hero Part-2 | Shell Scripting Interview Q&A | #devops",
      url: "https://www.youtube.com/watch?v=CyQtk9f646Q&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=9&pp=iAQB",
      uploaded: "2 years ago",
      views: "259K",
    },
    {
      title: "Shell Scripting & Linux Interview Questions for DevOps Engineers | Bash Zero to Hero | #devops",
      url: "https://www.youtube.com/watch?v=0jgqMKuADX0&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=10&pp=iAQB",
      uploaded: "2 years ago",
      views: "192K",
    },
    {
      title: "Day-7 | Live AWS Project using SHELL SCRIPTING for DevOps | AWS DevOps project| #devops #aws #2023",
      url: "https://www.youtube.com/watch?v=gx5E47R9fGk&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=11&pp=iAQB",
      uploaded: "2 years ago",
      views: "239K",
    },
    {
      title: "Day-8 | DevOps Zero to Hero | Shell Scripting Project Used In Real Time | GitHub API Integration",
      url: "https://www.youtube.com/watch?v=OuyNM5-r8P8&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=12&pp=iAQB",
      uploaded: "1 year ago",
      views: "190K",
    },
    {
      title: "Day-9 | Git and GitHub | What is GIT ? | What is Version Control ? | #devops #2023 #github #gitlab",
      url: "https://www.youtube.com/watch?v=fIMySI_gZJU&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=13&pp=iAQB",
      uploaded: "2 years ago",
      views: "229K",
    },
    {
      title: "Day-10 | Git Branching Strategy | Real World Example | DevOps Interview Question|#devops #k8s #2023",
      url: "https://www.youtube.com/watch?v=MCyvYT8FS5w&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=14&pp=iAQB",
      uploaded: "2 years ago",
      views: "172K",
    },
    {
      title: "Day-11 | Git Interview Q&A and Commands for DevOps | Real World Example |#devops #github #git #2023",
      url: "https://www.youtube.com/watch?v=mT6qrAx14O4&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=15&pp=iAQB",
      uploaded: "2 years ago",
      views: "185K",
    },
    {
      title: "Day 12 | Deploy and expose your First App to AWS | Feat. Kunal Verma | Live Project | #aws projects",
      url: "https://www.youtube.com/watch?v=NLmF64KdLN0&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=16&pp=iAQB",
      uploaded: "2 years ago",
      views: "185K",
    },
    {
      title: "Day 13 | Top 15 AWS Services that Every DevOps Engineers should learn | #aws #devops",
      url: "https://www.youtube.com/watch?v=leWJypzVyQ4&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=17&pp=iAQB",
      uploaded: "2 years ago",
      views: "97K",
    },
    {
      title: "Day-14 | Configuration Management With Ansible |Puppet vs Ansible |Live Projects | #ansible #devops",
      url: "https://www.youtube.com/watch?v=I5_NF8nvACg&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=18&pp=iAQB",
      uploaded: "2 years ago",
      views: "134K",
    },
    {
      title: "Day-15 | Ansible Zero to Hero | #ansible #devops",
      url: "https://www.youtube.com/watch?v=Z6T2r3Xhk5k&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=19&pp=iAQB",
      uploaded: "2 years ago",
      views: "240K",
    },
    {
      title: "Day-16 | Infrastructure as Code | #terraform #IaC",
      url: "https://www.youtube.com/watch?v=G1BRnIHBBig&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=20&pp=iAQB",
      uploaded: "2 years ago",
      views: "100K",
    },
    {
      title: "Day-17 |Everything about Terraform |Write Your First Project |Remote Backend |Modules |Interview Q&A",
      url: "https://www.youtube.com/watch?v=CzdfdKWRDB8&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=21&pp=iAQB0gcJCYQJAYcqIYzv",
      uploaded: "2 years ago",
      views: "150K",
    },
    {
      title: "Day-18 | What is CICD ? | Introduction to CICD | How CICD works ? | #devops #abhishekveeramalla",
      url: "https://www.youtube.com/watch?v=CmVxoNkkACQ&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=22&pp=iAQB",
      uploaded: "2 years ago",
      views: "266K",
    },
    {
      title: "Day-19 | Jenkins ZERO to HERO | 3 Projects Live |Docker Agent |Interview Questions | #k8s #gitops",
      url: "https://www.youtube.com/watch?v=zZfhAXfBvVA&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=23&pp=iAQB",
      uploaded: "2 years ago",
      views: "409K",
    },
    {
      title: "Day-20 | GitHub Actions | Actions vs Jenkins | 3 Projects with examples | Configure your own runner",
      url: "https://www.youtube.com/watch?v=K3RqgDPCjYs&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=24&pp=iAQB",
      uploaded: "2 years ago",
      views: "133K",
    },
    {
      title: "GITHUB ACTIONS SELF HOSTED RUNNERS | ADD THIS PROJECT TO YOUR RESUME | #devops #cicd #githubactions",
      url: "https://www.youtube.com/watch?v=Rb2pUKdmdYo&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=25&pp=iAQB",
      uploaded: "1 year ago",
      views: "57K",
    },
    {
      title: "Day-21 | CICD Interview Questions | GitHub Repo with Q&A #cicd #jenkins #github #gitlab #devops",
      url: "https://www.youtube.com/watch?v=LAYV7x_aIC0&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=26&pp=iAQB",
      uploaded: "2 years ago",
      views: "119K",
    },
    {
      title: "Day-22 | Project Management tools for DevOps | What a DevOps Engineer does in the first week ? #2023",
      url: "https://www.youtube.com/watch?v=h4HdQBnEO04&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=27&pp=iAQB",
      uploaded: "2 years ago",
      views: "43K",
    },
    {
      title: "JIRA Workflow in Real Time for DevOps Projects | Agile & Scrum Explained | #abhishekveeramalla",
      url: "https://www.youtube.com/watch?v=pUAadFQjnvc&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=28&pp=iAQB",
      uploaded: "1 year ago",
      views: "69K",
    },
    {
      title: "Day-23 | Introduction to Containers | Learn about containers in easy way #docker #kubernetes #devops",
      url: "https://www.youtube.com/watch?v=7JZP345yVjw&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=29&pp=iAQB",
      uploaded: "2 years ago",
      views: "317K",
    },
    {
      title: "Day-24 | Docker Zero to Hero Part-1 | Must Watch | Basics to Best Practices | #docker #devops",
      url: "https://www.youtube.com/watch?v=wodLpta-hoQ&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=30&pp=iAQB0gcJCYQJAYcqIYzv",
      uploaded: "2 years ago",
      views: "244K",
    },
    {
      title: "Day-25 | Docker Containerzation for Django | #django #python #devops",
      url: "https://www.youtube.com/watch?v=3IAvr_O6vao&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=31&pp=iAQB",
      uploaded: "2 years ago",
      views: "142K",
    },
    {
      title: "Day-26 | Multi Stage Docker Builds | Reduce Image Size by 800 % | Distroless Container Images | #k8s",
      url: "https://www.youtube.com/watch?v=yyJrZgoNal0&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=32&pp=iAQB",
      uploaded: "2 years ago",
      views: "166K",
    },
    {
      title: "Day-27 | Docker Volumes and Bind Mounts|Persistent Storage for Docker| #devopstutorialsforbeginners",
      url: "https://www.youtube.com/watch?v=r_LgmqejAkA&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=33&pp=iAQB0gcJCYQJAYcqIYzv",
      uploaded: "2 years ago",
      views: "125K",
    },
    {
      title: "Day-28 | Docker Networking | Bridge vs Host vs Overlay |Secure containers with custom bridge network",
      url: "https://www.youtube.com/watch?v=xrUGEoUpa3s&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=34&pp=iAQB",
      uploaded: "2 years ago",
      views: "103K",
    },
    {
      title: "Day-29 | Docker Interview Questions with Answers | How many can you answer ? | Comment your score",
      url: "https://www.youtube.com/watch?v=I6ZBUEc4LrU&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=35&pp=iAQB",
      uploaded: "2 years ago",
      views: "120K",
    },
    {
      title: "Containerizing a MERN Stack Application and Deploying using Docker Compose | Step by Step Guide",
      url: "https://www.youtube.com/watch?v=IUpsu2xemrA&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=36&pp=iAQB",
      uploaded: "7 months ago",
      views: "39K",
    },
    {
      title: "Day-30 | KUBERNETES IS EASY | INTRODUCTION TO KUBERNETES| #k8s #devopscourse #kubernetes #devops",
      url: "https://www.youtube.com/watch?v=dfxrdoEQe00&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=37&pp=iAQB",
      uploaded: "2 years ago",
      views: "349K",
    },
    {
      title: "Day-31 | KUBERNETES ARCHITECTURE USING EXAMPLES | Kubernetes is Easy #devops #k8s #devopscourse",
      url: "https://www.youtube.com/watch?v=gywke3XiNC0&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=38&pp=iAQB",
      uploaded: "2 years ago",
      views: "144K",
    },
    {
      title: "Day-32 | How to Manage Hundreds of Kubernetes clusters ??? | KOPS | #k8s #kubernetes #devops",
      url: "https://www.youtube.com/watch?v=44Qk55E6CAA&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=39&pp=iAQB",
      uploaded: "2 years ago",
      views: "144K",
    },
    {
      title: "Day-33 | KUBERNETES PODS | DEPLOY YOUR FIRST APP | #k8s #devopscourse #kubernetes #devops",
      url: "https://www.youtube.com/watch?v=-rDT9m1RKSA&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&index=40&pp=iAQB",
      uploaded: "2 years ago",
      views: "147K",
    },
  ];

  // Only showing first 5 entries in this sample, the remaining videoData can be included as needed
  // The full dataset is preserved, just not showing all entries here to save space

  const handleClickVideo = (video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  return (
    <Layout>
      <Navbar />
      <div className="devops-container" style={{ 
        padding: "40px 5%", 
        maxWidth: "1400px", 
        margin: "0 auto",
        color: "#ECEFCA" 
      }}>
        <header style={{ 
          marginBottom: "30px",
          borderBottom: "2px solid #547792",
          paddingBottom: "20px"
        }}>
          <h1 style={{ 
            fontSize: "2.5rem", 
            fontWeight: "600",
            letterSpacing: "0.5px"
          }}>
            DevOps Mastery Series
          </h1>
          <p style={{ 
            fontSize: "1.1rem", 
            maxWidth: "800px",
            marginTop: "10px",
            opacity: "0.9"
          }}>
            Access our comprehensive 45-day DevOps tutorial series covering fundamentals to advanced implementations.
          </p>
        </header>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "25px",
          marginTop: "30px"
        }}>
          {videoData.map((video, index) => (
            <div
              key={index}
              onClick={() => handleClickVideo(video)}
              style={{
                background: "linear-gradient(145deg, #94B4C1, #85a3af)",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 10px 20px rgba(33, 52, 72, 0.15)",
                transition: "all 0.3s ease",
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
                height: "100%",
                position: "relative"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 15px 30px rgba(33, 52, 72, 0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 10px 20px rgba(33, 52, 72, 0.15)";
              }}
            >
              <div style={{
                padding: "20px",
                flex: 1,
                display: "flex",
                flexDirection: "column"
              }}>
                <div style={{
                  backgroundColor: "#213448",
                  color: "#ECEFCA",
                  display: "inline-block",
                  padding: "4px 10px",
                  borderRadius: "4px",
                  fontSize: "0.8rem",
                  marginBottom: "12px",
                  alignSelf: "flex-start"
                }}>
                  Day {index + 1}
                </div>
                
                <h3 style={{
                  color: "#213448",
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  lineHeight: "1.4",
                  margin: "0 0 15px 0",
                  display: "-webkit-box",
                  WebkitLineClamp: "2",
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  height: "auto",
                  maxHeight: "3rem"
                }}>
                  {video.title.split("|")[1] || video.title}
                </h3>
                
                <div style={{
                  marginTop: "auto",
                  display: "flex",
                  justifyContent: "space-between",
                  color: "#213448",
                  opacity: "0.85",
                  fontSize: "0.9rem"
                }}>
                  <span>{video.uploaded}</span>
                  <span>{video.views} views</span>
                </div>
              </div>
              
              <div style={{
                backgroundColor: "#547792",
                color: "#ECEFCA",
                padding: "10px 0",
                textAlign: "center",
                fontWeight: "500",
                transition: "background-color 0.3s ease"
              }}>
                Watch Tutorial
              </div>
            </div>
          ))}
        </div>

        {isModalOpen && selectedVideo && (
          <div
            style={{
              position: "fixed",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(33, 52, 72, 0.8)",
              backdropFilter: "blur(8px)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
            onClick={handleCloseModal}
          >
            <div
              style={{
                backgroundColor: "#213448",
                borderRadius: "12px",
                width: "90%",
                maxWidth: "600px",
                overflow: "hidden",
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25)",
                animation: "modalFadeIn 0.3s ease-out",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ padding: "30px" }}>
                <h2 style={{ 
                  color: "#ECEFCA", 
                  fontSize: "1.5rem", 
                  marginBottom: "15px",
                  lineHeight: "1.4"
                }}>
                  {selectedVideo.title}
                </h2>
                
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  marginBottom: "20px",
                  fontSize: "0.95rem",
                  color: "#94B4C1"
                }}>
                  <div>Uploaded: {selectedVideo.uploaded}</div>
                  <div>Views: {selectedVideo.views}</div>
                </div>
                
                <p style={{ 
                  color: "#ECEFCA", 
                  opacity: "0.9",
                  marginBottom: "25px" 
                }}>
                  This tutorial is part of our comprehensive DevOps learning series. Click below to watch on YouTube.
                </p>
                
                <div style={{ display: "flex", gap: "15px" }}>
                  <a
                    href={selectedVideo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      backgroundColor: "#547792",
                      color: "#ECEFCA",
                      padding: "12px 20px",
                      borderRadius: "6px",
                      textDecoration: "none",
                      fontWeight: "500",
                      display: "inline-flex",
                      alignItems: "center",
                      transition: "all 0.2s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#638da8";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "#547792";
                    }}
                  >
                    Watch on YouTube
                  </a>
                  
                  <button
                    onClick={handleCloseModal}
                    style={{
                      backgroundColor: "transparent",
                      border: "1px solid #94B4C1",
                      color: "#94B4C1",
                      padding: "12px 20px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontWeight: "500",
                      transition: "all 0.2s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "rgba(148, 180, 193, 0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "transparent";
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <style jsx>{`
          @keyframes modalFadeIn {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    </Layout>
  );
};

export default DevopsScreen;