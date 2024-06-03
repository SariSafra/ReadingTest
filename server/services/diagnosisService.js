import Diagnosis from '../models/Diagnosis.js';

export default class diagnosisService{
    getAllDiagnoses = async () => {
        return await Diagnosis.find();
      }

      getDiagnosisById = async (id) => {
        return await Diagnosis.findById(id);
      }

      createDiagnosis = async (diagnosisData) => {
        const diagnosis = new Diagnosis(diagnosisData);
        return await diagnosis.save();
      }

      updateDiagnosis = async (id, diagnosisData) => {
        return await Diagnosis.findByIdAndUpdate(id, diagnosisData, { new: true, runValidators: true });
      }

      deleteDiagnosis = async (id) => {
        return await Diagnosis.findByIdAndDelete(id);
      }
}
