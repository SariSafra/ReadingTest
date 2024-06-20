import React, { useState } from 'react';
import { generateVerificationCode, completeSignup } from '../services/api';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [token, setToken] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleGenerateCode = async (e) => {
    e.preventDefault();
    try {
      const response = await generateVerificationCode({ email });
      setIsCodeSent(true);
      setToken(response.data.token);
      setSuccessMessage('Verification code sent to your email');
      setErrorMessage('');
      console.log('Verification code sent:', response.data.message);
    } catch (error) {
      console.error('Error generating verification code:', error);
      if (error.response.status == 400) {
        setErrorMessage('Email already in use');
      }
      else {
        setErrorMessage('Error generating verification code, Try later');
      }
      setSuccessMessage('');
    }
  };

  const handleCompleteSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await completeSignup({
        userData: { name, email, password },
        verificationCode,
      });
      Cookies.set('token', response.data.token, { expires: 1 }); // Set token in cookies for 1 day
      navigate('/'); // Redirect to home page
    } catch (error) {
      console.error('Error completing signup:', error);
    }
  };

  return (
    <form onSubmit={isCodeSent ? handleCompleteSignup : handleGenerateCode}>
      <h2>Teacher Sign Up</h2>
      {!isCodeSent ? (
        <>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
          <button type="submit">Send Verification Code</button>
        </>
      ) : (
        <>
          <input type="text" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} placeholder="Verification Code" required />
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
          <button type="submit">Complete Signup</button>
          <button type="button" onClick={handleGenerateCode}>Resend Verification Code</button>
        </>
      )}
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <button type="button" onClick={() => navigate('/login')}>Login</button>
    </form>
  );
}

export default Signup;
