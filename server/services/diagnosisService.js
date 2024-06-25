import Diagnosis from "../models/Diagnosis.js";
import Student from "../models/Student.model.js"

export default class DiagnosisService{
    getAllDiagnosis = async () => {
        return await Diagnosis.find();
      }

      getDiagnosisById = async (id) => {
        return await Diagnosis.findById(id);
      }
      getDiagnosisByStudentId = async (studentId) =>{

        const diagnosisId=await Student.findById(studentId);
        return await Diagnosis.findById(diagnosisId);
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
