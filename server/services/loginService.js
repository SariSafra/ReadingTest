import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Student from '../models/Student.model.js';
import Teacher from '../models/Teacher.model.js';
import Password from '../models/Password.js';

export default class LoginService {
  login = async (emailOrId, password, role) => {
    console.log("in login service",emailOrName, password, role);

    let user;
    if (role === 'teacher') {
      console.log("is a teacher")
      const email=emailOrName.toLowerCase();
      user = await Teacher.findOne({ email: emailOrId });
    } else {
      console.log("is not a teacher")
      user = await Student.findOne({ studentId: emailOrId });
    }

    console.log("user details: " + user);
    if (!user) {
      return null;
    }

    const userId = user._id;
    const user_password = await Password.findOne({ userId });
    console.log("user password: " + user_password);
    if (!user_password) {
      return null;
    }

    const isMatch = await bcrypt.compare(password, user_password.password);
    console.log("is matched: " + isMatch);
    if (!isMatch) {
      return null;
    }

    const token = jwt.sign(
      { id: user._id, role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log("after sign");
    return token;
  };
}
