import Student from '../models/Student.js';
import Diagnosis from '../models/Diagnosis.js';
import mongoose from 'mongoose';

export default class StudentService {
    getAllDiagnosis = async () => {
        return await Student.find();
    };

    getAllStudents = async () => {
        return await Student.find();
    };

    getStudentById = async (id) => {
        return await Student.findById(id).populate('diagnosis');
    }


    createStudent = async (studentData) => {
        const student = new Student(studentData);
        return await student.save();
    };

    updateStudent = async (id, studentData) => {
        return await Student.findByIdAndUpdate(id, studentData, { new: true, runValidators: true });
    };

    deleteStudent = async (id) => {
        const session = await mongoose.startSession();
        session.startTransaction();
    
        try {
          const student = await Student.findById(id).session(session);
          if (!student) {
            throw new Error('Student not found');
          }
    
          if (student.diagnosis) {
            await Diagnosis.deleteMany({ _id: student.diagnosis }).session(session);
          }
    
          await Student.deleteOne({}, { session });
    
          await session.commitTransaction();
          session.endSession();
    
          return student;
        } catch (error) {
          await session.abortTransaction();
          session.endSession();
          throw error;
        }
      }

}

