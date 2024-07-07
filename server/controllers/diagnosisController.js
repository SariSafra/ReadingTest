import DiagnosisService from '../services/diagnosisService.js';
import StudentService from '../services/studentService.js';
const diagnosisService = new DiagnosisService();
const studentService=new StudentService();

export default class DiagnosisController{
getAllDiagnosis = async (req, res) => {
  try {
    const diagnosis = await diagnosisService.getAllDiagnosis();
    res.status(200).json(diagnosis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

getDiagnosisById = async (req, res) => {
    try {
      const diagnosis = await diagnosisService.getDiagnosisById(req.params.id);
      if (!diagnosis) 
        return res.status(404).json({ message: 'Diagnosis not found' });
      res.status(200).json(diagnosis);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  getDiagnosisByStudentId = async (req,res) => {
    try{
      const id=req.params.studentId;
        const diagnoses= await diagnosisService.getDiagnosesByStudentId(id);
        if (!diagnoses) 
          return res.status(404).json({ message: 'Diagnosis not found' });
       return res.status(200).json(diagnoses);
    }
    catch(error)
    {
      res.status(500).json({ message: error.message });
    }
  }

  createDiagnosis = async (req, res) => {
    try {
      const diagnosis = await diagnosisService.createDiagnosis(req.body);
      res.status(201).json(diagnosis);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  updateDiagnosis = async (req, res) => {
    try {
      const diagnosis = await diagnosisService.updateDiagnosis(req.params.id, req.body);
      if (!diagnosis) 
        return res.status(404).json({ message: 'Diagnosis not found' });
      res.status(200).json(diagnosis);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  deleteDiagnosis = async (req, res) => {
    try {
      const diagnosis = await diagnosisService.deleteDiagnosis(req.params.id);
      if (!diagnosis) 
        return res.status(404).json({ message: 'Diagnosis not found' });
      res.status(200).json(diagnosis);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}


