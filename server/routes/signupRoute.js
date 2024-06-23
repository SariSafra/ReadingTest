// signupRoute.js
import express from 'express';
import SignupController from '../controllers/signupController.js';
import { signupSchema, emailSchema,validateRequest } from '../middlewares/validationSchemas.js';

const signupRoute = express.Router();
const signupController = new SignupController();

signupRoute.post('/generate-code',validateRequest(emailSchema), signupController.generateVerificationCode);
signupRoute.post('/complete-signup',validateRequest(signupSchema), signupController.signup);

export default signupRoute;
