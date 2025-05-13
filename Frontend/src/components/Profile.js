import React, { useState, useEffect } from 'react';

function Profile() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode); // Load dark mode state from localStorage
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode); // Save dark mode state to localStorage
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: darkMode ? '#121212' : '#f0f2f5',
    color: darkMode ? '#ffffff' : '#000000',
    fontFamily: 'Arial, sans-serif',
    transition: 'background-color 0.3s, color 0.3s',
  };

  const cardStyle = {
    backgroundColor: darkMode ? '#2e2e2e' : '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: darkMode ? '0 4px 6px rgba(0, 0, 0, 0.5)' : '0 4px 6px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    width: '300px',
    transition: 'background-color 0.3s, box-shadow 0.3s',
  };

  const toggleButtonStyle = {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    padding: '0.5rem 1rem',
    backgroundColor: darkMode ? '#444' : '#ddd',
    color: darkMode ? '#fff' : '#000',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, color 0.3s',
  };

  return (
    <div style={containerStyle}>
      <button style={toggleButtonStyle} onClick={toggleDarkMode}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <div style={cardStyle}>
        <h2>Profile Page</h2>
        <p>Profile photo placeholder</p>
        <p>Stats placeholder</p>
        <p>Other details placeholder</p>
      </div>
    </div>
  );
}

export default Profile;
