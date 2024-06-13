import Teacher from '../models/Teacher.js';
import Student from '../models/Student.js';
import Password from '../models/Password.js';
import mongoose from 'mongoose';

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

    createTeacher = async (teacherData) => {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const teacher = new Teacher(teacherData);
            await teacher.save({ session });

            const password = new Password({
                userId: teacher._id,
                userType: 'Teacher',
                password: teacherData.password
            });
            await password.save({ session });

            await session.commitTransaction();
            return teacher;
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    };

    updateTeacher = async (id, teacherData) => {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const teacher = await Teacher.findByIdAndUpdate(id, teacherData, { new: true, runValidators: true, session });

            if (teacherData.password) {
                await Password.findOneAndUpdate({ userId: teacher._id }, { password: teacherData.password }, { session });
            }

            await session.commitTransaction();
            return teacher;
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    };

    deleteTeacher = async (id) => {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const teacher = await Teacher.findById(id).populate('students');

            if (!teacher) {
                throw new Error('Teacher not found');
            }

            // Delete all associated students and their passwords
            const studentDeletionPromises = teacher.students.map(async studentId => {
                await Student.findByIdAndDelete(studentId, { session });
                await Password.findOneAndDelete({ userId: studentId }, { session });
            });

            await Promise.all(studentDeletionPromises);

            // Delete teacher and their password
            await Teacher.findByIdAndDelete(id, { session });
            await Password.findOneAndDelete({ userId: id }, { session });

            await session.commitTransaction();
            return teacher;
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    };
}
