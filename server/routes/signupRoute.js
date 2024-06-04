import express from 'express';
import SignupController from '../controllers/signupController.js';

const signupRoute = express.Router();
const signupController = new SignupController();

signupRoute.post('/', signupController.signup);

export default signupRoute;
