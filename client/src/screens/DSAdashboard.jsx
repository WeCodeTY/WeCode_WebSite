import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";
import quoteList from "../utils/quotes.js";
import { handleLogout } from "../utils/Logout.js";
import Layout from "../Layout1/Layout.jsx";
import Navbar from "../Layout1/Navbar.jsx";
import { createroom, joinroom } from "../Rooms/room.jsx";
import { io } from "socket.io-client";

const socket = io(process.env.REACT_APP_SOCKET_URL);

const Dashboard = () => {
  const [questions, setQuestions] = useState([]);
  const [quote, setQuote] = useState("");
  const [showmenu, setshowmenu] = useState(false);
  const [joinRoomId, setJoinRoomId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setQuote(quoteList[Math.floor(Math.random() * quoteList.length)]);
  }, []);

  // useEffect(() => {
  //   const fetchExcel = async () => {
  //     const response = await fetch("/questions.xlsx");
  //     const arrayBuffer = await response.arrayBuffer();
  //     const workbook = XLSX.read(arrayBuffer, { type: "buffer" });
  //     const sheetName = workbook.SheetNames[0];
  //     const worksheet = workbook.Sheets[sheetName];
  //     const data = XLSX.utils.sheet_to_json(worksheet);
  //     const cleanedData = data.map((q) => ({
  //       ...q,
  //       Topic: q["Topics"] || q.Topic || "Miscellaneous",
  //     }));
  //     setQuestions(cleanedData);
  //     fetchResponse();
  //   };
  //   fetchExcel();
  // }, []);

  useEffect(() => {
    const fetchQuestionsFromBackend = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_GET_ALL_QUESTIONS, {
          withCredentials: true
        });
        const data = response.data.questions;

        const cleanedData = data.map(q => ({
          Topic: q.topic || "Miscellaneous",
          Title: q.title,
          Difficulty: q.difficulty,
          Revision: q.revision === 0 ? "No" : "Yes",
          Important: q.important ? "Yes" : "No",
          Link: q.link,
          "Problem Statement": q.problemStatement,
          "Sample Input": q.sampleInput,
          "Sample Output": q.sampleOutput,
          Constraints: q.constraints,
        }));

        setQuestions(cleanedData);
        fetchResponse();
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
      const response = await axios.get(process.env.REACT_APP_ROOM_CREATE, {
        withCredentials: true,
      });
      const privateRoomId = response.data.roomId;

      navigate(`/customroom/${roomId}/${privateRoomId}`, {
        state: { question: roomData, ...customState }
      });
    } catch (error) {
      console.error("❌ Failed to create private room:", error);
    }
  }

  const handleJoinRoom = async (question) => {
    const privateRoomId = prompt(`Enter private room ID for "${question.Title}"`);
    console.log("Private Room ID:", privateRoomId);
    
    if (!privateRoomId) return;
  
    try {
      await axios.post(
        process.env.REACT_APP_ROOM_JOIN,
        { roomId: privateRoomId },
        { withCredentials: true }
      );
  
      console.log("✅ Joined Room:", privateRoomId);
  
      const publicRoomId = slugify(question.Title);
      console.log("Navigating to room...");
navigate(`/customroom/${publicRoomId}/${privateRoomId}` , {
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
      const errMsg = error?.response?.data?.message;
  
      console.log("❌ Room join failed:", errMsg);
      
    }
  };

  const handleUpdateQuestion = async (index, field, value) => {
    const updatedQuestions = [...questions];
    const newValue = value === "Yes" ? "No" : "Yes";
    try {
      const response = await axios.post(
        process.env.REACT_APP_UPDATE_QUESTION_URI,
        {
          title : updatedQuestions[index].Topic,
          questionId: updatedQuestions[index].Title,
          field,
          value: newValue,
        },
        { withCredentials: true }
      );
      updatedQuestions[index][field] = newValue;
      setQuestions(updatedQuestions);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchResponse = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_FETCH_DASHBOARD, {
        withCredentials: true,
      });
      const { importantQuestions, revisionQuestions } = response.data;

      setQuestions((prevQuestions) =>
        prevQuestions.map((q) => {
          const isImportant = importantQuestions.some(
            (iq) => iq.questionId === q.Title
          );
          const isRevision = revisionQuestions.some(
            (rq) => rq.questionId === q.Title
          );
          return {
            ...q,
            Important: isImportant ? "Yes" : "No",
            Revision: isRevision ? "Yes" : "No",
            Topic: q.Topic || "Miscellaneous",
          };
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogoutClick = () => {
    setshowmenu(false);
    handleLogout(navigate);
  };

  const handleToggleMenu = () => {
    setshowmenu(!showmenu);
  };

  const handleNavigateToDashboard = () => {
    navigate("/dsadashboard");
  };

  const slugify = (str) => {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleJoinQuestionRoom = (title) => {
    const publicroomID = slugify(title);
    navigate(`/questionroom/${publicroomID}`);
  };

  const handleSolvequestion = (question) => {
    handleCreateRoom(question, { hideRoomId: true });
  } 

  return (
    <Layout style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)" }}>
      <Navbar
        showMenu={showmenu}
        onToggleMenu={handleToggleMenu}
        onLogout={handleLogoutClick}
        onDashboard={handleNavigateToDashboard}
      />

      <h1 style={{ textAlign: "center", fontSize: "3rem", color: "#213448", marginTop: "140px", marginBottom: "30px", fontWeight: "700" }}>
        {quote}
      </h1>

      <div style={tableContainerStyle}>
        <h2 style={{ color: "#213448", textAlign: "center", marginBottom: "20px", fontWeight: "700" }}>DSA Questions</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#213448" }}>
              <th style={thStyle}>Topic</th>
              <th style={thStyle}>Title</th>
              <th style={thStyle}>Difficulty</th>
              <th style={thStyle}>Revision</th>
              <th style={thStyle}>Submitted</th>
              <th style={thStyle}>Solve</th>
              <th style={thStyle}>Join Room</th>
              <th style={thStyle}>Private Room</th>
              <th style={thStyle}>Join Private Room</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((q, index) => (
              <tr
                key={index}
                style={{
                  transition: "transform 0.2s ease, background-color 0.2s ease",
                  cursor: "pointer",
                  color: "#213448",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.01)";
                  e.currentTarget.style.backgroundColor = "#94B4C1";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.backgroundColor = "";
                }}
              >
                <td style={tdStyle}>{q.Topic || "N/A"}</td>
                <td style={tdStyle}>{q.Title}</td>
                <td style={tdStyle}>{q.Difficulty}</td>
                <td style={tdStyle}>
                  <input
                    type="checkbox"
                    checked={q.Revision === "Yes"}
                    onChange={() => handleUpdateQuestion(index, "Revision", q.Revision)}
                    style={{ cursor: "pointer", ...inputStyle }}
                  />
                </td>
                <td style={tdStyle}>
                  <input
                    type="checkbox"
                    checked={q.Important === "Yes"}
                    onChange={() => handleUpdateQuestion(index, "Important", q.Important)}
                    style={{ cursor: "pointer", ...inputStyle }}
                  />
                </td>
                <td style={tdStyle}>
                  <button
                    style={actionBtnStyle1}
                    title="Submit Solution"
                    onClick={() => handleSolvequestion(q)}
                    onMouseEnter={e => e.currentTarget.style.background = "#94B4C1"}
                    onMouseLeave={e => e.currentTarget.style.background = "#547792"}
                  >
                    Submit
                  </button>
                </td>
                <td style={tdStyle}>
                  <button 
                    onClick={() => handleJoinQuestionRoom(q.Title)} 
                    style={buttonStyle} 
                    title="Join public room for this question"
                    onMouseEnter={e => e.currentTarget.style.background = "#94B4C1"}
                    onMouseLeave={e => e.currentTarget.style.background = "#547792"}
                  >
                    Join Room
                  </button>
                </td>
                <td style={tdStyle}>
                  <button 
                    onClick={() => handleCreateRoom(q)} 
                    style={buttonStyle} 
                    title="Create a private room"
                    onMouseEnter={e => e.currentTarget.style.background = "#94B4C1"}
                    onMouseLeave={e => e.currentTarget.style.background = "#547792"}
                  >
                    Create Room
                  </button>
                </td>
                <td style={tdStyle}>
                  <button
                    onClick={() => handleJoinRoom(q)}
                    style={buttonStyle}
                    title="Join a private room"
                    onMouseEnter={e => e.currentTarget.style.background = "#94B4C1"}
                    onMouseLeave={e => e.currentTarget.style.background = "#547792"}
                  >
                    Join Private
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

// --- Styles ---

const buttonStyle = {
  backgroundColor: "#547792", // Light Blue for buttons
  padding: "10px 20px",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontWeight: "600",
  cursor: "pointer",
  transition: "all 0.3s ease",
  boxShadow: "0 2px 10px rgba(84, 119, 146, 0.3)", 
};

const inputStyle = {
  backgroundColor: "#213448", // Dark Blue background for inputs
  color: "#fff",
  border: "1px solid #94B4C1", // Soft Blue border for input fields
  borderRadius: "8px",
  padding: "10px",
  outline: "none",
};

const tableContainerStyle = {
  background: "#ECEFCA", // Pale Yellow background for cleaner design
  padding: "30px",
  borderRadius: "16px",
  boxShadow: "0 8px 40px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
  border: "1px solid rgba(255, 255, 255, 0.05)",
  margin: "40px auto",
  maxWidth: "1200px",
};

const thStyle = {
  borderBottom: "2px solid #94B4C1", // Soft Blue for header borders
  padding: "12px",
  color: "#fff",
  fontWeight: "600",
  background: "#213448", // Dark Blue header background
};

const tdStyle = {
  padding: "12px",
  color: "#213448", // Dark Blue for table text
  textAlign: "center",
  backgroundColor: "#ECEFCA", // Pale Yellow background for table rows
};

const actionBtnStyle1 = {
  marginRight: "10px",
  padding: "6px 12px",
  borderRadius: "6px",
  border: "none",
  background: "#547792", // Light Blue for action buttons
  color: "#fff",
  cursor: "pointer",
  transition: "0.3s ease",
};

const actionBtnStyle2 = {
  padding: "6px 12px",
  borderRadius: "6px",
  border: "none",
  background: "#94B4C1", // Soft Blue for accent buttons
  color: "#fff",
  cursor: "pointer",
  transition: "0.3s ease",
};

export default Dashboard;