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
      <div style={{ padding: "20px", color: "#ECEFCA" }}>
        <h1>DevOps Tutorials</h1>

        <section style={{ marginTop: "20px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", // Dynamic grid based on screen size
              gap: "20px", // Add gap between grid items to prevent overlap
              marginTop: "20px",
            }}
          >
            {videoData.map((video, index) => (
              <div
                key={index}
                onClick={() => handleClickVideo(video)}
                style={{
                  border: "1px solid #547792",
                  borderRadius: "15px",
                  padding: "20px",
                  width: "100%", // Full width of the grid cell
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
                  backgroundColor: "#94B4C1",
                  textAlign: "center",
                  transition:
                    "transform 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease",
                  opacity: 0.9,
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.1)";
                  e.target.style.boxShadow = "0px 6px 16px rgba(0, 0, 0, 0.3)";
                  e.target.style.opacity = 1;
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1)";
                  e.target.style.boxShadow = "0px 4px 12px rgba(0, 0, 0, 0.2)";
                  e.target.style.opacity = 0.9;
                }}
              >
                <h3
                  style={{
                    fontSize: "16px",
                    marginBottom: "10px",
                    overflowWrap: "break-word",
                    textAlign: "center",
                    maxHeight: "80px",
                    overflowY: "auto",
                    color: "#213448",
                  }}
                >
                  {video.title}
                </h3>

                <p style={{ color: "#213448" }}>
                  Uploaded: {video.uploaded}
                </p>
                <p style={{ color: "#213448" }}>Views: {video.views}</p>
              </div>
            ))}
          </div>
        </section>

        {isModalOpen && selectedVideo && (
          <div
            style={{
              position: "fixed",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
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
                padding: "30px",
                borderRadius: "10px",
                maxWidth: "600px",
                minWidth: "300px",
                color: "#ECEFCA",
                cursor: "auto",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2>{selectedVideo.title}</h2>
              <a
                href={selectedVideo.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#94B4C1" }}
              >
                Watch on YouTube
              </a>
              <p style={{ marginTop: "10px" }}>
                <strong>Uploaded:</strong> {selectedVideo.uploaded}
              </p>
              <p>
                <strong>Views:</strong> {selectedVideo.views}
              </p>
              <button
                onClick={handleCloseModal}
                style={{
                  marginTop: "20px",
                  padding: "10px 15px",
                  backgroundColor: "#547792",
                  border: "none",
                  borderRadius: "5px",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DevopsScreen;
