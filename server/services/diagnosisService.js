import Diagnosis from "../models/Diagnosis.js";
import Student from "../models/Student.model.js"

export default class DiagnosisService {
  getAllDiagnosis = async () => {
    return await Diagnosis.find();
  }

  getDiagnosisById = async (id) => {
    return await Diagnosis.findById(id);
  }
  getDiagnosisByStudentId = async (id) => {
    //console.log("in get diagnosis by student id service::", id);
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
    //const diagnosis = new Diagnosis(diagnosisData);
    const diagnosis = new Diagnosis(this.sampleData);

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
      return await Diagnosis.findByIdAndDelete(id).session({ session });
    else
      return await Diagnosis.findByIdAndDelete(id);
  }
}
