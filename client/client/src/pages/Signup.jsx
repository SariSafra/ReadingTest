import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Cookies from 'js-cookie';
import { generateVerificationCode, completeSignup } from '../services/api';

const Signup = () => {
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [token, setToken] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const emailValidationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required').lowercase(),
  });

  const completeSignupValidationSchema = Yup.object().shape({
    name: Yup.string().min(3, 'Name is too short!').max(30, 'Name is too long!').required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required').lowercase(),
    password: Yup.string().min(6, 'Password is too short!').required('Password is required'),
    verificationCode: Yup.string().required('Verification code is required'),
  });

  const handleGenerateCode = async (values, { setSubmitting }) => {
    try {
      const response = await generateVerificationCode({ email: values.email });
      setIsCodeSent(true);
      setToken(response.data.token);
      setSuccessMessage('Verification code sent to your email');
      setErrorMessage('');
      console.log('Verification code sent:', response.data.message);
    } catch (error) {
      console.error('Error generating verification code:', error);
      if (error.response && error.response.status === 400) {
        setErrorMessage('Email already in use');
      } else {
        setErrorMessage('Error generating verification code, try later');
      }
      setSuccessMessage('');
    }
    setSubmitting(false);
  };

  const handleCompleteSignup = async (values, { setSubmitting }) => {
    try {
      const response = await completeSignup({
        userData: {
          name: values.name,
          email: values.email,
          password: values.password,
        },
        verificationCode: values.verificationCode,
      });
      Cookies.set('token', response.data.token, { expires: 1 }); // Set token in cookies for 1 day
      navigate('/'); // Redirect to home page
    } catch (error) {
      console.error('Error completing signup:', error);
      setErrorMessage('Error completing signup, try later');
    }
    setSubmitting(false);
  };

  return (
    <div>
      <h2>Teacher Sign Up</h2>
      {isCodeSent ? (
        <Formik
          initialValues={{ name: '', email: '', password: '', verificationCode: '' }}
          validationSchema={completeSignupValidationSchema}
          onSubmit={handleCompleteSignup}
        >
          {({ isSubmitting }) => (
            <Form>
              <div>
                <Field type="text" name="verificationCode" placeholder="Verification Code" />
                <ErrorMessage name="verificationCode" component="div" />
              </div>
              <div>
                <Field type="text" name="name" placeholder="Name" />
                <ErrorMessage name="name" component="div" />
              </div>
              <div>
                <Field type="email" name="email" placeholder="Email" />
                <ErrorMessage name="email" component="div" />
              </div>
              <div>
                <Field type="password" name="password" placeholder="Password" />
                <ErrorMessage name="password" component="div" />
              </div>
              <button type="submit" disabled={isSubmitting}>Complete Signup</button>
              <button type="button" onClick={() => setIsCodeSent(false)}>Resend Verification Code</button>
            </Form>
          )}
        </Formik>
      ) : (
        <Formik
          initialValues={{ email: '' }}
          validationSchema={emailValidationSchema}
          onSubmit={handleGenerateCode}
        >
          {({ isSubmitting }) => (
            <Form>
              <div>
                <Field type="email" name="email" placeholder="Email" />
                <ErrorMessage name="email" component="div" />
              </div>
              <button type="submit" disabled={isSubmitting}>Send Verification Code</button>
            </Form>
          )}
        </Formik>
      )}
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <button type="button" onClick={() => navigate('/login')}>Login</button>
    </div>
  );
};

export default Signup;
