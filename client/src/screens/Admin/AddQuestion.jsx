import React, { useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';

const AddQuestion = () => {
  const [formData, setFormData] = useState({
    topic: '',
    title: '',
    difficulty: 'Easy',
    link: '',
    problemStatement: '',
    sampleInput: '',
    sampleOutput: '',
    constraints: ''
  });

  const [excelProblems, setExcelProblems] = useState([]);
  const [uploadingExcel, setUploadingExcel] = useState(false);

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
      await axios.post(process.env.REACT_APP_Admin_questions_add, {
        topic: formData.topic,
        title: formData.title,
        difficulty: formData.difficulty,
        link: formData.link,
        problemStatement: formData.problemStatement,
        sampleInput: formData.sampleInput,
        sampleOutput: formData.sampleOutput,
        constraints: formData.constraints,
      }, { withCredentials: true });
      alert('Question added successfully!');
      setFormData({
        topic: '',
        title: '',
        difficulty: 'Easy',
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
      for (let problem of excelProblems) {
        await axios.post(process.env.REACT_APP_Admin_questions_add, {
          topic: problem.topic,
          title: problem.title,
          difficulty: problem.difficulty,
          link: problem.link,
          problemStatement: problem.problemStatement,
          sampleInput: problem.sampleInput,
          sampleOutput: problem.sampleOutput,
          constraints: problem.constraints
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

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Add Question</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Topic</label>
          <input
            type="text"
            name="topic"
            value={formData.topic}
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
            value={formData.title}
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
            value={formData.difficulty}
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
            value={formData.link}
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
            value={formData.problemStatement}
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
            value={formData.sampleInput}
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
            value={formData.sampleOutput}
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
            value={formData.constraints}
            onChange={handleChange}
            placeholder="Constraints"
            style={styles.textarea}
            required
          />
        </div>
        <div style={styles.checkboxGroup}>
          <label style={styles.checkboxLabel}>Mark as Important</label>
          <input
            type="checkbox"
            name="important"
            checked={formData.important}
            onChange={handleChange}
            style={styles.checkbox}
          />
        </div>
        <button type="submit" style={styles.submitButton}>Add Question</button>
      </form>

      <div style={styles.uploadSection}>
        <h2 style={styles.uploadTitle}>Upload Problems via Excel</h2>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleExcelFileUpload}
          style={styles.fileInput}
        />
        {excelProblems.length > 0 && (
          <div style={styles.uploadDetails}>
            <p style={styles.uploadText}>Problems Ready: {excelProblems.length}</p>
            <button
              onClick={uploadExcelProblems}
              disabled={uploadingExcel}
              style={styles.uploadButton}
            >
              {uploadingExcel ? 'Uploading...' : 'Upload All Problems'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// UI styles to match color palette
const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#ECEFCA',  // Background color to match your project's palette
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
    color: '#213448',  // Primary color
  },
  input: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #547792',  // Secondary color for borders
    width: '100%',
    backgroundColor: '#f4f7f6',  // Light background color for inputs
    color: '#213448',  // Primary color for text
  },
  textarea: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #547792',  // Secondary color for borders
    width: '100%',
    minHeight: '120px',
    backgroundColor: '#f4f7f6',  // Light background color for textareas
    color: '#213448',  // Primary color for text
  },
  checkboxGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  checkboxLabel: {
    fontSize: '1rem',
    color: '#213448',  // Primary color
  },
  checkbox: {
    width: '20px',
    height: '20px',
  },
  submitButton: {
    padding: '12px 20px',
    backgroundColor: '#547792',  // Secondary color for button background
    color: '#ECEFCA',  // Background color for text
    fontSize: '1rem',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  uploadSection: {
    marginTop: '40px',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  uploadTitle: {
    fontSize: '1.5rem',
    color: '#213448',  // Primary color
    marginBottom: '15px',
  },
  fileInput: {
    padding: '8px',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #547792',  // Secondary color for borders
  },
  uploadDetails: {
    marginTop: '10px',
  },
  uploadText: {
    fontSize: '1rem',
    color: '#213448',  // Primary color
    marginBottom: '10px',
  },
  uploadButton: {
    padding: '10px 15px',
    backgroundColor: '#28a745',  // Green button for uploading
    color: '#fff',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default AddQuestion;