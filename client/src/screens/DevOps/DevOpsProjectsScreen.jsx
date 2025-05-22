import React, { useState } from "react";
import Layout from "../../Layout1/Layout";
import Navbar from "../../Layout1/Navbar";

const DevopsProjectsScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const projectData = [
    {
      title: "CI/CD Pipeline with Jenkins",
      hint: "Set up a full CI/CD pipeline for a sample application using Jenkins.",
      requirements: "Jenkins, GitHub, Docker.",
      useCase: "Automate building, testing, and deploying applications.",
      targetUsers: "50K+",
      targetAudience: "DevOps engineers, developers.",
    },
    {
      title: "Infrastructure as Code with Terraform",
      hint: "Create and manage cloud infrastructure using Terraform scripts.",
      requirements: "Terraform, AWS/GCP/Azure.",
      useCase: "Automate infrastructure provisioning and management.",
      targetUsers: "40K+",
      targetAudience: "Cloud engineers, DevOps teams.",
    },
    {
      title: "Kubernetes Cluster Setup",
      hint: "Set up a Kubernetes cluster and deploy microservices on it.",
      requirements: "Kubernetes, Docker, Helm.",
      useCase: "Orchestrate containerized applications efficiently.",
      targetUsers: "60K+",
      targetAudience: "Cloud developers, infrastructure teams.",
    },
    {
      title: "Monitoring System with Prometheus and Grafana",
      hint: "Monitor application performance using Prometheus and visualize metrics with Grafana.",
      requirements: "Prometheus, Grafana, Node Exporter.",
      useCase: "Improve system observability and monitoring.",
      targetUsers: "30K+",
      targetAudience: "System admins, DevOps teams.",
    },
    {
      title: "Logging with ELK Stack",
      hint: "Build a centralized logging system using Elasticsearch, Logstash, and Kibana.",
      requirements: "ELK Stack, Filebeat, Logstash.",
      useCase: "Aggregate and analyze logs from multiple sources.",
      targetUsers: "30K+",
      targetAudience: "Sysadmins, security teams.",
    },
    {
      title: "Containerized Application Deployment",
      hint: "Dockerize a full-stack application and deploy it.",
      requirements: "Docker, Node.js/React/MongoDB stack.",
      useCase: "Simplify deployment using containers.",
      targetUsers: "50K+",
      targetAudience: "Developers, DevOps engineers.",
    },
    {
      title: "Load Balancer Setup with NGINX",
      hint: "Set up NGINX as a load balancer for a microservice architecture.",
      requirements: "NGINX, Docker, Kubernetes (optional).",
      useCase: "Distribute traffic evenly across multiple servers.",
      targetUsers: "20K+",
      targetAudience: "Cloud engineers, SREs.",
    },
    {
      title: "Serverless Application with AWS Lambda",
      hint: "Develop a serverless function with AWS Lambda triggered by events.",
      requirements: "AWS Lambda, API Gateway.",
      useCase: "Create scalable event-driven applications.",
      targetUsers: "30K+",
      targetAudience: "Developers, architects.",
    },
    {
      title: "Disaster Recovery Plan Setup",
      hint: "Create a disaster recovery plan and automate backups.",
      requirements: "AWS/GCP Backup Services, Shell Scripting.",
      useCase: "Ensure high availability and data recovery.",
      targetUsers: "10K+",
      targetAudience: "System admins, enterprises.",
    },
    {
      title: "Self-Healing Systems",
      hint: "Implement auto-healing mechanisms for crashed services.",
      requirements: "Kubernetes, Monitoring Tools, Scripting.",
      useCase: "Minimize downtime and manual intervention.",
      targetUsers: "20K+",
      targetAudience: "DevOps teams, reliability engineers.",
    },
    {
      title: "Jenkins HA Setup On AWS",
      hint: "Set up a highly available Jenkins master-slave architecture on AWS with auto-scaling.",
      requirements: "Jenkins, AWS EC2, Load Balancer, Auto-scaling Groups.",
      useCase: "Maintain continuous integration service availability.",
      targetUsers: "30K+",
      targetAudience: "DevOps engineers, cloud architects.",
    },
    {
      title: "Implementing Service Discovery Using Consul",
      hint: "Deploy Consul to allow dynamic service discovery and health checks.",
      requirements: "Consul, Docker, Kubernetes.",
      useCase:
        "Enable reliable service-to-service communication in microservices architecture.",
      targetUsers: "20K+",
      targetAudience: "Backend developers, cloud engineers.",
    },
    {
      title: "Deploying a Scalable Java Application on AWS",
      hint: "Deploy a multi-tier Java web application with load balancer and database on AWS.",
      requirements: "AWS EC2, RDS, Elastic Load Balancer, Auto-scaling.",
      useCase: "Build scalable and resilient cloud applications.",
      targetUsers: "40K+",
      targetAudience: "Java developers, cloud architects.",
    },
    {
      title: "Deploy Prometheus Observability stack using Docker Compose",
      hint: "Set up Prometheus, Grafana, and Alertmanager using Docker Compose.",
      requirements:
        "Docker, Docker Compose, Prometheus, Grafana, Alertmanager.",
      useCase: "Monitor application metrics and trigger alerts.",
      targetUsers: "25K+",
      targetAudience: "DevOps teams, site reliability engineers.",
    },
    {
      title: "Design and Automate AWS VPC Creation Using Terraform",
      hint: "Automate creation of AWS VPC, subnets, and route tables using Terraform.",
      requirements: "Terraform, AWS.",
      useCase: "Provision scalable cloud networking infrastructure.",
      targetUsers: "30K+",
      targetAudience: "Cloud engineers, DevOps architects.",
    },
    {
      title: "AWS Client to Site VPN Setup",
      hint: "Configure a client-to-site VPN connection on AWS for secure access.",
      requirements: "AWS VPN, EC2 instances, VPN Client software.",
      useCase: "Enable secure remote access to AWS resources.",
      targetUsers: "20K+",
      targetAudience: "System admins, enterprises.",
    },
    {
      title: "Self-Hosted Pritunl VPN Setup on AWS",
      hint: "Deploy Pritunl VPN server on AWS for self-managed secure connections.",
      requirements: "Pritunl, AWS EC2, SSL Certificates.",
      useCase: "Build a scalable and secure VPN infrastructure.",
      targetUsers: "15K+",
      targetAudience: "Small businesses, security teams.",
    },
  ];

  const handleClickProject = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
  <Layout>
    <Navbar />
    <div
      style={{
        backgroundColor: "#213448",
        minHeight: "100vh",
        padding: "40px 60px",
        color: "#ECEFCA"
      }}
    >
      {/* Hero Section */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "50px",
          paddingTop: "30px",
          paddingBottom: "40px",
          background: "linear-gradient(135deg, #213448 0%, #547792 100%)",
          borderRadius: "15px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: "700",
            marginBottom: "15px",
            color: "#ECEFCA",
            position: "relative",
            display: "inline-block"
          }}
        >
          <span style={{ position: "relative", zIndex: "1" }}>DevOps Project Ideas</span>
          <div
            style={{
              position: "absolute",
              height: "12px",
              width: "70%",
              backgroundColor: "#94B4C1",
              bottom: "8px",
              left: "15%",
              zIndex: "0",
              opacity: "0.3"
            }}
          ></div>
        </h1>
        <p
          style={{
            fontSize: "1.2rem",
            maxWidth: "650px",
            margin: "0 auto",
            color: "#94B4C1"
          }}
        >
          Explore innovative DevOps projects to enhance your skills and build your portfolio
        </p>
      </div>

      {/* Projects Grid */}
      <section>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "25px",
            marginTop: "30px"
          }}
        >
          {projectData.map((project, index) => (
            <div
              key={index}
              onClick={() => handleClickProject(project)}
              style={{
                backgroundColor: "rgba(84, 119, 146, 0.1)",
                padding: "25px",
                borderRadius: "12px",
                boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.15)",
                transition: "transform 0.3s, box-shadow 0.3s",
                cursor: "pointer",
                border: "1px solid rgba(148, 180, 193, 0.15)",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                overflow: "hidden"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "0px 12px 30px rgba(0, 0, 0, 0.25)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0px 6px 20px rgba(0, 0, 0, 0.15)";
              }}
            >
              {/* Decorative accent */}
              <div
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  height: "5px",
                  width: "100%",
                  background: "linear-gradient(90deg, #547792, #94B4C1)"
                }}
              ></div>
              
              <h3
                style={{
                  color: "#ECEFCA",
                  fontSize: "1.4rem",
                  marginBottom: "15px",
                  marginTop: "10px",
                  fontWeight: "600"
                }}
              >
                {project.title}
              </h3>
              
              <p
                style={{
                  color: "#94B4C1",
                  lineHeight: "1.6",
                  fontSize: "1rem"
                }}
              >
                <span style={{ 
                  display: "inline-block", 
                  backgroundColor: "rgba(236, 239, 202, 0.15)",
                  padding: "3px 8px",
                  borderRadius: "4px",
                  fontSize: "0.85rem",
                  marginRight: "6px"
                }}>
                  HINT
                </span> 
                {project.hint}
              </p>
              
              <div
                style={{
                  marginTop: "auto",
                  paddingTop: "15px",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center"
                }}
              >
                <span
                  style={{
                    fontSize: "0.9rem",
                    color: "#ECEFCA",
                    display: "flex",
                    alignItems: "center",
                    opacity: "0.7"
                  }}
                >
                  View Details
                  <span style={{ marginLeft: "5px" }}>→</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && selectedProject && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.65)",
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
              background: "linear-gradient(145deg, #213448 0%, #2c4660 100%)",
              padding: "40px",
              borderRadius: "15px",
              maxWidth: "800px",
              width: "80%",
              maxHeight: "85vh",
              overflowY: "auto",
              color: "#ECEFCA",
              cursor: "auto",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)",
              border: "1px solid rgba(148, 180, 193, 0.15)",
              position: "relative"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleCloseModal}
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                backgroundColor: "transparent",
                border: "none",
                fontSize: "1.5rem",
                color: "#94B4C1",
                cursor: "pointer",
                width: "30px",
                height: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                transition: "background-color 0.2s"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(148, 180, 193, 0.1)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              ×
            </button>

            <h2
              style={{
                fontSize: "2rem",
                marginBottom: "20px",
                paddingBottom: "15px",
                borderBottom: "1px solid rgba(148, 180, 193, 0.3)",
                color: "#ECEFCA"
              }}
            >
              {selectedProject.title}
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "25px",
              }}
            >
              <div>
                <h4
                  style={{
                    color: "#94B4C1",
                    marginBottom: "10px",
                    fontSize: "1.1rem",
                    fontWeight: "600"
                  }}
                >
                  Project Overview
                </h4>
                <p
                  style={{
                    padding: "15px",
                    backgroundColor: "rgba(84, 119, 146, 0.15)",
                    borderRadius: "8px",
                    lineHeight: "1.6"
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      fontWeight: "600",
                      marginRight: "8px",
                      color: "#ECEFCA"
                    }}
                  >
                    Hint:
                  </span>
                  {selectedProject.hint}
                </p>
              </div>

              <div>
                <h4
                  style={{
                    color: "#94B4C1",
                    marginBottom: "10px",
                    fontSize: "1.1rem",
                    fontWeight: "600"
                  }}
                >
                  Requirements
                </h4>
                <p
                  style={{
                    padding: "15px",
                    backgroundColor: "rgba(84, 119, 146, 0.15)",
                    borderRadius: "8px",
                    lineHeight: "1.6"
                  }}
                >
                  {selectedProject.requirements}
                </p>
              </div>

              <div>
                <h4
                  style={{
                    color: "#94B4C1",
                    marginBottom: "10px",
                    fontSize: "1.1rem",
                    fontWeight: "600"
                  }}
                >
                  Use Case
                </h4>
                <p
                  style={{
                    padding: "15px",
                    backgroundColor: "rgba(84, 119, 146, 0.15)",
                    borderRadius: "8px",
                    lineHeight: "1.6"
                  }}
                >
                  {selectedProject.useCase}
                </p>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "20px"
                }}
              >
                <div>
                  <h4
                    style={{
                      color: "#94B4C1",
                      marginBottom: "10px",
                      fontSize: "1.1rem",
                      fontWeight: "600"
                    }}
                  >
                    Target Users
                  </h4>
                  <p
                    style={{
                      padding: "15px",
                      backgroundColor: "rgba(84, 119, 146, 0.15)",
                      borderRadius: "8px",
                      lineHeight: "1.6",
                      height: "100%"
                    }}
                  >
                    {selectedProject.targetUsers}
                  </p>
                </div>

                <div>
                  <h4
                    style={{
                      color: "#94B4C1",
                      marginBottom: "10px",
                      fontSize: "1.1rem",
                      fontWeight: "600"
                    }}
                  >
                    Target Audience
                  </h4>
                  <p
                    style={{
                      padding: "15px",
                      backgroundColor: "rgba(84, 119, 146, 0.15)",
                      borderRadius: "8px",
                      lineHeight: "1.6",
                      height: "100%"
                    }}
                  >
                    {selectedProject.targetAudience}
                  </p>
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: "30px",
                display: "flex",
                justifyContent: "flex-end"
              }}
            >
              <button
                onClick={handleCloseModal}
                style={{
                  padding: "12px 25px",
                  backgroundColor: "#547792",
                  border: "none",
                  borderRadius: "8px",
                  color: "white",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "1rem",
                  transition: "background-color 0.3s, transform 0.2s",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#4a6b85";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "#547792";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  </Layout>
);
};

export default DevopsProjectsScreen;
