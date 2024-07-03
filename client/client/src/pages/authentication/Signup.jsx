import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Cookies from 'js-cookie';
import { generateVerificationCode, completeSignup } from '../../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from './AuthContext';
import { UserContext } from './UserContext'; 
import { Card } from '@mui/material';
import { InputText } from 'primereact/inputtext'; // Import InputText from primereact
import { Password } from 'primereact/password'; // Import Password from primereact
import { Button } from 'primereact/button'; // Import Button from primereact
import { emailValidationSchema,completeSignupValidationSchema } from '../../schemas/signup';

const Signup = () => {
  const [isCodeSent, setIsCodeSent] = useState(false);
  const { user, setUser } = useContext(UserContext); // Use setUser from UserContext
  const navigate = useNavigate();

  const handleGenerateCode = async (values, { setSubmitting }) => {
    try {
      const response = await generateVerificationCode({ email: values.email });
      setIsCodeSent(true);
      toast.success('Verification code sent to your email');
      console.log('Verification code sent:', response.data.message);
    } catch (error) {
      console.error('Error generating verification code:', error);
      if (error.response && error.response.status === 400) {
        toast.error('Email already in use');
      } else {
        toast.error('Error generating verification code, try later');
      }
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
      console.log("user email from signup", values.email);
      setUser({ username: values.email, role: 'teacher' }); // Set user details from response
      console.log("user from signup", user);
      Cookies.set('token', response.data.token, { expires: 1 }); // Set token in cookies for 1 day
      localStorage.setItem('user', JSON.stringify(values.email)); // Save user data to localStorage
      navigate('/home/teacher'); // Redirect to teacher home page
    } catch (error) {
      console.error('Error completing signup:', error);
      toast.error('Error completing signup, try later');
    }
    setSubmitting(false);
  };

  return (
    <div className="signup-container">
      <Card className="signup-card">
        <ToastContainer />
        <div className="signup-header">
          <h2>Save Your Account Now</h2>
          <p>Get unlimited type of forms, questions and responses, Free forever</p>
        </div>
        {isCodeSent ? (
          <Formik
            initialValues={{ name: '', email: '', password: '', verificationCode: '' }}
            validationSchema={completeSignupValidationSchema}
            onSubmit={handleCompleteSignup}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="p-field">
                  <Field name="verificationCode" placeholder="Verification Code" as={InputText} className="p-inputtext-lg" />
                  <ErrorMessage name="verificationCode" component="div" className="p-error" />
                </div>
                <div className="p-field">
                  <Field name="name" placeholder="Full Name" as={InputText} className="p-inputtext-lg" />
                  <ErrorMessage name="name" component="div" className="p-error" />
                </div>
                <div className="p-field">
                  <Field name="email" placeholder="E-mail" type="email" as={InputText} className="p-inputtext-lg" disabled={isCodeSent} />
                  <ErrorMessage name="email" component="div" className="p-error" />
                </div>
                <div className="p-field">
                  <Field name="password" placeholder="Password" type="password" as={Password} feedback={false} className="p-password-lg" />
                  <ErrorMessage name="password" component="div" className="p-error" />
                </div>
                <Button label="Sign Up" icon="pi pi-user" type="submit" disabled={isSubmitting} className="signup-button" />
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
                <div className="p-field">
                  <Field name="email" placeholder="E-mail" type="email" as={InputText} className="p-inputtext-lg" />
                  <ErrorMessage name="email" component="div" className="p-error" />
                </div>
                <Button label="Send Verification Code" icon="pi pi-envelope" type="submit" disabled={isSubmitting} className="signup-button" />
              </Form>
            )}
          </Formik>
        )}
        <p className="login-prompt">
          Already have an account? <a href="#" onClick={() => navigate('/login')}>Login</a>
        </p>
      </Card>
    </div>
  );
};

export default Signup;
