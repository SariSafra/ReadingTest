import DiagnosisService from '../services/diagnosisService.js';
import StudentService from '../services/studentService.js';
const diagnosisService = new DiagnosisService();
const studentService=new StudentService();

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
      const student=await studentService.getStudents({email:req.params.email});
      if(student)
      {
        const diagnosis = await diagnosisService.createDiagnosis(req.body.Diagnosis);
        //i need to check the studen object and how it's correct to ask the _id
        if(diagnosis)
       { studentService.updateStudent(student._id,  { $set: { diagnosis: diagnosis } })}
        else{
          throw "Diagnosis creation failed";
        }
      }
      else{
        res.status(404).json({ message: 'Student not found' });
      }
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


