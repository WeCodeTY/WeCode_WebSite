import React, { useState, useRef, useEffect } from "react";
import { Camera, X, AlertCircle, ImagePlus, ArrowLeft } from "lucide-react";
import Layout from "../../Layout1/Layout";
import Navbar from "../../Layout1/Navbar";
import Footer from "../../Layout1/Footer";

// This component uses the specified color palette:
// #213448 - Dark blue
// #547792 - Medium blue
// #94B4C1 - Light blue
// #ECEFCA - Pale yellow/cream
const UploadPosts = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [step, setStep] = useState(1);
  const fileInputRef = useRef(null);

  // Animation states
  const [fadeIn, setFadeIn] = useState(false);
  const [pulse, setPulse] = useState(false);

  // Trigger animations on component mount
  useEffect(() => {
    setFadeIn(true);
    // Pulse animation interval
    const pulseInterval = setInterval(() => setPulse(prev => !prev), 2000);
    return () => clearInterval(pulseInterval);
  }, []);

  // Custom styles object with updated color palette and animations
  const styles = {
    container: {
      padding: "1rem",
      width: "100%",
      maxWidth: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      background: "#213448",
      opacity: fadeIn ? 1 : 0,
      transition: "opacity 0.8s ease-in-out"
    },
    card: {
      width: "100%",
      maxWidth: "28rem",
      backgroundColor: "#ffffff",
      borderRadius: "0.75rem",
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      overflow: "hidden"
    },
    header: {
      position: "relative",
      background: "linear-gradient(to right, #213448, #547792)",
      padding: "1.25rem",
      color: "#ffffff"
    },
    headerTitle: {
      fontSize: "1.25rem",
      fontWeight: "bold",
      textAlign: "center"
    },
    backButton: {
      position: "absolute",
      left: "1rem",
      top: "50%",
      transform: "translateY(-50%)",
      display: "flex",
      alignItems: "center",
      color: "#ffffff",
      cursor: "pointer",
      background: "none",
      border: "none"
    },
    content: {
      padding: "1.5rem"
    },
    uploadArea: (active) => ({
      position: "relative",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      border: `2px dashed ${active ? "#547792" : "#d1d5db"}`,
      borderRadius: "0.5rem",
      padding: "2rem",
      height: "16rem",
      transition: "all 0.3s",
      cursor: "pointer",
      backgroundColor: active ? "#ECEFCA" : "transparent",
      transform: active ? "scale(1.02)" : "scale(1)",
      boxShadow: active ? "0 8px 20px rgba(33, 52, 72, 0.15)" : "none"
    }),
    uploadInput: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      opacity: 0,
      cursor: "pointer"
    },
    uploadIcon: {
      width: "4rem",
      height: "4rem",
      background: "linear-gradient(to right, #213448, #547792)",
      borderRadius: "9999px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "0.75rem",
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transform: pulse ? "scale(1.05)" : "scale(1)",
      transition: "transform 0.5s ease-in-out"
    },
    uploadIconWhite: {
      color: "#ffffff"
    },
    uploadTitle: {
      fontSize: "1.125rem",
      fontWeight: "600",
      color: "#213448"
    },
    uploadText: {
      color: "#547792",
      marginTop: "0.5rem"
    },
    imagePreview: {
      position: "relative",
      borderRadius: "0.5rem",
      overflow: "hidden",
      backgroundColor: "#f3f4f6",
      aspectRatio: "1/1",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
    },
    previewImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    },
    controlsContainer: {
      position: "absolute",
      top: "0.75rem",
      right: "0.75rem",
      display: "flex",
      gap: "0.5rem"
    },
    controlButton: {
      width: "2rem",
      height: "2rem",
      backgroundColor: "rgba(33, 52, 72, 0.7)",
      borderRadius: "9999px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#ffffff",
      border: "none",
      cursor: "pointer",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      transition: "background-color 0.2s"
    },
    removeButton: {
      backgroundColor: "rgba(84, 119, 146, 0.7)",
    },
    multipleIndicator: {
      position: "absolute",
      bottom: "0.75rem",
      left: "50%",
      transform: "translateX(-50%)",
      backgroundColor: "rgba(33, 52, 72, 0.7)",
      color: "#ffffff",
      fontSize: "0.75rem",
      fontWeight: "500",
      borderRadius: "9999px",
      padding: "0.25rem 0.75rem",
      boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)"
    },
    thumbnailsContainer: {
      display: "flex",
      overflowX: "auto",
      gap: "0.5rem",
      paddingBottom: "0.5rem"
    },
    thumbnailWrapper: {
      position: "relative",
      flexShrink: 0
    },
    thumbnail: {
      width: "4rem",
      height: "4rem",
      objectFit: "cover",
      borderRadius: "0.375rem",
      border: "2px solid #547792",
      boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)"
    },
    thumbnailRemove: {
      position: "absolute",
      top: "-0.25rem",
      right: "-0.25rem",
      width: "1.25rem",
      height: "1.25rem",
      backgroundColor: "#547792",
      borderRadius: "9999px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#ffffff",
      border: "none",
      cursor: "pointer",
      boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)"
    },
    formContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      marginTop: "1.5rem"
    },
    input: {
      width: "100%",
      padding: "0.75rem 1rem",
      border: "1px solid #94B4C1",
      borderRadius: "0.5rem",
      fontSize: "1rem",
      outline: "none",
      transition: "border-color 0.2s, box-shadow 0.2s"
    },
    textarea: {
      width: "100%",
      padding: "0.75rem 1rem",
      border: "1px solid #94B4C1",
      borderRadius: "0.5rem",
      fontSize: "1rem",
      outline: "none",
      resize: "none",
      transition: "border-color 0.2s, box-shadow 0.2s"
    },
    submitButton: {
      width: "100%",
      padding: "0.75rem",
      background: "linear-gradient(to right, #213448, #547792)",
      color: "#ffffff",
      fontWeight: "500",
      borderRadius: "0.5rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "none",
      cursor: "pointer",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      transition: "all 0.3s",
      position: "relative",
      overflow: "hidden"
    },
    disabledButton: {
      opacity: 0.7,
      cursor: "not-allowed"
    },
    spinner: {
      width: "1rem",
      height: "1rem",
      border: "2px solid #ffffff",
      borderTopColor: "transparent",
      borderRadius: "9999px",
      animation: "spin 1s linear infinite",
      marginLeft: "0.5rem"
    },
    messageContainer: (isSuccess) => ({
      marginTop: "1rem",
      padding: "0.75rem",
      borderRadius: "0.5rem",
      display: "flex",
      alignItems: "center",
      backgroundColor: isSuccess ? "#ECEFCA" : "#fef2f2",
      color: isSuccess ? "#213448" : "#b91c1c",
      border: `1px solid ${isSuccess ? "#94B4C1" : "#fecaca"}`
    }),
    messageIcon: {
      width: "1.25rem",
      height: "1.25rem",
      marginRight: "0.5rem",
      flexShrink: 0
    },
    messageText: {
      fontSize: "0.875rem",
      fontWeight: "500"
    },
    successIcon: {
      width: "1.25rem",
      height: "1.25rem",
      backgroundColor: "#547792",
      borderRadius: "9999px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#ffffff",
      marginRight: "0.5rem",
      flexShrink: 0
    }
  };

  // Handle hover effect for submit button
  const [btnHover, setBtnHover] = useState(false);

  const handleMouseEnter = () => {
    if (!isLoading && title && description) setBtnHover(true);
  };

  const handleMouseLeave = () => setBtnHover(false);

  // Handle image change effect
  const [imageChange, setImageChange] = useState(false);

  const handleImageChange = (e) => {
    if (e.type === "drop") {
      e.preventDefault();
      const droppedFiles = e.dataTransfer.files;
      if (droppedFiles.length) {
        setImages(Array.from(droppedFiles));
        if (step === 1) setStep(2);
        setImageChange(true);
        setTimeout(() => setImageChange(false), 600);
      }
      setDragActive(false);
    } else if (e.target.files?.length) {
      setImages(Array.from(e.target.files));
      if (step === 1) setStep(2);
      setImageChange(true);
      setTimeout(() => setImageChange(false), 600);
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
    
    // Animate the transition
    setFadeIn(false);
    setTimeout(() => {
      // Simulating API call for demo purposes
      setTimeout(() => {
        setMessage("Post shared successfully!");
        setTitle("");
        setDescription("");
        setImages([]);
        setStep(1);
        setIsLoading(false);
        setFadeIn(true);
      }, 1500);
    }, 300);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
    if (newImages.length === 0) setStep(1);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const goBack = () => {
    setStep(1);
  };

  return (
    <Layout>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.card}>
          {/* Header */}
          <div style={styles.header}>
            <h2 style={styles.headerTitle}>
              {step === 1 ? "Create New Post" : step === 2 ? "Edit Your Post" : "Share Your Post"}
            </h2>
            {step > 1 && (
              <button 
                style={styles.backButton}
                onClick={goBack}
              >
                <ArrowLeft size={16} style={{ marginRight: "4px" }} /> Back
              </button>
            )}
          </div>

          <div style={styles.content}>
            {/* Step 1: Upload Image */}
            {step === 1 && (
              <div 
                style={styles.uploadArea(dragActive)}
                onClick={triggerFileInput}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleImageChange}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  id="posts"
                  name="posts"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  style={styles.uploadInput}
                  aria-label="Upload images"
                />
                
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                  <div 
                    style={styles.uploadIcon}
                    className={pulse ? "ripple-effect" : ""}
                  >
                    <ImagePlus size={32} style={{
                      ...styles.uploadIconWhite,
                      animation: "float 3s ease-in-out infinite"
                    }} />
                  </div>
                  <h3 style={styles.uploadTitle}>Drag photos here</h3>
                  <p style={styles.uploadText}>or click to select from your device</p>
                </div>
              </div>
            )}

            {/* Step 2: Preview & Details */}
            {step === 2 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {/* Image Preview with options */}
                <div style={styles.imagePreview}>
                  {images.length > 0 && (
                    <img
                      src={URL.createObjectURL(images[0])}
                      alt="Preview"
                      style={{
                        ...styles.previewImage,
                        transform: imageChange ? "scale(1.05)" : "scale(1)",
                        transition: "transform 0.3s ease-out"
                      }}
                    />
                  )}
                  
                  {/* Image controls */}
                  <div style={styles.controlsContainer}>
                    <button 
                      style={styles.controlButton}
                      onClick={triggerFileInput}
                      aria-label="Change image"
                    >
                      <Camera size={16} />
                    </button>
                    <button 
                      style={{...styles.controlButton, ...styles.removeButton}}
                      onClick={() => removeImage(0)}
                      aria-label="Remove image"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  
                  {/* Multiple images indicator */}
                  {images.length > 1 && (
                    <div style={styles.multipleIndicator}>
                      {images.length} photos
                    </div>
                  )}
                </div>

                {/* Thumbnails if multiple images */}
                {images.length > 1 && (
                  <div style={styles.thumbnailsContainer}>
                    {images.map((image, idx) => (
                      <div key={idx} style={styles.thumbnailWrapper}>
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Preview ${idx + 1}`}
                          style={styles.thumbnail}
                        />
                        <button
                          style={styles.thumbnailRemove}
                          onClick={() => removeImage(idx)}
                          aria-label={`Remove image ${idx + 1}`}
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Form fields */}
                <div style={styles.formContainer}>
                  <div>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Add a title..."
                      style={styles.input}
                    />
                  </div>
                  
                  <div>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Write a caption..."
                      rows={3}
                      style={styles.textarea}
                    />
                  </div>
                  
                  <div style={{ paddingTop: "0.5rem" }}>
                    <button
                      onClick={handleSubmit}
                      disabled={isLoading || !title || !description}
                      style={{
                        ...(isLoading || !title || !description ? {...styles.submitButton, ...styles.disabledButton} : styles.submitButton),
                        transform: btnHover ? "translateY(-2px)" : "translateY(0)",
                        boxShadow: btnHover ? "0 6px 12px rgba(33, 52, 72, 0.25)" : "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                      }}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      {isLoading ? (
                        <>
                          <span style={{ marginRight: "0.5rem" }}>Sharing...</span>
                          <div style={styles.spinner}></div>
                        </>
                      ) : (
                        "Share"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Success/Error Message */}
            {message && (
              <div style={styles.messageContainer(message.includes("success"))}>
                {message.includes("success") ? (
                  <div style={styles.successIcon}>
                    <span style={{ fontSize: "0.75rem" }}>✓</span>
                  </div>
                ) : (
                  <AlertCircle size={20} style={styles.messageIcon} />
                )}
                <p style={styles.messageText}>{message}</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Adding CSS for animations */}
        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            @keyframes ripple {
              0% { transform: scale(0.8); opacity: 1; }
              100% { transform: scale(2.5); opacity: 0; }
            }
            @keyframes float {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-6px); }
            }
            .ripple-effect:before {
              content: "";
              position: absolute;
              top: 50%;
              left: 50%;
              width: 120%;
              height: 120%;
              border-radius: 50%;
              background: rgba(84, 119, 146, 0.3);
              transform: translate(-50%, -50%) scale(0);
              animation: ripple 1s infinite;
            }
          `
        }} />
      </div>
      
    </Layout>
  );
};

export default UploadPosts;