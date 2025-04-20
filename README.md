# WeCode: A Real-Time Collaborative Coding Platform

## 🚀 Overview
WeCode is a full-featured MERN (MongoDB, Express, React, Node.js) based collaborative platform designed to enhance coding practice and peer interaction. It enables real-time code collaboration, video/audio communication, curated DSA content, and a social feed, making it an all-in-one platform for coding enthusiasts.

---

## 🔧 Tech Stack
- **Frontend**: React, React Router, Axios, Monaco Editor, Firebase Auth
- **Backend**: Node.js, Express, Mongoose, Socket.IO, UUID, Multer
- **Database**: MongoDB (with Mongoose ODM)
- **Authentication**: Firebase (Google OAuth), Custom with bcrypt + JWT
- **Real-time**: Socket.IO, WebRTC for communication
- **Media Handling**: Multer for file uploads, Cloudinary for image storage

---

## ✨ Features

### 1. Project Initialization
- MERN stack with client-server structure
- Installed libraries: express, mongoose, cors, dotenv, socket.io, uuid, react-router-dom, axios, socket.io-client, monaco-editor, firebase

### 2. User Authentication
- **Google OAuth** via Firebase
- **Custom login/registration** using bcrypt for password hashing and JWT for session management

### 3. Real-Time Collaborative Code Editor ✅
- Monaco Editor integration
- Real-time keystroke sync using Socket.IO
- UUID-based session room creation

### 4. Video and Audio Communication ✅
- WebRTC-based P2P video/audio
- Socket.IO signaling
- Join room via UUID
- Mute/unmute, video toggle features

### 5. DSA Content Integration
- Structured notes on DSA topics (Arrays, Graphs, Trees...)
- YouTube video embeddings for visual learning

### 6. LeetCode Questions
- Curated questions by topic and difficulty (Easy, Medium, Hard)
- Feature to mark questions as completed or favorite

### 7. Live Code Editor Integration ✅
- Code execution using backend Node.js
- Monaco Editor for syntax highlighting
- Submit button to redirect to LeetCode with copied code

### 8. Real-Time Session Management ✅
- Unique UUIDs for session tracking
- Session history saved in MongoDB
- Resume unfinished sessions

### 9. MongoDB Database Design
- **Users Collection**: email, name, password, sessions
- **Sessions Collection**: session ID, participants, code states
- **Content Collection**: DSA notes, questions, posts

### 10. Deployment
- Backend: Render/Heroku
- Frontend: Vercel/Netlify
- Full testing for cross-browser and latency

---

## 💡 Optional and Bonus Features

### 🎨 UX Improvements
- Dark mode toggle
- Auto-save sessions to MongoDB or localStorage
- Code execution using Judge0 API (planned)

### 🧑‍🤝‍🧑 Collaboration Enhancements
- Chat alongside video calls
- Reaction system (raise hand, emoji)
- Code Review Mode toggle (Edit/Review)

### 🔐 Security
- Public/private session rooms
- Token expiry and refresh
- Input validation and sanitization

### ⚙️ Performance
- Lazy loading of heavy components/videos
- Socket event throttling
- WebRTC optimization for low bandwidth

### 🏆 Additional Engagement Features
- Leaderboards based on activity
- Badges/achievements for consistency and performance
- GitHub integration for saving and sharing code

### 📰 Social Feed System
- LinkedIn-style feed
- Users can follow each other
- Post updates, tips, solutions
- Interact via likes, comments, and shares

### 🖼️ File Upload Support
- Image/file upload using **Multer** middleware
- Cloudinary integration for secure and scalable image hosting
- Support for uploading profile pictures, post attachments, etc.

---

## 📌 Folder Structure
```
WeCode/
├── client/         # React frontend
├── server/         # Express backend
├── package.json    # Project dependencies
└── README.md       # Project documentation
```

---

## 👨‍💻 Author
**Tanushh18** – [GitHub](https://github.com/Tanushh18)

---

## 📃 License
MIT License (or your preferred license)

---

## 🙌 Contributions
Pull requests are welcome. Please open an issue first to discuss changes.
