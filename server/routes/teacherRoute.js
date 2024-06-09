import express from 'express';
import TeacherController from '../controllers/teacherController.js';

const teacherRoute = express.Router();
const teacherController = new TeacherController();

teacherRoute.get('/', teacherController.getAllTeachers);
teacherRoute.get('/:email', teacherController.getTeacherById);
teacherRoute.post('/', teacherController.createTeacher);
teacherRoute.put('/:email', teacherController.updateTeacher);
teacherRoute.delete('/:email', teacherController.deleteTeacher);

export default teacherRoute;
