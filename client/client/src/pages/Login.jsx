import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/api';

function Login() {
  const [emailOrName, setEmailOrName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ emailOrName, password, role });
      Cookies.set('token', response.data.token, { expires: 1 }); // Set token in cookies for 1 day
      navigate('/'); // Redirect to home page
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
        <input
          type={role === 'teacher' ? 'email' : 'text'}
          value={emailOrName}
          onChange={(e) => setEmailOrName(e.target.value)}
          placeholder={role === 'teacher' ? 'Email' : 'Name'}
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
        <button type="button" onClick={() => navigate('/signup')}>Sign Up</button>
        <button type="button" onClick={() => navigate('/password-reset')}>Forgot Password?</button>
      </form>
      <Link to="../password-reset-request">Forget password? Click to reset</Link>
    </div>
  );
}

export default Login;
