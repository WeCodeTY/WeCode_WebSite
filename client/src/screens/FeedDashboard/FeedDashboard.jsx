import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../../Layout1/Layout";
import { formatDistanceToNow } from 'date-fns';

const Feed = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_FETCH_FEED, { withCredentials: true });
        setPosts(response.data.posts); setName(response.data.name);
      } catch (error) { console.error("Error fetching feed:", error); }
    };
    fetchFeed();
  }, []);

  // Styles object to make the code more compressed
  const styles = {
    container: { maxWidth: '800px', margin: '0 auto', padding: '20px', paddingTop: '80px', backgroundColor: '#213448', color: '#ECEFCA', minHeight: '100vh' },
    header: { color: '#ECEFCA', marginBottom: '24px', fontSize: '30px', fontWeight: '700', borderBottom: '2px solid #547792', paddingBottom: '10px' },
    emptyState: { textAlign: 'center', padding: '40px 0', color: '#94B4C1', backgroundColor: '#2d4559', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' },
    postCard: { backgroundColor: '#547792', color: '#ECEFCA', padding: '20px', borderRadius: '12px', marginBottom: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)', transition: 'all 0.3s ease' },
    userInfo: { display: 'flex', alignItems: 'center', marginBottom: '16px' },
    avatar: { width: '48px', height: '48px', borderRadius: '50%', overflow: 'hidden', border: '3px solid #94B4C1', marginRight: '12px', boxShadow: '0 0 8px rgba(148, 180, 193, 0.5)' },
    username: { margin: 0, fontWeight: '600', fontSize: '16px', color: '#ECEFCA' },
    timestamp: { margin: 0, color: '#94B4C1', fontSize: '13px', fontStyle: 'italic' },
    title: { margin: '12px 0', fontSize: '20px', fontWeight: '600', color: '#ECEFCA' },
    description: { margin: '12px 0 16px', color: '#ECEFCA', lineHeight: '1.6', fontSize: '15px' },
    mediaContainer: { margin: '16px 0', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' },
    media: { width: '100%', maxHeight: '500px', objectFit: 'cover', borderRadius: '8px', transition: 'transform 0.3s ease' },
    actions: { display: 'flex', paddingTop: '12px', borderTop: '1px solid #94B4C1', justifyContent: 'space-between' },
    actionButton: { background: 'none', border: 'none', color: '#ECEFCA', display: 'flex', alignItems: 'center', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', transition: 'background-color 0.2s', fontWeight: '500', fontSize: '14px' },
    actionButtonHover: { backgroundColor: 'rgba(148, 180, 193, 0.2)' }
  };

  // ActionButton component to simplify the JSX
  const ActionButton = ({ icon, text }) => (
    <button style={styles.actionButton} onMouseOver={(e) => Object.assign(e.currentTarget.style, styles.actionButtonHover)} 
      onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
      <span style={{ marginRight: '8px', fontSize: '16px' }}>{icon}</span>{text}
    </button>
  );

  return (
    <Layout>
      <div style={styles.container}>
        <h1 style={styles.header}>Your Professional Feed</h1>
        
        {posts.length === 0 ? (
          <div style={styles.emptyState}>
            <p style={{ fontSize: '18px', fontWeight: '600', marginBottom: '10px' }}>No posts from followed users yet.</p>
            <p style={{ fontSize: '15px' }}>Connect with professionals to see their content here</p>
          </div>
        ) : (
          posts.map((post) => (
            <div key={post._id} style={styles.postCard}>
              <div style={styles.userInfo}>
                <div style={styles.avatar}>
                  <img src={post.user.profilePicture || `https://ui-avatars.com/api/?name=${post.user.name?.charAt(0) || "U"}&background=213448&color=ECEFCA&size=48`} 
                    alt={post.user?.username || "User"} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div>
                  <p style={styles.username}>{post.user.username}</p>
                  <p style={styles.timestamp}>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</p>
                </div>
              </div>
              
              {post.title && <h3 style={styles.title}>{post.title}</h3>}
              
              <p style={styles.description}>{post.description}</p>
              
              {post.mediaUrl && (
                <div style={styles.mediaContainer}>
                  <img src={post.mediaUrl} alt="post content" style={styles.media} 
                    onError={(e) => { e.target.style.display = 'none'; }} 
                    onMouseOver={(e) => { e.target.style.transform = 'scale(1.02)'; }} 
                    onMouseOut={(e) => { e.target.style.transform = 'scale(1)'; }} />
                </div>
              )}
              
              <div style={styles.actions}>
                <div style={{ display: 'flex' }}>
                  <ActionButton icon="👍" text="Like" />
                  <ActionButton icon="💬" text="Comment" />
                </div>
                <ActionButton icon="↗️" text="Share" />
              </div>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
};

export default Feed;