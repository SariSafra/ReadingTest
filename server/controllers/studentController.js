import StudentService from '../services/studentService.js';
import Diagnosis from '../models/Diagnosis.js';
import DiagnosisService from '../services/diagnosisService.js';
import { createPassword, deletePassword } from '../services/passwordService.js';
import mongoose from 'mongoose'
import Student from '../models/Student.model.js';
import Password from '../models/Password.js';

const studentService = new StudentService();
const diagnosisService = new DiagnosisService();

export default class StudentController {
  getAllStudents = async (req, res) => {
    try {
      const students = await studentService.getAllStudents();
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  getStudentById = async (req, res) => {
    try {
      const student = await studentService.getStudentById(req.params.id);
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
      res.status(200).json(student);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  getStudentByStudentId = async (req, res) => {
    try {
      console.log("in getStudent by student i controller")
      const student = await studentService.getStudentByStudentId(req.params.id);
      console.log("student", student)
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
      res.status(200).json(student);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  createStudent = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      let studentData = req.body;
      if (req.body.diagnosis) {
        const diagnosis = await diagnosisService.createDiagnosis(req.body.diagnosis, session);
        studentData = { ...req.body, diagnoses: diagnosis._id }
      }
      const student = await studentService.createStudent(studentData, session);
      await createPassword(new Password(student._id, 'Student', req.body.password), session);
      await session.commitTransaction();
      res.status(201).json(student);
    } catch (error) {
      await session.abortTransaction();
      res.status(400).json({ message: error.message });
    }
    finally {
      await session.endSession();
    }
  }

  updateStudent = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    let student;

    try {
      if (req.file)
        req.body.filePath = req.file.path;
      console.log("in update student controller befor updating")
      student = await studentService.updateStudent(req.params.id, req.body, session);
      await session.commitTransaction();
      res.status(200).json(student);
    } catch (error) {
      await session.abortTransaction();
      res.status(400).json({ message: error.message });
    } finally {
      await session.endSession();
    }
  };

  deleteStudent = async (req, res) => {
    console.log('delete student controller');
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const student = await studentService.deleteStudent(req.params.id, session);
      console.log('student: ' + student)
      if (!student) {
        session.abortTransaction();
        return res.status(404).json({ message: 'Student not found' });
      }
      console.log('befor delete password')
      const deletedPassword = await deletePassword(student._id, session);
      console.log('after delete password: ' + deletedPassword)
      if (student.diagnoses)
        await diagnosisService.deleteDiagnosis(student.diagnoses, session);
      await session.commitTransaction();
      console.log('after commit transection')
      res.status(200).json(student);
    } catch (error) {
      await session.abortTransaction();
      res.status(500).json({ message: error.message });
    }
    finally {
      await session.endSession();
    }

  };

  addDiagnosisToStudent = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      console.log("student id: " + req.params.id);
      const student = await studentService.getAllStudents({ studentId: req.params.id });
      console.log("student:", student[0]);
      if (!student) return res.status(404).json({ error: 'Student not found' });
      const response = await diagnosisService.createDiagnosis(req.body, session);
      console.log("response: ", response);
      student[0].diagnoses.push(response._id);
      const updatedStudent = await studentService.updateStudent(student[0].studentId, student[0], session);
      console.log('after adding diagnoses: ' + updatedStudent);
      await session.commitTransaction();
      res.status(200).json(student[0]);
    } catch (error) {
      session.abortTransaction();
      res.status(400).json({ error: error.message });
    }
    finally {
      session.endSession();
    }
  };
}
