import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Main() {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
  };

  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: darkMode ? '#121212' : '#f0f2f5',
    color: darkMode ? '#fff' : '#000',
    fontFamily: 'Arial, sans-serif',
    transition: 'background-color 0.3s, color 0.3s',
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '1rem 2rem',
    position: 'relative',
    justifyContent: 'flex-start', // Align items to the left
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

  const loginButtonStyle = {
    padding: '0.5rem 1.2rem',
    backgroundColor: darkMode ? '#007bff' : '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginLeft: '0',
  };

  const toggleButtonStyle = {
    position: 'absolute',
    top: '1rem',
    right: '2rem',
    padding: '0.5rem 1rem',
    backgroundColor: darkMode ? '#444' : '#ddd',
    color: darkMode ? '#fff' : '#000',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, color 0.3s',
  };

  const mainContentStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '10vh',
    textAlign: 'center',
  };

  const h1Style = {
    fontSize: '3rem', // Make the h1 text bigger
    margin: 0,
  };

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <img src="/habitmind.jpg" alt="HabitMind Logo" style={logoStyle} />
        <button style={loginButtonStyle} onClick={() => navigate('/login')}>
          Login
        </button>
        <button style={toggleButtonStyle} onClick={toggleDarkMode}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </header>
      <main style={mainContentStyle}>
        <h1 style={h1Style}>Welcome to HabitMind</h1>
        <p>Your journey to better habits starts here.</p>
      </main>
    </div>
  );
}

export default Main;
