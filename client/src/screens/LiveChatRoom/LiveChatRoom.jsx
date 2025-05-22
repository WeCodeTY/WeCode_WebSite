import React, { useState, useEffect } from "react";
import axios from "axios";
import socket from "../../sockets/socket";
import { useParams } from "react-router-dom";
import Layout from "../../Layout1/Layout";
import { MessageCircle, Send, Users } from "lucide-react"; // Using lucide icons for professional look

// Compressed helper functions
const capitalize = word => word.charAt(0).toUpperCase() + word.slice(1);
const fetchRandomName = async () => {
  try {
    const response = await axios.get("https://random-word-api.herokuapp.com/word?number=2");
    return `${capitalize(response.data[0])}${capitalize(response.data[1])}${Math.floor(Math.random() * 1000)}`;
  } catch (error) { console.error("Error fetching random name:", error); return `Guest${Math.floor(Math.random() * 1000)}`; }
};

function ChatRoom() {
  const { publicroomID } = useParams();
  const [message, setMessage] = useState(""); 
  const [messages, setMessages] = useState([]);
  const [userName, setUserName] = useState(""); 
  const [participants, setParticipants] = useState(1); // Track number of participants

  useEffect(() => {
    const assignNameAndJoin = async () => {
      const newUserName = await fetchRandomName(); setUserName(newUserName);
      socket.emit("join-public-room", publicroomID);
    };

    assignNameAndJoin();

    // Setup socket listeners
    socket.on("receive-message", (data) => {
      setMessages(prev => [...prev, {text: data.text, sender: data.sender, sent: data.sender === userName}]);
    });
    
    socket.on("user-joined", (data) => { setParticipants(data.count || participants + 1); });
    socket.on("user-left", (data) => { setParticipants(data.count || Math.max(1, participants - 1)); });

    return () => {
      socket.off("receive-message"); socket.off("user-joined"); socket.off("user-left");
    };
  }, [publicroomID, participants, userName]);

  const sendMessage = () => {
    const trimmedMessage = message.trim();
    if (trimmedMessage) {
      socket.emit("send-message", { publicroomID, text: trimmedMessage, sender: userName });
      setMessages(prev => [...prev, { text: trimmedMessage, sender: "You", sent: true }]);
      setMessage("");
    }
  };

  return (
    <Layout>
      <div style={styles.container}>
        <header style={styles.header}>
          <div style={styles.headerTitle}>
            <MessageCircle size={24} />
            <span style={{marginLeft: '8px'}}>Professional Chat</span>
          </div>
          <div style={styles.participantsInfo}>
            <Users size={16} />
            <span style={{marginLeft: '4px'}}>{participants}</span>
          </div>
        </header>

        <div style={styles.chatArea} id="chatContainer">
          {messages.map((msg, index) => (
            <div key={index} style={{...styles.message, ...(msg.sender === "You" ? styles.sentMessage : styles.receivedMessage)}}>
              <div style={styles.messageSender}>{msg.sender === "You" ? "You" : msg.sender}</div>
              <div style={styles.messageContent}>{msg.text}</div>
            </div>
          ))}
        </div>

        <footer style={styles.footer}>
          <input type="text" value={message} onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..." style={styles.input}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()} />
          <button onClick={sendMessage} style={styles.sendButton} aria-label="Send message">
            <Send size={18} />
          </button>
        </footer>
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        #chatContainer::-webkit-scrollbar { width: 6px; }
        #chatContainer::-webkit-scrollbar-track { background: #213448; }
        #chatContainer::-webkit-scrollbar-thumb { background-color: #94B4C1; border-radius: 6px; }
        input:focus { background-color: #2d4559 !important; border-color: #94B4C1 !important; outline: none; }
        button:hover { background-color: #4A90E2 !important; }
        button:active { transform: scale(0.95); }
      `}</style>
    </Layout>
  );
}

// Compressed styles with improved professional appearance
const styles = {
  container: {
    maxWidth: "800px", margin: "20px auto", display: "flex", flexDirection: "column", height: "80vh",
    fontFamily: "'Segoe UI', 'Roboto', sans-serif", backgroundColor: "#213448", color: "#ECEFCA",
    borderRadius: "8px", boxShadow: "0 8px 30px rgba(0, 0, 0, 0.3)",
  },
  header: {
    padding: "16px 20px", backgroundColor: "#547792", color: "#ECEFCA", display: "flex",
    justifyContent: "space-between", alignItems: "center", borderTopLeftRadius: "8px", 
    borderTopRightRadius: "8px", borderBottom: "1px solid #94B4C1",
  },
  headerTitle: { display: "flex", alignItems: "center", fontSize: "1.2rem", fontWeight: "600" },
  participantsInfo: { display: "flex", alignItems: "center", backgroundColor: "rgba(33, 52, 72, 0.2)", 
    padding: "4px 10px", borderRadius: "50px", fontSize: "0.9rem" },
  chatArea: {
    flex: "1", padding: "20px", overflowY: "auto", background: "#213448",
    display: "flex", flexDirection: "column", gap: "12px", scrollBehavior: "smooth",
  },
  message: {
    padding: "10px 14px", borderRadius: "6px", maxWidth: "75%", marginBottom: "4px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", animation: "fadeIn 0.3s ease-out",
  },
  messageSender: { fontSize: "0.8rem", marginBottom: "2px", fontWeight: "600", opacity: "0.9" },
  messageContent: { fontSize: "0.95rem", lineHeight: "1.4" },
  receivedMessage: {
    background: "#547792", color: "#ECEFCA", alignSelf: "flex-start",
    borderTopLeftRadius: "0", borderBottomRightRadius: "12px",
  },
  sentMessage: {
    background: "#94B4C1", color: "#213448", alignSelf: "flex-end",
    borderTopRightRadius: "0", borderBottomLeftRadius: "12px",
  },
  footer: {
    padding: "15px 20px", display: "flex", alignItems: "center", gap: "10px",
    backgroundColor: "#2d4559", borderTop: "1px solid #547792",
    borderBottomLeftRadius: "8px", borderBottomRightRadius: "8px",
  },
  input: {
    flex: "1", padding: "12px 16px", borderRadius: "6px", border: "1px solid #547792",
    backgroundColor: "#213448", color: "#ECEFCA", fontSize: "0.95rem",
    transition: "all 0.2s ease", boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
  },
  sendButton: {
    padding: "12px", backgroundColor: "#547792", color: "#ECEFCA", border: "none",
    borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center",
    justifyContent: "center", transition: "all 0.2s ease",
  },
};

export default ChatRoom;