import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState(''); // Changed to lowercase 'username'
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Logging in user:', { username, password }); // Debugging log
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { username, password }); // Changed to lowercase 'username'
      console.log('Login successful:', response.data); // Debugging log
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user)); // Store user details
      navigate('/dashboard'); // Navigate to the dashboard
    } catch (error) {
      console.error('Login failed:', error.response?.data?.message || error.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input
        type="text" // Changed type to 'text'
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </form>
  );
}

export default Login;
