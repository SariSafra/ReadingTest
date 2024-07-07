import express from 'express';
import DiagnosisController from '../controllers/diagnosisController.js';
import {validateDiagnosisRequest, diagnosisSchema} from '../middlewares/validationSchemas.js';
import { allowRoles } from '../middlewares/roleMiddleware.js';

const diagnosisRoute = express.Router();

const diagnosisController = new DiagnosisController();

diagnosisRoute.get('/', allowRoles(['teacher']), diagnosisController.getAllDiagnosis);
diagnosisRoute.get('/:id', allowRoles(['teacher', 'student']), diagnosisController.getDiagnosisByStudentId);
diagnosisRoute.get('/student/:studentId', diagnosisController.getDiagnosisByStudentId);
diagnosisRoute.post('/', allowRoles(['teacher']),validateDiagnosisRequest(diagnosisSchema), diagnosisController.createDiagnosis);
diagnosisRoute.put('/:id', allowRoles(['teacher']),validateDiagnosisRequest(diagnosisSchema), diagnosisController.updateDiagnosis);
diagnosisRoute.delete('/:id', allowRoles(['teacher']), diagnosisController.deleteDiagnosis);

export default diagnosisRoute;
