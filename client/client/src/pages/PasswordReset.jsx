import React, { useState } from 'react';
import axios from 'axios';

function PasswordReset() {
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('student');

  const handleRequestReset = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/password/requestPasswordReset', { email, userType });
      console.log('Password reset request successful:', response.data);
    } catch (error) {
      console.error('Error requesting password reset:', error);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const userId = 'some-user-id'; // Adjust as needed
    const token = 'some-token'; // Adjust as needed
    const newPassword = 'new-password'; // Adjust as needed

    try {
      const response = await axios.post('/password/resetPassword', { userId, token, newPassword, userType });
      console.log('Password reset successful:', response.data);
    } catch (error) {
      console.error('Error resetting password:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleRequestReset}>
        <h2>Request Password Reset</h2>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <select value={userType} onChange={(e) => setUserType(e.target.value)}>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
        <button type="submit">Request Password Reset</button>
      </form>

      <form onSubmit={handleResetPassword}>
        <h2>Reset Password</h2>
        <input type="password" placeholder="New Password" required />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}

export default PasswordReset;