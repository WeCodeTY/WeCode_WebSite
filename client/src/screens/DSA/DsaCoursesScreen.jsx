import React, { useState } from "react";
import Layout from "../../Layout1/Layout";
import Navbar from "../../Layout1/Navbar";

const DsaCoursesScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

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

  const handleClickVideo = (video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  return (
    <Layout>
      <Navbar />
      <div style={{ padding: "20px", color: "#ECEFCA" }}>
        <h1>Striver's A2Z DSA Course Videos</h1>

        <section style={{ marginTop: "20px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "20px",
            }}
          >
            {videoData.map((video, index) => (
              <div
                key={index}
                onClick={() => handleClickVideo(video)}
                style={{
                  backgroundColor: "#213448",
                  padding: "20px",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  cursor: "pointer",
                }}
              >
                <h3 style={{ color: "#ECEFCA" }}>{video.title}</h3>
                <p style={{ color: "#94B4C1" }}>Uploaded: {video.uploaded}</p>
                <p style={{ color: "#94B4C1" }}>Views: {video.views}</p>
              </div>
            ))}
          </div>
        </section>

        {isModalOpen && selectedVideo && (
          <div
            style={{
              position: "fixed",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
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
                maxWidth: "600px",
                minWidth: "300px",
                color: "#ECEFCA",
                cursor: "auto",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2>{selectedVideo.title}</h2>
              <a
                href={selectedVideo.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#94B4C1" }}
              >
                Watch on YouTube
              </a>
              <p style={{ marginTop: "10px" }}>
                <strong>Uploaded:</strong> {selectedVideo.uploaded}
              </p>
              <p>
                <strong>Views:</strong> {selectedVideo.views}
              </p>
              <button
                onClick={handleCloseModal}
                style={{
                  marginTop: "20px",
                  padding: "10px 15px",
                  backgroundColor: "#547792",
                  border: "none",
                  borderRadius: "5px",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DsaCoursesScreen;
