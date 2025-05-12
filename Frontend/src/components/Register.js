import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode); // Load dark mode state from localStorage
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log('Registering user:', { username, email, password });
    try {
      await axios.post('http://localhost:5000/api/users/register', { username, email, password });
      console.log('Registration successful');
      navigate('/');
    } catch (error) {
      console.error('Registration failed:', error.response?.data?.message || error.message);
    }
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode); // Save dark mode state to localStorage
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: darkMode ? '#121212' : '#f0f2f5',
    color: darkMode ? '#ffffff' : '#000000',
    transition: 'background-color 0.3s, color 0.3s',
  };

  const formStyle = {
    backgroundColor: darkMode ? '#1e1e1e' : '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: darkMode ? '0 4px 6px rgba(0, 0, 0, 0.5)' : '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '300px',
    textAlign: 'center',
    transition: 'background-color 0.3s, box-shadow 0.3s',
  };

  const inputStyle = {
    width: '94%',
    padding: '0.5rem',
    margin: '0.5rem 0',
    borderRadius: '4px',
    border: '1px solid #ccc',
  };

  const buttonStyle = {
    width: '100%',
    padding: '0.5rem',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  const linkStyle = {
    color: darkMode ? '#4da6ff' : '#007bff',
    textDecoration: 'none',
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
      <form onSubmit={handleRegister} style={formStyle}>
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={inputStyle}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
          required
        />
        <button type="submit" style={buttonStyle}>Register</button>
        <p>
          Already have an account? <Link to="/" style={linkStyle}>Login here</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
