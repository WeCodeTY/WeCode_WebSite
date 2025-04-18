import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const SolvedProblemsList = () => {
const [submittedQuestions, setSubmittedQuestions] = useState([]);

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

  useEffect(() => {
    fetchsolvedquestions();
  }, []);

  return (
    <div style={{
      padding: "2rem",
      backgroundColor: "#1a1a1a",
      borderRadius: "12px",
      color: "#fff",
      fontFamily: "Segoe UI, sans-serif",
      boxShadow: "0 4px 20px rgba(0,0,0,0.6)"
    }}>
      <h2 style={{
        fontSize: "2.2rem",
        marginBottom: "1.5rem",
        color: "#00ffff",
        textAlign: "center",
        textShadow: "0 0 10px #00ffff"
      }}>
        🌟 Submitted (Important) Problems 🌟
      </h2>
      {submittedQuestions.length === 0 ? (
        <p style={{ color: "#ccc", textAlign: "center" }}>No submitted (important) questions found.</p>
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
              background: "linear-gradient(to right, #00c6ff, #0072ff)",
              color: "#fff",
              textTransform: "uppercase",
              letterSpacing: "1px"
            }}>
              <th style={{ padding: "14px", borderBottom: "2px solid #00ffff" }}>🆔 Question ID</th>
              <th style={{ padding: "14px", borderBottom: "2px solid #00ffff" }}>📌 Submitted</th>
              <th style={{ padding: "14px", borderBottom: "2px solid #00ffff" }}>📅 Date</th>
              <th style={{ padding: "14px", borderBottom: "2px solid #00ffff" }}>⏰ Time</th>
            </tr>
          </thead>
          <tbody>
            {submittedQuestions.map((q, idx) => (
              <tr
                key={idx}
                style={{
                  backgroundColor: idx % 2 === 0 ? "#222" : "#2b2b2b",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#3a3a3a";
                  e.currentTarget.style.boxShadow = "0 0 10px #00ffff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = idx % 2 === 0 ? "#222" : "#2b2b2b";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <td style={{ padding: "14px", borderBottom: "1px solid #444" }}>{q.questionId}</td>
                <td style={{ padding: "14px", borderBottom: "1px solid #444" }}>{q.important ? "✅ Yes" : "❌ No"}</td>
                <td style={{ padding: "14px", borderBottom: "1px solid #444" }}>
                  {q.timestamps ? new Date(q.timestamps).toLocaleDateString() : "N/A"}
                </td>
                <td style={{ padding: "14px", borderBottom: "1px solid #444" }}>
                  {q.timestamps ? new Date(q.timestamps).toLocaleTimeString() : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SolvedProblemsList;