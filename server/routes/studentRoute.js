import express from 'express';
import StudentController from '../controllers/studentController.js';

const studentRoute = express.Router();
const studentController = new StudentController();

studentRoute.get('/', studentController.getAllStudents);
studentRoute.get('/:id', studentController.getStudentById);
studentRoute.post('/', studentController.createStudent);
studentRoute.put('/:id', studentController.updateStudent);
studentRoute.delete('/:id', studentController.deleteStudent);

export default studentRoute;
