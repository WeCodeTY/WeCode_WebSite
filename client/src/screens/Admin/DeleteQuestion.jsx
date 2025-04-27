import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DeleteQuestion = () => {
  const [formData, setFormData] = useState({
    topic: '',
    title: ''
  });

  const [questionsList, setQuestionsList] = useState([]);
  const [isTableView, setIsTableView] = useState(true); // State to toggle between table view and form view

  // Fetch questions list
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
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!formData.title) {
      alert('Please provide the title of the question to delete');
      return;
    }

    try {
      // Send POST request to delete the question by title (and optionally topic)
      const response = await axios.post(
        process.env.REACT_APP_Admin_question_delete,
        formData,
        { withCredentials: true }
      );

      if (response.status === 200) {
        alert('Question deleted successfully!');
        setFormData({
          topic: '',
          title: ''
        });
        // Refresh the questions list after deletion
        const fetchQuestions = await axios.get(process.env.REACT_APP_GET_ALL_QUESTIONS, { withCredentials: true });
        setQuestionsList(fetchQuestions.data.questions);
      }
    } catch (error) {
      console.error('Error deleting question:', error);
      alert('Failed to delete question.');
    }
  };

  const handleDeleteFromTable = async (question) => {
    try {
      // Send POST request to delete the question by title (and optionally topic)
      const response = await axios.post(
        process.env.REACT_APP_Admin_question_delete,
        { topic: question.topic, title: question.title },
        { withCredentials: true }
      );

      if (response.status === 200) {
        alert('Question deleted successfully!');
        // Remove deleted question from the list
        setQuestionsList(questionsList.filter(q => q.title !== question.title));
      }
    } catch (error) {
      console.error('Error deleting question:', error);
      alert('Failed to delete question.');
    }
  };

  const handleDeleteAll = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete all questions?");
    if (confirmDelete) {
      try {
        await axios.post(process.env.REACT_APP_Admin_question_delete_ALL, { withCredentials: true });
        alert('All questions deleted successfully!');
        setQuestionsList([]); // Clear the list after deletion
      } catch (error) {
        console.error('Error deleting all questions:', error);
        alert('Failed to delete all questions.');
      }
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Delete Question</h2>

      {/* Toggle buttons to switch between form view and table view */}
      <div style={styles.toggleContainer}>
        <button onClick={() => setIsTableView(true)} style={styles.toggleButton}>View Questions</button>
        <button onClick={() => setIsTableView(false)} style={styles.toggleButton}>Delete by Form</button>
      </div>

      {/* Button to delete all questions */}
      <button
        onClick={handleDeleteAll}
        style={styles.deleteAllButton}
      >
        Delete All Questions
      </button>

      {/* Table view for deleting questions */}
      {isTableView ? (
        <div>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Topic</th>
                <th style={styles.tableHeader}>Title</th>
                <th style={styles.tableHeader}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {questionsList.length === 0 ? (
                <tr>
                  <td colSpan="3" style={styles.noQuestions}>No questions available</td>
                </tr>
              ) : (
                questionsList.map((question, index) => (
                  <tr key={index}>
                    <td style={styles.tableCell}>{question.topic}</td>
                    <td style={styles.tableCell}>{question.title}</td>
                    <td style={styles.tableCell}>
                      <button
                        onClick={() => handleDeleteFromTable(question)}
                        style={styles.deleteButton}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : (
        // Form view for deleting a question
        <form onSubmit={handleDelete} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Topic</label>
            <input
              type="text"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              placeholder="Topic"
              style={styles.input}
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
              required
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.submitButton}>Delete Question</button>
        </form>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#ECEFCA',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '900px',
    margin: 'auto',
  },
  title: {
    fontSize: '2rem',
    color: '#213448',
    textAlign: 'center',
    marginBottom: '20px',
  },
  toggleContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  toggleButton: {
    padding: '10px 20px',
    backgroundColor: '#94B4C1',
    color: '#213448',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem',
    margin: '0 10px',
    transition: 'background-color 0.3s',
  },
  deleteAllButton: {
    padding: '10px 20px',
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem',
    marginBottom: '20px',
    float: 'right',  // Place the button on the right
    transition: 'background-color 0.3s',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  tableHeader: {
    backgroundColor: '#547792',
    color: '#ECEFCA',
    padding: '12px',
    textAlign: 'left',
  },
  tableCell: {
    padding: '12px',
    border: '1px solid #ddd',
    textAlign: 'left',
    color: 'black',  // Set text color to black for topic and title
  },
  deleteButton: {
    padding: '8px 16px',
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
  noQuestions: {
    padding: '12px',
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#213448',
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
    color: '#213448',
  },
  input: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #547792',
    width: '100%',
    backgroundColor: '#f4f7f6',
    color: '#213448',
  },
  submitButton: {
    padding: '12px 20px',
    backgroundColor: '#547792',
    color: '#ECEFCA',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default DeleteQuestion;