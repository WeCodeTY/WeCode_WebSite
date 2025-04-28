import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddQuestion from './AddQuestion';
import UpdateQuestion from './UpdateQuestion';
import Users from './Users';
import DeleteQuestion from './DeleteQuestion';
import AllQuestions from './AllQuestions';

const AdminDashboard = () => {
  const [action, setAction] = useState('add');
  const [questionsList, setQuestionsList] = useState([]);

  // Fetch all questions on component mount
 

  const handleLogout = async () => {
    try {
      await axios.post(process.env.REACT_APP_LOGOUT_URI, {}, { withCredentials: true });
      // Redirect to login or homepage after successful logout
      window.location.href = '/login';  // Adjust the redirect path as necessary
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Navbar */}
      <div style={styles.navbar}>
        <h2 style={styles.navbarTitle}>Admin Panel</h2>
        <button onClick={handleLogout} style={styles.logoutButton}>Logout</button> {/* Logout Button */}
      </div>

      {/* Buttons for Add, Delete, Update, Users, All Questions */}
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={() => setAction('add')}>Add Question</button>
        <button style={styles.button} onClick={() => setAction('delete')}>Delete Question</button>
        <button style={styles.button} onClick={() => setAction('update')}>Update Question</button>
        <button style={styles.button} onClick={() => setAction('users')}>Users</button>
        <button style={styles.button} onClick={() => setAction('allQuestions')}>View All Questions</button>
      </div>

      {/* Main Content Section */}
      <div style={styles.mainContent}>
        {action === 'add' && <AddQuestion />}
        {action === 'delete' && <DeleteQuestion />}
        {action === 'update' && <UpdateQuestion />}
        {action === 'users' && <Users />}
        {action === 'allQuestions' && <AllQuestions questionsList={questionsList} />}
      </div>
    </div>
  );
};

// Styles for the navbar, buttons, and main content with updated layout
const styles = {
  navbar: {
    background: 'linear-gradient(135deg, #1E2A3C, #547792)',
    color: '#ECEFCA',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 30px',
    position: 'sticky',
    top: '0',
    zIndex: '1000',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
  },
  navbarTitle: {
    fontSize: '26px',
    fontWeight: 'bold',
    color: '#ECEFCA',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  logoutButton: {
    backgroundColor: '#FF4C4C',
    color: '#ECEFCA',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 15px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    minWidth: '100px',
    textAlign: 'center',
    marginLeft: 'auto',
  },
  buttonContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '15px',
    padding: '15px',
    backgroundColor: '#213448',
    color: '#ECEFCA',
  },
  button: {
    padding: '12px 25px',
    backgroundColor: '#94B4C1',
    color: '#213448',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    minWidth: '150px',
    textAlign: 'center',
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