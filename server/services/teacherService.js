import Teacher from '../models/Teacher.model.js';
import Student from '../models/Student.model.js';
import Password from '../models/Password.js';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import path from 'path';

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

    createTeacher = async (teacherData, session) => {
        const teacher = new Teacher(teacherData);
        let savedTeacher;
        if (session)
            savedTeacher = await teacher.save({ session });
        else
            savedTeacher = await teacher.save();
        return savedTeacher;
    };

    updateTeacher = async (id, teacherData, session) => {
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
    

    // createStudent = async (teacherId, studentData) => {
    //     const { name, id: studentId , password } = studentData;
    //     console.log(studentData);
    //     const hashedPassword = await bcrypt.hash(password, 10);

    //     const session = await mongoose.startSession();
    //     session.startTransaction();
    //     try {
    //         const student = new Student({studentId, name});
    //         console.log('student: '+ student);
    //         const savedStudent = await student.save({ session});
    //         console.log("saved student: " + savedStudent);
    //         const pswObj = new Password({userId: savedStudent._id, userType: 'Student', password: hashedPassword })
    //         const savedPsw = await pswObj.save({session});
    //         console.log('saved password: '+savedPsw);
    //         // Update teacher's record to include this student
    //         const teacher = await Teacher.findById(teacherId).session(session);
    //         if (!teacher) {
    //             throw new Error('Teacher not found');
    //         }
    //         if (!teacher.students) {
    //             teacher.students = [];
    //         }
    //         teacher.students.push(savedStudent._id);
    //         await teacher.save({ session });

    //         await session.commitTransaction();
    //         session.endSession();

    //         return savedStudent;
    //     } catch (error) {
    //         await session.abortTransaction();
    //         session.endSession();
    //         throw error;
    //     }
    // };

    // updateTeacherPassword = async (teacherId, newPassword) => {

    //     const session = await mongoose.startSession();
    //     session.startTransaction();
    //     try {
    //         const teacher = await Password.findByIdAndUpdate(teacherId, {password: newPassword}).session(session);
    //         if (!teacher) {
    //             throw new Error('Teacher not found');
    //         }
    //         return teacher;
    //     } catch (error) {
    //         await session.abortTransaction();
    //         session.endSession();
    //         throw error;
    //     }
    // };
    getStudentsByTeacherEmail = async (teacherEmail) => {
        try {
            const teacher = await Teacher.findOne({ email: teacherEmail }).populate('students');
            if (!teacher) {
                throw new Error('Teacher not found');
            }
            return teacher.students.map(student=>{
                const profileImageUrl = student.filePath
                ? `http://localhost:3000/uploads/${path.basename(student.filePath)}`
                : `http://localhost:3000/uploads/profile.png`;

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
