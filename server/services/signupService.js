import bcrypt from 'bcrypt';
import Student from '../models/Student.js';
import Teacher from '../models/Teacher.js';
import Password from '../models/Password.js'; // Import Password model
import generateToken from '../utils/token.js';
import mongoose from 'mongoose';

export default class SignupService {
  signup = async (userData) => {
    console.log("in signUp: " + userData);

    const { name, email, password, role } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);

    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      let user;
      if (role === 'student') {
        user = new Student({ name, email, password: hashedPassword });
      } else if (role === 'teacher') {
        user = new Teacher({ name, email, password: hashedPassword });
      } else {
        throw new Error('Invalid role');
      }

      const savedUser = await user.save({ session });

      const passwordDoc = new Password({
        userId: savedUser._id,
        userType: role === 'student' ? 'Student' : 'Teacher',
        password: hashedPassword
      });
      await passwordDoc.save({ session });

      await session.commitTransaction();
      session.endSession();

      const token = generateToken(savedUser);

      return { user: savedUser, token };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  };
}
