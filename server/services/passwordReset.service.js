import Teacher from '../models/Teacher.model.js';
import Student from '../models/Student.model.js';
import Token from '../models/Token.model.js';
import sendEmail from '../utils/email/sendEmail.js';
import bcrypt from 'bcrypt';


const getUserModel = (userType) => {
  if (userType === 'Teacher') return Teacher;
  if (userType === 'Student') return Student;
  throw new Error('Invalid user type');
};

export const requestPasswordReset = async (email, userType) => {
  console.log("in service, email: "+email);
  const User = getUserModel(userType);
  const user = await User.findOne({ email });
  if (!user) throw new Error('User does not exist');
  console.log("user : "+user);

  let token = await Token.findOne({ userId: user._id, userType });
  if (token) await token.deleteOne();

  const resetToken = (await bcrypt.genSalt(10)).replace(/\//g, ''); // URL-safe token
  const hash = await bcrypt.hash(resetToken, 10);
  await new Token({
    userId: user._id,
    userType,
    token: hash,
    createdAt: Date.now(),
  }).save();
  console.log("before sending email");
  const link = `${process.env.CLIENT_URL}/passwordReset?token=${resetToken}&id=${user._id}&type=${userType}`;
  const payload = { name: user.name, link: link };
  sendEmail(user.email, 'Password Reset Request', payload, '../template/requestResetPassword.handlebars');
  return link;
};

export const resetPassword = async (userId, token, newPassword, userType) => {
  const passwordResetToken = await Token.findOne({ userId, userType });
  if (!passwordResetToken) throw new Error('Invalid or expired password reset token');

  const isValid = await bcrypt.compare(token, passwordResetToken.token);
  if (!isValid) throw new Error('Invalid or expired password reset token');

  const User = getUserModel(userType);
  const hash = await bcrypt.hash(newPassword, 10);
  await User.updateOne({ _id: userId }, { password: hash }, { new: true });
  await passwordResetToken.deleteOne();
};
