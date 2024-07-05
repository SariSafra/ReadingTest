import express from 'express';
import StudentController from '../controllers/studentController.js';
import upload from '../middlewares/upload.js'
const studentRoute = express.Router();
const studentController = new StudentController();

studentRoute.get('/', studentController.getAllStudents);
studentRoute.get('/:id', studentController.getStudentByStudentId);
studentRoute.post('/', studentController.createStudent);
studentRoute.put('/:id', upload.single('file'), studentController.updateStudent);
studentRoute.delete('/:id', studentController.deleteStudent);
studentRoute.post('/:id/diagnosis', studentController.addDiagnosisToStudent);

export default studentRoute;
