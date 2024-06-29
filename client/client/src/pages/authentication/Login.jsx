import React, { useContext, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Joi from 'joi';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from './AuthContext';

// Define validation schema with Joi
const validationSchema = Joi.object({
  username: Joi.string().required().label('Username'),
  password: Joi.string().min(6).required().label('Password'),
  role: Joi.string().valid('student', 'teacher').required().label('Role')
});

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
  const { auth, setAuth } = useContext(AuthContext);

  useEffect(() => {
    if (auth.token) {
      navigate(auth.role === 'student' ? '/studentHome' : '/teacherHome');
    }
  }, [auth, navigate]);

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
        Cookies.set('token', response.data.token, { expires: 1 }); // Set token in cookies for 1 day
        const authData = { role: values.role, token: response.data.token };
        setAuth(authData);
        localStorage.setItem('auth', JSON.stringify(authData)); // Save to localStorage
        navigate(values.role === 'student' ? '/studentHome' : '/teacherHome'); // Redirect based on role
      } catch (error) {
        toast.error('Error logging in: ' + error.message);
      } finally {
        setSubmitting(false);
      }
    }
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <h2>Login</h2>
        <select
          name="role"
          value={formik.values.role}
          onChange={formik.handleChange}
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
        {formik.errors.role && <div>{formik.errors.role}</div>}

        <input
          type={formik.values.role === 'teacher' ? 'email' : 'text'}
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          placeholder={formik.values.role === 'teacher' ? 'Email' : 'ID'}
          required
        />
        {formik.errors.username && <div>{formik.errors.username}</div>}

        <input
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          placeholder="Password"
          required
        />
        {formik.errors.password && <div>{formik.errors.password}</div>}

        <button type="submit" disabled={formik.isSubmitting}>
          Login
        </button>
        <button type="button" onClick={() => navigate('/signup')}>Sign Up</button>
        <button type="button" onClick={() => navigate('/password-reset')}>Forgot Password?</button>
      </form>
      <Link to="../password-reset-request">Forget password? Click to reset</Link>
      <ToastContainer />
    </div>
  );
}

export default Login;
