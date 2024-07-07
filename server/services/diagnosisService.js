import Diagnosis from "../models/Diagnosis.js";
import Student from "../models/Student.model.js"

export default class DiagnosisService {
  getAllDiagnosis = async () => {
    return await Diagnosis.find();
  }

  getDiagnosisById = async (id) => {
    return await Diagnosis.findById(id);
  }
  getDiagnosesByStudentId = async (id) => {
    const student = await Student.findById(id).populate('diagnoses');
    if (!student || !student.diagnoses) {
      return null;
    }
    return student.diagnoses;
  }

  sampleData = {
    frequencyMap: {
      'א': {
        correct: 5,
        incorrect: 1,
        swaps: [
          { input: 'X', times: 2 },
          { input: 'Y', times: 1 }
        ]
      },
      'ב': {
        correct: 6,
        incorrect: 0,
        swaps: []
      },
      'ג': {
        correct: 6,
        incorrect: 0,
        swaps: []
      }
    },
    Emphasis: false,
    Repeat: false,
    successRate: '94.45',
    time: 13148,
    consistentSwappingPercentage: 100
  };

  createDiagnosis = async (diagnosisData, session) => {
    const diagnosis = new Diagnosis(diagnosisData);
    if (session)
      return await diagnosis.save({ session });
    else
        return await diagnosis.save();
  }

  updateDiagnosis = async (id, diagnosisData, session) => {
    if (session)
      return await Diagnosis.findByIdAndUpdate(id, diagnosisData, { new: true, runValidators: true, session: { session } });
    else
      return await Diagnosis.findByIdAndUpdate(id, diagnosisData, { new: true, runValidators: true });
  }

  deleteDiagnosis = async (id, session) => {
    if (session)
      return await Diagnosis.findByIdAndDelete(id, {session});
    else
      return await Diagnosis.findByIdAndDelete(id);
  }
}
