import jwt from 'jsonwebtoken';
import Student from '../models/Student.model.js';
import Teacher from '../models/Teacher.model.js';
import StudentService from '../services/studentService.js';
import TeacherService from '../services/teacherService.js';
const studentService = new StudentService();
const teacherService = new TeacherService();

const authMiddleware = async (req, res, next) => {
  console.log("in auth middleware ");

  const authHeader = req.header('Authorization');
  if (!authHeader) {
    console.log('no token')
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
console.log("in auth middleware authHeader",authHeader)
  const token = authHeader.replace('Bearer ', '');
  if (!token) {
    console.log('no token')
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  console.log('tere is token')
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('decoded: ' + decoded)
    let user;
    try {
      user = await studentService.getStudentById(decoded.id);
    }
    catch {
      user = await teacherService.getTeacherById(decoded.id);
    }
    if (!user) {
      console.log('user not found')
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.user = user;
    req.role = decoded.role;
    console.log('passs auth');
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' + error.message });
  }
};

export default authMiddleware;
