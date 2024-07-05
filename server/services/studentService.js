import Student from '../models/Student.model.js';
import mongoose from 'mongoose';
import Diagnosis from '../models/Diagnosis.js';
import path from 'path';

export default class StudentService {
    getAllDiagnosis = async (queries = {}) => {
        return await Student.find(queries).populate('diagnosis');
    };

    getAllStudents = async (queries = {}) => {
        console.log('student service query: '+queries.studentId);
        const students = await Student.find(queries);
        console.log('student service: '+students);

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
        console.log("in gete student by student id service", id)
        const student = await Student.findOne({ studentId: id }).populate('diagnoses');
        if (!student) {
            throw new Error('Student not found');
        }
        console.log("student in dervice before img",student)
        const profileImageUrl = `http://localhost:3000/profile-image/${student.filePath? path.basename(student.filePath):'profile.png'}`;

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
            student = await Student.findOneAndUpdate({studentId:id}, studentData, { new: true, runValidators: true, session });
        else
            student = await Student.findOneAndUpdate({studentId:id}, studentData, { new: true, runValidators: true });

            console.log("in student service, student",student)
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
