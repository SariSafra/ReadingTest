import express from 'express';
import DiagnosisController from '../controllers/diagnosisController.js';
import validateDiagnosis from '../middlewares/validateDiagnosis.js';
import { allowRoles } from '../middlewares/roleMiddleware.js';

const diagnosisRoute = express.Router();

const diagnosisController = new DiagnosisController();

diagnosisRoute.get('/', allowRoles(['teacher']), diagnosisController.getAllDiagnosis);
diagnosisRoute.get('/:id', allowRoles(['teacher', 'student']), diagnosisController.getDiagnosisById);
diagnosisRoute.get('/:id/studentId', allowRoles(['teacher', 'student']), diagnosisController.getDiagnosisByStudentId);
diagnosisRoute.post('/', allowRoles(['teacher']), validateDiagnosis, diagnosisController.createDiagnosis);
diagnosisRoute.put('/:id', allowRoles(['teacher']), validateDiagnosis, diagnosisController.updateDiagnosis);
diagnosisRoute.delete('/:id', allowRoles(['teacher']), diagnosisController.deleteDiagnosis);

export default diagnosisRoute;