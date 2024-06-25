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
    try {
      const teacher = await teacherService.createTeacher(req.body);
      res.status(201).json(teacher);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
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
    try {
      const teacher = await teacherService.deleteTeacher(req.params.id);
      if (!teacher) {
        return res.status(404).json({ message: 'Teacher not found' });
      }
      res.status(200).json(teacher);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  createStudent = async (req, res) => {
    console.log('create student controller '+req.user._id)
    try {
      const student = await teacherService.createStudent(req.user._id, req.body);
      console.log('after creating, student: '+student);
      res.status(201).json(student);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };



}
