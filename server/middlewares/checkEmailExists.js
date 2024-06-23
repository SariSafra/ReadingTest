import Teacher from '../models/Teacher.model.js';

const checkTeacherEmailExists = async (req, res, next) => {
  console.log("on checkTeacherEmailExists middleware ");
  const { email } = req.body;
  try {
    const teacher = await Teacher.findOne({ email });
    if (teacher) {
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

export default checkTeacherEmailExists;
