import StudentService from '../services/studentService.js';

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
}
