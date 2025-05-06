import React from 'react';

const DsaDashboardUI = ({
  showmenu,
  handleToggleMenu,
  handleLogoutClick,
  handleNavigateToDashboard,
  quote,
  buttonRef,
  handleSortByClick,
  showTopics,
  dropdownRef,
  topics,
  handleTopicChange,
  tableContainerStyle,
  thStyle,
  filteredData,
  sortedQuestions,
  topic,
  handleUpdateQuestion,
  tdStyle,
  inputStyle,
  handleSolvequestion,
  actionBtnStyle1,
  handleJoinQuestionRoom,
  buttonStyle,
  handleCreateRoom,
  handleJoinRoom,
}) => {
  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <button onClick={handleToggleMenu}>
          {showmenu ? 'Hide Menu' : 'Show Menu'}
        </button>
        <button onClick={handleLogoutClick}>Logout</button>
        <button onClick={handleNavigateToDashboard}>Dashboard</button>
      </nav>
      <section className="quote-section">
        <p>{quote}</p>
      </section>
      <section className="controls">
        <button ref={buttonRef} onClick={handleSortByClick}>
          Sort By
        </button>
        {showTopics && (
          <div ref={dropdownRef} className="topics-dropdown">
            {topics.map((topicItem) => (
              <div key={topicItem}>
                <input
                  type="radio"
                  id={topicItem}
                  name="topic"
                  value={topicItem}
                  checked={topic === topicItem}
                  onChange={handleTopicChange}
                />
                <label htmlFor={topicItem}>{topicItem}</label>
              </div>
            ))}
          </div>
        )}
      </section>
      <section className="table-section" style={tableContainerStyle}>
        <table>
          <thead>
            <tr>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Question</th>
              <th style={thStyle}>Difficulty</th>
              <th style={thStyle}>Topic</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {(filteredData.length > 0 ? filteredData : sortedQuestions).map((question) => (
              <tr key={question.id}>
                <td style={tdStyle}>{question.id}</td>
                <td style={tdStyle}>
                  <input
                    type="text"
                    value={question.text}
                    onChange={(e) => handleUpdateQuestion(question.id, e.target.value)}
                    style={inputStyle}
                  />
                </td>
                <td style={tdStyle}>{question.difficulty}</td>
                <td style={tdStyle}>{question.topic}</td>
                <td style={tdStyle}>
                  <button style={actionBtnStyle1} onClick={() => handleSolvequestion(question.id)}>
                    Solve
                  </button>
                  <button style={actionBtnStyle1} onClick={() => handleJoinQuestionRoom(question.id)}>
                    Join Room
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section className="room-actions">
        <button style={buttonStyle} onClick={handleCreateRoom}>
          Create Room
        </button>
        <button style={buttonStyle} onClick={handleJoinRoom}>
          Join Room
        </button>
      </section>
    </div>
  );
};

export default DsaDashboardUI;
