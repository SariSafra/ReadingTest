// File: src/components/PasswordReset.js

import React, { useState , navigate} from 'react';
import { useLocation } from 'react-router-dom';
import { resetPassword } from '../services/api';

const PasswordReset = () => {
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const token = query.get('token');
  const userId = query.get('id');
  const userType = query.get('type');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      const response = await resetPassword({ userId, token, newPassword, userType });
      console.log('Password reset successful:', response.data);

      if (!response.ok) {
        throw new Error(await response.text());
      }

      setSuccessMessage('Password reset successful');
      setErrorMessage('');
      navigate('/login'); // Redirect to login page after successful reset
    } catch (error) {
      setErrorMessage('ERROR');
      setSuccessMessage('');
    }
  };

  return (
    <div className="password-reset-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default PasswordReset;
