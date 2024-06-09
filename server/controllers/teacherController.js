import TeacherService from '../services/teacherService.js';

const teacherService = new TeacherService();

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
      const teacher = await teacherService.getTeacherById(req.params.email);
      if (!teacher) {
        return res.status(404).json({ message: 'Teacher not found' });
      }
      res.status(200).json(teacher);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  createTeacher = async (req, res) => {
    try {
      const teacher = await teacherService.createTeacher(req.body);
      res.status(201).json(teacher);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  updateTeacher = async (req, res) => {
    try {
      const teacher = await teacherService.updateTeacher(req.params.email, req.body);
      if (!teacher) {
        return res.status(404).json({ message: 'Teacher not found' });
      }
      res.status(200).json(teacher);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  deleteTeacher = async (req, res) => {
    try {
      const teacher = await teacherService.deleteTeacher(req.params.email);
      if (!teacher) {
        return res.status(404).json({ message: 'Teacher not found' });
      }
      res.status(200).json(teacher);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}
