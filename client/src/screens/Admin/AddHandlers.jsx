import React, { useState } from 'react';
import axios from 'axios';

const AddHandlers = () => {
  // Define the state for form data
  const [title, setTitle] = useState('');
  const [javascript, setJavascript] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handler function for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous messages
    setError('');
    setSuccess('');

    try {
      // Post the handler data to the backend
      const response = await axios.post(
        process.env.REACT_APP_QUESTION_HANDLER,
        {
          title,
          javascript,
        },
        { withCredentials: true }
      );
      setSuccess('Problem handlers saved successfully!');
    } catch (err) {
      setError('Failed to save problem handlers.');
    }
  };

  return (
    <div>
      <h1>Add Problem Handlers</h1>
      
      {success && <p style={{ color: 'green' }}>{success}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label>JavaScript Handler:</label>
          <textarea
            value={javascript}
            onChange={(e) => setJavascript(e.target.value)}
          />
        </div>


        <button type="submit">Save Handlers</button>
      </form>
    </div>
  );
};

export default AddHandlers;