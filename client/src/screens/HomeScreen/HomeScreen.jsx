import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function WeCodeLanding() {
  const [stats, setStats] = useState({ users: 2847, sessions: 156, problems: 23, minutes: 1432 });
  const [counters, setCounters] = useState({ users: 0, sessions: 0, problems: 0 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Counter animation
    const targets = { users: 10000, sessions: 50000, problems: 1000 };
    Object.keys(targets).forEach(key => {
      const increment = targets[key] / 100;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= targets[key]) {
          setCounters(prev => ({ ...prev, [key]: targets[key] }));
          clearInterval(timer);
        } else {
          setCounters(prev => ({ ...prev, [key]: Math.ceil(current) }));
        }
      }, 20);
    });

    // Live stats update
    const interval = setInterval(() => {
      setStats({
        users: Math.floor(Math.random() * 100) + 2800,
        sessions: Math.floor(Math.random() * 50) + 150,
        problems: Math.floor(Math.random() * 10) + 20,
        minutes: Math.floor(Math.random() * 200) + 1400
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const navItems = ['features', 'demo', 'stats', 'testimonials', 'contact'];
  const heroStats = [
    { label: 'Active Users', value: counters.users },
    { label: 'Code Sessions', value: counters.sessions },
    { label: 'Problems Solved', value: counters.problems }
  ];

  const features = [
    { icon: '⚡', title: 'Real-time Collaboration', desc: 'Code together in real-time with synchronized editing, cursor tracking, and instant updates across all participants.' },
    { icon: '🎥', title: 'Video & Audio Calls', desc: 'Built-in WebRTC video conferencing with screen sharing and crystal-clear audio for seamless communication.' },
    { icon: '📚', title: 'DSA Learning Hub', desc: 'Comprehensive data structures and algorithms content with interactive examples and curated problem sets.' },
    { icon: '🚀', title: 'Code Execution', desc: 'Run and test your code instantly with support for multiple programming languages and real-time output.' },
    { icon: '🔒', title: 'Secure Sessions', desc: 'End-to-end encrypted sessions with secure authentication and privacy controls for your code.' },
    { icon: '📱', title: 'Mobile Friendly', desc: 'Fully responsive design that works seamlessly across desktop, tablet, and mobile devices.' }
  ];

  const liveStats = [
    { label: 'Users Online', value: stats.users },
    { label: 'Active Sessions', value: stats.sessions },
    { label: 'Problems Solved Today', value: stats.problems },
    { label: 'Minutes Coded', value: stats.minutes }
  ];

  const testimonials = [
    { text: "WeCode transformed how our team practices coding interviews. The real-time collaboration is seamless!", author: "Sarah Chen, Software Engineer at Google" },
    { text: "Perfect for remote pair programming sessions. The video integration makes it feel like we're in the same room.", author: "Mike Rodriguez, Tech Lead at Microsoft" },
    { text: "The DSA content is incredibly well-structured. It's become our go-to platform for algorithm practice.", author: "Priya Patel, CS Student at MIT" }
  ];

  const footerLinks = {
    'Quick Links': ['Features', 'Demo', 'Statistics', 'Launch App'],
    'Support': ['Help Center', 'Documentation', 'Community', 'Contact Us'],
    'Connect': ['GitHub', 'Twitter', 'LinkedIn', 'Discord']
  };



const handleEmailSubmit = () => {
  const emailInput = document.getElementById('email-input');
  const email = emailInput?.value.trim();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return alert('Please enter a valid email address');
  }

  axios.post(process.env.REACT_APP_FORGOT_PASSWORD_SEND_URI, {
    email,
    type: 'contact'
  })
  .then(res => {
    alert(res.data.message || "Thanks for signing up! We'll be in touch soon.");
    emailInput.value = '';
  })
  .catch(err => {
    console.error('Error sending request:', err);
    alert('There was a problem submitting your request. Please try again later.');
  });
};

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#1e293b', color: '#e7e5e4', overflowX: 'hidden', margin: 0, padding: 0 }}>
      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        @keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }
        @media (max-width: 767px) {
          .nav-list { display: ${mobileMenuOpen ? 'flex' : 'none'} !important; position: absolute !important; top: 64px !important; left: 0 !important; right: 0 !important; background-color: #1e293b !important; padding: 16px !important; flex-direction: column !important; }
          .hamburger { display: flex !important; }
        }
        @media (min-width: 768px) {
          .nav-list { display: flex !important; position: relative !important; top: 0 !important; background-color: transparent !important; padding: 0 !important; flex-direction: row !important; }
          .hamburger { display: none !important; }
          .hero-container { grid-template-columns: 1fr 1fr !important; }
          .hero-title { font-size: 60px !important; }
          .features-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .stats-grid { grid-template-columns: repeat(4, 1fr) !important; }
          .demo-grid { grid-template-columns: 1fr 1fr !important; }
          .testimonials-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .footer-grid { grid-template-columns: repeat(4, 1fr) !important; }
          .large-stat { font-size: 60px !important; }
          .large-stat-label { font-size: 18px !important; }
          .demo-video { height: 384px !important; }
        }
        @media (min-width: 1024px) {
          .features-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (min-width: 640px) {
          .email-container { flex-direction: row !important; }
        }
      `}</style>

      {/* Navigation */}
      <nav style={{ position: 'fixed', top: 0, width: '100%', backgroundColor: 'rgba(30, 41, 59, 0.95)', backdropFilter: 'blur(12px)', zIndex: 50, padding: '16px 0' }}>
        <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: '800' }}>WeCode</div>
          <ul className="nav-list" style={{ display: 'none', gap: '32px', listStyle: 'none', margin: 0 }}>
            {navItems.map(item => (
              <li key={item}>
                <button 
                  onClick={() => {
                    scrollTo(item);
                    setMobileMenuOpen(false);
                  }} 
                  style={{ background: 'none', border: 'none', color: '#94a3b8', fontWeight: '500', cursor: 'pointer', transition: 'color 0.3s', fontSize: '16px' }}
                  onMouseEnter={(e) => e.target.style.color = '#e7e5e4'}
                  onMouseLeave={(e) => e.target.style.color = '#94a3b8'}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              </li>
            ))}
          </ul>
          <button 
            className="hamburger"
            style={{ display: 'none', flexDirection: 'column', gap: '4px', background: 'none', border: 'none', cursor: 'pointer' }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {[1,2,3].map(i => (
              <span key={i} style={{ width: '24px', height: '2px', backgroundColor: '#e7e5e4', transition: 'all 0.3s' }}></span>
            ))}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)' }}>
        <div className="hero-container" style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 20px', display: 'grid', gap: '48px', alignItems: 'center', width: '100%', paddingTop: '64px' }}>
          <div>
            <h1 className="hero-title" style={{ fontSize: '48px', fontWeight: '800', marginBottom: '24px', background: 'linear-gradient(to right, #e7e5e4, #94a3b8)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: '1.1' }}>
              Code Together,<br/>Learn Together
            </h1>
            <p style={{ fontSize: '20px', color: '#94a3b8', marginBottom: '32px', lineHeight: '1.6' }}>
              The ultimate collaborative coding platform for developers. Real-time editing, video calls, and DSA practice all in one place.
            </p>
            
            <div style={{ display: 'flex', gap: '32px', marginBottom: '40px' }}>
              {heroStats.map((stat, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: '32px', fontWeight: '700', color: '#e7e5e4', display: 'block' }}>{stat.value.toLocaleString()}</span>
                  <div style={{ fontSize: '14px', color: '#94a3b8', marginTop: '4px' }}>{stat.label}</div>
                </div>
              ))}
            </div>
            
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <a 
                onClick={() => navigate('/login')} 
                
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ padding: '16px 32px', backgroundColor: '#475569', color: '#e7e5e4', borderRadius: '8px', fontWeight: '600', textDecoration: 'none', display: 'inline-block', transition: 'all 0.3s', fontSize: '16px' }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#64748b';
                  e.target.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#475569';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Start Coding Now
              </a>
              <button 
                onClick={() => scrollTo('demo')} 
                style={{ padding: '16px 32px', border: '2px solid #94a3b8', color: '#94a3b8', borderRadius: '8px', fontWeight: '600', background: 'none', cursor: 'pointer', transition: 'all 0.3s', fontSize: '16px' }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#94a3b8';
                  e.target.style.color = '#1e293b';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#94a3b8';
                }}
              >
                Watch Demo
              </button>
            </div>
          </div>
          
          <div style={{ position: 'relative' }}>
            <div style={{ backgroundColor: 'rgba(71, 85, 105, 0.1)', borderRadius: '12px', padding: '24px', border: '1px solid rgba(148, 163, 184, 0.2)', backdropFilter: 'blur(12px)' }}>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ef4444' }}></div>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#eab308' }}></div>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#22c55e' }}></div>
              </div>
              <div style={{ fontFamily: 'monospace', fontSize: '14px', color: '#94a3b8', lineHeight: '1.6' }}>
                <div style={{ marginBottom: '4px' }}>
                  <span style={{ color: '#e7e5e4', fontWeight: '600' }}>function</span>{' '}
                  <span style={{ color: '#94a3b8' }}>collaborativeCode</span>() {'{'}
                </div>
                <div style={{ marginBottom: '4px', color: '#6b7280', fontStyle: 'italic' }}>  // Real-time coding magic happens here</div>
                <div style={{ marginBottom: '4px' }}>
                  {'  '}<span style={{ color: '#e7e5e4', fontWeight: '600' }}>const</span>{' '}
                  users = <span style={{ color: '#94a3b8' }}>connectToSession</span>();
                </div>
                <div style={{ marginBottom: '4px' }}>
                  {'  '}<span style={{ color: '#e7e5e4', fontWeight: '600' }}>return</span>{' '}
                  <span style={{ color: '#94a3b8' }}>shareKnowledge</span>(users);
                </div>
                <div>
                  {'}'}
                  <span style={{ display: 'inline-block', width: '2px', height: '16px', backgroundColor: '#e7e5e4', marginLeft: '4px', animation: 'blink 1s infinite' }}></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{ padding: '80px 0', backgroundColor: '#1e293b' }}>
        <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 20px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '700', textAlign: 'center', color: '#e7e5e4', marginBottom: '48px' }}>Powerful Features</h2>
          <div className="features-grid" style={{ display: 'grid', gap: '32px' }}>
            {features.map((feature, i) => (
              <div 
                key={i} 
                style={{ backgroundColor: 'rgba(71, 85, 105, 0.1)', padding: '32px', borderRadius: '12px', textAlign: 'center', border: '1px solid rgba(148, 163, 184, 0.2)', transition: 'all 0.3s', position: 'relative', overflow: 'hidden' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(71, 85, 105, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ fontSize: '48px', marginBottom: '24px', color: '#94a3b8' }}>{feature.icon}</div>
                <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#e7e5e4', marginBottom: '16px' }}>{feature.title}</h3>
                <p style={{ color: '#94a3b8', lineHeight: '1.6' }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Stats */}
      <section id="stats" style={{ padding: '80px 0', background: 'linear-gradient(135deg, #475569 0%, #1e293b 100%)' }}>
        <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 20px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '700', textAlign: 'center', color: '#e7e5e4', marginBottom: '48px' }}>Live Platform Stats</h2>
          <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px', textAlign: 'center' }}>
            {liveStats.map((stat, i) => (
              <div key={i} style={{ padding: '24px' }}>
                <span className="large-stat" style={{ fontSize: '48px', fontWeight: '800', color: '#e7e5e4', display: 'block', marginBottom: '12px' }}>
                  {stat.value.toLocaleString()}
                </span>
                <div className="large-stat-label" style={{ color: '#94a3b8', fontSize: '16px' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo */}
      <section id="demo" style={{ padding: '80px 0', backgroundColor: '#1e293b' }}>
        <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 20px' }}>
          <div className="demo-grid" style={{ display: 'grid', gap: '48px', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '36px', fontWeight: '700', textAlign: 'left', color: '#e7e5e4', marginBottom: '24px' }}>See WeCode in Action</h2>
              <p style={{ color: '#94a3b8', marginBottom: '24px', lineHeight: '1.6' }}>
                Watch how easy it is to start a collaborative coding session. Create a room, share the link, and start coding together instantly.
              </p>
              <p style={{ color: '#94a3b8', marginBottom: '24px', lineHeight: '1.6' }}>
                Our intelligent editor supports syntax highlighting, auto-completion, and real-time synchronization across all participants.
              </p>
              <a 
                href="https://wecode-coders.onrender.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ padding: '16px 32px', backgroundColor: '#475569', color: '#e7e5e4', borderRadius: '8px', fontWeight: '600', textDecoration: 'none', display: 'inline-block', transition: 'all 0.3s', fontSize: '16px' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#64748b'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#475569'}
              >
                Try It Now
              </a>
            </div>
            <div className="demo-video" style={{ position: 'relative', height: '320px', backgroundColor: 'rgba(71, 85, 105, 0.1)', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(148, 163, 184, 0.2)' }}>
              <div style={{ position: 'absolute', inset: '16px', backgroundColor: '#1e293b', borderRadius: '8px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: '40px', backgroundColor: 'rgba(71, 85, 105, 0.2)', display: 'flex', alignItems: 'center', padding: '0 16px', gap: '8px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ef4444' }}></div>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#eab308' }}></div>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#22c55e' }}></div>
                </div>
                <div style={{ flex: 1, padding: '16px', fontFamily: 'monospace', fontSize: '14px', color: '#94a3b8', overflow: 'hidden' }}>
                  <div style={{ marginBottom: '8px', opacity: 0.8 }}>
                    // User Alice joined the session
                  </div>
                  <div style={{ marginBottom: '8px', opacity: 0.9 }}>
                    function quickSort(arr) {'{'}
                  </div>
                  <div style={{ marginBottom: '8px', opacity: 1 }}>
                    {'  '}if (arr.length &lt;= 1) return arr;
                  </div>
                  <div style={{ marginBottom: '8px', opacity: 0.7 }}>
                    {'  '}// User Bob is typing...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" style={{ padding: '80px 0', background: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)' }}>
        <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 20px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '700', textAlign: 'center', color: '#e7e5e4', marginBottom: '48px' }}>What Developers Say</h2>
          <div className="testimonials-grid" style={{ display: 'grid', gap: '32px' }}>
            {testimonials.map((testimonial, i) => (
              <div 
                key={i} 
                style={{ backgroundColor: 'rgba(231, 229, 228, 0.1)', padding: '32px', borderRadius: '12px', borderLeft: '4px solid #94a3b8', transition: 'all 0.3s' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(231, 229, 228, 0.15)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(231, 229, 228, 0.1)'}
              >
                <p style={{ color: '#e7e5e4', marginBottom: '24px', fontStyle: 'italic', lineHeight: '1.6', fontSize: '18px' }}>
                  "{testimonial.text}"
                </p>
                <div style={{ color: '#94a3b8', fontWeight: '600' }}>- {testimonial.author}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" style={{ padding: '80px 0', textAlign: 'center', backgroundColor: '#1e293b' }}>
        <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 20px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '700', textAlign: 'center', color: '#e7e5e4', marginBottom: '48px' }}>Ready to Start Coding?</h2>
          <p style={{ color: '#94a3b8', fontSize: '20px', marginBottom: '40px', lineHeight: '1.6' }}>
            Join thousands of developers who are already using WeCode to collaborate and learn together.
          </p>
          <div className="email-container" style={{ display: 'flex', maxWidth: '512px', margin: '0 auto', gap: '16px', flexDirection: 'column' }}>
            <input 
              type="email"
              id="email-input"
              placeholder="Enter your email address"
              style={{ flex: 1, padding: '16px', border: '1px solid #94a3b8', borderRadius: '8px', backgroundColor: 'rgba(71, 85, 105, 0.1)', color: '#e7e5e4', fontSize: '16px' }}
            />
            <button 
              onClick={handleEmailSubmit}
              style={{ padding: '16px 32px', backgroundColor: '#475569', color: '#e7e5e4', borderRadius: '8px', fontWeight: '600', border: 'none', cursor: 'pointer', transition: 'all 0.3s', fontSize: '16px' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#64748b'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#475569'}
            >
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#1e293b', borderTop: '1px solid rgba(148, 163, 184, 0.2)', padding: '48px 0' }}>
        <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 20px' }}>
          <div className="footer-grid" style={{ display: 'grid', gap: '32px' }}>
            <div>
              <h3 style={{ color: '#e7e5e4', marginBottom: '16px', fontSize: '18px', fontWeight: '600' }}>WeCode</h3>
              <p style={{ color: '#94a3b8', lineHeight: '1.6' }}>
                The collaborative coding platform that brings developers together to learn, practice, and grow.
              </p>
            </div>
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 style={{ color: '#e7e5e4', marginBottom: '16px', fontSize: '18px', fontWeight: '600' }}>{title}</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {links.map((link, i) => (
                    <li key={i} style={{ marginBottom: '8px' }}>
                      <a href="#" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}
                         onMouseEnter={(e) => e.target.style.color = '#e7e5e4'}
                         onMouseLeave={(e) => e.target.style.color = '#94a3b8'}>
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid rgba(148, 163, 184, 0.2)', marginTop: '32px', paddingTop: '24px', textAlign: 'center', color: '#94a3b8' }}>
            <p>&copy; 2025 WeCode. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Active Users Widget */}
      <div style={{ position: 'fixed', bottom: '20px', right: '20px', backgroundColor: 'rgba(71, 85, 105, 0.9)', padding: '12px 16px', borderRadius: '8px', fontSize: '14px', color: '#e7e5e4', backdropFilter: 'blur(12px)', zIndex: 50, boxShadow: '0 10px 25px rgba(0,0,0,0.3)' }}>
        <span style={{ display: 'inline-block', width: '8px', height: '8px', backgroundColor: '#10b981', borderRadius: '50%', marginRight: '8px', animation: 'pulse 2s infinite' }}></span>
        {stats.users} users online
      </div>
    </div>
  );
}