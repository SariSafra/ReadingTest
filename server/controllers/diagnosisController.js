import diagnosisService from '../services/diagnosisService';

const getAllDiagnoses = async (req, res) => {
  try {
    const diagnoses = await diagnosisService.getAllDiagnoses();
    res.status(200).json(diagnoses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDiagnosisById = async (req, res) => {
  try {
    const diagnosis = await diagnosisService.getDiagnosisById(req.params.id);
    if (!diagnosis) {
      return res.status(404).json({ message: 'Diagnosis not found' });
    }
    res.status(200).json(diagnosis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createDiagnosis = async (req, res) => {
  try {
    const diagnosis = await diagnosisService.createDiagnosis(req.body);
    res.status(201).json(diagnosis);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateDiagnosis = async (req, res) => {
  try {
    const diagnosis = await diagnosisService.updateDiagnosis(req.params.id, req.body);
    if (!diagnosis) {
      return res.status(404).json({ message: 'Diagnosis not found' });
    }
    res.status(200).json(diagnosis);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteDiagnosis = async (req, res) => {
  try {
    const diagnosis = await diagnosisService.deleteDiagnosis(req.params.id);
    if (!diagnosis) {
      return res.status(404).json({ message: 'Diagnosis not found' });
    }
    res.status(200).json(diagnosis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export  {
  getAllDiagnoses,
  getDiagnosisById,
  createDiagnosis,
  updateDiagnosis,
  deleteDiagnosis
};
