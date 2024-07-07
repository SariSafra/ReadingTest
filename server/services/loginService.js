import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Student from '../models/Student.model.js';
import Teacher from '../models/Teacher.model.js';
import Password from '../models/Password.js';

export default class LoginService {
  login = async (username, password, role) => {
    let user;
    if (role === 'teacher') {
      const email=username.toLowerCase();
      user = await Teacher.findOne({ email: email });
    } else {
      user = await Student.findOne({ studentId: username });
    }
    if (!user) {
      return null;
    }

    const userId = user._id;
    const user_password = await Password.findOne({ userId });
    if (!user_password) {
      return null;
    }

    const isMatch = await bcrypt.compare(password, user_password.password);
    if (!isMatch) {
      return null;
    }

    const token = jwt.sign(
      { id: user._id, role, username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    return token;
  };
}
