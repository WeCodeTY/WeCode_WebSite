import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllQuestions = () => {
  const [questionsList, setQuestionsList] = useState([]);

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

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>All Questions</h2>
      {questionsList.length === 0 ? (
        <p style={styles.noQuestions}>No questions added yet.</p>
      ) : (
        <div style={styles.questionsList}>
          {questionsList.map((question, index) => (
            <div key={index} style={styles.questionCard}>
              <strong style={styles.questionTitle}>{question.topic}</strong> - {question.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Styling to match your color palette
const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#ECEFCA',  // Light background color to match your color palette
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '900px',
    margin: 'auto',
    color: '#213448',  // Primary text color
  },
  title: {
    fontSize: '2rem',
    color: '#213448',  // Primary color
    textAlign: 'center',
    marginBottom: '20px',
  },
  noQuestions: {
    fontSize: '1.2rem',
    color: '#213448',
    textAlign: 'center',
    marginTop: '20px',
  },
  questionsList: {
    marginTop: '20px',
  },
  questionCard: {
    backgroundColor: '#213448',
    color: '#ECEFCA',
    padding: '15px',
    borderRadius: '8px',
    margin: '10px 0',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'space-between',
  },
  questionTitle: {
    fontWeight: 'bold',
  },
};

export default AllQuestions;