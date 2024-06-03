import express from 'express';
import DiagnosisController from '../controllers/diagnosisController.js';
import validateDiagnosis from '../middlewares/validateDiagnosis.js';

const diagnosisRoute = express.Router();

const diagnosisController = new DiagnosisController();

diagnosisRoute.get('/', diagnosisController.getAllDiagnoses);
diagnosisRoute.get('/:id', diagnosisController.getDiagnosisById);
diagnosisRoute.post('/', validateDiagnosis, diagnosisController.createDiagnosis);
diagnosisRoute.put('/:id', validateDiagnosis, diagnosisController.updateDiagnosis);
diagnosisRoute.delete('/:id', diagnosisController.deleteDiagnosis);

export default diagnosisRoute;
