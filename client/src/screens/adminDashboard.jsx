import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

const AdminDashboard = () => {
  const [formData, setFormData] = useState({
    topic: '',
    title: '',
    difficulty: 'Easy',
    revision: 0,
    important: false,
    link: '',
    problemStatement: '',
    sampleInput: '',
    sampleOutput: '',
    constraints: ''
  });

  const [action, setAction] = useState('add');

  const [userStats, setUserStats] = useState({
    totalUsers: 0,
    googleUsers: 0,
    signedInUsers: 0,
    userNames: []
  });

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const [totalUsersRes, googleUsersRes, signedInUsersRes] = await Promise.all([
          axios.get(process.env.REACT_APP_ALL_USERS, { withCredentials: true }),
          axios.get(process.env.REACT_APP_ALL_GOOGLE_USERS, { withCredentials: true }),
          axios.get(process.env.REACT_APP_ALL_USERS_SIGNED_IN, { withCredentials: true })
        ]);

        const totalUsers = totalUsersRes.data.users;
        const googleUsers = googleUsersRes.data.users;
        const signedInUsers = signedInUsersRes.data.users;

        setUserStats({
          totalUsers: totalUsers.length,
          googleUsers: googleUsers.length,
          signedInUsers: signedInUsers.length,
          userNames: totalUsers.map(user => user.name)
        });
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    };
    fetchUserStats();
  }, []);

  // State to hold all questions
  const [questionsList, setQuestionsList] = useState([]);

  // Utility function to count questions by topic
  const getTopicCounts = () => {
    const counts = {};
    questionsList.forEach(q => {
      counts[q.topic] = (counts[q.topic] || 0) + 1;
    });
    return counts;
  };

  const topicCounts = getTopicCounts();
  const chartData = {
    labels: Object.keys(topicCounts),
    datasets: [
      {
        label: 'Questions by Topic',
        data: Object.values(topicCounts),
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#8BC34A', '#FF9800', '#9C27B0', '#00BCD4'
        ]
      }
    ]
  };

  // Fetch all questions on component mount
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_GET_ALL_QUESTIONS, { withCredentials: true });
        setQuestionsList(response.data.questions);
      } catch (err) {
        console.error("Failed to fetch questions", err);
      }
    };
    fetchQuestions();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(process.env.REACT_APP_Admin_questions_add, formData, { withCredentials: true });
      alert('Question added successfully!');
      setFormData({
        topic: '',
        title: '',
        difficulty: 'Easy',
        revision: 0,
        important: false,
        link: '',
        problemStatement: '',
        sampleInput: '',
        sampleOutput: '',
        constraints: ''
      });
    } catch (err) {
      console.error('Error adding question:', err);
      alert('Failed to add question.');
    }
  };

  // Handler for deleting a question
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        topic: formData.topic,
        title: formData.title
      };
      await axios.post(process.env.REACT_APP_Admin_question_delete, payload, { withCredentials: true });
      alert('Question deleted successfully!');
      setFormData({
        ...formData,
        topic: '',
        title: ''
      });
    } catch (err) {
      console.error('Error deleting question:', err);
      alert('Failed to delete question.');
    }
  };

  // Handler for updating a question
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // Only include non-empty fields, but always include title
      const updatePayload = {};
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== '' && formData[key] !== null && formData[key] !== undefined) {
          updatePayload[key] = formData[key];
        }
      });
      if (!updatePayload.title) {
        alert('Title is required for update.');
        return;
      }
      await axios.post(process.env.REACT_APP_ADMIN_QUESTION_UPDATE, updatePayload, { withCredentials: true });
      alert('Question updated successfully!');
      setFormData({
        topic: '',
        title: '',
        difficulty: 'Easy',
        revision: 0,
        important: false,
        link: '',
        problemStatement: '',
        sampleInput: '',
        sampleOutput: '',
        constraints: ''
      });
    } catch (err) {
      console.error('Error updating question:', err);
      alert('Failed to update question.');
    }
  };

  const formContainerStyle = {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
    marginBottom: "2rem"
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ width: "220px", backgroundColor: "#f5f5f5", padding: "1.5rem", borderRight: "1px solid #ddd" }}>
        <h3 style={{ marginBottom: "2rem", fontWeight: "bold", color: "#333" }}>Admin Panel</h3>
        {["add", "delete", "update", "users"].map((type) => (
          <button
            key={type}
            onClick={() => setAction(type)}
            style={{
              display: "block",
              width: "100%",
              marginBottom: "1rem",
              padding: "0.75rem",
              borderRadius: "6px",
              border: "none",
              backgroundColor: action === type ? "#007bff" : "#ddd",
              color: action === type ? "#fff" : "#333",
              cursor: "pointer",
              textTransform: "capitalize"
            }}
          >
            {type === "users" ? "Users" : `${type} Question`}
          </button>
        ))}
        {/* Analytics Section */}
        <div style={{ marginTop: "2rem", backgroundColor: "#fff", padding: "1.25rem", borderRadius: "8px" }}>
          <h2 style={{ fontWeight: "bold", marginBottom: "1rem", color: "#222" }}>Analytics</h2>
          <Pie data={chartData} />
        </div>
      </div>
      <div style={{ flexGrow: 1, padding: "2rem", overflowY: "auto" }}>
        <div style={{ marginBottom: "2rem", backgroundColor: "#e9f2ff", padding: "1.25rem", borderRadius: "8px" }}>
          <h2 style={{ fontWeight: "bold", marginBottom: "1rem", color: "#222" }}>All Questions</h2>
          <ul style={{ maxHeight: "180px", overflowY: "auto", paddingLeft: "1rem" }}>
            {questionsList.map((q, index) => (
              <li key={index} style={{ marginBottom: "0.5rem", color: "#333" }}>
                <strong>{q.topic}</strong> - {q.title}
              </li>
            ))}
          </ul>
        </div>


        {action === "add" && (
          <form onSubmit={handleSubmit} style={formContainerStyle}>
            <h2 style={{ fontWeight: "bold", color: "#333" }}>Add Question</h2>
            {/* form fields map */}
            {[
              { label: "Topic", name: "topic", type: "text" },
              { label: "Title", name: "title", type: "text" },
              {
                label: "Difficulty",
                name: "difficulty",
                type: "select",
                options: ["Easy", "Medium", "Hard"]
              },
              { label: "Revision Count", name: "revision", type: "number" },
              { label: "LeetCode/Resource Link", name: "link", type: "text" },
              {
                label: "Problem Statement",
                name: "problemStatement",
                type: "textarea",
                rows: 4
              },
              {
                label: "Sample Input",
                name: "sampleInput",
                type: "textarea",
                rows: 3
              },
              {
                label: "Sample Output",
                name: "sampleOutput",
                type: "textarea",
                rows: 3
              },
              {
                label: "Constraints",
                name: "constraints",
                type: "textarea",
                rows: 3
              }
            ].map((field, index) => (
              <div key={index} className="form-group" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <label style={{ fontWeight: "500", color: "#444" }}>{field.label}</label>
                {field.type === "select" ? (
                  <select
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    style={{
                      padding: "0.5rem",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                      outline: "none"
                    }}
                  >
                    {field.options.map((opt, i) => (
                      <option key={i} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : field.type === "textarea" ? (
                  <textarea
                    name={field.name}
                    rows={field.rows}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required
                    style={{
                      padding: "0.5rem",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                      resize: "vertical"
                    }}
                  />
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required
                    style={{
                      padding: "0.5rem",
                      borderRadius: "4px",
                      border: "1px solid #ccc"
                    }}
                  />
                )}
              </div>
            ))}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <input
                type="checkbox"
                name="important"
                checked={formData.important}
                onChange={handleChange}
              />
              <label style={{ fontWeight: "500", color: "#444" }}>Mark as Important</label>
            </div>
            <button
              type="submit"
              className="submit-button"
              style={{
                padding: "0.75rem 1.5rem",
                backgroundColor: "#4CAF50",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold",
                transition: "background-color 0.3s"
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#45A049")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
            >
              Add Question
            </button>
          </form>
        )}
        {action === "delete" && (
          <form onSubmit={handleDelete} style={formContainerStyle}>
            <h2 style={{ fontWeight: "bold", color: "#333" }}>Delete Question</h2>
            {/* delete fields */}
            <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontWeight: "500", color: "#444" }}>Topic</label>
              <input
                type="text"
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                placeholder="Topic"
                required
                style={{
                  padding: "0.5rem",
                  borderRadius: "4px",
                  border: "1px solid #ccc"
                }}
              />
            </div>
            <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontWeight: "500", color: "#444" }}>Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                required
                style={{
                  padding: "0.5rem",
                  borderRadius: "4px",
                  border: "1px solid #ccc"
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                padding: "0.75rem 1.5rem",
                backgroundColor: "#f44336",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              Delete
            </button>
          </form>
        )}
        {action === "update" && (
          <form onSubmit={handleUpdate} style={formContainerStyle}>
            <h2 style={{ fontWeight: "bold", color: "#333" }}>Update Question</h2>
            {/* update fields */}
            {[
              { label: "Topic", name: "topic", type: "text" },
              { label: "Title", name: "title", type: "text" },
              {
                label: "Difficulty",
                name: "difficulty",
                type: "select",
                options: ["Easy", "Medium", "Hard"]
              },
              { label: "Revision Count", name: "revision", type: "number" },
              { label: "LeetCode/Resource Link", name: "link", type: "text" },
              {
                label: "Problem Statement",
                name: "problemStatement",
                type: "textarea",
                rows: 4
              },
              {
                label: "Sample Input",
                name: "sampleInput",
                type: "textarea",
                rows: 3
              },
              {
                label: "Sample Output",
                name: "sampleOutput",
                type: "textarea",
                rows: 3
              },
              {
                label: "Constraints",
                name: "constraints",
                type: "textarea",
                rows: 3
              }
            ].map((field, index) => (
              <div key={index} className="form-group" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <label style={{ fontWeight: "500", color: "#444" }}>{field.label}</label>
                {field.type === "select" ? (
                  <select
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    style={{
                      padding: "0.5rem",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                      outline: "none"
                    }}
                  >
                    {field.options.map((opt, i) => (
                      <option key={i} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : field.type === "textarea" ? (
                  <textarea
                    name={field.name}
                    rows={field.rows}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required={field.name === "title"}
                    style={{
                      padding: "0.5rem",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                      resize: "vertical"
                    }}
                  />
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required={field.name === "title"}
                    style={{
                      padding: "0.5rem",
                      borderRadius: "4px",
                      border: "1px solid #ccc"
                    }}
                  />
                )}
              </div>
            ))}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <input
                type="checkbox"
                name="important"
                checked={formData.important}
                onChange={handleChange}
              />
              <label style={{ fontWeight: "500", color: "#444" }}>Mark as Important</label>
            </div>
            <button
              type="submit"
              style={{
                padding: "0.75rem 1.5rem",
                backgroundColor: "#2196F3",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              Update
            </button>
          </form>
        )}
        {action === "users" && (
          <div style={{ padding: "2rem", backgroundColor: "#f9f9f9", borderRadius: "8px" }}>
            <h2 style={{ fontWeight: "bold", color: "#000" }}>User Statistics</h2>
            <div style={{ marginBottom: "1rem", color: "#000" }}>
              <strong style={{ color: "#000" }}>Total Users:</strong> {userStats.totalUsers}
            </div>
            <div style={{ marginBottom: "1rem", color: "#000" }}>
              <strong style={{ color: "#000" }}>Google Login Users:</strong> {userStats.googleUsers}
            </div>
            <div style={{ marginBottom: "1rem", color: "#000" }}>
              <strong style={{ color: "#000" }}>Signed-In Users:</strong> {userStats.signedInUsers}
            </div>
            <div>
              <h3 style={{ color: "#000" }}>User List:</h3>
              <ul>
                {userStats.userNames.map((name, index) => (
                  <li key={index} style={{ color: "#000" }}>{name}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;