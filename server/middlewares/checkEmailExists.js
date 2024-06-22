import Teacher from '../models/Teacher.model.js';
import Student from '../models/Student.model.js';
import mongoose from 'mongoose';

const checkEmailExists = async (req, res, next) => {
  console.log("on checkTeacherEmailExists middleware ");
  const { email, type } = req.body;
  const lowerCaseEmail = email.toLowerCase();
  const userModel = mongoose.model(type);
  try {
    const user = await userModel.findOne({ lowerCaseEmail });
    if (user) {
      console.log("email exists")
      return res.status(400).json({ message: 'Email already exists' });
    }
    console.log("email not exists")
    next();
  } catch (error) {
    console.error('Error checking email:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default checkEmailExists;
