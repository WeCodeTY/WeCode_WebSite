import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateQuestion = ({ formData = {}, setFormData }) => {
  const [updatedData, setUpdatedData] = useState(formData);

  // Update state whenever formData changes
  useEffect(() => {
    if (formData) {
      setUpdatedData(formData); // Populate fields with initial data when formData changes
    }
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({
      ...updatedData,
      [name]: value
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // Make PUT request to update the question
      await axios.put(process.env.REACT_APP_ADMIN_QUESTION_UPDATE, updatedData, { withCredentials: true });
      alert('Question updated successfully!');
      // Reset the form data after successful update
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

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Update Question</h2>
      <form onSubmit={handleUpdate} style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Topic</label>
          <input
            type="text"
            name="topic"
            value={updatedData.topic || ''}
            onChange={handleChange}
            placeholder="Topic"
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Title</label>
          <input
            type="text"
            name="title"
            value={updatedData.title || ''}
            onChange={handleChange}
            placeholder="Title"
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Difficulty</label>
          <select
            name="difficulty"
            value={updatedData.difficulty || 'Easy'}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Link</label>
          <input
            type="text"
            name="link"
            value={updatedData.link || ''}
            onChange={handleChange}
            placeholder="LeetCode/Resource Link"
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Problem Statement</label>
          <textarea
            name="problemStatement"
            value={updatedData.problemStatement || ''}
            onChange={handleChange}
            placeholder="Problem Statement"
            style={styles.textarea}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Sample Input</label>
          <textarea
            name="sampleInput"
            value={updatedData.sampleInput || ''}
            onChange={handleChange}
            placeholder="Sample Input"
            style={styles.textarea}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Sample Output</label>
          <textarea
            name="sampleOutput"
            value={updatedData.sampleOutput || ''}
            onChange={handleChange}
            placeholder="Sample Output"
            style={styles.textarea}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Constraints</label>
          <textarea
            name="constraints"
            value={updatedData.constraints || ''}
            onChange={handleChange}
            placeholder="Constraints"
            style={styles.textarea}
            required
          />
        </div>
        <button type="submit" style={styles.submitButton}>Update Question</button>
      </form>
    </div>
  );
};

// Styles to match your color palette
const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#ECEFCA',  // Light background color
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '900px',
    margin: 'auto',
  },
  title: {
    fontSize: '2rem',
    color: '#213448',  // Primary color
    textAlign: 'center',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  label: {
    fontSize: '1rem',
    marginBottom: '8px',
    color: '#213448',  // Primary color for labels
  },
  input: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #547792',  // Secondary color for borders
    width: '100%',
    backgroundColor: '#f4f7f6',  // Light input background
    color: '#213448',  // Primary color for text
  },
  textarea: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #547792',  // Secondary color for borders
    width: '100%',
    minHeight: '120px',
    backgroundColor: '#f4f7f6',  // Light textarea background
    color: '#213448',  // Primary color for text
  },
  submitButton: {
    padding: '12px 20px',
    backgroundColor: '#547792',  // Secondary color for button background
    color: '#ECEFCA',  // Light text color
    fontSize: '1rem',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default UpdateQuestion;