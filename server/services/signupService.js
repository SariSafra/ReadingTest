import bcrypt from 'bcrypt';
import Student from '../models/Student.model.js';
import Teacher from '../models/Teacher.model.js';
import mongoose from 'mongoose';

export default class TeacherService {
  createStudent = async (teacherId, studentData) => {
    const { name, password } = studentData;
    const hashedPassword = await bcrypt.hash(password, 10);

    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const student = new Student({ name, password: hashedPassword });
      const savedStudent = await student.save({ session });

      // Update teacher's record to include this student
      const teacher = await Teacher.findById(teacherId).session(session);
      if (!teacher) {
        throw new Error('Teacher not found');
      }
      if (!teacher.students) {
        teacher.students = [];
      }
      teacher.students.push(savedStudent._id);
      await teacher.save({ session });

      await session.commitTransaction();
      session.endSession();

      return savedStudent;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  };

  updateTeacherPassword = async (teacherId, newPassword) => {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const teacher = await Teacher.findById(teacherId).session(session);
      if (!teacher) {
        throw new Error('Teacher not found');
      }

      teacher.password = hashedPassword;
      await teacher.save({ session });

      await session.commitTransaction();
      session.endSession();

      return teacher;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  };
}
