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
    //console.log("in get diagnosis by student id service::", id);
    console.log("in get diagnosis by student id service::", id);
    const student = await Student.findById(id).populate('diagnoses');
    console.log("student with populated diagnosis: ", student);
    console.log("diagnosis service:  !student",!student);
    console.log("diagnosis service:  !student.diagnoses ", !student.diagnoses)

    if (!student || !student.diagnoses) {
      console.log("No diagnosis found for this student.");
      return null;
    }
    console.log("Diagnosis found:", student.diagnoses);
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
    //const diagnosis = new Diagnosis(diagnosisData);
    console.log(" from create diagnosis, diagnosisData:",diagnosisData)
    const diagnosis = new Diagnosis(diagnosisData);

    if (session)
     { console.log("sss")
      return await diagnosis.save({ session });}
    else
      {console.log("aaa")
        return await diagnosis.save();}
  }

  updateDiagnosis = async (id, diagnosisData, session) => {
    console.log("in update diagnosis in dia service id:",id,diagnosisData)
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
