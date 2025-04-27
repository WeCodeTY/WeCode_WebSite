import React, { useState } from "react";
import axios from "axios";
import Layout from "../../Layout1/Layout.jsx";

const UploadPosts = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");
  const [isHover, setIsHover] = useState(false);

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || images.length === 0) {
      setMessage("Please fill all fields and upload images.");
      return;
    }

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
  };

  return (
    <Layout>
      <style>
        {`
          input::placeholder, textarea::placeholder {
            color: #ECEFCA;
            opacity: 1;
          }
        `}
      </style>
      <div style={{ padding: "3rem", maxWidth: "600px", margin: "0 auto", backgroundColor: "#213448", borderRadius: "8px" }}>
        <h2 style={{ color: "#ECEFCA", textAlign: "center", marginBottom: "2rem" }}>Upload Posts</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <input
              type="text"
              placeholder="Post Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                width: "100%",
                padding: "0.8rem",
                backgroundColor: "#547792",
                color: "#ECEFCA",
                border: "1px solid #94B4C1",
                borderRadius: "4px",
              }}
            />
          </div>

          <div>
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{
                width: "100%",
                padding: "0.8rem",
                height: "120px",
                backgroundColor: "#547792",
                color: "#ECEFCA",
                border: "1px solid #94B4C1",
                borderRadius: "4px",
                resize: "vertical",
              }}
            />
          </div>

          <div>
            <input
              type="file"
              name="posts"
              multiple
              onChange={handleImageChange}
              style={{
                backgroundColor: "#547792",
                color: "#ECEFCA",
                border: "1px solid #94B4C1",
                borderRadius: "4px",
                padding: "0.5rem",
              }}
            />
          </div>

          <div style={{ textAlign: "center" }}>
            <button
              type="submit"
              style={{
                padding: "0.8rem 1.5rem",
                backgroundColor: isHover ? "#94B4C1" : "#547792",
                color: "#ECEFCA",
                border: "none",
                cursor: "pointer",
                borderRadius: "5px",
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
            >
              Upload
            </button>
          </div>
        </form>

        {message && (
          <p style={{ marginTop: "1.5rem", color: "#94B4C1", textAlign: "center" }}>{message}</p>
        )}
      </div>
    </Layout>
  );
};

export default UploadPosts;
