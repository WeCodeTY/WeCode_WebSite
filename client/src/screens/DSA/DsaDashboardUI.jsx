import React from 'react';

const DsaDashboardUI = ({
  showmenu, handleToggleMenu, handleLogoutClick, handleNavigateToDashboard,
  quote, buttonRef, handleSortByClick, showTopics, dropdownRef, topics,
  handleTopicChange, filteredData, sortedQuestions, topic, handleUpdateQuestion,
  handleSolvequestion, handleJoinQuestionRoom, handleCreateRoom, handleJoinRoom,
}) => {
  // Compressed professional styles using the specified color palette
  const styles = {
    dashboard: { maxWidth: "1400px", margin: "0 auto", padding: "20px", fontFamily: "Arial, sans-serif" },
    navbar: { display: "flex", justifyContent: "flex-end", gap: "10px", padding: "15px 20px", backgroundColor: "#213448", borderRadius: "8px", marginBottom: "20px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" },
    navButton: { backgroundColor: "#547792", color: "#fff", border: "none", borderRadius: "5px", padding: "8px 16px", cursor: "pointer", fontWeight: "600", transition: "all 0.2s ease" },
    quoteSection: { backgroundColor: "#ECEFCA", padding: "30px", borderRadius: "8px", textAlign: "center", marginBottom: "25px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" },
    quoteText: { fontSize: "20px", color: "#213448", fontWeight: "600", lineHeight: "1.5", margin: 0, fontStyle: "italic" },
    controls: { position: "relative", marginBottom: "25px", display: "flex", alignItems: "center", gap: "15px" },
    sortButton: { backgroundColor: "#213448", color: "#fff", border: "none", borderRadius: "5px", padding: "10px 20px", cursor: "pointer", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px" },
    topicsDropdown: { position: "absolute", top: "100%", left: "0", backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 4px 20px rgba(0,0,0,0.15)", padding: "10px", zIndex: 10, minWidth: "200px", marginTop: "5px", border: "1px solid #94B4C1" },
    topicItem: { display: "flex", alignItems: "center", padding: "8px 10px", cursor: "pointer", borderRadius: "4px", transition: "background-color 0.2s ease" },
    topicRadio: { marginRight: "10px", accentColor: "#547792" },
    topicLabel: { color: "#213448", fontWeight: "500" },
    tableSection: { backgroundColor: "#fff", borderRadius: "8px", padding: "20px", boxShadow: "0 4px 15px rgba(0,0,0,0.08)", marginBottom: "25px", border: "1px solid #ECEFCA" },
    table: { width: "100%", borderCollapse: "collapse", borderRadius: "8px", overflow: "hidden" },
    tableHeader: { backgroundColor: "#213448", color: "#fff", textAlign: "left" },
    tableHeaderCell: { padding: "12px 16px", fontWeight: "600" },
    tableRow: (index) => ({ backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff", transition: "background-color 0.2s ease" }),
    tableCell: { padding: "12px 16px", borderBottom: "1px solid #ECEFCA", color: "#213448" },
    textInput: { width: "100%", padding: "8px 10px", border: "1px solid #94B4C1", borderRadius: "5px", color: "#213448", backgroundColor: "#fff" },
    actionCell: { display: "flex", gap: "8px" },
    actionButton: { backgroundColor: "#547792", color: "#fff", border: "none", borderRadius: "5px", padding: "6px 12px", cursor: "pointer", fontWeight: "600", fontSize: "13px" },
    roomActions: { display: "flex", justifyContent: "flex-end", gap: "15px" },
    roomButton: { backgroundColor: "#94B4C1", color: "#fff", border: "none", borderRadius: "5px", padding: "10px 25px", cursor: "pointer", fontWeight: "600", transition: "all 0.2s ease" },
    difficultyBadge: (level) => {
      const colors = { Easy: "#4CAF50", Medium: "#FF9800", Hard: "#F44336" };
      return { padding: "4px 10px", borderRadius: "20px", backgroundColor: colors[level] || "#94B4C1", color: "#fff", display: "inline-block", fontSize: "12px", fontWeight: "600" };
    },
    tableTitle: { color: "#213448", fontSize: "18px", fontWeight: "700", marginBottom: "15px", display: "flex", justifyContent: "space-between", alignItems: "center" },
    tableCount: { color: "#547792", fontSize: "14px", fontWeight: "normal" }
  };

  return (
    <div style={styles.dashboard}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <button onClick={handleToggleMenu} style={styles.navButton}>{showmenu ? 'Hide Menu' : 'Show Menu'}</button>
        <button onClick={handleNavigateToDashboard} style={{...styles.navButton, backgroundColor: "#94B4C1"}} onMouseOver={e => e.target.style.backgroundColor = "#a9c5d0"} onMouseOut={e => e.target.style.backgroundColor = "#94B4C1"}>Dashboard</button>
        <button onClick={handleLogoutClick} style={{...styles.navButton, backgroundColor: "#213448"}} onMouseOver={e => e.target.style.backgroundColor = "#2a4057"} onMouseOut={e => e.target.style.backgroundColor = "#213448"}>Logout</button>
      </nav>

      {/* Quote Section */}
      <section style={styles.quoteSection}>
        <p style={styles.quoteText}>{quote}</p>
      </section>

      {/* Controls Section */}
      <section style={styles.controls}>
        <button ref={buttonRef} onClick={handleSortByClick} style={styles.sortButton}>
          Sort By Topic
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 4L6 8L10 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        {showTopics && (
          <div ref={dropdownRef} style={styles.topicsDropdown}>
            {topics.map((topicItem) => (
              <div key={topicItem} 
                style={styles.topicItem} 
                onClick={() => handleTopicChange(topicItem)}
                onMouseOver={e => e.currentTarget.style.backgroundColor = "#ECEFCA"}
                onMouseOut={e => e.currentTarget.style.backgroundColor = "transparent"}>
                <input
                  type="radio"
                  id={topicItem}
                  name="topic"
                  value={topicItem}
                  checked={topic === topicItem}
                  onChange={() => {}}
                  style={styles.topicRadio}
                />
                <label htmlFor={topicItem} style={styles.topicLabel}>{topicItem}</label>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Table Section */}
      <section style={styles.tableSection}>
        <div style={styles.tableTitle}>
          <span>DSA Questions {topic && `- ${topic}`}</span>
          <span style={styles.tableCount}>
            {(filteredData.length > 0 ? filteredData : sortedQuestions).length} questions
          </span>
        </div>
        
        <div style={{ overflowX: "auto" }}>
          <table style={styles.table}>
            <thead style={styles.tableHeader}>
              <tr>
                <th style={styles.tableHeaderCell}>ID</th>
                <th style={styles.tableHeaderCell}>Question</th>
                <th style={styles.tableHeaderCell}>Difficulty</th>
                <th style={styles.tableHeaderCell}>Topic</th>
                <th style={styles.tableHeaderCell}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {(filteredData.length > 0 ? filteredData : sortedQuestions).map((question, index) => (
                <tr key={question.id} style={styles.tableRow(index)}
                  onMouseOver={e => e.currentTarget.style.backgroundColor = "#ECEFCA"}
                  onMouseOut={e => e.currentTarget.style.backgroundColor = index % 2 === 0 ? "#f9f9f9" : "#fff"}>
                  <td style={styles.tableCell}>{question.id}</td>
                  <td style={styles.tableCell}>
                    <input
                      type="text"
                      value={question.text}
                      onChange={(e) => handleUpdateQuestion(question.id, e.target.value)}
                      style={styles.textInput}
                    />
                  </td>
                  <td style={styles.tableCell}>
                    <div style={styles.difficultyBadge(question.difficulty)}>{question.difficulty}</div>
                  </td>
                  <td style={styles.tableCell}>{question.topic}</td>
                  <td style={styles.tableCell}>
                    <div style={styles.actionCell}>
                      <button style={styles.actionButton} onClick={() => handleSolvequestion(question.id)}
                        onMouseOver={e => e.target.style.backgroundColor = "#6089a6"}
                        onMouseOut={e => e.target.style.backgroundColor = "#547792"}>
                        Solve
                      </button>
                      <button style={styles.actionButton} onClick={() => handleJoinQuestionRoom(question.id)}
                        onMouseOver={e => e.target.style.backgroundColor = "#6089a6"}
                        onMouseOut={e => e.target.style.backgroundColor = "#547792"}>
                        Join
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Room Actions */}
      <section style={styles.roomActions}>
        <button style={styles.roomButton} onClick={handleCreateRoom}
          onMouseOver={e => e.target.style.backgroundColor = "#a9c5d0"}
          onMouseOut={e => e.target.style.backgroundColor = "#94B4C1"}>
          Create Room
        </button>
        <button style={styles.roomButton} onClick={handleJoinRoom}
          onMouseOver={e => e.target.style.backgroundColor = "#a9c5d0"}
          onMouseOut={e => e.target.style.backgroundColor = "#94B4C1"}>
          Join Room
        </button>
      </section>
    </div>
  );
};

export default DsaDashboardUI;