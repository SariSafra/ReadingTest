import Student from '../models/Student.model.js';
import mongoose from 'mongoose';
import Diagnosis from '../models/Diagnosis.js';
import path from 'path';

export default class StudentService {
    getAllDiagnosis = async (queries = {}) => {
        return await Student.find(queries).populate('diagnosis');
    };

    getAllStudents = async (queries = {}) => {
        const students = await Student.find(queries);
        return students.map(student => {
            const profileImageUrl =  `http://localhost:3000/profile-image/${student.filePath? path.basename(student.filePath):'profile.png'}`

            return {
                ...student.toObject(),
                profileImageUrl
            };
        });
    };

    getStudentById = async (id) => {
        const student = await Student.findById(id).populate('diagnoses');
        if (!student) {
            throw new Error('Student not found');
        }

        const profileImageUrl =  `http://localhost:3000/profile-image/${student.filePath? path.basename(student.filePath):'profile.png'}`

        return {
            ...student.toObject(),
            profileImageUrl
        };
    }
    getStudentByStudentId = async (id) => {
        const student = await Student.findOne({ studentId: id }).populate('diagnoses');
        if (!student) 
            throw new Error('Student not found');
        const profileImageUrl = `http://localhost:3000/profile-image/${student.filePath? path.basename(student.filePath):'profile.png'}`;
        return {
            ...student.toObject(),
            profileImageUrl
        };
    }
    createStudent = async (studentData, session) => {
        const student = new Student(studentData);
        return await student.save({ session });
    }

    updateStudent = async (id, studentData, session) => {
        let student;
        if (session)
            student = await Student.findOneAndUpdate({studentId:id}, {$set:studentData}, { new: true, runValidators: true, session });
        else
            student = await Student.findOneAndUpdate({studentId:id}, {$set:studentData}, { new: true, runValidators: true });
        return student;
    }

    deleteStudent = async (id, session) => {
        if (session)
            return Student.findOneAndDelete({ studentId: id }, { session });
        else
            return Student.findOneAndDelete({ studentId: id });
    }
}
