// signupController.js
import SignupService from '../services/signupService.js';

const signupService = new SignupService();

export default class SignupController {
  generateVerificationCode = async (req, res) => {
    const { email } = req.body;
    try {
      const result = await signupService.generateVerificationCode(email);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  signup = async (req, res) => {
    const { userData, verificationCode } = req.body;
    try {
      const result = await signupService.signup(userData, verificationCode);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
}
