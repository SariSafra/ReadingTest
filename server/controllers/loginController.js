import LoginService from '../services/loginService.js';

const loginService = new LoginService();

export default class LoginController {
  login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const token = await loginService.login(email, password);
      if (!token) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}
