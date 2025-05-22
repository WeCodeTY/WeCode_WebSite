import React, { useState, useEffect } from "react";
import Layout from "../../Layout1/Layout";
import Navbar from "../../Layout1/Navbar";

const DsaCoursesScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [filter, setFilter] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const videoData = [
    {
      title: "Don't watch my A2Z DSA Course",
      url: "https://www.youtube.com/embed/0bHoB32fuj0?rel=0",
      uploaded: "1 year ago",
      views: "1.3M",
    },
    {
      title:
        "How to setup VS code for DSA and CP | Input / Output split format",
      url: "https://www.youtube.com/embed/h3uDCJ5mvgw?rel=0",
      uploaded: "1 year ago",
      views: "847K",
    },
    {
      title: "C++ Basics in One Shot - Strivers A2Z DSA Course - L1",
      url: "https://www.youtube.com/embed/EAR7De6Goz4?rel=0",
      uploaded: "2 years ago",
      views: "2M",
    },
    {
      title: "Time and Space Complexity - Strivers A2Z DSA Course",
      url: "https://www.youtube.com/embed/FPu9Uld7W-E?rel=0",
      uploaded: "2 years ago",
      views: "905K",
    },
    {
      title:
        "Solve any Pattern Question - Trick Explained | 22 Patterns in 1 Shot | Strivers A2Z DSA Course",
      url: "https://www.youtube.com/embed/tNm_NNSB3_w?rel=0",
      uploaded: "2 years ago",
      views: "1.6M",
    },
    {
      title: "Complete C++ STL in 1 Video | Time Complexity and Notes",
      url: "https://www.youtube.com/embed/RRVYpIET_RU?rel=0",
      uploaded: "2 years ago",
      views: "1.5M",
    },
    {
      title:
        "Basic Maths for DSA | Euclidean Algorithm | Strivers A2Z DSA Course",
      url: "https://www.youtube.com/embed/1xNbjMdbjug?rel=0",
      uploaded: "2 years ago",
      views: "1.1M",
    },
    {
      title:
        "Re 1. Introduction to Recursion | Recursion Tree | Stack Space | Strivers A2Z DSA Course",
      url: "https://www.youtube.com/embed/yVdKa8dnKiE?rel=0",
      uploaded: "3 years ago",
      views: "1.8M",
    },
    {
      title: "Re 2. Problems on Recursion | Strivers A2Z DSA Course",
      url: "https://www.youtube.com/embed/un6PLygfXrA?rel=0",
      uploaded: "3 years ago",
      views: "902K",
    },
    {
      title:
        "Re 3. Parameterised and Functional Recursion | Strivers A2Z DSA Course",
      url: "https://www.youtube.com/embed/69ZCDFy-OUo?rel=0",
      uploaded: "3 years ago",
      views: "725K",
    },
    {
      title: "Re 4. Problems on Functional Recursion | Strivers A2Z DSA Course",
      url: "https://www.youtube.com/embed/twuC1F6gLI8?rel=0",
      uploaded: "3 years ago",
      views: "701K",
    },
    {
      title:
        "Re 5. Multiple Recursion Calls | Problems | Strivers A2Z DSA Course",
      url: "https://www.youtube.com/embed/kvRjNm4rVBE?rel=0",
      uploaded: "3 years ago",
      views: "574K",
    },
    {
      title:
        "Hashing | Maps | Time Complexity | Collisions | Division Rule of Hashing | Strivers A2Z DSA Course",
      url: "https://www.youtube.com/embed/KEs5UyBJ39g?rel=0",
      uploaded: "2 years ago",
      views: "982K",
    },
    {
      title:
        "Sorting - Part 1 | Selection Sort, Bubble Sort, Insertion Sort | Strivers A2Z DSA Course",
      url: "https://www.youtube.com/embed/HGk_ypEuS24?rel=0",
      uploaded: "2 years ago",
      views: "926K",
    },
    {
      title:
        "Merge Sort | Algorithm | Pseudocode | Dry Run | Code | Strivers A2Z DSA Course",
      url: "https://www.youtube.com/embed/ogjf7ORKfd8?rel=0",
      uploaded: "2 years ago",
      views: "836K",
    },
    {
      title: "Quick Sort For Beginners | Strivers A2Z DSA Course",
      url: "https://www.youtube.com/embed/WIrA4YexLRQ?rel=0",
      uploaded: "2 years ago",
      views: "605K",
    },
    {
      title:
        "Find Second Largest Element in Array | Remove duplicates from Sorted Array | Arrays Intro Video",
      url: "https://www.youtube.com/embed/37E9ckMDdTk?rel=0",
      uploaded: "2 years ago",
      views: "1.9M",
    },
    {
      title:
        "Rotate Array by K places | Union, Intersection of Sorted Arrays | Move Zeros to End | Arrays Part-2",
      url: "https://www.youtube.com/embed/wvcQg43_V8U?rel=0",
      uploaded: "2 years ago",
      views: "1.2M",
    },
    {
      title:
        "Find element that appears once | Find missing number | Max Consecutive number of 1's | Arrays Part-3",
      url: "https://www.youtube.com/embed/bYWLJb3vCWY?rel=0",
      uploaded: "2 years ago",
      views: "572K",
    },
    {
      title:
        "Longest Subarray with sum K | Brute - Better - Optimal | Generate Subarrays",
      url: "https://www.youtube.com/embed/frf7qxiN2qU?rel=0",
      uploaded: "2 years ago",
      views: "898K",
    },
    {
      title: "Binary Search | Algorithm | Code | Strivers A2Z DSA Course",
      url: "https://www.youtube.com/embed/m4nEnsavl6w?rel=0",
      uploaded: "2 years ago",
      views: "1.1M",
    },
    {
      title:
        "Lower Bound and Upper Bound | Binary Search Variations | Strivers A2Z DSA Course",
      url: "https://www.youtube.com/embed/9YcXjV4lQKU?rel=0",
      uploaded: "2 years ago",
      views: "710K",
    },
    {
      title: "Find Peak Element | Binary Search | Strivers A2Z DSA Course",
      url: "https://www.youtube.com/embed/9Jry5-82I68?rel=0",
      uploaded: "2 years ago",
      views: "1.2M",
    },
    {
      title:
        "Search in Rotated Sorted Array | Binary Search | Strivers A2Z DSA Course",
      url: "https://www.youtube.com/embed/f4fB9Xg2JEY?rel=0",
      uploaded: "2 years ago",
      views: "1.3M",
    },
    {
      title:
        "Find Minimum in Rotated Sorted Array | Binary Search | Strivers A2Z DSA Course",
      url: "https://www.youtube.com/embed/5B5xQ0wE0aA?rel=0",
      uploaded: "2 years ago",
      views: "1M",
    },
    {
      title:
        "Find Element in Infinite Sorted Array | Binary Search | Strivers A2Z DSA Course",
      url: "https://www.youtube.com/embed/5k2p5-7f1Q8?rel=0",
      uploaded: "2 years ago",
      views: "650K",
    },
    {
      title: "Matrix Search | Binary Search | Strivers A2Z DSA Course",
      url: "https://www.youtube.com/embed/7k2dL6rA4yM?rel=0",
      uploaded: "2 years ago",
      views: "900K",
    },
    {
      title:
        "Find First and Last Position of Element in Sorted Array | Binary Search | Strivers A2Z DSA Course",
      url: "https://www.youtube.com/embed/sxFp9FY9i3o?rel=0",
      uploaded: "2 years ago",
      views: "1.1M",
    },
    {
      title:
        "Find Square Root of Number | Binary Search | Strivers A2Z DSA Course",
      url: "https://www.youtube.com/embed/5g3J2dH9WbM?rel=0",
      uploaded: "2 years ago",
      views: "720K",
    },
    {
      title:
        "Aggressive Cows Problem | Binary Search | Strivers A2Z DSA Course",
      url: "https://www.youtube.com/embed/3E4x6hYlU3I?rel=0",
      uploaded: "2 years ago",
      views: "680K",
    },
    {
      title:
        "Painter's Partition Problem | Binary Search | Strivers A2Z DSA Course",
      url: "https://www.youtube.com/embed/7eL0W4kG3wY?rel=0",
      uploaded: "2 years ago",
      views: "710K",
    },
    {
      title:
        "Book Allocation Problem | Binary Search | Strivers A2Z DSA Course",
      url: "https://www.youtube.com/embed/2h0s8mL0bM8?rel=0",
      uploaded: "2 years ago",
      views: "690K",
    },
    {
      title:
        "Median of Two Sorted Arrays | Binary Search | Strivers A2Z DSA Course",
      url: "https://www.youtube.com/embed/LPFhl65R7ww?rel=0",
      uploaded: "2 years ago",
      views: "1.4M",
    },
    {
      title:
        "Find the Duplicate Number | Binary Search | Strivers A2Z DSA Course",
      url: "https://www.youtube.com/embed/1b6XH2tXf0A?rel=0",
      uploaded: "2 years ago",
      views: "720K",
    },
    {
      title:
        "Find the Missing Number | Binary Search | Strivers A2Z DSA Course",
      url: "https://www.youtube.com/embed/7t0D8k1l6Tk?rel=0",
      uploaded: "2 years ago",
      views: "600K",
    },
    {
      title:
        "Count Occurrences in Sorted Array | Binary Search | Strivers A2Z DSA Course",
      url: "https://www.youtube.com/embed/8hGzW9E0Z3k?rel=0",
      uploaded: "2 years ago",
      views: "550K",
    },
    {
      title:
        "Floor and Ceil in Sorted Array | Binary Search | Strivers A2Z DSA Course",
      url: "https://www.youtube.com/embed/6rG6JzN6v6s?rel=0",
      uploaded: "2 years ago",
      views: "500K",
    },
    {
      title:
        "Find K Closest Elements | Binary Search | Strivers A2Z DSA Course",
      url: "https://www.youtube.com/embed/4y4BqJZ9cB0?rel=0",
      uploaded: "2 years ago",
      views: "480K",
    },
    {
      title:
        "Find Peak Element in Mountain Array | Binary Search | Strivers A2Z DSA Course",
      url: "https://www.youtube.com/embed/9Jry5-82I68?rel=0",
      uploaded: "2 years ago",
      views: "1.2M",
    },
    {
      title: "Find Pivot Index | Binary Search | Strivers A2Z DSA Course",
      url: "https://www.youtube.com/embed/2i2Khp_npdE?rel=0",
      uploaded: "2 years ago",
      views: "470K",
    },
    {
      title:
        "Find Minimum in Rotated Sorted Array II | Binary Search | Strivers A2Z DSA Course",
      url: "https://www.youtube.com/embed/5B5xQ0wE0aA?rel=0",
      uploaded: "2 years ago",
      views: "650K",
    },
    {
      title:
        "Find Element in Rotated Sorted Array II | Binary Search | Strivers A2Z DSA Course",
      url: "https://www.youtube.com/embed/7eL0W4kG3wY?rel=0",
      uploaded: "2 years ago",
      views: "600K",
    },
    {
      title:
        "Find Median in Row Wise Sorted Matrix | Binary Search | Strivers A2Z DSA Course",
      url: "https://www.youtube.com/embed/LPFhl65R7ww?rel=0",
      uploaded: "2 years ago",
      views: "720K",
    },
    {
      title:
        "Find Kth Smallest Element in Sorted Matrix | Binary Search | Strivers A2Z DSA Course",
      url: "https://www.youtube.com/embed/1b6XH2tXf0A?rel=0",
      uploaded: "2 years ago",
      views: "540K",
    },
    {
      title:
        "Find Kth Smallest Number in Multiplication Table | Binary Search | Strivers A2Z DSA Course",
      url: "https://www.youtube.com/embed/7t0D8k1l6Tk?rel=0",
      uploaded: "2 years ago",
      views: "530K",
    },
    {
      title:
        "Find the Duplicate Number II | Binary Search | Strivers A2Z DSA Course",
      url: "https://www.youtube.com/embed/8hGzW9E0Z3k?rel=0",
      uploaded: "2 years ago",
      views: "510K",
    },
    {
      title: "Find Missing Number II | Binary Search | Strivers A2Z DSA Course",
      url: "https://www.youtube.com/embed/6rG6JzN6v6s?rel=0",
      uploaded: "2 years ago",
      views: "490K",
    },
    {
      title:
        "Find the Number of Occurrences | Binary Search | Strivers A2Z DSA Course",
      url: "https://www.youtube.com/embed/4y4BqJZ9cB0?rel=0",
      uploaded: "2 years ago",
      views: "470K",
    },
    {
      title:
        "Find Floor and Ceil in Sorted Array | Binary Search | Strivers A2Z DSA Course",
      url: "https://www.youtube.com/embed/9Jry5-82I68?rel=0",
      uploaded: "2 years ago",
      views: "460K",
    },
    {
      title: "Find K Closest Numbers | Binary Search | Strivers A2Z DSA Course",
      url: "https://www.youtube.com/embed/2i2Khp_npdE?rel=0",
      uploaded: "2 years ago",
      views: "450K",
    },
    {
      title:
        "Aggressive Cows Problem II | Binary Search | Strivers A2Z DSA Course",
      url: "https://www.youtube.com/embed/5B5xQ0wE0aA?rel=0",
      uploaded: "2 years ago",
      views: "440K",
    },
    {
      title:
        "Painter's Partition Problem II | Binary Search | Strivers A2Z DSA Course",
      url: "https://www.youtube.com/embed/7eL0W4kG3wY?rel=0",
      uploaded: "2 years ago",
      views: "430K",
    },
    {
      title:
        "Book Allocation Problem II | Binary Search | Strivers A2Z DSA Course",
      url: "https://www.youtube.com/embed/LPFhl65R7ww?rel=0",
      uploaded: "2 years ago",
      views: "420K",
    },
    {
      title:
        "Find Median of Two Sorted Arrays II | Binary Search | Strivers A2Z DSA Course",
      url: "https://www.youtube.com/embed/1b6XH2tXf0A?rel=0",
      uploaded: "2 years ago",
      views: "410K",
    },
    {
      title:
        "Find Duplicate Number III | Binary Search | Strivers A2Z DSA Course",
      url: "https://www.youtube.com/embed/7t0D8k1l6Tk?rel=0",
      uploaded: "2 years ago",
      views: "400K",
    },
    {
      title:
        "Find Missing Number III | Binary Search | Strivers A2Z DSA Course",
      url: "https://www.youtube.com/embed/8hGzW9E0Z3k?rel=0",
      uploaded: "2 years ago",
      views: "390K",
    },
    {
      title:
        "Count Occurrences in Sorted Array II | Binary Search | Strivers A2Z DSA Course",
      url: "https://www.youtube.com/embed/6rG6JzN6v6s?rel=0",
      uploaded: "2 years ago",
      views: "380K",
    },
    {
      title:
        "Floor and Ceil in Sorted Array II | Binary Search | Strivers A2Z DSA Course",
      url: "https://www.youtube.com/embed/4y4BqJZ9cB0?rel=0",
      uploaded: "2 years ago",
      views: "370K",
    },
    {
      title:
        "Find K Closest Elements II | Binary Search | Strivers A2Z DSA Course",
      url: "https://www.youtube.com/embed/9Jry5-82I68?rel=0",
      uploaded: "2 years ago",
      views: "360K",
    },
    {
      title: "Find Peak Element II | Binary Search | Strivers A2Z DSA Course",
      url: "https://www.youtube.com/embed/2i2Khp_npdE?rel=0",
      uploaded: "2 years ago",
      views: "350K",
    },
    {
      title: "Find Pivot Index II | Binary Search | Strivers A2Z DSA Course",
      url: "https://www.youtube.com/embed/5B5xQ0wE0aA?rel=0",
      uploaded: "2 years ago",
      views: "340K",
    },
    {
      title:
        "Find Minimum in Rotated Sorted Array III | Binary Search | Strivers A2Z DSA Course",
      url: "https://www.youtube.com/embed/7eL0W4kG3wY?rel=0",
      uploaded: "2 years ago",
      views: "330K",
    },
    {
      title:
        "Find Element in Rotated Sorted Array III | Binary Search | Strivers A2Z DSA Course",
      url: "https://www.youtube.com/embed/LPFhl65R7ww?rel=0",
      uploaded: "2 years ago",
      views: "320K",
    },
    {
      title:
        "Find Median in Row Wise Sorted Matrix II | Binary Search | Strivers A2Z DSA Course",
      url: "https://www.youtube.com/embed/1b6XH2tXf0A?rel=0",
      uploaded: "2 years ago",
      views: "310K",
    },
    {
      title:
        "Find Kth Smallest Element in Sorted Matrix II | Binary Search | Strivers A2Z DSA Course",
      url: "https://www.youtube.com/embed/7t0D8k1l6Tk?rel=0",
      uploaded: "2 years ago",
      views: "300K",
    },
    {
      title:
        "Find Kth Smallest Number in Multiplication Table II | Binary Search | Strivers A2Z DSA Course",
      url: "https://www.youtube.com/embed/8hGzW9E0Z3k?rel=0",
      uploaded: "2 years ago",
      views: "290K",
    },
    {
      title:
        "Find the Duplicate Number IV | Binary Search | Strivers A2Z DSA Course",
      url: "https://www.youtube.com/embed/6rG6JzN6v6s?rel=0",
      uploaded: "2 years ago",
      views: "280K",
    },
    {
      title: "Find Missing Number IV | Binary Search | Strivers A2Z DSA Course",
      url: "https://www.youtube.com/embed/4y4BqJZ9cB0?rel=0",
      uploaded: "2 years ago",
      views: "270K",
    },
    {
      title:
        "Find the Number of Occurrences II | Binary Search | Strivers A2Z DSA Course",
      url: "https://www.youtube.com/embed/9Jry5-82I68?rel=0",
      uploaded: "2 years ago",
      views: "260K",
    },
    {
      title:
        "Find Floor and Ceil in Sorted Array III | Binary Search | Strivers A2Z DSA Course",
      url: "https://www.youtube.com/embed/2i2Khp_npdE?rel=0",
      uploaded: "2 years ago",
      views: "250K",
    },
  ];


  // Extracting unique categories
  const categories = ["All", ...new Set(videoData.map(video => video.category))];

  // Filter videos based on search and category
  const filteredVideos = videoData.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(filter.toLowerCase());
    const matchesCategory = selectedCategory === "All" || video.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleClickVideo = (video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  // Function to format view count
  const formatViews = (viewsStr) => {
    return viewsStr;
  };

  return (
    <Layout>
      <Navbar />
      <div className="dsa-course-container" style={{ 
        padding: "30px", 
        color: "#ECEFCA",
        backgroundColor: "#213448",
        minHeight: "100vh"
      }}>
        <div style={{ 
          maxWidth: "1200px", 
          margin: "0 auto",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)"
        }}>
          <header style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
            flexWrap: "wrap",
            gap: "15px"
          }}>
            <h1 style={{ 
              margin: 0, 
              fontSize: "28px", 
              fontWeight: "700", 
              color: "#94B4C1",
              textTransform: "uppercase",
              letterSpacing: "1px",
              position: "relative",
              paddingBottom: "10px"
            }}>
              Striver's A2Z DSA Course
              <span style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "60px",
                height: "3px",
                backgroundColor: "#547792",
                borderRadius: "2px"
              }}></span>
            </h1>

            <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
              {/* Search input */}
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  placeholder="Search videos..."
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  style={{
                    padding: "10px 15px",
                    paddingLeft: "35px",
                    borderRadius: "5px",
                    border: "1px solid #547792",
                    backgroundColor: "rgba(148, 180, 193, 0.1)",
                    color: "#ECEFCA",
                    width: "220px",
                    fontSize: "14px"
                  }}
                />
                <span style={{
                  position: "absolute",
                  left: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#94B4C1",
                  pointerEvents: "none"
                }}>
                  🔍
                </span>
              </div>

              {/* Category filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  padding: "10px 15px",
                  borderRadius: "5px",
                  border: "1px solid #547792",
                  backgroundColor: "rgba(148, 180, 193, 0.1)",
                  color: "#ECEFCA",
                  fontSize: "14px"
                }}
              >
                {categories.map((category, index) => (
                  <option key={index} value={category} style={{ backgroundColor: "#213448", color: "#ECEFCA" }}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </header>

          {filteredVideos.length === 0 ? (
            <div style={{ 
              textAlign: "center", 
              padding: "40px", 
              color: "#94B4C1" 
            }}>
              <h3>No videos found matching your search.</h3>
              <p>Try adjusting your search criteria or category selection.</p>
            </div>
          ) : (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "25px",
              marginTop: "30px"
            }}>
              {filteredVideos.map((video, index) => (
                <div
                  key={index}
                  onClick={() => handleClickVideo(video)}
                  style={{
                    borderRadius: "8px",
                    overflow: "hidden",
                    backgroundColor: "#547792",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow = "0 12px 20px rgba(0, 0, 0, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.2)";
                  }}
                >
                  {/* Thumbnail placeholder */}
                  <div style={{
                    backgroundColor: "#213448",
                    height: "160px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative"
                  }}>
                    <div style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(148, 180, 193, 0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      <span style={{ fontSize: "24px" }}>▶</span>
                    </div>

                    {/* Category badge */}
                    <div style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      padding: "5px 10px",
                      backgroundColor: "rgba(148, 180, 193, 0.8)",
                      borderRadius: "15px",
                      fontSize: "12px",
                      fontWeight: "bold",
                      color: "#213448"
                    }}>
                      {video.category}
                    </div>
                  </div>

                  <div style={{ padding: "15px" }}>
                    <h3 style={{
                      fontSize: "16px",
                      margin: "0 0 10px 0",
                      color: "#ECEFCA",
                      fontWeight: "600",
                      lineHeight: "1.4",
                      height: "44px",
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: "2",
                      WebkitBoxOrient: "vertical",
                      textOverflow: "ellipsis"
                    }}>
                      {video.title}
                    </h3>

                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: "14px",
                      color: "#ECEFCA",
                      opacity: "0.8",
                      marginTop: "auto",
                      paddingTop: "10px",
                      borderTop: "1px solid rgba(236, 239, 202, 0.1)"
                    }}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <span style={{ marginRight: "5px" }}>👁️</span>
                        {formatViews(video.views)}
                      </div>
                      <div>{video.uploaded}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal */}
        {isModalOpen && selectedVideo && (
          <div
            style={{
              position: "fixed",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              backdropFilter: "blur(8px)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
            onClick={handleCloseModal}
          >
            <div
              style={{
                backgroundColor: "#213448",
                padding: "30px",
                borderRadius: "10px",
                maxWidth: "800px",
                width: "90%",
                color: "#ECEFCA",
                cursor: "auto",
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)",
                border: "1px solid #547792"
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px"
              }}>
                <h2 style={{ 
                  margin: 0, 
                  color: "#94B4C1",
                  fontSize: "24px",
                  fontWeight: "600"
                }}>
                  {selectedVideo.title}
                </h2>
                <button
                  onClick={handleCloseModal}
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "24px",
                    color: "#ECEFCA",
                    cursor: "pointer",
                    padding: "5px",
                  }}
                >
                  ×
                </button>
              </div>

              <div style={{
                backgroundColor: "#94B4C1",
                padding: "20px",
                borderRadius: "5px",
                marginBottom: "20px"
              }}>
                <div style={{
                  height: "300px", 
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid #547792",
                  borderRadius: "5px",
                  backgroundColor: "#213448",
                  position: "relative"
                }}>
                  <div style={{
                    fontSize: "36px",
                    color: "#ECEFCA",
                    opacity: "0.6"
                  }}>
                    ▶
                  </div>
                  <span style={{
                    position: "absolute",
                    bottom: "15px",
                    right: "15px",
                    padding: "5px 10px",
                    backgroundColor: "rgba(84, 119, 146, 0.8)",
                    borderRadius: "5px",
                    color: "#ECEFCA"
                  }}>
                    Preview
                  </span>
                </div>
              </div>

              <div style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "10px",
                marginBottom: "20px"
              }}>
                <div>
                  <span style={{ 
                    fontWeight: "bold", 
                    color: "#94B4C1", 
                    marginRight: "10px" 
                  }}>
                    Category:
                  </span>
                  <span style={{ 
                    backgroundColor: "#547792", 
                    padding: "5px 10px", 
                    borderRadius: "15px", 
                    fontSize: "14px" 
                  }}>
                    {selectedVideo.category}
                  </span>
                </div>
                <div>
                  <span style={{ 
                    fontWeight: "bold", 
                    color: "#94B4C1", 
                    marginRight: "10px" 
                  }}>
                    Uploaded:
                  </span>
                  {selectedVideo.uploaded}
                </div>
                <div>
                  <span style={{ 
                    fontWeight: "bold", 
                    color: "#94B4C1", 
                    marginRight: "10px" 
                  }}>
                    Views:
                  </span>
                  {selectedVideo.views}
                </div>
              </div>

              <div style={{ 
                display: "flex", 
                justifyContent: "space-between",
                gap: "15px" 
              }}>
                <a
                  href={selectedVideo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: "12px 20px",
                    backgroundColor: "#94B4C1",
                    border: "none",
                    borderRadius: "5px",
                    color: "#213448",
                    fontWeight: "bold",
                    textDecoration: "none",
                    textAlign: "center",
                    flex: "1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px"
                  }}
                >
                  <span>Watch on YouTube</span>
                </a>
                <button
                  onClick={handleCloseModal}
                  style={{
                    padding: "12px 20px",
                    backgroundColor: "transparent",
                    border: "1px solid #547792",
                    borderRadius: "5px",
                    color: "#ECEFCA",
                    cursor: "pointer",
                    flex: "1"
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DsaCoursesScreen;