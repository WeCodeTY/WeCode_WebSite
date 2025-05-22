import React, { useState } from "react";
import axios from "axios";
import Layout from "../../Layout1/Layout.jsx";
import { motion } from "framer-motion";

const UploadPosts = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");
  const [isHover, setIsHover] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleImageChange = (e) => {
    if (e.type === "drop") {
      e.preventDefault();
      const droppedFiles = e.dataTransfer.files;
      if (droppedFiles.length) {
        setImages(Array.from(droppedFiles));
      }
      setDragActive(false);
    } else {
      setImages([...e.target.files]);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || images.length === 0) {
      setMessage("Please fill all fields and upload images.");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    images.forEach((image) => formData.append("posts", image));

    try {
      const response = await axios.post(
        process.env.REACT_APP_UPLOAD_POST_URI,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      setMessage("Posts uploaded successfully!");
      setTitle("");
      setDescription("");
      setImages([]);
    } catch (error) {
      console.error("Upload error:", error);
      setMessage("Failed to upload posts.");
    }
    setIsLoading(false);
  };

  return (
    <Layout>
      <style>{`
        /* Reset and base */
        * {
          box-sizing: border-box;
        }
        body, html, #root {
          height: 100%;
          margin: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
          color: #e0e6f1;
        }
        /* Glassmorphic card */
        .glass-card {
          max-width: 480px;
          width: 90%;
          margin: 3rem auto;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 2.5rem 2rem 3rem 2rem;
          box-shadow:
            0 8px 32px 0 rgba(31, 38, 135, 0.37),
            inset 0 0 40px 0 rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.18);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        h2 {
          font-weight: 700;
          font-size: 2.2rem;
          margin-bottom: 2rem;
          letter-spacing: 1.2px;
          text-shadow: 0 0 8px rgba(255,255,255,0.3);
        }

        form {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        /* Floating label container */
        .input-group {
          position: relative;
          width: 100%;
        }

        input[type="text"],
        textarea {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 2.5px solid rgba(255,255,255,0.3);
          color: #e0e6f1;
          font-size: 1.05rem;
          padding: 14px 12px 10px 12px;
          border-radius: 4px 4px 0 0;
          transition: border-color 0.3s ease;
          outline: none;
          resize: vertical;
          font-weight: 500;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        input[type="text"]:focus,
        textarea:focus {
          border-bottom-color: #a4d7ff;
          box-shadow: 0 2px 8px #a4d7ff66;
        }
        input[type="text"]:focus + label,
        input[type="text"]:not(:placeholder-shown) + label,
        textarea:focus + label,
        textarea:not(:placeholder-shown) + label {
          top: 0;
          left: 8px;
          font-size: 0.75rem;
          color: #a4d7ff;
          font-weight: 600;
          text-shadow: 0 0 6px #a4d7ffaa;
          background: rgba(15, 32, 39, 0.8);
          padding: 0 6px;
          transform: translateY(-50%);
          pointer-events: none;
          position: absolute;
        }
        label {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(224, 230, 241, 0.6);
          font-size: 1rem;
          font-weight: 500;
          cursor: text;
          transition: all 0.3s ease;
          user-select: none;
          pointer-events: none;
          background: transparent;
        }

        /* Drag & Drop area */
        .drag-drop {
          position: relative;
          border: 2.5px dashed rgba(255, 255, 255, 0.4);
          border-radius: 15px;
          padding: 2rem 1rem;
          text-align: center;
          cursor: pointer;
          color: #c3d3e8;
          font-weight: 600;
          font-size: 1.1rem;
          transition: border-color 0.3s ease, background-color 0.3s ease;
          user-select: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 140px;
          backdrop-filter: blur(8px);
          background: rgba(255, 255, 255, 0.05);
          box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.1);
          overflow: hidden;
        }
        .drag-drop.drag-active {
          border-color: #a4d7ff;
          background-color: rgba(164, 215, 255, 0.15);
          box-shadow: 0 0 20px #a4d7ff88;
        }
        .drag-drop input[type="file"] {
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0;
          cursor: pointer;
          top: 0;
          left: 0;
          z-index: 10;
        }
        .drag-drop p {
          margin: 0;
          pointer-events: none;
          user-select: none;
        }
        .drag-drop p span {
          color: #a4d7ff;
          text-decoration: underline;
        }

        /* Preview thumbnails container */
        .preview-container {
          margin-top: 1rem;
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          justify-content: center;
        }
        .preview-thumb {
          width: 80px;
          height: 80px;
          border-radius: 12px;
          object-fit: cover;
          box-shadow: 0 4px 10px rgba(164, 215, 255, 0.5);
          border: 2px solid rgba(164, 215, 255, 0.7);
          transition: transform 0.3s ease;
        }
        .preview-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 15px #a4d7ffcc;
          border-color: #a4d7ff;
        }

        /* Upload button */
        .upload-button {
          background: linear-gradient(45deg, #4a90e2, #50e3c2);
          border: none;
          padding: 0.9rem 2.2rem;
          font-size: 1.15rem;
          font-weight: 700;
          color: #0f2027;
          border-radius: 30px;
          cursor: pointer;
          box-shadow:
            0 0 8px #50e3c2,
            0 0 20px #4a90e2;
          transition: box-shadow 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          user-select: none;
          outline-offset: 4px;
        }
        .upload-button:hover,
        .upload-button:focus {
          box-shadow:
            0 0 16px #50e3c2,
            0 0 36px #4a90e2,
            0 0 48px #4a90e2;
          outline: none;
        }
        .upload-button:disabled {
          cursor: not-allowed;
          opacity: 0.6;
          box-shadow: none;
        }

        /* Glow animation on hover */
        .upload-button.glow {
          animation: glowPulse 1.5s infinite alternate;
        }
        @keyframes glowPulse {
          0% {
            box-shadow:
              0 0 16px #50e3c2,
              0 0 36px #4a90e2,
              0 0 48px #4a90e2;
          }
          100% {
            box-shadow:
              0 0 24px #50e3c2,
              0 0 48px #4a90e2,
              0 0 64px #4a90e2;
          }
        }

        /* Loading spinner */
        .spinner {
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-top: 3px solid #0f2027;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          margin-left: 12px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }

        /* Message */
        .message {
          margin-top: 1.5rem;
          text-align: center;
          font-weight: 600;
          font-size: 1rem;
          color: #a4d7ff;
          text-shadow: 0 0 6px #a4d7ffaa;
          min-height: 1.3rem;
          user-select: none;
        }

        /* Responsive */
        @media (max-width: 520px) {
          .glass-card {
            padding: 2rem 1.5rem 2.5rem 1.5rem;
          }
          h2 {
            font-size: 1.8rem;
          }
          .upload-button {
            padding: 0.8rem 1.8rem;
            font-size: 1rem;
          }
          .preview-thumb {
            width: 64px;
            height: 64px;
          }
        }
      `}</style>

      <motion.div
        className="glass-card"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleImageChange}
      >
        <h2>Upload Posts</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data" noValidate>
          <div className="input-group">
            <input
              id="title"
              type="text"
              value={title}
              placeholder=" "
              onChange={(e) => setTitle(e.target.value)}
              autoComplete="off"
              required
            />
            <label htmlFor="title">Post Title</label>
          </div>

          <div className="input-group">
            <textarea
              id="description"
              value={description}
              placeholder=" "
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              required
            />
            <label htmlFor="description">Description</label>
          </div>

          <div
            className={`drag-drop ${dragActive ? "drag-active" : ""}`}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleImageChange}
          >
            <input
              type="file"
              id="posts"
              name="posts"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              aria-label="Upload images"
            />
            <p>Drag & Drop images here or <span>browse</span></p>
          </div>

          {images.length > 0 && (
            <div className="preview-container" aria-live="polite" aria-label="Image preview thumbnails">
              {images.map((image, idx) => {
                const url = URL.createObjectURL(image);
                return (
                  <img
                    key={idx}
                    src={url}
                    alt={`Preview ${idx + 1}`}
                    className="preview-thumb"
                    onLoad={() => URL.revokeObjectURL(url)}
                    draggable={false}
                  />
                );
              })}
            </div>
          )}

          <button
            type="submit"
            className={`upload-button ${isHover && !isLoading ? "glow" : ""}`}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            disabled={isLoading}
            aria-busy={isLoading}
            aria-label="Upload posts"
          >
            {isLoading ? "Uploading" : "Upload"}
            {isLoading && <span className="spinner" aria-hidden="true" />}
          </button>
        </form>

        <div className="message" role="alert" aria-live="assertive">{message}</div>
      </motion.div>
    </Layout>
  );
};

export default UploadPosts;