import Teacher from '../models/Teacher.model.js';
import Student from '../models/Student.model.js';
import Password from '../models/Password.js';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

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

    createStudent = async (teacherId, studentData) => {
        const { name, id: studentId , password } = studentData;
        console.log(studentData);
        const hashedPassword = await bcrypt.hash(password, 10);

        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const student = new Student({studentId, name});
            console.log('student: '+ student);
            const savedStudent = await student.save({ session});
            console.log("saved student: " + savedStudent);
            const pswObj = new Password({userId: savedStudent._id, userType: 'Student', password: hashedPassword })
            const savedPsw = await pswObj.save({session});
            console.log('saved password: '+savedPsw);
            // Update teacher's record to include this student
            const teacher = await Teacher.findById(teacherId).session(session);
            if (!teacher) {
                throw new Error('Teacher not found');
            }
            if (!teacher.students) {
                teacher.students = [];
            }
            teacher.students.push(savedStudent._id);
            await teacher.save({ session });

            await session.commitTransaction();
            session.endSession();

            return savedStudent;
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            throw error;
        }
    };

    updateTeacherPassword = async (teacherId, newPassword) => {
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const teacher = await Teacher.findById(teacherId).session(session);
            if (!teacher) {
                throw new Error('Teacher not found');
            }

            teacher.password = hashedPassword;
            await teacher.save({ session });

            await session.commitTransaction();
            session.endSession();

            return teacher;
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            throw error;
        }
    };
}
