// src/components/Layout.jsx
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const layoutStyle = {
  fontFamily: "Arial, sans-serif",
  minHeight: "100vh",
  background: "linear-gradient(to bottom right, #213448, #547792)", // Gradient from Dark Blue to Light Blue
  color: "#ECEFCA", // Pale Yellow text color for good contrast
  paddingTop: "80px", // to avoid hiding behind fixed navbar
  transition: "background 0.5s ease", // Smooth transition for background change
  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
};

const Layout = ({ children }) => {
  return (
    
    <div style={layoutStyle}>
      {children}
      <Navbar />
      <Footer />
    </div>
  );
};

export default Layout;