import Student from '../models/Student.js';

export default class StudentService {
    getAllDiagnosis = async () => {
        return await Student.find();
    };

    getAllStudents = async () => {
        return await Student.find();
    };

    getStudentById = async (id) => {
        return await Student.findById(id).populate('diagnosis');
    };

    createStudent = async (studentData) => {
        const student = new Student(studentData);
        return await student.save();
    };

    updateStudent = async (id, studentData) => {
        return await Student.findByIdAndUpdate(id, studentData, { new: true, runValidators: true });
    };

    deleteStudent = async (id) => {
        return await Student.findByIdAndDelete(id);
    };
}

