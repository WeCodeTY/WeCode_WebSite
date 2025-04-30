import React, { useState, useEffect } from "react";
import axios from "axios";
import socket from "../../sockets/socket";
import { useParams } from "react-router-dom";
import Layout from "../../Layout1/Layout";
import Navbar from "../../Layout1/Navbar";

// Function to get a fun random name from API
const fetchRandomName = async () => {
  try {
    const response = await axios.get("https://random-word-api.herokuapp.com/word?number=2");
    const [word1, word2] = response.data;
    return `${capitalize(word1)}${capitalize(word2)}${Math.floor(Math.random() * 1000)}`;
  } catch (error) {
    console.error("Error fetching random name:", error);
    return `Guest${Math.floor(Math.random() * 1000)}`;
  }
};

const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);

// const socket = io(process.env.REACT_APP_SOCKET_URL); // Your socket URL

function ChatRoom() {
  const { publicroomID } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [userName, setUserName] = useState(""); // Dynamic user name

  useEffect(() => {
    const assignNameAndJoin = async () => {
      const newUserName = await fetchRandomName();
      setUserName(newUserName);
      socket.emit("join-public-room", publicroomID);
    };

    assignNameAndJoin();

    socket.on("receive-message", (data) => {
      setMessages((prev) => [
        ...prev,
        {
          text: `${data.sender === "You" ? "You" : data.sender}: ${data.text}`, 
          sender: data.sender,
          sent: false,
        },
      ]);
    });

    return () => {
      socket.off("receive-message");
    };
  }, [publicroomID]);

  const sendMessage = () => {
    const trimmedMessage = message.trim();
    if (trimmedMessage) {
      socket.emit("send-message", { publicroomID, text: trimmedMessage, sender: userName });
      setMessages((prev) => [...prev, { text: `You: ${trimmedMessage}`, sender: "You", sent: true }]);
      setMessage("");
    }
  };

  return (
    <Layout>
      <div style={styles.container}>
        <header style={styles.header}>🎨 Your Chat Room</header>

        <div style={styles.chatArea}>
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                ...styles.message,
                ...(msg.sent ? styles.sentMessage : styles.receivedMessage),
              }}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <footer style={styles.footer}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            style={styles.input}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage} style={styles.sendButton}>
            Send
          </button>
        </footer>
      </div>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          input:focus {
            background-color: #547792 !important;
            border-color: #94B4C1 !important;
            outline: none;
          }
          button:hover {
            background-color: #4A90E2 !important;
            color: #FFFFFF !important;
          }
          button:active {
            transform: scale(0.98);
          }
        `}
      </style>
    </Layout>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#213448", // Dark blue background
    color: "#ECEFCA", // Light text color
    borderRadius: "12px", // Rounded corners for the container
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)", // Soft shadow for depth
  },
  header: {
    padding: "20px",
    backgroundColor: "#547792", // Light blue background for header
    color: "#ECEFCA",
    textAlign: "center",
    fontSize: "1.6rem",
    fontWeight: "bold",
    borderBottom: "2px solid #94B4C1", // Accent border
  },
  chatArea: {
    flex: "1",
    padding: "20px",
    overflowY: "auto",
    background: "linear-gradient(135deg, #94B4C1, #547792)", // Gradient for the chat area
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    maxHeight: "calc(100vh - 200px)", // More padding above and below
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Softer shadow for chat area
  },
  message: {
    padding: "12px",
    borderRadius: "12px",
    maxWidth: "80%",
    background: "#d1f7c4", // Light green for received messages
    marginBottom: "12px",
    boxShadow: "0 3px 8px rgba(0, 0, 0, 0.2)", // Subtle shadow around messages
    transition: "all 0.3s ease-in-out", // Smooth transition
    animation: "fadeIn 0.5s ease-out", // Animation for new messages
  },
  receivedMessage: {
    background: "linear-gradient(135deg, #d1f7c4, #a2c9a7)", // Lighter gradient for received messages
    color: "#213448", // Dark text for incoming messages
    alignSelf: "flex-start", // Align received messages to the left
  },
  sentMessage: {
    background: "linear-gradient(135deg, #94B4C1, #4A90E2)", // Gradient background for sent messages
    color: "#213448", // Dark text for sent messages
    alignSelf: "flex-end", // Align sent messages to the right
  },
  footer: {
    padding: "20px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    backgroundColor: "#547792", // Footer color matching header
    borderTop: "2px solid #ECEFCA", // Light border at the top of footer
  },
  input: {
    flex: "1",
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid #94B4C1",
    backgroundColor: "#213448", // Dark background for input
    color: "#ECEFCA", // Light text for input
    fontSize: "1rem",
    transition: "border-color 0.3s ease, background-color 0.3s ease", // Focus animation
  },
  sendButton: {
    padding: "12px 20px",
    backgroundColor: "#94B4C1", // Accent color for button
    color: "#213448", // Dark text for button
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background-color 0.3s ease, color 0.3s ease",
  },
};

export default ChatRoom;