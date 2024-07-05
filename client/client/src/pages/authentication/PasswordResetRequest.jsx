import React, { useState } from 'react';
import { requestPasswordReset } from '../../services/api.js'

function PasswordResetRequest() {
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('Student');
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
        <h2>Request Password Reset</h2>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <select value={userType} onChange={(e) => setUserType(e.target.value)}>
          <option value="Teacher">Teacher</option>
        </select>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <button type="submit">Request Password Reset</button>
      </form>
    </div>
  );
}

export default PasswordResetRequest;