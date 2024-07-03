import React, { useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Cookies from 'js-cookie';
import { generateVerificationCode, completeSignup } from '../../services/api';
import { ToastContainer, toast } from 'react-toastify';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import 'react-toastify/dist/ReactToastify.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import AuthContext from './AuthContext';
import { UserContext } from './UserContext'; 
import '../style/Signup.css'; // Import custom CSS for styling
import logo from '../../img/logo.png';
import {completeSignupValidationSchema, emailValidationSchema} from '../../schemas/signup.js'

const Signup = () => {
  const [isCodeSent, setIsCodeSent] = useState(false);
  const { user, setUser } = useContext(UserContext); // Use setUser from UserContext
  const navigate = useNavigate();
  const toast = useRef(null);

  const handleGenerateCode = async (values, { setSubmitting }) => {
    try {
      await generateVerificationCode({ email: values.email });
      setIsCodeSent(true);
      toast.current.show({ severity: 'success', summary: 'Success', detail: 'Verification code sent to your email', life: 3000 });
    } catch (error) {
      console.error('Error generating verification code:', error);
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error generating verification code, try later', life: 3000 });
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
      setUser({ username: values.email, role: 'teacher' }); // Set user details from response
      Cookies.set('token', response.data.token, { expires: 1 }); // Set token in cookies for 1 day
      localStorage.setItem('user', JSON.stringify(values.email)); // Save user data to localStorage
      navigate('/home/teacher'); // Redirect to teacher home page
    } catch (error) {
      console.error('Error completing signup:', error);
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error completing signup, try later', life: 3000 });
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
                  <Field name="email" placeholder="E-mail" type="email" as={InputText} className="p-inputtext-lg" disabled={isCodeSent}/>
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
      <Toast ref={toast} />
    </div>
  );
};

export default Signup;
