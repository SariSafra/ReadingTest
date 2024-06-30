import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Cookies from 'js-cookie';
import { generateVerificationCode, completeSignup } from '../../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from './AuthContext';
import {UserContext} from './UserContext'; 

const Signup = () => {
  const [isCodeSent, setIsCodeSent] = useState(false);
  //const [token, setToken] = useState('');
  //const { setAuth } = useContext(AuthContext);
  const { user,setUser } = useContext(UserContext); // Use setUser from UserContext
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
      //setToken(response.data.token);
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
      console.log("user email from signup",values.email)
      setUser({username: values.email, role: 'teacher'}); // Set user details from response
      console.log("user from signup",user)
      Cookies.set('token', response.data.token, { expires: 1 }); // Set token in cookies for 1 day
      //setAuth({ role: 'teacher', token: response.data.token });
      navigate('/home/teacher'); // Redirect to teacher home page
    } catch (error) {
      console.error('Error completing signup:', error);
      toast.error('Error completing signup, try later');
    }
    setSubmitting(false);
  };

  return (
    <div>
      <h2>Teacher Sign Up</h2>
      <ToastContainer />
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
      <button type="button" onClick={() => navigate('/login')}>Login</button>
    </div>
  );
};

export default Signup;
