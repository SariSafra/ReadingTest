// signupRoute.js
import express from 'express';
import SignupController from '../controllers/signupController.js';

const signupRoute = express.Router();
const signupController = new SignupController();

signupRoute.post('/generate-code', signupController.generateVerificationCode);
signupRoute.post('/complete-signup', signupController.signup);

export default signupRoute;
