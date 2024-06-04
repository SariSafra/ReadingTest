import SignupService from '../services/signupService.js';

const signupService = new SignupService();

export default class SignupController {
  signup = async (req, res) => {
    try {
      const user = await signupService.signup(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
}
