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
    console.log("In generateVerificationCode: email received:", email);
    const verificationCode = crypto.randomBytes(3).toString('hex'); // Generate a random 6-character code
    console.log("Generated verification code:", verificationCode);

    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      // Check if a verification document already exists and delete it
      await Verification.findOneAndDelete({ email }).session(session);
      console.log("Previous verification document deleted if existed.");
      const lowerEmail=email.toLowerCase();
      // Store the verification code in the Verification collection
      const verificationDoc = new Verification({ email:lowerEmail, code: verificationCode });
      await verificationDoc.save({ session });
      console.log("Verification document saved successfully.");

      // Send verification email
      console.log("Attempting to send verification email...");
      await sendEmail(email, 'Email Verification', { code: verificationCode }, 'verificationTemplate.hbs');
      console.log("Verification email sent successfully.");

      await session.commitTransaction();
      session.endSession();

    return { message: 'Verification code sent to email'};
    } catch (error) {
      console.log("Something caused an error" );
      await session.abortTransaction();
      session.endSession();
      console.error("Error during verification code generation:", error.message);
      throw error;
    }
  };


 signup = async (userData, verificationCode) => {
  const { name, email, password } = userData;
  console.log( "in signup service ",name, email, password);
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("hashed code:",hashedPassword)
  const emailLower=email.toLowerCase();
  console.log("email lower: ",emailLower,verificationCode);
  const verificationCod = await Verification.findOne({ email:emailLower, code: verificationCode });
  console.log("verificationDoc: ",verificationCod)
  if (!verificationCod) {
    console.log('Invalid verification code')
    throw new Error('Invalid verification code');
  }
  console.log('hi from complete signup')
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const teacher = new Teacher({ name, email});
    const savedTeacher = await teacher.save({ session });
    console.log("after aseing the teacher "+ savedTeacher)
    // Delete the verification document as it's no longer needed
    await Verification.findOneAndDelete({ email, code: verificationCode }).session(session);

    // Save the password to the Password model
    const passwordEntry = new Password({ userId: savedTeacher._id, userType: 'Teacher', password: hashedPassword });
    await passwordEntry.save({ session });

    await session.commitTransaction();
    session.endSession();

    const token = generateToken({...savedTeacher, role: 'teacher'});

    return { user: savedTeacher, token };
  } catch (error) {
    console.log('error on signup: '+error.message)
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
}
