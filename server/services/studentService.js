import Student from '../models/Student.model.js';
import Password from '../models/Password.js';
import mongoose from 'mongoose';
import Diagnosis from '../models/Diagnosis.js';

export default class StudentService {
    getAllDiagnosis = async (queries = {}) => {
        return await Student.find(queries);
    };

    getAllStudents = async (queries = {}) => {
        return await Student.find(queries).populate('diagnoses');
    };

    getStudentById = async (id) => {
        return await Student.findById(id).populate('diagnoses');
    }

    async try1async (studentData, session) {
        const student = new Student({ name: studentData.name, studentId: studentData.id });
        console.log('student service, student: '+student);
        if (session)
            return await student.save({ session });
        else
        return await student.save();
    }
    createStudent = async (studentData, session) => {
        const student = new Student({ name: studentData.name, studentId: studentData.id });
        console.log('student service, student: '+student);
        if (session)
            return await student.save({ session });
        else
            return await student.save();
    }

    updateStudent = async (id, studentData, session) => {

        let student;
        if (session)
            student = await Student.findByIdAndUpdate(id, studentData, { new: true, runValidators: true, session });
        else
            student = await Student.findByIdAndUpdate(id, studentData, { new: true, runValidators: true });

        return student;
    }

    deleteStudent = async (id, session) => {
        console.log('hi');
        if (session)
            return Student.findOneAndDelete({ studentId: id }, { session });
        else
            return Student.findOneAndDelete({ studentId: id });
    }

}

