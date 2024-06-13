import StudentService from '../services/studentService.js';
import Diagnosis from '../models/Diagnosis.js';
import DiagnosisService from '../services/diagnosisService.js';
const studentService = new StudentService();

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
  };

  createStudent = async (req, res) => {
    try {
      const student = await studentService.createStudent(req.body);
      res.status(201).json(student);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  updateStudent = async (req, res) => {
    try {
      const student = await studentService.updateStudent(req.params.id, req.body);
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
      res.status(200).json(student);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  deleteStudent = async (req, res) => {
    try {
      const student = await studentService.deleteStudent(req.params.id);
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
      res.status(200).json(student);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

   addDiagnosisToStudent = async (req, res) => {
    try {
      console.log("student id: "+req.params.id);
      const student = await studentService.getStudentById(req.params.id);
      if (!student) return res.status(404).json({ error: 'Student not found' });
      const diagnosisService = new DiagnosisService();
      const response = await diagnosisService.createDiagnosis(req.body);
      student.diagnosis = response._id;
      await studentService.updateStudent(student._id, student);
      res.status(200).json(student);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
}
