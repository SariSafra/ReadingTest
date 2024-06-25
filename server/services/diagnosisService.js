import Diagnosis from "../models/Diagnosis.js";
import Student from "../models/Student.model.js"

export default class DiagnosisService{
    getAllDiagnosis = async () => {
        return await Diagnosis.find();
      }

      getDiagnosisById = async (id) => {
        return await Diagnosis.findById(id);
      }
      getDiagnosisByStudentId = async (id) => {
        console.log("in get diagnosis by student id service::", id);
        const student = await Student.findById(id).populate('diagnosis');
        console.log("student with populated diagnosis: ", student);
        if (!student || !student.diagnosis) {
          console.log("No diagnosis found for this student.");
          return null;
        }
        console.log("Diagnosis found:", student.diagnosis);
        return student.diagnosis;
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
