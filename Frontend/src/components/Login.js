import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Logging in user:', { username, password });
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { username, password });
      console.log('Login successful:', response.data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error.response?.data?.message || error.message);
    }
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f2f5',
  };

  const formStyle = {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '300px',
    textAlign: 'center',
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
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  const linkStyle = {
    color: '#007bff',
    textDecoration: 'none',
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleLogin} style={formStyle}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
        <button type="submit" style={buttonStyle}>Login</button>
        <p>
          Don't have an account? <Link to="/register" style={linkStyle}>Register here</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
