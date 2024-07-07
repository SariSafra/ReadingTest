// File: src/components/PasswordReset.js

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { resetPassword } from '../../services/api';
import { TextField, Button, Typography, Container, Box, Alert } from '@mui/material';

const PasswordReset = () => {
  const location = useLocation();
  const navigate = useNavigate();

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
      setSuccessMessage('Password reset successful');
      setErrorMessage('');
      navigate('/login'); // Redirect to login page after successful reset
    } catch (error) {
      setErrorMessage(error.message);
      setSuccessMessage('');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          איפוס סיסמא
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 2 }}>
            <TextField
              type="password"
              label="סיסמא חדשה"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              fullWidth
              required
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              type="password"
              label="אימות סיסמא"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
              required
            />
          </Box>
          {errorMessage && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorMessage}
            </Alert>
          )}
          {successMessage && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {successMessage}
            </Alert>
          )}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            אפס סיסמא
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default PasswordReset;
