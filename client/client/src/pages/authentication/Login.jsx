import React, { useContext, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Joi from 'joi';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from './AuthContext';
import { UserContext } from './UserContext'; // Import UserContext
import '../style/Login.css'; // Ensure this import points to your CSS file
import { Select , MenuItem, Input} from '@mui/material';
import { validationSchema } from '../../schemas/login';

  // Helper function to convert Joi validation to Formik validation
  const validate = (values) => {
    const { error } = validationSchema.validate(values, { abortEarly: false });
    if (!error) return {};
  
    const errors = {};
    error.details.forEach(detail => {
      errors[detail.path[0]] = detail.message;
    });
    return errors;
  };

function Login() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext); // Use setUser from UserContext

  useEffect(() => {
    if (user) {
      navigate(user.role === 'student' ? '/home/student' : '/home/teacher');
    }
  }, [user]);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      role: 'student'
    },
    validate,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await login(values);
        setUser({ username: values.username, role: values.role }); // Set user details from response
        Cookies.set('token', response.data.token, { expires: 1 }); // Set token in cookies for 1 day
        navigate(values.role === 'student' ? '/home/student' : '/home/teacher'); // Redirect based on role
      } catch (error) {
        toast.error('Error logging in: ' + error.message);
      } finally {
        setSubmitting(false);
      }
    }
  });

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Login</h2>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="p-field">
            <Select
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
              className="p-inputtext-lg"
            >
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="teacher">Teacher</MenuItem>
            </Select>
            {formik.errors.role && <div className="p-error">{formik.errors.role}</div>}
          </div>
          
          <div className="p-field">
            <Input
              type={formik.values.role === 'teacher' ? 'email' : 'text'}
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              placeholder={formik.values.role === 'teacher' ? 'Email' : 'ID'}
              className="p-inputtext-lg"
              required
            />
            {formik.errors.username && <div className="p-error">{formik.errors.username}</div>}
          </div>

          <div className="p-field">
            <Input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              placeholder="Password"
              className="p-inputtext-lg"
              required
            />
            {formik.errors.password && <div className="p-error">{formik.errors.password}</div>}
          </div>

          <button type="submit" className="login-button" disabled={formik.isSubmitting}>
            Login
          </button>
          <p className="login-prompt">OR</p>
          <button type="button" className="login-button" onClick={() => navigate('/signup')}>Sign Up</button>
        </form>
        <div className="login-prompt">
          <Link to="../password-reset-request">Forget password? Click to reset</Link>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Login;
