import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Users = () => {
  const [userStats, setUserStats] = useState({
    totalUsers: 0,
    googleUsers: 0,
    signedInUsers: 0,
    userNames: []
  });
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    } catch (err) {
      console.error('Error fetching user data:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserStats();
  }, []);

  // Delete a single user by name
  const handleDeleteUser = async (userName) => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_DELETE_USER, 
        { name: userName },
        { withCredentials: true }
      );
      if (response.status === 200) {
        alert(`${userName} has been deleted.`);
        fetchUserStats(); // Refresh user stats after deletion
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>User Stats</h2>
      {loading ? (
        <div style={styles.loading}>
          <div className="spinner" style={styles.spinner}></div>
          <p>Loading user stats...</p>
        </div>
      ) : (
        <div style={styles.statsContainer}>
          <div style={styles.statsCard}>
            <h3>Total Users</h3>
            <p>{userStats.totalUsers}</p>
          </div>
          <div style={styles.statsCard}>
            <h3>Google Users</h3>
            <p>{userStats.googleUsers}</p>
          </div>
          <div style={styles.statsCard}>
            <h3>Signed-In Users</h3>
            <p>{userStats.signedInUsers}</p>
          </div>
        </div>
      )}

      <div style={styles.userList}>
        <h3 style={styles.userListTitle}>User Names:</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>User Name</th>
              <th style={styles.tableHeader}>Status</th>
              <th style={styles.tableHeader}>Action</th>
            </tr>
          </thead>
          <tbody>
            {userStats.userNames.map((name, index) => (
              <tr
                key={index}
                style={styles.tableRow}
                className="user-table-row"
              >
                <td style={styles.tableData}>{name}</td>
                <td style={styles.tableData}>Active</td>
                <td style={styles.tableData}>
                  <button
                    onClick={() => handleDeleteUser(name)}
                    style={styles.deleteButton}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Styling to improve the UI
const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#ECEFCA',  // Background color to match your project palette
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
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  spinner: {
    border: '4px solid #f3f3f3',  // Light gray border
    borderTop: '4px solid #547792',  // Secondary color for spinner
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    animation: 'spin 2s linear infinite',
  },
  statsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
    marginBottom: '20px',
  },
  statsCard: {
    backgroundColor: '#213448',
    color: '#ECEFCA',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    flex: '1',
    margin: '5px',
  },
  userList: {
    marginTop: '30px',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  userListTitle: {
    fontSize: '1.5rem',
    color: '#213448',  // Primary color
    marginBottom: '15px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  tableHeader: {
    backgroundColor: '#547792',
    color: '#fff',
    padding: '12px',
    textAlign: 'left',
  },
  tableRow: {
    backgroundColor: '#fff',
    borderBottom: '1px solid #ddd',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  tableData: {
    padding: '12px',
    textAlign: 'left',
    color: '#213448',
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
};

export default Users;
