import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

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
    alignItems: 'flex-start', // Align all content to the left
    justifyContent: 'flex-start',
    height: '100vh',
    padding: '1rem',
    backgroundColor: darkMode ? '#121212' : '#f0f2f5',
    color: darkMode ? '#ffffff' : '#000000',
    fontFamily: 'Arial, sans-serif',
    transition: 'background-color 0.3s, color 0.3s',
    position: 'relative',
  };

  const cardStyle = {
    backgroundColor: darkMode ? '#2e2e2e' : '#fff',
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: darkMode ? '0 4px 6px rgba(0, 0, 0, 0.5)' : '0 4px 6px rgba(0, 0, 0, 0.1)',
    textAlign: 'left',
    width: 'auto',
    transition: 'background-color 0.3s, box-shadow 0.3s',
    marginBottom: '1rem',
  };

  const profileCardStyle = {
    ...cardStyle,
    height: '2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.5rem 1rem',
    minWidth: '70px',
    width: 'fit-content',
    marginBottom: 0,
    cursor: 'pointer',
  };

  const headingStyle = {
    margin: 0,
    color: darkMode ? '#ffffff' : '#333',
    fontSize: '2rem',
  };

  const goPremiumButtonStyle = {
    padding: '0.8rem 2rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '1.2rem',
    minWidth: '120px',
    position: 'absolute',
    top: '1rem',
    left: '50%',
    transform: 'translateX(-50%)',
    margin: 0,
    display: 'block',
    transition: 'background-color 0.3s, color 0.3s',
    zIndex: 11,
    marginLeft: 0, // Remove auto margin so button stays centered in absolute position
    marginRight: 0,
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
    zIndex: 12,
  };

  const handleProfileClick = () => {
    navigate('/profile'); // Navigate to the profile page
  };

  return (
    <div style={containerStyle}>
      <button
        style={goPremiumButtonStyle}
        onClick={() => {
          window.location.href = "https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=YOUR_BUTTON_ID";
        }}
      >
        Go Premium
      </button>
      <button style={toggleButtonStyle} onClick={toggleDarkMode}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <div style={cardStyle}>
        <h2 style={headingStyle}>Welcome, {user.username}</h2>
      </div>
      <div style={profileCardStyle} onClick={handleProfileClick}>
        <h3 style={{ margin: 0, fontSize: '1rem' }}>Profile</h3>
      </div>
    </div>
  );
}

export default Dashboard;
