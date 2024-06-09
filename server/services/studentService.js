import Student from '../models/Student.js';
import Password from '../models/Password.js';

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
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const student = new Student(studentData);
            await student.save({ session });

            const password = new Password({
                userId: student._id,
                userType: 'Student',
                password: studentData.password
            });
            await password.save({ session });

            await session.commitTransaction();
            return student;
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    };

    updateStudent = async (id, studentData) => {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const student = await Student.findByIdAndUpdate(id, studentData, { new: true, runValidators: true, session });
            
            if (studentData.password) {
                await Password.findOneAndUpdate({ userId: id }, { password: studentData.password }, { session });
            }

            await session.commitTransaction();
            return student;
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    };

    deleteStudent = async (id) => {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const student = await Student.findByIdAndDelete(id, { session });
            await Password.findOneAndDelete({ userId: id }, { session });

            await session.commitTransaction();
            return student;
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    };
}

