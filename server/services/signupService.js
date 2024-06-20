import bcrypt from 'bcrypt';
import Student from '../models/Student.model.js';
import Teacher from '../models/Teacher.model.js';
import Password from '../models/Password.js';
import generateToken from '../utils/token.js';
import mongoose from 'mongoose';
import sendEmail from '../utils/email/sendEmail.js';
import crypto from 'crypto';
import Verification from '../models/Verification.model.js'; // Model to store verification codes

export default class SignupService {
  generateVerificationCode = async (email) => {
    console.log("In generateVerificationCode: email received:", email);
    const verificationCode = crypto.randomBytes(3).toString('hex'); // Generate a random 6-character code
    console.log("Generated verification code:", verificationCode);
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      // Store the verification code in the Verification collection
      const verificationDoc = new Verification({ email, code: verificationCode });
      await verificationDoc.save({ session });
      console.log("Verification document saved successfully.");

      await session.commitTransaction();
      session.endSession();

      const token = generateToken({ email });
      console.log("Token generated successfully:", token);

      // Send verification email outside the transaction
      console.log("Attempting to send verification email...");
      await sendEmail(email, 'Email Verification', { code: verificationCode }, 'verificationTemplate.handlebars');
      console.log("Verification email sent successfully.");

      return { message: 'Verification code sent to email', token };
    } catch (error) {
      console.log("somthing made an error");
      await session.abortTransaction();
      session.endSession();
      console.error("Error during verification code generation:", error.message);
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
