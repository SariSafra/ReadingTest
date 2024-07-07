import * as Yup from 'yup';

const emailValidationSchema = Yup.object().shape({
    email: Yup.string().email('כתובת מייל לא תקינה').required('זהו שדה חובה').lowercase(),
  });

  const completeSignupValidationSchema = Yup.object().shape({
    name: Yup.string().min(2, 'השם חייב להכי לפחות 2 תווים').max(30, 'השם לא יכול להכיל יותר מ-30 תווים').required('זהו שדה חובה'),
    email: Yup.string().email('כתובת מייל לא תקינה').required('זהו שדה חובה').lowercase(),
    password: Yup.string().min(6, 'סיסמא חייבת להכיל לפחות 6 תווים').required('זהו שדה חובה'),
    verificationCode: Yup.string().required('אימות קוד הוא חובה'),
  });

  export {emailValidationSchema, completeSignupValidationSchema};