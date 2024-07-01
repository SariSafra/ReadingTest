import mongoose from 'mongoose';
import TeacherService from '../services/teacherService.js';
import { createPassword, deletePassword } from '../services/passwordService.js';
import Password from '../models/Password.js';
import StudentService from '../services/studentService.js';

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
      if (!teacher) {
        return res.status(404).json({ message: 'Teacher not found' });
      }
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
      session.commitTransaction();
    } catch (error) {
      session.abortTransaction();
      res.status(400).json({ message: error.message });
    }
    finally {
      session.endSession();
    }
    res.status(201).json(teacher);
  };

  updateTeacher = async (req, res) => {
    try {
      const teacher = await teacherService.updateTeacher(req.params.id, req.body);
      if (!teacher) {
        return res.status(404).json({ message: 'Teacher not found' });
      }
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
        return res.status(404).json({ message: 'Teacher not found' });
      }
      await deletePassword(teacher._id, session);
      for (const studentId of teacher.students) {
        await studentService.deleteStudent(studentId, session);
      }
      session.commitTransaction();
      
    } catch (error) {
      session.abortTransaction();
      res.status(500).json({ message: error.message });
    }
    finally {
      session.endSession();
    }
    res.status(200).json(teacher);
  };

  createStudent = async (req, res) => {
    console.log('create student controller ' + req.user._id)
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const teacher = await teacherService.getTeacherById(req.user.id, session);
      //console.log("teacher: "+teacher);
      if(!teacher)
        throw new Error("Teacher doesn't exist");
      console.log("after teacher");
      const student = await studentService.createStudent(req.body, session);
      console.log("student: " + student);
      teacher.students.push(student._id);
      await teacherService.updateTeacher(req.user.id, teacher, session);
      console.log('after creating, student: ' + student);

      session.commitTransaction();
      res.status(201).json(student);

    } catch (error) {
      session.abortTransaction();
      console.log(error.message);
      res.status(400).json({ message: error.message });
    }
    finally{
      session.endSession();
    }
  };

  getStudentsByTeacherEmail = async (req, res) => {
    const { teacherEmail } = req.params;
    try {
      const students = await teacherService.getStudentsByTeacherEmail(teacherEmail);
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

}
