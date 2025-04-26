import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Navbar from "../Layout1/Navbar";
import Footer from "../Layout1/Footer";

const SolvedProblemsList = () => {
  const [submittedQuestions, setSubmittedQuestions] = useState([]);
  const [customlist, setcustomlist] = useState([]);
  const [showcustomlistquestions, setshowcustomlistquestions] = useState([]);
  const [newListName, setNewListName] = useState("");
  const [selectedListId, setSelectedListId] = useState(null); // Added state for selected list
  const [draggedNoteIndex, setDraggedNoteIndex] = useState(null);
  const [topicGraphData, setTopicGraphData] = useState({});

  const fetchsolvedquestions = async () => {
    try {
      const res = await axios.get(process.env.REACT_APP_SOLVED_QUESTION, {
        withCredentials: true,
      });
      const allQuestions = res.data.questions || [];
      const filtered = allQuestions.filter(q => q.important === true);
      setSubmittedQuestions(filtered);
    } catch (err) {
      console.error("Error fetching solved questions:", err);
    }
  };

  const fetchtopicgraph = async () => {
    try {
      const res = await axios.get(process.env.REACT_APP_QUESTION_GRAPH, {
        withCredentials: true
      });
      const data = res.data.topicCount || res.data.titlecount || {};
      setTopicGraphData(data);
    } catch (err) {
      console.error("Error fetching topic graph data:", err);
    }
  };

  useEffect(() => {
    fetchsolvedquestions();
    getallcustomlists();
    fetchtopicgraph();
  }, []);

  const createnewcustomlist = async (listname) => {
    try {
      console.log("Creating list:", listname);
      const res = await axios.post(process.env.REACT_APP_CREATE_CUSTOM_LIST, { listname }, { withCredentials: true });
      alert("List created successfully!");
      getallcustomlists();
    } catch (err) {
      console.error("Error creating custom list:", err);
      alert("Failed to create list.");
    }
  };

  const getallcustomlists = async () => {
    try {
      const res = await axios.get(process.env.REACT_APP_CUSTOM_LIST, {
        withCredentials: true,
      });
      setcustomlist(res.data.customLists);
    } catch (err) {
      console.error("Error fetching custom lists:", err);
    }
  };

  const addquestiontocustomlist = async (listId , questionId) => {
    try {
      const res = await axios.post(process.env.REACT_APP_ADD_QUESTION_TO_CUSTOM_LIST, {
        listId,
        questionId,
      }, {
        withCredentials: true
      });

      // Update the current view if the added question is for the selected list
      if (listId === selectedListId && !showcustomlistquestions.includes(questionId)) {
        setshowcustomlistquestions(prev => [...prev, questionId]);
      }
    }
    catch {
      console.log("Error adding question to custom list");
    }
  }

  const viewcustomlist = async (listId) => {
    try {
      const res = await axios.post(process.env.REACT_APP_ALL_QUESTIONS, {
        listId,
      }, {
        withCredentials: true
      })
      setshowcustomlistquestions(res.data.questions);
      setSelectedListId(listId); // Set selected list id when viewing
    }
    catch {
      console.log("Error adding question to custom list");  
    }
  }

  const deletecustomlist = async (listId) => {
    try {
      const res = await axios.post(process.env.REACT_APP_DELETE_CUSTOM_LIST, {
        listId,
      }, {
        withCredentials: true
      })
      setcustomlist(customlist.filter(list => list._id !== listId)); // Remove list from state
      setSelectedListId(null); // Clear selected list id
      setshowcustomlistquestions([]); // Clear questions shown
    }
    catch {
      console.log("Error deleting custom list");
    }
  }

  const deletequestionfromcustomlist = async (listId , questionId) => {
    try {
      console.log("Deleting from list:", listId, "question:", questionId);
      const res = await axios.post(process.env.REACT_APP_DELETE_QUESTION_FROM_CUSTOM_LIST, {
        listId,
        questionId,
      }, {
        withCredentials: true
      })
      viewcustomlist(listId);
    }
    catch {
      console.log("Error deleting question from custom list");
    }
  }

  return (

    

    <div style={{
      /* Navbar placed immediately after opening div */
    }}>
      <Navbar />
      {/* Rest of the content */}
      <div style={{
      padding: "2rem",
      backgroundColor: "#213448",
      borderRadius: "12px",
      color: "#ECEFCA",
      fontFamily: "Segoe UI, sans-serif",
      boxShadow: "0 4px 20px rgba(0,0,0,0.6)"
      }}>
       
      <h2 style={{
        fontSize: "1.5rem",
        fontWeight: 500,
        marginBottom: "1.2rem",
        color: "#94B4C1",
        textAlign: "center",
        textShadow: "0 0 4px #94B4C1"
      }}>
        📘 Your Important Submissions
      </h2>
      {Object.keys(topicGraphData).length > 0 && (
        <div style={{ width: "100%", maxWidth: "500px", height: 400, margin: "2rem auto" }}>
          <h3 style={{ color: "#94B4C1", textAlign: "center", marginBottom: "1rem", fontSize: "1.1rem", fontWeight: 500 }}>📈 Topic-wise Breakdown</h3>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={Object.entries(topicGraphData).map(([name, value]) => ({ name, value }))}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
                label
              >
                {Object.keys(topicGraphData).map((_, index) => (
                  <Cell key={`cell-${index}`} fill={[
                    "#547792", "#94B4C1", "#6c5ce7", "#fab1a0",
                    "#81ecec", "#ffeaa7", "#a29bfe", "#55efc4"
                  ][index % 8]} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name, props) => {
                if (!name || typeof value !== 'number') return '';
                return `${name}: ${value} login${value > 1 ? "s" : ""}`;
              }} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
        marginBottom: "2rem"
      }}>
        <input
          type="text"
          placeholder="Enter custom list name"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          style={{
            padding: "0.6rem 1rem",
            borderRadius: "6px",
            border: "1px solid #94B4C1",
            backgroundColor: "#547792",
            color: "#ECEFCA",
            width: "300px"
          }}
        />
        <button
          onClick={() => {
            if (!newListName.trim()) {
              const nameFromPrompt = prompt("Enter a name for your new custom list:");
              if (nameFromPrompt && nameFromPrompt.trim()) {
                createnewcustomlist(nameFromPrompt.trim());
              }
            } else {
              createnewcustomlist(newListName.trim());
              setNewListName("");
            }
          }}
          style={{
            padding: "0.6rem 1.2rem",
            backgroundColor: "#547792",
            color: "#ECEFCA",
            border: "1px solid #94B4C1",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "500",
            boxShadow: "0 0 6px #94B4C1"
          }}
        >
          Add List
        </button>
      </div>
      {submittedQuestions.length === 0 ? (
        <p style={{ color: "#ccc", textAlign: "center" }}>You haven't marked any questions as important yet.</p>
      ) : (
        <table style={{
          width: "100%",
          borderCollapse: "collapse",
          borderRadius: "10px",
          overflow: "hidden",
          fontSize: "1rem"
        }}>
          <thead>
            <tr style={{
              background: "#547792",
              color: "#ECEFCA",
              textTransform: "uppercase",
              letterSpacing: "1px"
            }}>
              <th style={{ padding: "14px", borderBottom: "2px solid #94B4C1" }}>🆔 Question ID</th>
              <th style={{ padding: "14px", borderBottom: "2px solid #94B4C1" }}>📌 Submitted</th>
              <th style={{ padding: "14px", borderBottom: "2px solid #94B4C1" }}>📅 Date</th>
              <th style={{ padding: "14px", borderBottom: "2px solid #94B4C1" }}>⏰ Time</th>
              <th style={{ padding: "14px", borderBottom: "2px solid #94B4C1" }}>📂 Actions</th>
            </tr>
          </thead>
          <tbody>
            {submittedQuestions.map((q, idx) => (
              <tr
                key={idx}
                style={{
                  backgroundColor: idx % 2 === 0 ? "#547792" : "#94B4C1",
                  transition: "all 0.3s ease",
                  color: "#213448"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#6e8ca9";
                  e.currentTarget.style.boxShadow = "0 0 8px #94B4C1";
                  e.currentTarget.style.color = "#213448";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = idx % 2 === 0 ? "#547792" : "#94B4C1";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.color = "#213448";
                }}
              >
                <td style={{ padding: "14px", borderBottom: "1px solid #94B4C1" }}>{q.questionId}</td>
                <td style={{ padding: "14px", borderBottom: "1px solid #94B4C1" }}>{q.important ? "✅ Yes" : "❌ No"}</td>
                <td style={{ padding: "14px", borderBottom: "1px solid #94B4C1" }}>
                {q.timestamp ? new Date(q.timestamp).toLocaleDateString() : "N/A"}
                </td>
                <td style={{ padding: "14px", borderBottom: "1px solid #94B4C1" }}>
                {q.timestamp ? new Date(q.timestamp).toLocaleTimeString() : "N/A"}
                </td>
                <td style={{ padding: "14px", borderBottom: "1px solid #94B4C1" }}>
                  <select
                    defaultValue=""
                    onChange={(e) => addquestiontocustomlist(e.target.value, q.questionId)}
                    data-question-id={q.questionId}
                    style={{
                      backgroundColor: "#547792",
                      color: "#ECEFCA",
                      border: "1px solid #94B4C1",
                      borderRadius: "4px",
                      padding: "6px",
                    }}
                  >
                    <option value="" disabled style={{color:"#ECEFCA"}}>Save</option>
                    {customlist.map((list) => (
                      <option key={list._id} value={list._id}>
                        {list.name}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div style={{ marginTop: "3rem", padding: "1rem", backgroundColor: "#213448", borderRadius: "10px" }}>
        <h3 style={{ color: "#94B4C1", marginBottom: "1rem", fontSize: "1.1rem", fontWeight: 500 }}>📁 Saved List Questions</h3>
        <select
          id="list-view-selector"
          defaultValue=""
          onChange={(e) => viewcustomlist(e.target.value)}
          style={{
            backgroundColor: "#547792",
            color: "#ECEFCA",
            border: "1px solid #94B4C1",
            borderRadius: "6px",
            padding: "0.6rem",
            marginBottom: "1rem"
          }}
        >
          <option disabled value="" style={{color:"#ECEFCA"}}>🔽 Select a List to View Questions</option>
          {customlist.map((list) => (
            <option key={list._id} value={list._id}>
              {list.name}
            </option>
          ))}
        </select>
        {customlist.length > 0 && (
          <button
            onClick={() => {
              const listId = document.getElementById("list-view-selector").value;
              if (listId) {
                if (window.confirm("Are you sure you want to delete this list?")) {
                  deletecustomlist(listId);
                }
              }
            }}
            style={{
              padding: "0.4rem 0.8rem",
              backgroundColor: "#ff4d4d",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              marginBottom: "1rem",
              marginLeft: "1rem",
              fontWeight: "500",
              fontFamily: "Segoe UI, sans-serif"
            }}
          >
            Remove List
          </button>
        )}
        {selectedListId && showcustomlistquestions.length > 0 ? ( // Only show if a list is selected
          <div style={{ position: "relative", minHeight: "200px" }}>
            {showcustomlistquestions.map((q, idx) => (
              <div
                key={idx}
                draggable
                onDragStart={() => setDraggedNoteIndex(idx)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => {
                  if (draggedNoteIndex !== null && draggedNoteIndex !== idx) {
                    const newOrder = [...showcustomlistquestions];
                    const moved = newOrder.splice(draggedNoteIndex, 1)[0];
                    newOrder.splice(idx, 0, moved);
                    setshowcustomlistquestions(newOrder);
                    setDraggedNoteIndex(null);
                  }
                }}
                style={{
                  display: "inline-block",
                  width: "200px",
                  padding: "1rem",
                  margin: "1rem",
                  backgroundColor: "#ECEFCA",
                  color: "#213448",
                  borderRadius: "8px",
                  boxShadow: "2px 2px 8px rgba(0,0,0,0.3)",
                  fontWeight: 500,
                  cursor: "grab",
                  zIndex: 1000
                }}
              >
                Q: {q}
                <button
                  onClick={() => {
                    const selectedListId = document.getElementById("list-view-selector").value;
                    deletequestionfromcustomlist(selectedListId, q);
                  }}
                  style={{
                    float: "right",
                    marginTop: "-4px",
                    marginRight: "-8px",
                    backgroundColor: "#ff4444",
                    color: "#fff",
                    border: "none",
                    borderRadius: "50%",
                    width: "24px",
                    height: "24px",
                    fontSize: "0.8rem",
                    lineHeight: "24px",
                    textAlign: "center",
                    cursor: "pointer",
                    fontWeight: "bold"
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: "#ccc" }}>This list doesn't have any saved questions.</p>
        )}
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default SolvedProblemsList;