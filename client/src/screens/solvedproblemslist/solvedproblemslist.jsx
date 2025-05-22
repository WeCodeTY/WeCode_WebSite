import React, { useState, useEffect } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Layout from "../../Layout1/Layout";
import Navbar from "../../Layout1/Navbar";
import Footer from "../../Layout1/Footer";

const SolvedProblemsList = () => {
  const [submittedQuestions, setSubmittedQuestions] = useState([]);
  const [customlist, setcustomlist] = useState([]);
  const [showcustomlistquestions, setshowcustomlistquestions] = useState([]);
  const [newListName, setNewListName] = useState("");
  const [selectedListId, setSelectedListId] = useState(null);
  const [draggedNoteIndex, setDraggedNoteIndex] = useState(null);
  const [topicGraphData, setTopicGraphData] = useState({});

  // Styles object for reusable styling
  const styles = {
    container: { padding: "2rem", backgroundColor: "#213448", borderRadius: "12px", color: "#ECEFCA", fontFamily: "'Segoe UI', system-ui, sans-serif", boxShadow: "0 8px 32px rgba(0,0,0,0.2)", width: "90%", maxWidth: "1200px", margin: "2rem auto" },
    sectionTitle: { fontSize: "1.75rem", fontWeight: "600", marginBottom: "1.5rem", color: "#94B4C1", textAlign: "center", textShadow: "0 0 8px rgba(148, 180, 193, 0.3)" },
    subTitle: { fontSize: "1.25rem", fontWeight: "500", color: "#94B4C1", marginBottom: "1.25rem", textAlign: "center" },
    card: { backgroundColor: "#547792", borderRadius: "8px", padding: "1.5rem", marginBottom: "2rem", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" },
    input: { padding: "0.7rem 1rem", borderRadius: "6px", border: "1px solid #94B4C1", backgroundColor: "#213448", color: "#ECEFCA", width: "100%", fontSize: "0.95rem" },
    button: { padding: "0.7rem 1.2rem", backgroundColor: "#547792", color: "#ECEFCA", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "500", boxShadow: "0 0 8px rgba(148, 180, 193, 0.4)", transition: "all 0.2s ease" },
    deleteButton: { backgroundColor: "#ff4d4d", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "500", transition: "all 0.2s ease" },
    table: { width: "100%", borderCollapse: "separate", borderSpacing: "0", borderRadius: "8px", overflow: "hidden", boxShadow: "0 4px 16px rgba(0,0,0,0.15)" },
    tableHeader: { background: "#547792", color: "#ECEFCA", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "600", fontSize: "0.9rem" },
    tableCell: { padding: "14px 16px", borderBottom: "1px solid rgba(148, 180, 193, 0.2)" },
    select: { backgroundColor: "#213448", color: "#ECEFCA", border: "1px solid #94B4C1", borderRadius: "4px", padding: "8px", width: "100%", cursor: "pointer" },
    noteCard: { display: "flex", flexDirection: "column", width: "90%", maxWidth: "220px", padding: "1.25rem", margin: "1rem", backgroundColor: "#ECEFCA", color: "#213448", borderRadius: "8px", boxShadow: "0 6px 16px rgba(0,0,0,0.2)", fontWeight: "500", cursor: "grab", transition: "transform 0.2s ease, box-shadow 0.2s ease" }
  };

  // Combined fetch functions into one useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch solved questions
        const questionsRes = await axios.get(process.env.REACT_APP_SOLVED_QUESTION, { withCredentials: true });
        const allQuestions = questionsRes.data.questions || [];
        setSubmittedQuestions(allQuestions.filter(q => q.important === true));
        
        // Fetch custom lists
        const listsRes = await axios.get(process.env.REACT_APP_CUSTOM_LIST, { withCredentials: true });
        setcustomlist(listsRes.data.customLists);
        
        // Fetch topic graph data
        const graphRes = await axios.get(process.env.REACT_APP_QUESTION_GRAPH, { withCredentials: true });
        setTopicGraphData(graphRes.data.topicCount || graphRes.data.titlecount || {});
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  // Combined CRUD operations with better error handling
  const createnewcustomlist = async (listname) => {
    if (!listname.trim()) return;
    try {
      await axios.post(process.env.REACT_APP_CREATE_CUSTOM_LIST, { listname }, { withCredentials: true });
      getallcustomlists();
      setNewListName("");
    } catch (err) {
      console.error("Error creating custom list:", err);
      alert("Failed to create list.");
    }
  };

  const getallcustomlists = async () => {
    try {
      const res = await axios.get(process.env.REACT_APP_CUSTOM_LIST, { withCredentials: true });
      setcustomlist(res.data.customLists);
    } catch (err) { console.error("Error fetching custom lists:", err); }
  };

  const addquestiontocustomlist = async (listId, questionId) => {
    try {
      await axios.post(process.env.REACT_APP_ADD_QUESTION_TO_CUSTOM_LIST, { listId, questionId }, { withCredentials: true });
      if (listId === selectedListId && !showcustomlistquestions.includes(questionId)) {
        setshowcustomlistquestions(prev => [...prev, questionId]);
      }
    } catch (err) { console.error("Error adding question to list:", err); }
  };

  const viewcustomlist = async (listId) => {
    if (!listId) return;
    try {
      const res = await axios.post(process.env.REACT_APP_ALL_QUESTIONS, { listId }, { withCredentials: true });
      setshowcustomlistquestions(res.data.questions);
      setSelectedListId(listId);
    } catch (err) { console.error("Error viewing custom list:", err); }
  };

  const deletecustomlist = async (listId) => {
    try {
      await axios.post(process.env.REACT_APP_DELETE_CUSTOM_LIST, { listId }, { withCredentials: true });
      setcustomlist(customlist.filter(list => list._id !== listId));
      setSelectedListId(null);
      setshowcustomlistquestions([]);
    } catch (err) { console.error("Error deleting custom list:", err); }
  };

  const deletequestionfromcustomlist = async (listId, questionId) => {
    try {
      await axios.post(process.env.REACT_APP_DELETE_QUESTION_FROM_CUSTOM_LIST, { listId, questionId }, { withCredentials: true });
      viewcustomlist(listId);
    } catch (err) { console.error("Error deleting question from list:", err); }
  };

  // Chart colors for better consistency
  const CHART_COLORS = ["#547792", "#94B4C1", "#213448", "#ECEFCA", "#6D9CB5", "#385D75", "#B8C4A6", "#82A391"];

  return (
    <Layout>
      <div style={styles.container}>
        <h2 style={styles.sectionTitle}>📘 Important Questions Dashboard</h2>
        
        {/* Analytics Section */}
        {Object.keys(topicGraphData).length > 0 && (
          <div style={{ ...styles.card, marginBottom: "2.5rem" }}>
            <h3 style={styles.subTitle}>📊 Topic Analysis</h3>
            <div style={{ width: "100%", height: 400, margin: "1rem auto" }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={Object.entries(topicGraphData).map(([name, value]) => ({ name, value }))}
                    dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={130} fill="#8884d8"
                    labelLine={false} label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}>
                    {Object.keys(topicGraphData).map((_, index) => (
                      <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [`${value} question${value !== 1 ? 's' : ''}`, name]} />
                  <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Create List Section */}
        <div style={styles.card}>
          <h3 style={styles.subTitle}>📁 Create Custom List</h3>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <input type="text" placeholder="Enter list name" value={newListName} 
              onChange={(e) => setNewListName(e.target.value)} style={{ ...styles.input, flex: "3 1 200px" }} />
            <button onClick={() => createnewcustomlist(newListName)} 
              style={{ ...styles.button, flex: "1 1 120px", backgroundColor: "#94B4C1", color: "#213448", fontWeight: "600" }}>
              Create List
            </button>
          </div>
        </div>

        {/* Important Questions Table */}
        <div style={{ ...styles.card, marginTop: "2rem" }}>
          <h3 style={styles.subTitle}>⭐ Important Questions</h3>
          {submittedQuestions.length === 0 ? (
            <div style={{ textAlign: "center", padding: "2rem", backgroundColor: "rgba(148, 180, 193, 0.1)", borderRadius: "8px" }}>
              <p style={{ color: "#94B4C1" }}>No important questions marked yet. Questions you mark as important will appear here.</p>
            </div>
          ) : (
            <div style={{ width: "100%", overflowX: "auto" }}>
              <table style={styles.table}>
                <thead>
                  <tr style={styles.tableHeader}>
                    <th style={{ ...styles.tableCell, width: "20%" }}>Question ID</th>
                    <th style={{ ...styles.tableCell, width: "15%" }}>Status</th>
                    <th style={{ ...styles.tableCell, width: "20%" }}>Date</th>
                    <th style={{ ...styles.tableCell, width: "20%" }}>Time</th>
                    <th style={{ ...styles.tableCell, width: "25%" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {submittedQuestions.map((q, idx) => (
                    <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? "rgba(84, 119, 146, 0.6)" : "rgba(84, 119, 146, 0.8)" }}>
                      <td style={{ ...styles.tableCell, fontWeight: "500" }}>{q.questionId}</td>
                      <td style={styles.tableCell}>{q.important ? "✅ Yes" : "❌ No"}</td>
                      <td style={styles.tableCell}>{q.timestamp ? new Date(q.timestamp).toLocaleDateString() : "N/A"}</td>
                      <td style={styles.tableCell}>{q.timestamp ? new Date(q.timestamp).toLocaleTimeString() : "N/A"}</td>
                      <td style={styles.tableCell}>
                        <select defaultValue="" onChange={(e) => addquestiontocustomlist(e.target.value, q.questionId)}
                          style={styles.select}>
                          <option value="" disabled>Add to list...</option>
                          {customlist.map((list) => (
                            <option key={list._id} value={list._id}>{list.name}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Saved Lists Section */}
        <div style={{ ...styles.card, marginTop: "2rem" }}>
          <h3 style={styles.subTitle}>📂 Saved Lists</h3>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
            <select id="list-view-selector" defaultValue="" onChange={(e) => viewcustomlist(e.target.value)}
              style={{ ...styles.select, flex: "3 1 300px", padding: "0.8rem 1rem" }}>
              <option disabled value="">Select a list to view</option>
              {customlist.map((list) => (
                <option key={list._id} value={list._id}>{list.name}</option>
              ))}
            </select>
            {customlist.length > 0 && (
              <button onClick={() => {
                const listId = document.getElementById("list-view-selector").value;
                if (listId && window.confirm("Are you sure you want to delete this list?")) {
                  deletecustomlist(listId);
                }
              }} style={{ ...styles.deleteButton, flex: "1 1 150px", padding: "0.8rem 1rem" }}>
                Delete List
              </button>
            )}
          </div>

          {/* List Items Display */}
          {selectedListId ? (
            showcustomlistquestions.length > 0 ? (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
                {showcustomlistquestions.map((q, idx) => (
                  <div key={idx} draggable
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
                      ...styles.noteCard,
                      transform: draggedNoteIndex === idx ? "scale(1.05)" : "scale(1)",
                      position: "relative"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.3)"}
                    onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.2)"}
                  >
                    <div style={{ marginBottom: "0.5rem", fontWeight: "600" }}>Question ID:</div>
                    <div>{q}</div>
                    <button onClick={() => deletequestionfromcustomlist(selectedListId, q)}
                      style={{
                        position: "absolute", top: "8px", right: "8px",
                        backgroundColor: "#ff4444", color: "#fff", border: "none",
                        borderRadius: "50%", width: "28px", height: "28px",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "1rem", fontWeight: "bold", cursor: "pointer"
                      }}>
                      ×
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "2rem", backgroundColor: "rgba(148, 180, 193, 0.1)", borderRadius: "8px" }}>
                <p style={{ color: "#94B4C1" }}>This list is empty. Add questions from your important questions table above.</p>
              </div>
            )
          ) : (
            <div style={{ textAlign: "center", padding: "2rem", backgroundColor: "rgba(148, 180, 193, 0.1)", borderRadius: "8px" }}>
              <p style={{ color: "#94B4C1" }}>Select a list above to view its contents.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SolvedProblemsList;