import express from 'express';
import TeacherController from '../controllers/teacherController.js';

const teacherRoute = express.Router();
const teacherController = new TeacherController();

teacherRoute.get('/', teacherController.getAllTeachers);
teacherRoute.get('/:id', teacherController.getTeacherById);
teacherRoute.post('/', teacherController.createTeacher);
teacherRoute.put('/:id', teacherController.updateTeacher);
teacherRoute.delete('/:id', teacherController.deleteTeacher);

export default teacherRoute;
