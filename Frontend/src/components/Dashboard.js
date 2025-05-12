import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode); // Load dark mode state from localStorage

    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
          setUser(storedUser); // Use stored user details
        } else {
          const response = await axios.get('http://localhost:5000/api/users/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch user:', error.response?.data?.message || error.message);
      }
    };

    fetchUser();
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode); // Save dark mode state to localStorage
  };

  if (!user) return <p>Loading...</p>;

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    height: '100vh',
    padding: '1rem',
    backgroundColor: darkMode ? '#121212' : '#f0f2f5',
    color: darkMode ? '#ffffff' : '#000000',
    fontFamily: 'Arial, sans-serif',
    transition: 'background-color 0.3s, color 0.3s',
  };

  const cardStyle = {
    backgroundColor: darkMode ? '#2e2e2e' : '#fff',
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: darkMode ? '0 4px 6px rgba(0, 0, 0, 0.5)' : '0 4px 6px rgba(0, 0, 0, 0.1)',
    textAlign: 'left',
    width: 'auto',
    transition: 'background-color 0.3s, box-shadow 0.3s',
  };

  const headingStyle = {
    margin: 0,
    color: darkMode ? '#ffffff' : '#333',
    fontSize: '2.5rem',
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

  const buttonStyle = {
    padding: '0.5rem 1rem',
    backgroundColor: darkMode ? '#007bff' : '#007bff',
    color: '#fff',
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
        <h2 style={headingStyle}>Welcome, {user.username}</h2>
      </div>
    </div>
  );
}

export default Dashboard;
