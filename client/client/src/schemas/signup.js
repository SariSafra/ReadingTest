import * as Yup from 'yup';

const emailValidationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required').lowercase(),
  });

  const completeSignupValidationSchema = Yup.object().shape({
    name: Yup.string().min(3, 'Name is too short!').max(30, 'Name is too long!').required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required').lowercase(),
    password: Yup.string().min(6, 'Password is too short!').required('Password is required'),
    verificationCode: Yup.string().required('Verification code is required'),
  });

  export {emailValidationSchema, completeSignupValidationSchema};