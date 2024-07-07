import mongoose from 'mongoose';
import TeacherService from '../services/teacherService.js';
import { createPassword, deletePassword } from '../services/passwordService.js';
import Password from '../models/Password.js';
import StudentService from '../services/studentService.js';
import Student from '../models/Student.model.js';



const teacherService = new TeacherService();
const studentService = new StudentService();

export default class TeacherController {
  getAllTeachers = async (req, res) => {
    try {
      const teachers = await teacherService.getAllTeachers();
      res.status(200).json(teachers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  getTeacherById = async (req, res) => {
    try {
      const teacher = await teacherService.getTeacherById(req.params.id);
      if (!teacher) 
        return res.status(404).json({ message: 'Teacher not found' });
      res.status(200).json(teacher);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  getTeacherByEmail = async (req, res) => {
    try {
      const teacher = await teacherService.getTeacherByEmail(req.params.email);
      if (!teacher) 
        return res.status(404).json({ message: 'Teacher not found' });
      res.status(200).json(teacher);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  createTeacher = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    let teacher;
    try {
      teacher = await teacherService.createTeacher(req.body, session);
      await createPassword(teacher._id, req.body.password, 'Teacher', session);
      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      res.status(400).json({ message: error.message });
    }
    finally {
      await session.endSession();
    }
    res.status(201).json(teacher);
  };

  updateTeacher = async (req, res) => {
    try {
      const teacher = await teacherService.updateTeacherById(req.params.id, req.body);
      if (!teacher) 
        return res.status(404).json({ message: 'Teacher not found' });
      res.status(200).json(teacher);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  updateTeacherByEmail = async (req, res) => {
    try {
      const teacher = await teacherService.updateTeacher({email:req.params.email}, req.body);
      if (!teacher) 
        return res.status(404).json({ message: 'Teacher not found' });
      res.status(200).json(teacher);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  deleteTeacher = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    let teacher
    try {
      teacher = await teacherService.deleteTeacher(req.params.id, session);
      if (!teacher) {
        await session.abortTransaction();
        return res.status(404).json({ message: 'Teacher not found' });
      }
      await deletePassword(teacher._id, session);
      for (const studentId of teacher.students) {
        await studentService.deleteStudent(studentId, session);
      }
      await session.commitTransaction();

    } catch (error) {
      await session.abortTransaction();
      res.status(500).json({ message: error.message });
    }
    finally {
      await session.endSession();
    }
    res.status(200).json(teacher);
  };

  createStudent = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const teacher = await teacherService.getTeacherById(req.user._id);
      if (!teacher) 
        throw new Error("Teacher doesn't exist");
      const studentData = {
        studentId: req.body.id,
        name: req.body.name,
        studentId: req.body.id,
        filePath: req.file ? req.file.path : null
      };

      const student = await studentService.createStudent(studentData, session);
      await createPassword(student._id, req.body.password, 'Student', session);
      teacher.students.push(student._id);
      await teacherService.updateTeacher({email:teacher.email}, teacher, session);
      await session.commitTransaction();
      res.status(201).json(student);

    } catch (error) {
      await session.abortTransaction();
      console.error("Transaction aborted due to an error: ", error.message);
      res.status(400).json({ message: error.message });
    } finally {
      await session.endSession();
    }
  }


  getStudentsByTeacherEmail = async (req, res) => {
    const { email } = req.params;
    try {
      const students = await teacherService.getStudentsByTeacherEmail(email);
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

}
