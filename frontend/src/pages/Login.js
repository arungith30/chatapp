import React, { useState } from 'react';
import authService from '../services/authService';

const Login = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.login(userId, password);
      localStorage.setItem('token', response.data.token);
      // Redirect to chat page
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit}>
        <label>User ID:</label>
        <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
