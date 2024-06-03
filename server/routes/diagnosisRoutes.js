import express from 'express';
const diagnosisController = require('../controllers/diagnosisController');
const validateDiagnosis = require('../middlewares/validateDiagnosis');

const diagnosisRoute = express.Router();

diagnosisRoute.get('/', diagnosisController.getAllDiagnoses);
diagnosisRoute.get('/:id', diagnosisController.getDiagnosisById);
diagnosisRoute.post('/', validateDiagnosis, diagnosisController.createDiagnosis);
diagnosisRoute.put('/:id', validateDiagnosis, diagnosisController.updateDiagnosis);
diagnosisRoute.delete('/:id', diagnosisController.deleteDiagnosis);

export default diagnosisRoute;
