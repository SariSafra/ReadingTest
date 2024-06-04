import bcrypt from 'bcrypt';
import Student from '../models/Student.js';
import Teacher from '../models/Teacher.js';

export default class SignupService {
  signup = async (userData) => {
    const { name, email, password, role } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);

    let user;
    if (role === 'student') {
      user = new Student({ name, email, password: hashedPassword });
    } else if (role === 'teacher') {
      user = new Teacher({ name, email, password: hashedPassword });
    } else {
      throw new Error('Invalid role');
    }

    return await user.save();
  };
}
