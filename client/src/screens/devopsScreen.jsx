import React, { useState } from 'react';
import Layout from '../Layout1/Layout';
import devopsVideos from '../assets/devopsVideos';

const VideoCard = ({ title, link }) => {
  const [isVideoVisible, setVideoVisible] = useState(false);
  const videoId = link.split('v=')[1].split('&')[0]; // Extract the video ID from the YouTube link

  const toggleVideo = () => {
    setVideoVisible(!isVideoVisible);
  };

  const handleLinkClick = (e) => {
    e.preventDefault();
    window.open(link, '_blank');  // Open in a new tab if embedding fails
  };

  return (
    <div
      style={{
        border: '1px solid #547792',
        borderRadius: '15px',
        padding: '20px',
        width: '300px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
        backgroundColor: '#94B4C1',
        textAlign: 'center',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease',
        opacity: 0.9,
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = 'scale(1.1)';
        e.target.style.boxShadow = '0px 6px 16px rgba(0, 0, 0, 0.3)';
        e.target.style.opacity = 1;
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'scale(1)';
        e.target.style.boxShadow = '0px 4px 12px rgba(0, 0, 0, 0.2)';
        e.target.style.opacity = 0.9;
      }}
      onClick={toggleVideo}  // Toggle video visibility on click
    >
      <h3
        style={{
          fontSize: '16px',
          marginBottom: '10px',
          overflowWrap: 'break-word',
          textAlign: 'center',
          maxHeight: '80px',
          overflowY: 'auto',
          color: '#213448',
        }}
      >
        {title}
      </h3>

      {isVideoVisible && ( // Conditionally render the iframe when video is clicked
        <div style={{ width: '100%', height: '180px' }}>
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}`}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="YouTube video"
            style={{ borderRadius: '10px' }}
          ></iframe>
        </div>
      )}

      <a
        href={link}
        onClick={handleLinkClick}
        style={{
          color: '#213448',
          textDecoration: 'none',
          fontWeight: 'bold',
          transition: 'color 0.3s ease, transform 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.target.style.color = '#547792';
          e.target.style.transform = 'translateY(-5px)';
        }}
        onMouseLeave={(e) => {
          e.target.style.color = '#213448';
          e.target.style.transform = 'translateY(0)';
        }}
      >
        Watch Video
      </a>
    </div>
  );
};

const DevopsScreen = () => {
  return (
    <Layout>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px',marginTop: '40px', justifyContent: 'center' }}>
        {devopsVideos.map((video, index) => (
          <VideoCard key={index} title={video.title} link={video.link} />
        ))}
      </div>
    </Layout>
  );
}

export default DevopsScreen;