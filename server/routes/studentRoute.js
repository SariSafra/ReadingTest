import express from 'express';
import StudentController from '../controllers/studentController.js';
import studentPermission from '../middlewares/studentPermission.js';


const studentRoute = express.Router();
const studentController = new StudentController();


//studentRoute.get('/', studentController.getAllStudents);
//studentRoute.post('/', studentController.createStudent);
//studentRoute.use(studentPermission);
studentRoute.get('/:id',studentPermission, studentController.getStudentById);
studentRoute.put('/:id',studentPermission, studentController.updateStudent);
studentRoute.delete('/:id',studentPermission, studentController.deleteStudent);
studentRoute.post('/:id/diagnosis',studentPermission, studentController.addDiagnosisToStudent);

export default studentRoute;
