import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";
import quoteList from "../../utils/quotes.js";
import { handleLogout } from "../../utils/Logout.js";
import Layout from "../../Layout1/Layout.jsx";
import Navbar from "../../Layout1/Navbar.jsx";
import socket from "../../sockets/socket.js";

const Dashboard = () => {
  const [topic, setTopic] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [sortedQuestions, setSortedQuestions] = useState([]);
  const [titles, setTitles] = useState([]);
  const [topics, setTopics] = useState([]);
  const [quote, setQuote] = useState("");
  const [showmenu, setshowmenu] = useState(false);
  const [joinRoomId, setJoinRoomId] = useState("");
  const [showTopics, setShowTopics] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const navigate = useNavigate();
  
  const handleSortByClick = () => setShowTopics(!showTopics);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && 
          buttonRef.current && !buttonRef.current.contains(event.target)) {
        setShowTopics(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);
  
  useEffect(() => setQuote(quoteList[Math.floor(Math.random() * quoteList.length)]), []);
  
  useEffect(() => {
    const fetchQuestionsFromBackend = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_GET_ALL_QUESTIONS, { withCredentials: true });
        const questionList = response.data.questions;

        const dashboardInfo = await axios.get(process.env.REACT_APP_FETCH_DASHBOARD, { withCredentials: true });
        const { importantQuestions, revisionQuestions } = dashboardInfo.data;

        const cleanedData = questionList.map((q) => ({
          Topic: q.topic || "Miscellaneous",
          Title: q.title,
          Difficulty: q.difficulty,
          Revision: revisionQuestions.some((rq) => rq.questionId === q.title) ? "Yes" : "No",
          Important: importantQuestions.some((iq) => iq.questionId === q.title) ? "Yes" : "No",
          Link: q.link,
          "Problem Statement": q.problemStatement,
          "Sample Input": q.sampleInput,
          "Sample Output": q.sampleOutput,
          Constraints: q.constraints,
        }));

        const sortedData = cleanedData.sort((a, b) => a.Difficulty.localeCompare(b.Difficulty));
        setQuestions(sortedData);
        setSortedQuestions(sortedData);
        setFilteredData(sortedData);
        setTitles(sortedData.map((q) => q.Title));
        setTopics(Array.from(new Set(sortedData.map((q) => q.Topic))));
      } catch (error) {
        console.error("Error fetching questions from backend:", error);
      }
    };
    fetchQuestionsFromBackend();
  }, []);
  
  const handleCreateRoom = async (question, customState = {}) => {
    const roomId = slugify(question.Title);
    const roomData = {
      roomId,
      title: question.Title,
      statement: question["Problem Statement"],
      difficulty: question.Difficulty,
      sampleInput: question["Sample Input"],
      sampleOutput: question["Sample Output"],
      constraints: question.Constraints,
    };

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(process.env.REACT_APP_ROOM_CREATE, {
        withCredentials: true,
        headers: {...(token && { Authorization: `Bearer ${token}` })},
      });
      const privateRoomId = response.data.roomId;
      navigate(`/customroom/${roomId}/${privateRoomId}`, {
        state: { question: roomData, ...customState },
      });
    } catch (error) {
      console.error("❌ Failed to create private room:", error);
    }
  };
  
  const handleJoinRoom = async (question) => {
    const privateRoomId = prompt(`Enter private room ID for "${question.Title}"`);
    if (!privateRoomId) return;
    try {
      await axios.post(process.env.REACT_APP_ROOM_JOIN, { roomId: privateRoomId }, { withCredentials: true });
      const publicRoomId = slugify(question.Title);
      navigate(`/customroom/${publicRoomId}/${privateRoomId}`, {
        state: {
          question: {
            title: question.Title,
            statement: question["Problem Statement"],
            difficulty: question.Difficulty,
            sampleInput: question["Sample Input"],
            sampleOutput: question["Sample Output"],
            constraints: question.Constraints,
          },
        },
      });
    } catch (error) {
      console.log("❌ Room join failed:", error?.response?.data?.message);
    }
  };
  
  const handleUpdateQuestion = async (index, field, value) => {
    const updatedQuestions = [...questions];
    const newValue = value === "Yes" ? "No" : "Yes";
    try {
      const response = await axios.post(
        process.env.REACT_APP_UPDATE_QUESTION_URI,
        {
          title: updatedQuestions[index].Topic,
          questionId: updatedQuestions[index].Title,
          field,
          value: newValue,
        },
        { withCredentials: true }
      );
      updatedQuestions[index][field] = newValue;
      setQuestions(updatedQuestions);
      setSortedQuestions(updatedQuestions);
      setFilteredData(updatedQuestions);
    } catch (error) {
      console.error(error);
    }
  };
  
  const fetchResponse = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_FETCH_DASHBOARD, { withCredentials: true });
      const { importantQuestions, revisionQuestions } = response.data;

      const updatedData = questions.map((q) => ({
        ...q,
        Important: importantQuestions.some((iq) => iq.questionId === q.Title) ? "Yes" : "No",
        Revision: revisionQuestions.some((rq) => rq.questionId === q.Title) ? "Yes" : "No",
        Topic: q.Topic || "Miscellaneous",
      }));

      setQuestions(updatedData);
      setSortedQuestions(updatedData);
      setFilteredData(updatedData);
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleLogoutClick = () => { setshowmenu(false); handleLogout(navigate); };
  const handleToggleMenu = () => setshowmenu(!showmenu);
  const handleNavigateToDashboard = () => navigate("/dsadashboard");
  const slugify = (str) => str.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
  const handleJoinQuestionRoom = (title) => navigate(`/questionroom/${slugify(title)}`);
  const handleSolvequestion = (question) => handleCreateRoom(question, { hideRoomId: true, hideVideoTitle: true });
  
  const handleTopicClick = (selectedTopic) => {
    if (topic === selectedTopic) {
      setTopic(""); 
      setFilteredData(sortedQuestions);
    } else {
      setTopic(selectedTopic);
      setFilteredData(sortedQuestions.filter((item) => item.Topic === selectedTopic));
    }
    setShowTopics(false);
  };
  
  // Styles
  const styles = {
    pageHeading: {
      textAlign: "center", fontSize: "2.5rem", color: "#213448", 
      margin: "100px auto 30px", fontWeight: "700", maxWidth: "900px",
      lineHeight: "1.3", textShadow: "0 1px 2px rgba(0,0,0,0.05)"
    },
    dropdownButton: {
      backgroundColor: showTopics ? "#94B4C1" : "#213448", border: "none",
      borderRadius: "5px", padding: "10px 15px", cursor: "pointer",
      fontSize: "14px", fontWeight: "600", color: "#fff", marginLeft: "0px",
      boxShadow: "0 2px 10px rgba(33,52,72,0.2)", transition: "all 0.3s",
      display: "flex", alignItems: "center", gap: "6px"
    },
    dropdownContainer: {
      position: "relative", marginBottom: "30px", marginLeft: "40px"
    },
    dropdownMenu: {
      position: "absolute", top: "calc(100% + 8px)", left: 0, zIndex: 100,
      background: "#fff", border: "1px solid #94B4C1", borderRadius: "8px",
      boxShadow: "0 4px 20px rgba(33,52,72,0.2)", minWidth: "220px",
      padding: "8px 0", textAlign: "left"
    },
    dropdownItem: (isActive) => ({
      padding: "10px 16px", cursor: "pointer", fontWeight: isActive ? "600" : "400",
      color: "#213448", transition: "background 0.2s, color 0.2s", borderRadius: "4px",
      margin: "4px 8px", backgroundColor: isActive ? "#ECEFCA" : "transparent"
    }),
    tableContainer: {
      background: "#fff", padding: "25px", borderRadius: "12px",
      boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)", border: "1px solid #ECEFCA",
      margin: "20px auto", maxWidth: "1300px"
    },
    tableHeader: {
      textAlign: "left", color: "#213448", fontSize: "1.5rem", 
      marginBottom: "20px", fontWeight: "700", display: "flex", 
      justifyContent: "space-between", alignItems: "center"
    },
    tableHeadCell: {
      padding: "14px 16px", color: "#fff", fontWeight: "600", 
      background: "#213448", textAlign: "left", whiteSpace: "nowrap"
    },
    tableRow: (index) => ({
      backgroundColor: index % 2 === 0 ? "#fff" : "#f8f9fa",
      borderBottom: "1px solid #ECEFCA", transition: "all 0.2s"
    }),
    tableCell: {
      padding: "12px 16px", color: "#213448", textAlign: "left"
    },
    checkbox: {
      width: "18px", height: "18px", accentColor: "#547792", cursor: "pointer"
    },
    button: {
      backgroundColor: "#547792", padding: "8px 12px", color: "#fff",
      border: "none", borderRadius: "6px", fontWeight: "600", cursor: "pointer",
      transition: "all 0.3s ease", boxShadow: "0 2px 6px rgba(84, 119, 146, 0.2)",
      fontSize: "13px", whiteSpace: "nowrap", textAlign: "center"
    },
    difficulty: (level) => {
      const colors = {
        Easy: "#4caf50",
        Medium: "#ff9800",
        Hard: "#f44336"
      };
      return {
        display: "inline-block", padding: "4px 12px",
        borderRadius: "50px", backgroundColor: colors[level] || "#94B4C1",
        color: "#fff", fontWeight: "600", fontSize: "12px"
      };
    }
  };

  return (
    <Layout style={{ background: "#f5f7fa" }}>
      <Navbar showMenu={showmenu} onToggleMenu={handleToggleMenu} onLogout={handleLogoutClick} onDashboard={handleNavigateToDashboard} />
      
      <div className="dashboard-content" style={{ paddingTop: "20px" }}>
        {/* Quote */}
        <h1 style={styles.pageHeading}>{quote}</h1>
        
        {/* Topic Filter */}
        <div style={styles.dropdownContainer}>
          <button ref={buttonRef} onClick={handleSortByClick} style={styles.dropdownButton}>
            {topic ? `Topic: ${topic}` : "Filter by Topic"}
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" style={{ marginLeft: "4px" }}>
              <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          
          {showTopics && (
            <div ref={dropdownRef} style={styles.dropdownMenu}>
              {topics.map((topicItem) => (
                <div 
                  key={topicItem} 
                  onClick={() => handleTopicClick(topicItem)}
                  style={styles.dropdownItem(topic === topicItem)}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#ECEFCA"}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = topic === topicItem ? "#ECEFCA" : "transparent"}
                >
                  {topicItem}
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Questions Table */}
        <div style={styles.tableContainer}>
          <div style={styles.tableHeader}>
            <span>DSA Questions {topic && `- ${topic}`}</span>
            <span style={{ fontSize: "14px", color: "#547792", fontWeight: "normal" }}>
              {(topic ? filteredData : sortedQuestions).length} questions
            </span>
          </div>
          
          <div style={{ overflowX: "auto", borderRadius: "8px", border: "1px solid #ECEFCA" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "900px" }}>
              <thead>
                <tr>
                  <th style={{ ...styles.tableHeadCell, borderTopLeftRadius: "8px" }}>Topic</th>
                  <th style={styles.tableHeadCell}>Title</th>
                  <th style={styles.tableHeadCell}>Difficulty</th>
                  <th style={styles.tableHeadCell}>Revision</th>
                  <th style={styles.tableHeadCell}>Submitted</th>
                  <th style={{ ...styles.tableHeadCell, width: "90px" }}>Solve</th>
                  <th style={styles.tableHeadCell}>Join Room</th>
                  <th style={styles.tableHeadCell}>Create Private</th>
                  <th style={{ ...styles.tableHeadCell, borderTopRightRadius: "8px" }}>Join Private</th>
                </tr>
              </thead>
              <tbody>
                {(topic ? filteredData : sortedQuestions).map((q, index) => (
                  <tr 
                    key={index} 
                    style={styles.tableRow(index)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#f0f4f8";
                      e.currentTarget.style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = index % 2 === 0 ? "#fff" : "#f8f9fa";
                      e.currentTarget.style.transform = "translateY(0px)";
                    }}
                  >
                    <td style={styles.tableCell}>{q.Topic || "N/A"}</td>
                    <td style={styles.tableCell}><strong>{q.Title}</strong></td>
                    <td style={styles.tableCell}>
                      <div style={styles.difficulty(q.Difficulty)}>{q.Difficulty}</div>
                    </td>
                    <td style={styles.tableCell}>
                      <input 
                        type="checkbox" 
                        checked={q.Revision === "Yes"} 
                        onChange={() => handleUpdateQuestion(index, "Revision", q.Revision)}
                        style={styles.checkbox}
                      />
                    </td>
                    <td style={styles.tableCell}>
                      <input 
                        type="checkbox" 
                        checked={q.Important === "Yes"} 
                        onChange={() => handleUpdateQuestion(index, "Important", q.Important)}
                        style={styles.checkbox}
                      />
                    </td>
                    <td style={styles.tableCell}>
                      <button 
                        style={{ ...styles.button, backgroundColor: "#213448" }}
                        onClick={() => handleSolvequestion(q)}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#2d4560"}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#213448"}
                      >
                        Submit
                      </button>
                    </td>
                    <td style={styles.tableCell}>
                      <button 
                        style={styles.button}
                        onClick={() => handleJoinQuestionRoom(q.Title)}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#6089a6"}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#547792"}
                      >
                        Join Room
                      </button>
                    </td>
                    <td style={styles.tableCell}>
                      <button 
                        style={{ ...styles.button, backgroundColor: "#94B4C1" }}
                        onClick={() => handleCreateRoom(q)}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#a9c5d0"}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#94B4C1"}
                      >
                        Create
                      </button>
                    </td>
                    <td style={styles.tableCell}>
                      <button 
                        style={{ ...styles.button, backgroundColor: "#94B4C1" }}
                        onClick={() => handleJoinRoom(q)}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#a9c5d0"}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#94B4C1"}
                      >
                        Join
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;