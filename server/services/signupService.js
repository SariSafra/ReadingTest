import bcrypt from 'bcrypt';
import Teacher from '../models/Teacher.model.js';
import generateToken from '../utils/token.js';
import mongoose from 'mongoose';
import sendEmail from '../utils/email/sendEmail.js';
import crypto from 'crypto';
import Verification from '../models/Verification.model.js'; // Model to store verification codes
import Password from '../models/Password.js'; // Import Password model

export default class SignupService {
  generateVerificationCode = async (email) => {
    const verificationCode = crypto.randomBytes(3).toString('hex'); // Generate a random 6-character code
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      await Verification.findOneAndDelete({ email }).session(session);
      const lowerEmail=email.toLowerCase();
      const verificationDoc = new Verification({ email:lowerEmail, code: verificationCode });
      await verificationDoc.save({ session });
      await sendEmail(email, 'Email Verification', { code: verificationCode }, 'verificationTemplate.hbs');
      await session.commitTransaction();
      session.endSession();

    return { message: 'Verification code sent to email'};
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error("Error during verification code generation:", error.message);
      throw error;
    }
  };


 signup = async (userData, verificationCode) => {
  const { name, email, password } = userData;
  const hashedPassword = await bcrypt.hash(password, 10);
  const emailLower=email.toLowerCase();
  const verificationCod = await Verification.findOne({ email:emailLower, code: verificationCode });
  if (!verificationCod) 
    throw new Error('Invalid verification code');
    const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const teacher = new Teacher({ name, email});
    const savedTeacher = await teacher.save({ session });
    await Verification.findOneAndDelete({ email, code: verificationCode }).session(session);
    const passwordEntry = new Password({ userId: savedTeacher._id, userType: 'Teacher', password: hashedPassword });
    await passwordEntry.save({ session });
    await session.commitTransaction();
    session.endSession();
    const token = generateToken({...savedTeacher, role: 'teacher'});
    return { user: savedTeacher, token };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
}
