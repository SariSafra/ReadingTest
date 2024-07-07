import express from 'express';
import StudentController from '../controllers/studentController.js';
import studentPermission from '../middlewares/studentPermission.js';
import upload from '../middlewares/upload.js'
import { validateDiagnosisRequest, diagnosisSchema } from '../middlewares/validationSchemas.js';

const studentRoute = express.Router();
const studentController = new StudentController();

studentRoute.get('/:id',studentPermission, studentController.getStudentByStudentId);
studentRoute.put('/:id',studentPermission, upload.single('file'),studentController.updateStudent);
studentRoute.delete('/:id',studentPermission, studentController.deleteStudent);
studentRoute.post('/:id/diagnosis',studentPermission,validateDiagnosisRequest(diagnosisSchema), studentController.addDiagnosisToStudent);

export default studentRoute;
