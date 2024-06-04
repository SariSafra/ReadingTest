import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Student from '../models/Student.js';
import Teacher from '../models/Teacher.js';

export default class LoginService {
  login = async (email, password) => {
    const user = await Student.findOne({ email }) || await Teacher.findOne({ email });
    if (!user) {
      return null;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return null;
    }
    const token = jwt.sign({ id: user._id, role: user instanceof Student ? 'student' : 'teacher' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
  };
}
