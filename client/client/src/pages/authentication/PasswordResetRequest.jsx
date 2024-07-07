import React, { useState } from 'react';
import { requestPasswordReset } from '../../services/api.js'
import {Input, Select, MenuItem, FormControl} from '@mui/material'

function PasswordResetRequest() {
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('Teacher');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleRequestReset = async (e) => {
    e.preventDefault();
    try {
      const response = await requestPasswordReset({ email, userType });
      if (response.status!=201) {
        throw new Error(await response.text());
      }
      setSuccessMessage('Link for reset sent to your email');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('ERROR');
      setSuccessMessage('');
    }
  };

  return (
    <div>
    <form onSubmit={handleRequestReset}>
        <h2>איפוס סיסמא</h2>

        <FormControl fullWidth margin="normal">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <Select value={userType} onChange={(e) => setUserType(e.target.value)}>
            <MenuItem value="Teacher">מורה</MenuItem>
          </Select>
        </FormControl>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <button type="submit">איפוס סיסמא</button>
      </form>
    </div>
  );
}

export default PasswordResetRequest;