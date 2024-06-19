// signupService.js
import bcrypt from 'bcrypt';
import Student from '../models/Student.model.js';
import Teacher from '../models/Teacher.model.js';
import Password from '../models/Password.js';
import generateToken from '../utils/token.js';
import mongoose from 'mongoose';
import crypto from 'crypto';
import Verification from '../models/Verification.model.js'; // Model to store verification codes
import sendEmail from '../utils/email/sendEmail.js' ;
export default class SignupService {
  generateVerificationCode = async (email) => {
    console.log("in generateVerificationCode email: "+email);
    const verificationCode = crypto.randomBytes(3).toString('hex'); // Generate a random 6-character code

    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      // Store the verification code in the Verification collection
      const verificationDoc = new Verification({ email, code: verificationCode });
      await verificationDoc.save({ session });
      console.log("in generateVerificationCode after make and save verificationDoc: ");

      // Send verification email
      console.log("Attempting to send verification email...");
      const payload={code: verificationCode}
      sendEmail(email, 'Email Verification', payload, 'verificationTemplate.handlebars');
      console.log("in generateVerificationCode after sending email: ");

      await session.commitTransaction();
      session.endSession();

      const token = generateToken({ email });
      console.log("in generateVerificationCode after make token: "+token);

      return { message: 'Verification code sent to email', token };
    } catch (error) {
      console.log("ssomthing made an error")
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  };

  signup = async (userData, verificationCode) => {
    const { name, email, password, role } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationDoc = await Verification.findOne({ email, code: verificationCode });
    if (!verificationDoc) {
      throw new Error('Invalid verification code');
    }

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
