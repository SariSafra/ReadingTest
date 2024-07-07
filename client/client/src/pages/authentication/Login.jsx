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
  //const { auth, setAuth } = useContext(AuthContext);
  const { user,setUser } = useContext(UserContext); // Use setUser from UserContext

  useEffect(() => {
    console.log('user: '+user);
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
        setUser({username: values.username, role: values.role }); // Set user details from response
        Cookies.set('token', response.data.token, { expires: 1 }); // Set token in cookies for 1 day
        // const authData = { role: values.role, token: response.data.token };
        // setAuth(authData);
        console.log("in login values.username",values.username)
        //console.log("user", user);
        // localStorage.setItem('auth', JSON.stringify(authData)); // Save to localStorage
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
          <h2>התחבר</h2>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="p-field">
            <Select
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
              className="p-inputtext-lg"
            >
              <MenuItem value="student">תלמיד</MenuItem>
              <MenuItem value="teacher">מורה</MenuItem>
            </Select>
            {formik.errors.role && <div className="p-error">{formik.errors.role}</div>}
          </div>
          
          <div className="p-field">
            <Input
              type={formik.values.role === 'teacher' ? 'email' : 'text'}
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              placeholder={formik.values.role === 'teacher' ? 'Email' : 'תעודת זהות'}
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
              placeholder="סיסמא"
              className="p-inputtext-lg"
              required
            />
            {formik.errors.password && <div className="p-error">{formik.errors.password}</div>}
          </div>

        <button type="submit" disabled={formik.isSubmitting}>התחבר </button>
        <button type="button" onClick={() => navigate('/signup')}>הירשם</button>
        <button type="button" onClick={() => navigate('/password-reset')}>שכחתי סיסמא</button>
      </form>
      <Link to="../password-reset-request">שכחת סיסמא? לחץ כאן כדי לאפס</Link>
      <ToastContainer />
    </div>
    </div>
  );
}

export default Login;
