const { io } = require("socket.io-client");

// Connect socket globally
const socket = io(process.env.REACT_APP_SOCKET_URL, {
  withCredentials: true, // Send cookies (tokens) with the connection
  transports: ["websocket"], // Force WebSocket transport (optional but recommended)
});

module.exports = socket;
