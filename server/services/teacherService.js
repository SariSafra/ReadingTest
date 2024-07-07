import Teacher from '../models/Teacher.model.js';
import Student from '../models/Student.model.js';
import Password from '../models/Password.js';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import path from 'path';
import emailRoute from '../routes/emailRoute.route.js';

export default class TeacherService {

    getAllDiagnosis = async () => {
        return await Teacher.find();
    };

    getAllTeachers = async () => {
        return await Teacher.find();
    };

    getTeacherById = async (id) => {
        return await Teacher.findById(id).populate('students');
    };
    getTeacherByEmail = async (teacherEmail) => {
        return await Teacher.findOne({ email: teacherEmail }).populate('students');
    };
    createTeacher = async (teacherData, session) => {
        const teacher = new Teacher(teacherData);
        let savedTeacher;
        if (session)
            savedTeacher = await teacher.save({ session });
        else
            savedTeacher = await teacher.save();
        return savedTeacher;
    };


    updateTeacher = async (query, teacherData, session) => {
        let teacher;
        if (session)
            teacher = await Teacher.findOneAndUpdate(query, teacherData, { new: true, runValidators: true, session });
        else
            teacher = await Teacher.findOneAndUpdate(query, teacherData, { new: true, runValidators: true })
        return teacher;
    };
    
    updateTeacherById = async (id, teacherData, session) => {
        let teacher;
        if (session)
            teacher = await Teacher.findByIdAndUpdate(id, teacherData, { new: true, runValidators: true, session });
        else
            teacher = await Teacher.findByIdAndUpdate(id, teacherData, { new: true, runValidators: true })
        return teacher;
    };

    deleteTeacher = async (id, session) => {
            let teacher;
            if (session)
                teacher = await Teacher.findByIdAndDelete(id).session({ session });
            else
                teacher = await Teacher.findByIdAndDelete(id);

            return teacher;
    }
    
    getStudentsByTeacherEmail = async (teacherEmail) => {
        try {
            const teacher = await Teacher.findOne({ email: teacherEmail }).populate('students');
            if (!teacher) {
                throw new Error('Teacher not found');
            }
            return teacher.students.map(student=>{
                const profileImageUrl =  `http://localhost:3000/profile-image/${student.filePath? path.basename(student.filePath):'profile.png'}`


            return {
                ...student.toObject(),
                profileImageUrl
            };
            });
        } catch (error) {
            throw error;
        }
    }
}
