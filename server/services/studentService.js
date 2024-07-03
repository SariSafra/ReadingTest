// services/studentService.js
import Student from '../models/Student.model.js';
import Password from '../models/Password.js';
import mongoose from 'mongoose';
import Diagnosis from '../models/Diagnosis.js';
import path from 'path';


export default class StudentService {
    getAllDiagnosis = async (queries = {}) => {
        return await Student.find(queries);
    };

    getAllStudents = async (queries = {}) => {
        const students = await Student.find(queries).populate('diagnosis');

        return students.map(student => {
            const profileImageUrl = student.filePath
                ? `http://localhost:3000/uploads/${path.basename(student.filePath)}`
                : `http://localhost:3000/uploads/profile.png`;

            return {
                ...student.toObject(),
                profileImageUrl
            };
        });
    };

    getStudentById = async (id) => {
        const student = await Student.findById(id).populate('diagnosis');
        if (!student) {
            throw new Error('Student not found');
        }

        const profileImageUrl = student.filePath
            ? `http://localhost:3000/uploads/${student.filePath.replace(/\\/g, '/')}`
            : `http://localhost:3000/uploads/profile.png`;

        return {
            ...student.toObject(),
            profileImageUrl
        };
    }

    createStudent = async (studentData, session) => {
        const student = new Student(studentData);
        console.log('student service, student: ', student);
        return await student.save({ session });
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
