import React, { useState } from "react";
import Layout from "../../Layout1/Layout";
import Navbar from "../../Layout1/Navbar";

const WebDevProjectsScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false), [selectedProject, setSelectedProject] = useState(null);
  
  const projectData = [
    // Beginner-Friendly Projects (HTML, CSS, JavaScript)
    { title: "Personal Portfolio Website", hint: "A basic website to showcase your skills and projects.", requirements: "HTML, CSS, JavaScript.", useCase: "Create a polished personal portfolio.", targetUsers: "5K+", targetAudience: "Job seekers, developers." },
    { title: "Simple Calculator", hint: "A basic calculator with addition, subtraction, multiplication, and division.", requirements: "HTML, CSS, JavaScript.", useCase: "Build a simple calculator to perform basic arithmetic operations.", targetUsers: "20K+", targetAudience: "General public, students." },
    { title: "To-Do List App", hint: "A simple task management application.", requirements: "HTML, CSS, JavaScript.", useCase: "Allow users to add, edit, and delete tasks.", targetUsers: "15K+", targetAudience: "Students, working professionals." },
    { title: "Temperature Converter", hint: "A tool to convert between Celsius and Fahrenheit.", requirements: "HTML, CSS, JavaScript.", useCase: "Help users convert temperature values between Celsius and Fahrenheit.", targetUsers: "10K+", targetAudience: "General public, students." },
    { title: "Quiz App", hint: "A simple multiple-choice quiz game.", requirements: "HTML, CSS, JavaScript.", useCase: "Build a simple quiz game with multiple-choice questions.", targetUsers: "30K+", targetAudience: "Students, quiz lovers." },
    { title: "Tic-Tac-Toe Game", hint: "A classic game implemented in the browser.", requirements: "HTML, CSS, JavaScript.", useCase: "Allow two players to play Tic-Tac-Toe in the browser.", targetUsers: "20K+", targetAudience: "General public, children." },
    { title: "Random Image Feed", hint: "A web page that displays a random image on refresh.", requirements: "HTML, CSS, JavaScript, Image API.", useCase: "Display random images each time the page is refreshed.", targetUsers: "5K+", targetAudience: "General public, creative individuals." },
    { title: "Simple Timer", hint: "A basic timer application.", requirements: "HTML, CSS, JavaScript.", useCase: "Create a simple countdown timer for user-defined intervals.", targetUsers: "10K+", targetAudience: "Students, productivity enthusiasts." },
    { title: "Drawing App", hint: "A web-based drawing application using canvas.", requirements: "HTML, CSS, JavaScript (Canvas).", useCase: "Allow users to draw and save their creations.", targetUsers: "15K+", targetAudience: "Artists, creatives." },
    { title: "Alarm Clock", hint: "A basic alarm clock functionality.", requirements: "HTML, CSS, JavaScript.", useCase: "Create an alarm clock that sets off a sound at a user-defined time.", targetUsers: "20K+", targetAudience: "General public." },
    { title: "Meme Generator", hint: "A tool for creating memes.", requirements: "HTML, CSS, JavaScript, Image APIs.", useCase: "Allow users to upload images, add text, and create memes.", targetUsers: "25K+", targetAudience: "Social media users, meme creators." },
    { title: "Online Form", hint: "A simple form that collects user input.", requirements: "HTML, CSS, JavaScript.", useCase: "Allow users to submit input through a simple form.", targetUsers: "10K+", targetAudience: "General public, businesses." },
    { title: "Simple Image Gallery", hint: "A basic gallery to display a set of images.", requirements: "HTML, CSS, JavaScript.", useCase: "Create an interactive image gallery with navigation.", targetUsers: "20K+", targetAudience: "Photographers, image enthusiasts." },
    { title: "Password Strength Meter", hint: "A tool that provides feedback on password strength.", requirements: "HTML, CSS, JavaScript.", useCase: "Help users create strong passwords by providing feedback on their input.", targetUsers: "10K+", targetAudience: "General public, developers." },
    { title: "Custom Range Slider", hint: "A custom slider component.", requirements: "HTML, CSS, JavaScript.", useCase: "Allow users to select values within a specified range.", targetUsers: "5K+", targetAudience: "Developers, UI designers." },
    { title: "Netflix Mobile Navigation", hint: "A clone of the Netflix mobile navigation.", requirements: "HTML, CSS, JavaScript.", useCase: "Replicate Netflix's mobile navigation for learning purposes.", targetUsers: "30K+", targetAudience: "Web developers, UI/UX enthusiasts." },

    // Intermediate Projects (More Complexity)
    { title: "Expense Tracker", hint: "A more advanced app to track and manage personal expenses.", requirements: "HTML, CSS, JavaScript, Local Storage or Firebase.", useCase: "Track personal expenses and visualize them with charts.", targetUsers: "50K+", targetAudience: "Individuals, families, financial planners." },
    { title: "E-commerce Website", hint: "A simple online store with product listing, checkout, and payment options.", requirements: "HTML, CSS, JavaScript, Node.js, Stripe API.", useCase: "Create an online store to showcase products and accept payments.", targetUsers: "100K+", targetAudience: "Shoppers, online retailers." },
    { title: "Library Management System", hint: "A system to manage library books and users.", requirements: "HTML, CSS, JavaScript, MongoDB.", useCase: "Allow users to manage books, borrow, and return items.", targetUsers: "20K+", targetAudience: "Libraries, schools." },
    { title: "Online Chat Application", hint: "A basic real-time chat application.", requirements: "React, Firebase, WebSockets.", useCase: "Allow real-time communication between users.", targetUsers: "30K+", targetAudience: "Friends, communities." },
    { title: "Weather Forecasting App", hint: "An app that displays weather information for a given location.", requirements: "React, OpenWeatherMap API.", useCase: "Display live weather information based on location.", targetUsers: "50K+", targetAudience: "General public, travelers." },
    { title: "Restaurant Website", hint: "A website to showcase a restaurant's menu, location, and contact information.", requirements: "HTML, CSS, JavaScript, Google Maps API.", useCase: "Showcase restaurant details and menu items.", targetUsers: "20K+", targetAudience: "Restaurant owners, customers." },
    { title: "Online Code Editor", hint: "A web-based code editor with syntax highlighting and code completion.", requirements: "React, JavaScript, Monaco Editor, Node.js.", useCase: "Create an online code editor with syntax highlighting and code completion.", targetUsers: "50K+", targetAudience: "Developers, coders." },
    { title: "Chatbot App", hint: "A basic chatbot that can respond to user queries.", requirements: "HTML, CSS, JavaScript, Dialogflow API.", useCase: "Create an interactive chatbot for answering user questions.", targetUsers: "20K+", targetAudience: "Businesses, customer service." },

    // Advanced Projects (Full-Stack, Frameworks)
    { title: "Online Learning Management System (LMS)", hint: "A platform for online courses, lessons, and assessments.", requirements: "React, Node.js, MongoDB, JWT for authentication.", useCase: "Provide a platform for instructors and students to interact and learn.", targetUsers: "100K+", targetAudience: "Educators, students." },
    { title: "E-commerce Platform with Advanced Features", hint: "A full-fledged e-commerce platform with features like user accounts, shopping carts, payment gateways, and order management.", requirements: "React, Node.js, MongoDB, Stripe/PayPal API.", useCase: "Create a complete e-commerce platform with advanced features.", targetUsers: "200K+", targetAudience: "Shoppers, retailers." },
    { title: "Blockchain-based Application", hint: "A project that utilizes blockchain technology, such as a decentralized voting system or a digital identity platform.", requirements: "React, Node.js, Solidity (Ethereum).", useCase: "Implement a decentralized app using blockchain technology.", targetUsers: "100K+", targetAudience: "Tech enthusiasts, blockchain developers." },
    { title: "Virtual Reality Game", hint: "A web-based VR game using technologies like WebGL and 3D frameworks.", requirements: "React, WebGL, Three.js.", useCase: "Create an interactive virtual reality game experience.", targetUsers: "50K+", targetAudience: "Gamers, VR enthusiasts." },
    { title: "Forum/Bulletin Board", hint: "A web application where users can post and discuss topics.", requirements: "React, Node.js, MongoDB.", useCase: "Facilitate public discussions on various topics.", targetUsers: "40K+", targetAudience: "Communities, hobbyists." },
    { title: "Customer Relationship Manager (CRM)", hint: "A system to manage customer interactions and data.", requirements: "React, Node.js, MongoDB.", useCase: "Organize and analyze customer information for businesses.", targetUsers: "100K+", targetAudience: "Sales teams, marketing teams." },
    { title: "Resume Builder", hint: "An app that helps users create a resume online.", requirements: "React, JavaScript, HTML, CSS.", useCase: "Allow users to create a professional resume easily.", targetUsers: "25K+", targetAudience: "Job seekers, students." },
    { title: "Task Management System", hint: "A system to track and manage tasks and projects.", requirements: "React, Node.js, MongoDB.", useCase: "Organize tasks, set deadlines, and track project progress.", targetUsers: "30K+", targetAudience: "Teams, professionals." },
    { title: "Blog Website", hint: "A platform to publish and manage blog posts.", requirements: "React, Node.js, MongoDB.", useCase: "Allow users to write, edit, and share blog posts.", targetUsers: "50K+", targetAudience: "Writers, bloggers." },
    { title: "Language Learning Platform", hint: "An app for language learning with exercises and quizzes.", requirements: "React, Node.js, MongoDB.", useCase: "Help users learn new languages with interactive content.", targetUsers: "40K+", targetAudience: "Students, language learners." },
    { title: "Smart Home Control System", hint: "A system to remotely control smart home devices.", requirements: "React, Node.js, IoT devices API.", useCase: "Control lights, thermostat, and security systems remotely.", targetUsers: "20K+", targetAudience: "Homeowners, tech enthusiasts." },
    { title: "Stock Trading Simulator", hint: "A game that simulates stock market trading.", requirements: "React, Node.js, Financial data API.", useCase: "Provide a realistic stock trading experience for learning.", targetUsers: "30K+", targetAudience: "Students, finance enthusiasts." },
    { title: "Real Estate Listing Site", hint: "A website for listing and searching for real estate properties.", requirements: "React, Node.js, Google Maps API.", useCase: "Help users find and list properties for sale or rent.", targetUsers: "50K+", targetAudience: "Real estate agents, buyers, renters." },
    { title: "Language Translation App", hint: "An app that translates text between different languages.", requirements: "React, Translation API (like Google Translate API).", useCase: "Help users translate text easily between languages.", targetUsers: "30K+", targetAudience: "Travelers, language learners." },
    { title: "AI-powered Recommendation System", hint: "A system that recommends products or content to users based on their preferences.", requirements: "React, Node.js, Machine Learning API.", useCase: "Deliver personalized recommendations to users.", targetUsers: "50K+", targetAudience: "E-commerce platforms, media platforms." },
    { title: "Dynamic DNS Service", hint: "Create a dynamic DNS service.", requirements: "React, Node.js, Networking APIs.", useCase: "Allow users to update their IP addresses dynamically.", targetUsers: "20K+", targetAudience: "Developers, network administrators." },
    { title: "Cloud Backup System", hint: "Implement a system for backing up data to the cloud.", requirements: "React, Node.js, AWS S3/Cloud Storage APIs.", useCase: "Safely backup important files and data to the cloud.", targetUsers: "50K+", targetAudience: "General public, businesses." },
    { title: "API Rate Limiter", hint: "Build a rate-limiting service for APIs.", requirements: "Node.js, Redis.", useCase: "Protect APIs by limiting request rates.", targetUsers: "30K+", targetAudience: "Developers, SaaS businesses." },
    { title: "Custom CI/CD Server", hint: "Develop a CI/CD pipeline from scratch.", requirements: "Node.js, GitHub/GitLab APIs, Docker.", useCase: "Automate building, testing, and deploying software projects.", targetUsers: "20K+", targetAudience: "Software teams, DevOps engineers." },
  ];

  const handleClickProject = (project) => { setSelectedProject(project); setIsModalOpen(true); };
  const handleCloseModal = () => { setIsModalOpen(false); setSelectedProject(null); };

  // Styles as objects to improve readability and performance
  const styles = {
    container: { padding: "40px", color: "#ECEFCA", maxWidth: "1400px", margin: "0 auto" },
    header: { textAlign: "center", marginBottom: "40px", fontSize: "2.5rem", fontWeight: "700", color: "#ECEFCA", borderBottom: "3px solid #547792", paddingBottom: "15px" },
    sectionTitle: { fontSize: "1.8rem", margin: "40px 0 25px", color: "#94B4C1", borderLeft: "5px solid #547792", paddingLeft: "15px" },
    grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "25px" },
    card: { backgroundColor: "#213448", padding: "25px", borderRadius: "12px", boxShadow: "0 8px 15px rgba(0, 0, 0, 0.15)", transition: "transform 0.3s, box-shadow 0.3s", cursor: "pointer", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", border: "1px solid rgba(84, 119, 146, 0.3)" },
    cardHover: { transform: "translateY(-5px)", boxShadow: "0 12px 20px rgba(0, 0, 0, 0.2)" },
    cardTitle: { color: "#ECEFCA", fontSize: "1.3rem", marginBottom: "15px", borderBottom: "2px solid #547792", paddingBottom: "10px" },
    cardDesc: { color: "#94B4C1", fontSize: "0.95rem", lineHeight: "1.5" },
    modal: { position: "fixed", top: "0", left: "0", width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.7)", backdropFilter: "blur(8px)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 },
    modalContent: { backgroundColor: "#213448", padding: "35px", borderRadius: "12px", maxWidth: "600px", width: "90%", color: "#ECEFCA", cursor: "auto", boxShadow: "0 15px 30px rgba(0, 0, 0, 0.3)", border: "1px solid #547792" },
    modalTitle: { fontSize: "1.8rem", marginBottom: "20px", color: "#ECEFCA", borderBottom: "2px solid #547792", paddingBottom: "10px" },
    modalDetail: { margin: "15px 0", color: "#94B4C1", fontSize: "1rem", lineHeight: "1.6" },
    button: { marginTop: "25px", padding: "12px 20px", backgroundColor: "#547792", border: "none", borderRadius: "8px", color: "#ECEFCA", cursor: "pointer", fontWeight: "600", transition: "background-color 0.3s", width: "100%" },
    buttonHover: { backgroundColor: "#638ca4" }
  };

  return (
    <Layout>
      <Navbar />
      <div style={styles.container}>
        <h1 style={styles.header}>Web Development Project Ideas</h1>
        
        <section>
          <h2 style={styles.sectionTitle}>Project Collection</h2>
          <div style={styles.grid}>
            {projectData.map((project, index) => (
              <div key={index} onClick={() => handleClickProject(project)} 
                   onMouseOver={(e) => {e.currentTarget.style.transform = styles.cardHover.transform; e.currentTarget.style.boxShadow = styles.cardHover.boxShadow}} 
                   onMouseOut={(e) => {e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = styles.card.boxShadow}}
                   style={styles.card}>
                <h3 style={styles.cardTitle}>{project.title}</h3>
                <p style={styles.cardDesc}>{project.hint}</p>
              </div>
            ))}
          </div>
        </section>
        
        {isModalOpen && selectedProject && (
          <div style={styles.modal} onClick={handleCloseModal}>
            <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <h3 style={styles.modalTitle}>{selectedProject.title}</h3>
              <div style={{marginBottom: "20px"}}>
                <p style={styles.modalDetail}><strong>Description:</strong> {selectedProject.hint}</p>
                <p style={styles.modalDetail}><strong>Requirements:</strong> {selectedProject.requirements}</p>
                <p style={styles.modalDetail}><strong>Use Case:</strong> {selectedProject.useCase}</p>
                <p style={styles.modalDetail}><strong>Target Users:</strong> {selectedProject.targetUsers}</p>
                <p style={styles.modalDetail}><strong>Target Audience:</strong> {selectedProject.targetAudience}</p>
              </div>
              <button onClick={handleCloseModal} 
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor} 
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
                      style={styles.button}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default WebDevProjectsScreen;