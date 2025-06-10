import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Main() {
  const [darkMode, setDarkMode] = useState(false);
  const [boxVisible, setBoxVisible] = useState([false, false, false]);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const boxRefs = [useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
  }, []);

  // Intersection Observer for animating boxes (all boxes)
  useEffect(() => {
    const observers = boxRefs.map((ref, idx) => {
      if (!ref.current) return null;
      return new window.IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setBoxVisible((prev) => {
              const updated = [...prev];
              updated[idx] = true;
              return updated;
            });
          } else {
            setBoxVisible((prev) => {
              const updated = [...prev];
              updated[idx] = false;
              return updated;
            });
          }
        },
        { threshold: 0.2 }
      );
    });

    boxRefs.forEach((ref, idx) => {
      if (ref.current && observers[idx]) {
        observers[idx].observe(ref.current);
      }
    });

    return () => {
      observers.forEach((observer, idx) => {
        if (observer && boxRefs[idx].current) observer.disconnect();
      });
    };
  }, [boxRefs]);

  // Handle scroll for scaling welcome text and resetting animations
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
  };

  const containerStyle = {
    minHeight: '190vh',
    backgroundColor: darkMode ? '#121212' : '#f0f2f5',
    color: darkMode ? '#fff' : '#000',
    fontFamily: 'Arial, sans-serif',
    transition: 'background-color 0.3s, color 0.3s',
    position: 'relative',
  };

  const headerStyle = {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem 2rem',
    position: 'relative',
    boxSizing: 'border-box',
  };

  const logoStyle = {
    height: '40px',
    width: '40px',
    borderRadius: '8px',
    marginRight: '0.5rem',
    objectFit: 'cover',
    background: '#fff',
    border: '1px solid #eee',
  };

  const rightButtonsStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    position: 'static',
  };

  const loginButtonStyle = {
    padding: '0.3rem 1rem',
    backgroundColor: darkMode ? '#2e2e2e' : '#fff',
    color: darkMode ? '#fff' : '#007bff',
    border: `1px solid ${darkMode ? '#444' : '#007bff'}`,
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '1rem',
    minWidth: '70px',
    height: '2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    transition: 'background-color 0.3s, color 0.3s, border 0.3s',
  };

  const toggleButtonStyle = {
    padding: '0.5rem 1rem',
    backgroundColor: darkMode ? '#444' : '#ddd',
    color: darkMode ? '#fff' : '#000',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, color 0.3s',
    zIndex: 2,
  };

  const mainContentStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '0',
    textAlign: 'center',
    maxWidth: '800px',
    marginLeft: 'auto',
    marginRight: 'auto',
  };

  const centerSectionStyle = {
    minHeight: '80vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const boxesWrapperStyle = {
    marginTop: '10vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start', // Move boxes to the left
    paddingLeft: '2rem',      // Add some left padding for spacing
  };


  const h1Style = {
    fontSize: scrolled ? '3rem' : '4.5rem',
    margin: 0,
    transition: 'font-size 0.4s cubic-bezier(.23,1.01,.32,1)',
  };

  const subtitleStyle = {
    fontSize: scrolled ? '1.5rem' : '2.2rem',
    margin: '1rem 0 0.5rem 0',
    fontWeight: 500,
    transition: 'font-size 0.4s cubic-bezier(.23,1.01,.32,1)',
  };

  const sectionStyle = (visible) => ({
    background: darkMode ? '#232323' : '#fff',
    borderRadius: '10px',
    boxShadow: darkMode
      ? '0 2px 8px rgba(0,0,0,0.7)'
      : '0 2px 8px rgba(0,0,0,0.1)',
    padding: '2rem',
    margin: '1.5rem 0',
    width: '100%',
    transition: 'background 0.3s, box-shadow 0.3s, transform 0.6s cubic-bezier(.23,1.01,.32,1), opacity 0.6s',
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(80px)',
  });

  return (
    <div style={{ ...containerStyle, position: 'relative', overflow: 'hidden' }}>
      {/* Background image with blur effect */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
          backgroundImage: "url('/background1.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(8px)',
          opacity: 0.5,
          pointerEvents: 'none',
        }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <header style={headerStyle}>
          <img src="/habitmind.jpg" alt="HabitMind Logo" style={logoStyle} />
          <div style={rightButtonsStyle}>
            <button style={toggleButtonStyle} onClick={toggleDarkMode}>
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
            <button style={loginButtonStyle} onClick={() => navigate('/login')}>
              Login
            </button>
          </div>
        </header>
        <main style={mainContentStyle}>
          <div style={centerSectionStyle}>
            <h1 style={h1Style}>Welcome to HabitMind</h1>
            <p style={subtitleStyle}>
              Your journey to better habits starts here.
            </p>
          </div>
          <div style={boxesWrapperStyle}>
            <div
              ref={boxRefs[0]}
              style={sectionStyle(boxVisible[0])}
            >
              <h2>What is HabitMind?</h2>
              <p>
                HabitMind is your personal assistant for building and maintaining positive habits. Track your progress, set goals, and stay motivated on your journey to self-improvement.
              </p>
            </div>
            <div
              ref={boxRefs[1]}
              style={sectionStyle(boxVisible[1])}
            >
              <h2>Features</h2>
              <ul style={{ textAlign: 'left', maxWidth: 600, margin: '0 auto' }}>
                <li>🗓️ Habit tracking and streaks</li>
                <li>🎯 Goal setting and reminders</li>
                <li>📊 Progress statistics and analytics</li>
              </ul>
            </div>
            <div
              ref={boxRefs[2]}
              style={sectionStyle(boxVisible[2])}
            >
              <h2>Get Started</h2>
              <p>
                Click the <b>Login</b> button in the top right to sign in or create an account and start your habit journey!
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Main;
