import Student from '../models/Student.model.js';
import Password from '../models/Password.js';
import mongoose from 'mongoose';
import Diagnosis from '../models/Diagnosis.js';

export default class StudentService {
    getAllDiagnosis = async () => {
        return await Student.find();
    };

    getAllStudents = async () => {
        return await Student.find().populate('diagnosiss');
    };

    getStudentById = async (id) => {
        return await Student.findById(id).populate('diagnosis');
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
        let student;
        if (session)
            student = await Student.findOneAndDelete({ studentId: id }, { session });
        else
            student = await Student.findOneAndDelete({ studentId: id });
        return student;
    }

}

