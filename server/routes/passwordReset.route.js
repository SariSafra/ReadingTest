import express from 'express';
import { handleRequestPasswordReset, handleResetPassword } from '../controllers/passwordReset.controller.js';

const passwordResetRoute = express.Router();

passwordResetRoute.post('/requestPasswordReset', handleRequestPasswordReset);
passwordResetRoute.post('/resetPassword', handleResetPassword);

export default passwordResetRoute;
