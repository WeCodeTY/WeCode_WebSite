import React, { useState, useEffect } from "react";
import Navbar from "../../Layout1/Navbar";
import Layout from "../../Layout1/Layout";

const WebDevScreen = () => {
  // State for animated counters
  const [resourceCount, setResourceCount] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  
  // Animation for cards on scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(prev => ({...prev, [entry.target.id]: true}));
        }
      });
    }, { threshold: 0.2 });
    
    const sections = document.querySelectorAll('.category-section');
    sections.forEach(section => {
      observer.observe(section);
    });
    
    // Count total resources for counter animation
    let total = 0;
    Object.values(resources).forEach(category => {
      total += category.length;
    });
    
    // Animate counter
    let count = 0;
    const interval = setInterval(() => {
      count += 1;
      setResourceCount(count);
      if (count >= total) clearInterval(interval);
    }, 30);
    
    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
      clearInterval(interval);
    };
  }, []);

  // Categories and their resources
  const resources = {
    HTML: [
      { title: "HTML Tutorial for Beginners | Complete HTML with Notes & Code", link: "https://www.youtube.com/watch?v=HcOc7P5BMi4&list=PLfqMhTWNBTe0PY9xunOzsP5kmYIz2Hu7i&index=1&pp=iAQB" }
    ],
    CSS: [
      { title: "CSS Tutorial for Beginners | Complete CSS with Project, Notes & Code", link: "https://www.youtube.com/watch?v=ESnrn1kAD4E&list=PLfqMhTWNBTe0PY9xunOzsP5kmYIz2Hu7i&index=2&pp=iAQB" },
      { title: "Building AMAZON Clone for Beginners | Project using HTML & CSS", link: "https://www.youtube.com/watch?v=nGhKIC_7Mkk&list=PLfqMhTWNBTe0PY9xunOzsP5kmYIz2Hu7i&index=3&pp=iAQB" }
    ],
    "Git and GitHub": [
      { title: "Complete Git and GitHub Tutorial for Beginners", link: "https://www.youtube.com/watch?v=Ez8F0nW6S-w&list=PLfqMhTWNBTe0PY9xunOzsP5kmYIz2Hu7i&index=4&pp=iAQB" }
    ],
    JavaScript: [
      { title: "JavaScript Full Course ❤️ | Variables & Data Types | Lecture 1", link: "https://www.youtube.com/watch?v=ajdRvxDWH4w&list=PLfqMhTWNBTe0PY9xunOzsP5kmYIz2Hu7i&index=5&pp=iAQB" },
      { title: "Lecture 2 : Operators and Conditional Statements | JavaScript Full Course", link: "https://www.youtube.com/watch?v=Zg4-uSjxosE&list=PLfqMhTWNBTe0PY9xunOzsP5kmYIz2Hu7i&index=6&pp=iAQB" },
      { title: "Lecture 3: Loops and Strings | JavaScript Full Course", link: "https://www.youtube.com/watch?v=UmRtFFSDSFo&list=PLfqMhTWNBTe0PY9xunOzsP5kmYIz2Hu7i&index=7&pp=iAQB" },
      { title: "Lecture 4: Arrays | JavaScript Full Course", link: "https://www.youtube.com/watch?v=gFWhbjzowrM&list=PLfqMhTWNBTe0PY9xunOzsP5kmYIz2Hu7i&index=8&pp=iAQB" },
      { title: "Lecture 5: Functions & Methods | JavaScript Full Course", link: "https://www.youtube.com/watch?v=P0XMXqDGttU&list=PLfqMhTWNBTe0PY9xunOzsP5kmYIz2Hu7i&index=9&pp=iAQB" },
      { title: "Lecture 6 : DOM - Document Object Model | JavaScript Full Course | Part 1", link: "https://www.youtube.com/watch?v=7zcXPCt8Ck0&list=PLfqMhTWNBTe0PY9xunOzsP5kmYIz2Hu7i&index=10&pp=iAQB" },
      { title: "Lecture 7 : DOM (Part 2) | Document Object Model | JavaScript Full Course", link: "https://www.youtube.com/watch?v=fXAGTOZ25H8&list=PLfqMhTWNBTe0PY9xunOzsP5kmYIz2Hu7i&index=11&pp=iAQB" },
      { title: "Lecture 8 : Events in JavaScript | JavaScript Full Course", link: "https://www.youtube.com/watch?v=_i-uLJAh79U&list=PLfqMhTWNBTe0PY9xunOzsP5kmYIz2Hu7i&index=12&pp=iAQB" },
      { title: "Lecture 9 : Tic Tac Toe Game in JavaScript | JS Project | JavaScript Full Course", link: "https://www.youtube.com/watch?v=SqrppLEljkY&list=PLfqMhTWNBTe0PY9xunOzsP5kmYIz2Hu7i&index=13&pp=iAQB" },
      { title: "Lecture 10 : MiniProject - Stone, Paper & Scissors Game | JavaScript Full Course", link: "https://www.youtube.com/watch?v=_V33HCZWLDQ&list=PLfqMhTWNBTe0PY9xunOzsP5kmYIz2Hu7i&index=14&pp=iAQB" },
      { title: "Lecture 11 : Classes & Objects | JavaScript Full Course", link: "https://www.youtube.com/watch?v=N-O4w6PynGY&list=PLfqMhTWNBTe0PY9xunOzsP5kmYIz2Hu7i&index=15&pp=iAQB" },
      { title: "Lecture 12 : Callbacks, Promises & Async Await | JavaScript Full Course", link: "https://www.youtube.com/watch?v=d3jXofmQm44&list=PLfqMhTWNBTe0PY9xunOzsP5kmYIz2Hu7i&index=16&pp=iAQB" },
      { title: "Last Lecture : Fetch API with Project | JavaScript Full Course", link: "https://www.youtube.com/watch?v=CyGodpqcid4&list=PLfqMhTWNBTe0PY9xunOzsP5kmYIz2Hu7i&index=17&pp=iAQB" }
    ],
    React: [
      { title: "React JS roadmap | chai aur react series", link: "https://www.youtube.com/watch?v=vz1RlUyrc3w&list=PLu71SKxNbfoDqgPchmvIsL4hTnJIrtige&index=1&pp=iAQB" },
      { title: "Create react projects | chai aur react", link: "https://www.youtube.com/watch?v=k3KqQvywToE&list=PLu71SKxNbfoDqgPchmvIsL4hTnJIrtige&index=2&pp=iAQB" },
      { title: "Understand the react flow and structure", link: "https://www.youtube.com/watch?v=yNbnA5pryMg&list=PLu71SKxNbfoDqgPchmvIsL4hTnJIrtige&index=3&t=2016s&pp=iAQB" },
      { title: "Create your own react library and JSX", link: "https://www.youtube.com/watch?v=kAOuj6o7Kxs&list=PLu71SKxNbfoDqgPchmvIsL4hTnJIrtige&index=4&t=2530s&pp=iAQB" },
      { title: "Why you need hooks and project", link: "https://www.youtube.com/watch?v=lI7IIOWM0Mo&list=PLu71SKxNbfoDqgPchmvIsL4hTnJIrtige&index=5&t=1192s&pp=iAQB" },
      { title: "06 Virtual DOM, Fibre and reconciliation", link: "https://www.youtube.com/watch?v=MPCVGFvgVEQ&list=PLu71SKxNbfoDqgPchmvIsL4hTnJIrtige&index=6&t=2s&pp=iAQB" },
      { title: "Tailwind and Props in reactjs", link: "https://www.youtube.com/watch?v=bB6707XzCNc&list=PLu71SKxNbfoDqgPchmvIsL4hTnJIrtige&index=7&t=1753s&pp=iAQB" },
      { title: "A react interview question on counter", link: "https://www.youtube.com/watch?v=tOYkV6Yhrhs&list=PLu71SKxNbfoDqgPchmvIsL4hTnJIrtige&index=8&t=51s&pp=iAQB" },
      { title: "Building a react project | bgChanger", link: "https://www.youtube.com/watch?v=_lJ3KNMue3w&list=PLu71SKxNbfoDqgPchmvIsL4hTnJIrtige&index=9&t=2s&pp=iAQB" },
      { title: "useEffect, useRef and useCallback with 1 project", link: "https://www.youtube.com/watch?v=Lt4vy8hfc-s&list=PLu71SKxNbfoDqgPchmvIsL4hTnJIrtige&index=10&t=3157s&pp=iAQB" },
      { title: "Custom hooks in react | currency Project", link: "https://www.youtube.com/watch?v=AFDYnd-XPa8&list=PLu71SKxNbfoDqgPchmvIsL4hTnJIrtige&index=11&t=3264s&pp=iAQB" },
      { title: "React router crash course", link: "https://www.youtube.com/watch?v=VJov5QWEKE4&list=PLu71SKxNbfoDqgPchmvIsL4hTnJIrtige&index=12&pp=iAQB0gcJCYQJAYcqIYzv" },
      { title: "Context API crash course with 2 projects", link: "https://www.youtube.com/watch?v=JQVBGtZMqgU&list=PLu71SKxNbfoDqgPchmvIsL4hTnJIrtige&index=13&pp=iAQB" },
      { title: "Context api with local storage | project", link: "https://www.youtube.com/watch?v=6KQeopPE36I&list=PLu71SKxNbfoDqgPchmvIsL4hTnJIrtige&index=14&pp=iAQB" },
      { title: "Redux toolkit crash course | Chai aur React Series", link: "https://www.youtube.com/watch?v=1i04-A7kfFI&list=PLu71SKxNbfoDqgPchmvIsL4hTnJIrtige&index=15&pp=iAQB" },
      { title: "What is your choice for Mega Project in React?", link: "https://www.youtube.com/watch?v=CqNSTD9ENb0&list=PLu71SKxNbfoDqgPchmvIsL4hTnJIrtige&index=16&pp=iAQB" },
      { title: "Our mega project in React | The hard way", link: "https://www.youtube.com/watch?v=P-WHzz2M5aU&list=PLu71SKxNbfoDqgPchmvIsL4hTnJIrtige&index=17&pp=iAQB" }
    ],
    Backend: [
      { title: "Javascript Backend Roadmap | chai aur backend", link: "https://www.youtube.com/watch?v=EH3vGeqeIAo&list=PLu71SKxNbfoBGh_8p_NS-ZAh6v7HhYqHW&index=1&pp=iAQB" },
      { title: "How to deploy backend code in production", link: "https://www.youtube.com/watch?v=pOV4EjUtl70&list=PLu71SKxNbfoBGh_8p_NS-ZAh6v7HhYqHW&index=2&t=2310s&pp=iAQB0gcJCYQJAYcqIYzv" },
      { title: "How to connect frontend and backend in javascript | Fullstack Proxy and CORS", link: "https://www.youtube.com/watch?v=fFHyqhmnVfs&list=PLu71SKxNbfoBGh_8p_NS-ZAh6v7HhYqHW&index=3&pp=iAQB" },
      { title: "Taking backend to next level", link: "https://www.youtube.com/watch?v=10hRlpUNeNA&list=PLu71SKxNbfoBGh_8p_NS-ZAh6v7HhYqHW&index=4&t=257s&pp=iAQB0gcJCYQJAYcqIYzv" },
      { title: "Data modelling for backend with mongoose", link: "https://www.youtube.com/watch?v=VbGl3msgce8&list=PLu71SKxNbfoBGh_8p_NS-ZAh6v7HhYqHW&index=5&pp=iAQB" },
      { title: "Ecommerce and Hospital management Data modelling", link: "https://www.youtube.com/watch?v=lA_mNpddN5U&list=PLu71SKxNbfoBGh_8p_NS-ZAh6v7HhYqHW&index=6&t=1297s&pp=iAQB" },
      { title: "How to setup a professional backend project", link: "https://www.youtube.com/watch?v=9B4CvtzXRpc&list=PLu71SKxNbfoBGh_8p_NS-ZAh6v7HhYqHW&index=7&t=6s&pp=iAQB" },
      { title: "How to connect database in MERN with debugging", link: "https://www.youtube.com/watch?v=w4z8Py-UoNk&list=PLu71SKxNbfoBGh_8p_NS-ZAh6v7HhYqHW&index=8&pp=iAQB" },
      { title: "Custom api response and error handling | chai aur backend", link: "https://www.youtube.com/watch?v=S5EpsMjel-M&list=PLu71SKxNbfoBGh_8p_NS-ZAh6v7HhYqHW&index=9&pp=iAQB" },
      { title: "User and video model with hooks and JWT", link: "https://www.youtube.com/watch?v=eWnZVUXMq8k&list=PLu71SKxNbfoBGh_8p_NS-ZAh6v7HhYqHW&index=10&pp=iAQB0gcJCYQJAYcqIYzv" },
      { title: "How to upload file in backend | Multer", link: "https://www.youtube.com/watch?v=6KPXn2Ha0cM&list=PLu71SKxNbfoBGh_8p_NS-ZAh6v7HhYqHW&index=11&t=1058s&pp=iAQB" },
      { title: "HTTP crash course | http Methods | http headers", link: "https://www.youtube.com/watch?v=qgZiUvV41TI&list=PLu71SKxNbfoBGh_8p_NS-ZAh6v7HhYqHW&index=12&t=755s&pp=iAQB" },
      { title: "Complete guide for router and controller with debugging", link: "https://www.youtube.com/watch?v=HqcGLJSORaA&list=PLu71SKxNbfoBGh_8p_NS-ZAh6v7HhYqHW&index=13&pp=iAQB" }
    ]
  };

  // Order of categories to display
  const categoryOrder = ["HTML", "CSS", "Git and GitHub", "JavaScript", "React", "Backend"];

  return (
    <Layout>
      <div className="webdev-container">
        <Navbar />
        
        <div className="hero-section">
          <h1 className="animated-text">Web Development Learning Path</h1>
          <p>Comprehensive resources to master modern web development</p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">{resourceCount}</span>
              <span className="stat-label">Total Resources</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{categoryOrder.length}</span>
              <span className="stat-label">Learning Paths</span>
            </div>
          </div>
        </div>

        {categoryOrder.map((category, idx) => (
          <section 
            key={category} 
            id={`section-${idx}`} 
            className={`category-section ${isVisible[`section-${idx}`] ? 'fade-in' : ''}`}
          >
            <div className="category-header">
              <h2>{category}</h2>
            </div>
            <div className="resource-grid">
              {resources[category].map((resource, index) => (
                <div key={index} className="resource-card">
                  <h3>{resource.title}</h3>
                  <a href={resource.link} target="_blank" rel="noopener noreferrer" className="watch-btn">
                    <span>Watch Now</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  </a>
                </div>
              ))}
            </div>
          </section>
        ))}

        <style jsx>{`
          .webdev-container {
            max-width: 1400px;
            margin: 0 auto;
            color: #213448;
          }
          
          .hero-section {
            background: linear-gradient(135deg, #547792 0%, #213448 100%);
            padding: 3rem 2rem;
            text-align: center;
            border-radius: 8px;
            margin: 1rem 0 3rem;
            color: #FFFFFF;
            box-shadow: 0 4px 16px rgba(33, 52, 72, 0.3);
            position: relative;
            overflow: hidden;
          }
          
          .hero-section:before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 60%);
            animation: pulse 8s infinite alternate;
          }
          
          @keyframes pulse {
            0% { transform: scale(0.8); opacity: 0.3; }
            100% { transform: scale(1.2); opacity: 0.1; }
          }
          
          .hero-section h1 {
            font-size: 3rem;
            margin-bottom: 0.8rem;
            font-weight: 800;
            letter-spacing: -0.5px;
            position: relative;
            display: inline-block;
            color: #FFFFFF;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
          }
          
          .animated-text {
            background: linear-gradient(45deg, #FFFFFF, #94B4C1, #FFFFFF);
            background-size: 200% 200%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: gradientBG 6s ease infinite;
          }
          
          @keyframes gradientBG {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          .hero-section p {
            font-size: 1.3rem;
            opacity: 0.9;
            margin-bottom: 2rem;
          }
          
          .hero-stats {
            display: flex;
            justify-content: center;
            gap: 3rem;
            margin-top: 1.5rem;
          }
          
          .stat-item {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          
          .stat-number {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 0.3rem;
            color: #ECEFCA;
            text-shadow: 0 2px 4px rgba(0,0,0,0.2);
          }
          
          .stat-label {
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            opacity: 0.8;
          }
          
          .category-section {
            margin-bottom: 3rem;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.8s ease-out;
          }
          
          .category-section.fade-in {
            opacity: 1;
            transform: translateY(0);
          }
          
          .category-header {
            position: relative;
            margin-bottom: 1.5rem;
            text-align: center;
          }
          
          .category-header h2 {
            font-size: 2rem;
            color: #213448;
            font-weight: 700;
            display: inline-block;
            padding-bottom: 0.5rem;
            border-bottom: 4px solid #547792;
            position: relative;
          }
          
          .category-header h2:after {
            content: "";
            position: absolute;
            bottom: -4px;
            left: 0;
            width: 0;
            height: 4px;
            background-color: #94B4C1;
            transition: width 0.6s ease;
          }
          
          .category-section.fade-in .category-header h2:after {
            width: 100%;
          }
          
          .resource-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 1.2rem;
          }
          
          .resource-card {
            background: linear-gradient(145deg, #FFFFFF, #F8F9FA);
            border-radius: 8px;
            padding: 1.5rem 1.2rem;
            transition: all 0.3s ease;
            box-shadow: 0 2px 8px rgba(84, 119, 146, 0.15);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 100%;
            min-height: 150px;
            border-left: 4px solid #94B4C1;
            position: relative;
            overflow: hidden;
          }
          
          .resource-card:before {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: 4px;
            height: 0;
            background: linear-gradient(to bottom, #213448, #547792);
            transition: height 0.4s ease;
          }
          
          .resource-card:hover:before {
            height: 100%;
          }
          
          .resource-card:hover {
            box-shadow: 0 8px 16px rgba(84, 119, 146, 0.25);
            transform: translateY(-4px) scale(1.02);
          }
          
          .resource-card h3 {
            font-size: 1rem;
            margin-bottom: 1rem;
            line-height: 1.4;
            font-weight: 600;
            color: #213448;
          }
          
          .watch-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            background-color: #547792;
            color: #FFFFFF;
            text-decoration: none;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            font-weight: 500;
            transition: all 0.3s ease;
            margin-top: auto;
            position: relative;
            overflow: hidden;
          }
          
          .watch-btn:after {
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            width: 10px;
            height: 10px;
            background: rgba(255, 255, 255, 0.3);
            opacity: 0;
            border-radius: 100%;
            transform: scale(1, 1) translate(-50%);
            transform-origin: 50% 50%;
          }
          
          .watch-btn:hover:after {
            animation: ripple 1s ease-out;
          }
          
          @keyframes ripple {
            0% {
              transform: scale(0, 0);
              opacity: 0.5;
            }
            100% {
              transform: scale(20, 20);
              opacity: 0;
            }
          }
          
          .watch-btn:hover {
            background-color: #213448;
            transform: scale(1.05);
            box-shadow: 0 4px 8px rgba(33, 52, 72, 0.3);
          }
          
          .watch-btn svg {
            transition: transform 0.3s ease;
          }
          
          .watch-btn:hover svg {
            transform: translateX(3px);
          }
          
          @media (max-width: 768px) {
            .resource-grid {
              grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
            }
            
            .hero-section h1 {
              font-size: 2rem;
            }
            
            .hero-stats {
              flex-direction: column;
              gap: 1rem;
            }
          }
          
          @media (max-width: 480px) {
            .resource-grid {
              grid-template-columns: 1fr;
            }
            
            .animated-text {
              font-size: 1.8rem;
            }
          }
        `}</style>
      </div>
    </Layout>
  );
};

export default WebDevScreen;