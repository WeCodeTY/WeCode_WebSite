import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import * as XLSX from 'xlsx';
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
  const [excelProblems, setExcelProblems] = useState([]);
const [uploadingExcel, setUploadingExcel] = useState(false);

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

  // Excel Question upload
  const handleExcelFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      setExcelProblems(jsonData);
    };
    reader.readAsArrayBuffer(file);
  };
  const uploadExcelProblems = async () => {
    if (excelProblems.length === 0) {
      alert('Please upload an Excel file first!');
      return;
    }
  
    setUploadingExcel(true);
  
    try {
      // Make the request with credentials (cookies)
      for (let problem of excelProblems) {
        
        await axios.post(process.env.REACT_APP_Admin_questions_add, {
          topic: problem.topic,
          title: problem.title,
          difficulty: problem.difficulty,
          link: problem.link,                        
          problemStatement: problem.problemStatement, 
          sampleInput: problem.sampleInput,           
          sampleOutput: problem.sampleOutput,         
          constraints: problem.constraints,           
        }, { withCredentials: true });
      }
      alert('All Excel problems uploaded successfully!');
    } catch (error) {
      console.error('Error uploading Excel problems:', error.response || error);
      alert('Error uploading some problems.');
    } finally {
      setUploadingExcel(false);
    }
  };

  // Manual Question add

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

  const COLORS = {
    primary: "#213448",
    secondary: "#547792",
    accent: "#94B4C1",
    background: "#ECEFCA"
  };
  const formContainerStyle = {
    backgroundColor: COLORS.secondary,
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
    marginBottom: "2rem",
    color: COLORS.background,
    transition: "all 0.3s ease",
    transform: "scale(1)"
    // Note: ':hover' pseudo is not supported in inline styles, handled below
  };

  // Sidebar Button hover/transition helpers
  const sidebarButtonBaseStyle = {
    display: "block",
    width: "100%",
    marginBottom: "1rem",
    padding: "0.75rem",
    borderRadius: "6px",
    border: "none",
    backgroundColor: COLORS.secondary,
    color: COLORS.background,
    cursor: "pointer",
    textTransform: "capitalize",
    transition: "all 0.3s ease-in-out"
  };

  // Animated form container wrapper
  const AnimatedFormContainer = ({ children }) => {
    // Use React state for hover scale effect
    const [hovered, setHovered] = useState(false);
    return (
      <div
        style={{
          ...formContainerStyle,
          transform: hovered ? "scale(1.01)" : "scale(1)"
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {children}
      </div>
    );
  };
  

  // Sidebar modularization
  const Sidebar = () => {
    // Track hover for each button
    const [hoveredBtn, setHoveredBtn] = useState(null);
    return (
      <div style={{
        width: "220px",
        backgroundColor: COLORS.primary,
        padding: "1.5rem",
        borderRight: `1px solid ${COLORS.accent}`,
        display: "flex",
        flexDirection: "column"
      }}>
        <h3 style={{ marginBottom: "2rem", fontWeight: "bold", color: COLORS.accent }}>Admin Panel</h3>
        {["add", "delete", "update", "users"].map((type) => (
          <button
            key={type}
            onClick={() => setAction(type)}
            style={{
              ...sidebarButtonBaseStyle,
              fontWeight: action === type ? "bold" : "normal",
              outline: action === type ? `2px solid ${COLORS.accent}` : "none",
              boxShadow: action === type ? `0 0 0 2px ${COLORS.accent}33` : "none",
              backgroundColor:
                hoveredBtn === type
                  ? COLORS.accent
                  : COLORS.secondary,
              color:
                hoveredBtn === type
                  ? COLORS.primary
                  : COLORS.background
            }}
            onMouseEnter={() => setHoveredBtn(type)}
            onMouseLeave={() => setHoveredBtn(null)}
          >
            {type === "users" ? "Users" : `${type} Question`}
          </button>
        ))}
        {/* Analytics Section */}
        <div style={{
          marginTop: "2rem",
          backgroundColor: COLORS.secondary,
          color: COLORS.background,
          padding: "1.25rem",
          borderRadius: "8px",
          border: `1px solid ${COLORS.accent}`
        }}>
          <h2 style={{ fontWeight: "bold", marginBottom: "1rem", color: COLORS.background }}>Analytics</h2>
          <Pie data={chartData} />
        </div>
      </div>
    );
  };
  

  // Main content modularization
  const MainContent = () => (
    <div
      style={{
        flexGrow: 1,
        padding: "2rem",
        overflowY: "auto",
        scrollBehavior: "smooth",
        backgroundColor: COLORS.primary,
        minHeight: "100vh",
        maxHeight: "100vh"
      }}
    >
      <div style={{
        marginBottom: "2rem",
        backgroundColor: COLORS.secondary,
        padding: "1.25rem",
        borderRadius: "8px",
        border: `1px solid ${COLORS.accent}`
      }}>
        <h2 style={{ fontWeight: "bold", marginBottom: "1rem", color: COLORS.background }}>All Questions</h2>
        <ul style={{ maxHeight: "180px", overflowY: "auto", paddingLeft: "1rem" }}>
          {questionsList.map((q, index) => (
            <li key={index} style={{ marginBottom: "0.5rem", color: COLORS.background }}>
              <strong>{q.topic}</strong> - {q.title}
            </li>
          ))}
        </ul>
      </div>
      {action === "add" && (
        <AnimatedFormContainer>
          <form onSubmit={handleSubmit}>
            <h2 style={{ fontWeight: "bold", color: COLORS.background }}>Add Question</h2>
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
                <label style={{ fontWeight: "500", color: COLORS.accent }}>{field.label}</label>
                {field.type === "select" ? (
                  <select
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    style={{
                      padding: "0.5rem",
                      borderRadius: "4px",
                      border: `1px solid ${COLORS.accent}`,
                      outline: "none",
                      backgroundColor: COLORS.primary,
                      color: COLORS.background
                    }}
                  >
                    {field.options.map((opt, i) => (
                      <option key={i} value={opt} style={{ color: COLORS.primary }}>
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
                      border: `1px solid ${COLORS.accent}`,
                      resize: "vertical",
                      backgroundColor: COLORS.primary,
                      color: COLORS.background
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
                      border: `1px solid ${COLORS.accent}`,
                      backgroundColor: COLORS.primary,
                      color: COLORS.background
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
              <label style={{ fontWeight: "500", color: COLORS.accent }}>Mark as Important</label>
            </div>
            <button
              type="submit"
              className="submit-button"
              style={{
                padding: "0.75rem 1.5rem",
                backgroundColor: COLORS.accent,
                color: COLORS.primary,
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold",
                transition: "all 0.3s ease-in-out"
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = COLORS.primary}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = COLORS.accent}
            >
              Add Question
            </button>
          </form>
        </AnimatedFormContainer>
      )}
      {action === "delete" && (
        <AnimatedFormContainer>
          <form onSubmit={handleDelete}>
            <h2 style={{ fontWeight: "bold", color: COLORS.background }}>Delete Question</h2>
            {/* delete fields */}
            <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontWeight: "500", color: COLORS.accent }}>Topic</label>
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
                  border: `1px solid ${COLORS.accent}`,
                  backgroundColor: COLORS.primary,
                  color: COLORS.background
                }}
              />
            </div>
            <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontWeight: "500", color: COLORS.accent }}>Title</label>
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
                  border: `1px solid ${COLORS.accent}`,
                  backgroundColor: COLORS.primary,
                  color: COLORS.background
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                padding: "0.75rem 1.5rem",
                backgroundColor: "#f44336",
                color: COLORS.background,
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold",
                transition: "all 0.3s ease-in-out"
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = "#b71c1c"}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = "#f44336"}
            >
              Delete
            </button>
          </form>
        </AnimatedFormContainer>
      )}
      {action === "update" && (
        <AnimatedFormContainer>
          <form onSubmit={handleUpdate}>
            <h2 style={{ fontWeight: "bold", color: COLORS.background }}>Update Question</h2>
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
                <label style={{ fontWeight: "500", color: COLORS.accent }}>{field.label}</label>
                {field.type === "select" ? (
                  <select
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    style={{
                      padding: "0.5rem",
                      borderRadius: "4px",
                      border: `1px solid ${COLORS.accent}`,
                      outline: "none",
                      backgroundColor: COLORS.primary,
                      color: COLORS.background
                    }}
                  >
                    {field.options.map((opt, i) => (
                      <option key={i} value={opt} style={{ color: COLORS.primary }}>
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
                      border: `1px solid ${COLORS.accent}`,
                      resize: "vertical",
                      backgroundColor: COLORS.primary,
                      color: COLORS.background
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
                      border: `1px solid ${COLORS.accent}`,
                      backgroundColor: COLORS.primary,
                      color: COLORS.background
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
              <label style={{ fontWeight: "500", color: COLORS.accent }}>Mark as Important</label>
            </div>
            <button
              type="submit"
              style={{
                padding: "0.75rem 1.5rem",
                backgroundColor: COLORS.accent,
                color: COLORS.primary,
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold",
                transition: "all 0.3s ease-in-out"
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = COLORS.primary}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = COLORS.accent}
            >
              Update
            </button>
          </form>
        </AnimatedFormContainer>
      )}
      {action === "users" && (
        <AnimatedFormContainer>
          <div>
            <h2 style={{ fontWeight: "bold", color: COLORS.background }}>User Statistics</h2>
            <div style={{ marginBottom: "1rem", color: COLORS.background }}>
              <strong style={{ color: COLORS.accent }}>Total Users:</strong> {userStats.totalUsers}
            </div>
            <div style={{ marginBottom: "1rem", color: COLORS.background }}>
              <strong style={{ color: COLORS.accent }}>Google Login Users:</strong> {userStats.googleUsers}
            </div>
            <div style={{ marginBottom: "1rem", color: COLORS.background }}>
              <strong style={{ color: COLORS.accent }}>Signed-In Users:</strong> {userStats.signedInUsers}
            </div>
            <div>
              <h3 style={{ color: COLORS.accent }}>User List:</h3>
              <ul>
                {userStats.userNames.map((name, index) => (
                  <li key={index} style={{ color: COLORS.background }}>{name}</li>
                ))}
              </ul>
            </div>
          </div>
        </AnimatedFormContainer>
      )}
      <div className="mt-8">
  <h2 className="text-xl font-bold mb-4">Upload Problems via Excel</h2>
  <input
    type="file"
    accept=".xlsx, .xls"
    onChange={handleExcelFileUpload}
    className="mb-4"
  />
  {excelProblems.length > 0 && (
    <div className="mb-4">
      <p className="mb-2">Problems Ready: {excelProblems.length}</p>
      <button
        onClick={uploadExcelProblems}
        disabled={uploadingExcel}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        {uploadingExcel ? 'Uploading...' : 'Upload All Problems'}
      </button>
    </div>
  )}
</div>
    </div>

  );

  // Main layout with Sidebar and MainContent as fragments
  return (
    <div style={{ display: "flex", height: "100vh", backgroundColor: COLORS.background }}>
      <Sidebar />
      <MainContent />
    </div>
  );
};

export default AdminDashboard;