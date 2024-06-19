// src/pages/Login.js
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      Cookies.set('token', response.data.token, { expires: 1 }); // Set token in cookies for 1 day
      navigate('/'); // Redirect to home page
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Login</button>
      <button type="button" onClick={() => navigate('/signup')}>Sign Up</button>
      <button type="button" onClick={() => navigate('/password-reset')}>Forgot Password?</button>
    </form>
  );
}

export default Login;
