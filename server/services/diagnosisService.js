import Diagnosis from '../models/Diagnosis';

const getAllDiagnoses = async () => {
  return await Diagnosis.find();
};

const getDiagnosisById = async (id) => {
  return await Diagnosis.findById(id);
};

const createDiagnosis = async (diagnosisData) => {
  const diagnosis = new Diagnosis(diagnosisData);
  return await diagnosis.save();
};

const updateDiagnosis = async (id, diagnosisData) => {
  return await Diagnosis.findByIdAndUpdate(id, diagnosisData, { new: true, runValidators: true });
};

const deleteDiagnosis = async (id) => {
  return await Diagnosis.findByIdAndDelete(id);
};

module.exports = {
  getAllDiagnoses,
  getDiagnosisById,
  createDiagnosis,
  updateDiagnosis,
  deleteDiagnosis
};
