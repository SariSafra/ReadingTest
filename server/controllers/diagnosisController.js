import DiagnosisService from '../services/diagnosisService.js';

const diagnosisService = new DiagnosisService();

export default class DiagnosisController{
getAllDiagnoses = async (req, res) => {
  try {
    const diagnoses = await diagnosisService.getAllDiagnoses();
    res.status(200).json(diagnoses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

getDiagnosisById = async (req, res) => {
    try {
      const diagnosis = await diagnosisService.getDiagnosisById(req.params.id);
      if (!diagnosis) {
        return res.status(404).json({ message: 'Diagnosis not found' });
      }
      res.status(200).json(diagnosis);
    } catch (error) {
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
      if (!diagnosis) {
        return res.status(404).json({ message: 'Diagnosis not found' });
      }
      res.status(200).json(diagnosis);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  deleteDiagnosis = async (req, res) => {
    try {
      const diagnosis = await diagnosisService.deleteDiagnosis(req.params.id);
      if (!diagnosis) {
        return res.status(404).json({ message: 'Diagnosis not found' });
      }
      res.status(200).json(diagnosis);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}


