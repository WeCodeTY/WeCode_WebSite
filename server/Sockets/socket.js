require("dotenv").config();
const allowedOrigins = process.env.CORS_ORIGINS?.split(",") || [];
const { Server } = require("socket.io");
const userSocketMap = new Map();

let io;

const setupSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: allowedOrigins,
      methods: ["GET", "POST"],
      credentials: true
    }
  });

  io.on("connection", (socket) => {
    console.log("✅ A user connected:", socket.id);

    socket.on("registerUser", (userId) => {
      userSocketMap.set(userId, socket.id);
      console.log(`🔐 Registered user ${userId} with socket ${socket.id}`);
    });

    socket.on("join-room", (roomId) => {
      socket.join(roomId);
      console.log(`🟢 Socket ${socket.id} joined room: ${roomId}`);
    });

    socket.on("code-change", ({ privateRoomId, code }) => {
      socket.to(privateRoomId).emit("code-change", code);
    });

    socket.on("join-public-room", (publicroomID) => {
      socket.join(publicroomID);
    });

    socket.on("send-message", ({ publicroomID, ...data }) => {
      if (!publicroomID) {
        console.warn("⚠️ No public room ID provided");
        return;
      }

      socket.to(publicroomID).emit("receive-message", data);
    });

    socket.on("forceLogout", (userId) => {
      const targetSocketId = userSocketMap.get(userId);
      if (targetSocketId) {
        io.to(targetSocketId).emit("forceLogout");
        console.log(`🚨 Forced logout for user ${userId} via socket ${targetSocketId}`);
      } else {
        console.log(`⚠️ Could not find socket for user ${userId}`);
      }
    });

    socket.on("disconnect", () => {
      console.log("❌ User disconnected:", socket.id);
      for (const [userId, sockId] of userSocketMap.entries()) {
        if (sockId === socket.id) {
          userSocketMap.delete(userId);
          console.log(`🧹 Removed user ${userId} from socket map`);
          break;
        }
      }
    });
  });
};

const getIO = () => io;

module.exports = { setupSocket, userSocketMap, getIO };
