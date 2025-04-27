import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddQuestion from './AddQuestion';
import UpdateQuestion from './UpdateQuestion';
import Users from './Users';
import DeleteQuestion from './DeleteQuestion';
import AllQuestions from './AllQuestions';  // Import the AllQuestions component

const AdminDashboard = () => {
  const [action, setAction] = useState('add');
  const [questionsList, setQuestionsList] = useState([]);

  // Fetch all questions on component mount
 

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Navbar */}
      <div style={styles.navbar}>
        <h2 style={styles.navbarTitle}>Admin Panel</h2>
      </div>

      {/* Buttons for Add, Delete, Update, Users, All Questions */}
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={() => setAction('add')}>Add Question</button>
        <button style={styles.button} onClick={() => setAction('delete')}>Delete Question</button>
        <button style={styles.button} onClick={() => setAction('update')}>Update Question</button>
        <button style={styles.button} onClick={() => setAction('users')}>Users</button>
        <button style={styles.button} onClick={() => setAction('allQuestions')}>View All Questions</button> {/* New button */}
      </div>

      {/* Main Content Section */}
      <div style={styles.mainContent}>
        {action === 'add' && <AddQuestion />}
        {action === 'delete' && <DeleteQuestion />}
        {action === 'update' && <UpdateQuestion />}
        {action === 'users' && <Users />}
        {action === 'allQuestions' && <AllQuestions questionsList={questionsList} />} {/* Display All Questions */}
      </div>
    </div>
  );
};

// Styles for the navbar, buttons, and main content with updated layout
const styles = {
  navbar: {
    background: 'linear-gradient(135deg, #1E2A3C, #547792)',  // Gradient background for a more dynamic look
    color: '#ECEFCA',  // Navbar text color
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',  // Spaced out elements for a cleaner look
    padding: '20px 30px',  // Increased padding for a more spacious navbar
    position: 'sticky',
    top: '0',
    zIndex: '1000',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',  // Enhanced shadow for a floating effect
  },
  navbarTitle: {
    fontSize: '26px',
    fontWeight: 'bold',
    color: '#ECEFCA',
    textTransform: 'uppercase',  // Added uppercase for a more formal, structured look
    letterSpacing: '1px',  // Increased letter-spacing for better readability
  },
  buttonContainer: {
    display: 'flex',
    flexWrap: 'wrap',  // Allow buttons to wrap for better spacing on smaller screens
    justifyContent: 'center',  // Centering the buttons
    gap: '15px',  // Adjusted the gap between buttons
    padding: '15px',
    backgroundColor: '#213448',
    color: '#ECEFCA',
  },
  button: {
    padding: '12px 25px',  // Increased padding for a bolder button
    backgroundColor: '#94B4C1',  // Accent color for buttons
    color: '#213448',  // Primary color for text
    border: 'none',
    borderRadius: '8px',  // Rounded corners for a softer look
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    minWidth: '150px',  // Ensuring buttons have a consistent size
    textAlign: 'center',  // Centered text in buttons
  },
  buttonHover: {
    backgroundColor: '#547792',  // Slightly darker hover effect for buttons
    transform: 'scale(1.05)',  // Scale up on hover
  },
  mainContent: {
    flexGrow: 1,
    padding: '2rem',
    overflowY: 'auto',
    backgroundColor: '#213448',
    color: '#ECEFCA',
    minHeight: '100vh',
  },
};

export default AdminDashboard;