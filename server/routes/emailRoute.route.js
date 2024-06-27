import express from 'express';
import  {sendEmailController}  from '../controllers/emailController.js';

const emailRoute = express.Router();

emailRoute.post('/send-email', sendEmailController);

export default emailRoute;
