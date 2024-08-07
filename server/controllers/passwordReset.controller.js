import { requestPasswordReset, resetPassword } from '../services/passwordReset.service.js';

export const handleRequestPasswordReset = async (req, res) => {
  try {
    const { email, userType } = req.body;
    const link = await requestPasswordReset(email, userType);
    res.status(201).send('Password reset link sent to your email account');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const handleResetPassword = async (req, res) => {
  try {
    const { userId, token, newPassword, userType } = req.body;
    await resetPassword(userId, token, newPassword, userType);
    res.status(201).send('Password reset successful');
  } catch (error) {
    res.status(400).send(error.message);
  }
};
