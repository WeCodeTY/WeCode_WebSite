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
      <div style={{ padding: "20px", color: "#ECEFCA" }}>
        <h1>DevOps Project Ideas</h1>

        <section style={{ marginTop: "20px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px",
            }}
          >
            {projectData.map((project, index) => (
              <div
                key={index}
                onClick={() => handleClickProject(project)}
                style={{
                  backgroundColor: "#213448",
                  padding: "20px",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  cursor: "pointer",
                }}
              >
                <h3 style={{ color: "#ECEFCA" }}>{project.title}</h3>
                <p style={{ color: "#94B4C1" }}>
                  <strong>Hint:</strong> {project.hint}
                </p>
              </div>
            ))}
          </div>
        </section>

        {isModalOpen && selectedProject && (
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
                maxWidth: "80%",
                minWidth: "300px",
                color: "#ECEFCA",
                cursor: "auto",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3>{selectedProject.title}</h3>
              <p>
                <strong>Hint:</strong> {selectedProject.hint}
              </p>
              <p>
                <strong>Requirements:</strong> {selectedProject.requirements}
              </p>
              <p>
                <strong>Use Case:</strong> {selectedProject.useCase}
              </p>
              <p>
                <strong>Target Users:</strong> {selectedProject.targetUsers}
              </p>
              <p>
                <strong>Target Audience:</strong>{" "}
                {selectedProject.targetAudience}
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

export default DevopsProjectsScreen;
