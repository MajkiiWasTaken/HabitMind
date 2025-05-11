import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
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

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>Welcome, {user.username}</h2>
      <p>Email: {user.email}</p>
    </div>
  );
}

export default Dashboard;
