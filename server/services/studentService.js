import Student from "../models/Student.js";

export default class studentService{
    getAllDiagnoses = async () => {
        return await Student.find();
      }

      getStudentById = async (id) => {
        return await Student.findById(id);
      }

      createStudent = async (studentData) => {
        const Student = new Student(studentData);
        return await Student.save();
      }

      updateStudent = async (id, studentData) => {
        return await Student.findByIdAndUpdate(id, studentData, { new: true, runValidators: true });
      }

      deleteStudent = async (id) => {
        return await Student.findByIdAndDelete(id);
      }
}
