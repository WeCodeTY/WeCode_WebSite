import React, { useState } from 'react';
import axios from 'axios';

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

  return (
    <div className="admin-dashboard-container" style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem", fontSize: "2rem", fontWeight: "bold", color: "#333" }}>
        Add DSA Question
      </h1>
      <form
        onSubmit={handleSubmit}
        className="question-form"
        style={{
          backgroundColor: "#fff",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem"
        }}
      >
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
    </div>
  );
};

export default AdminDashboard;