import Teacher from '../models/Teacher.js';

export default class TeacherService {

    getAllDiagnosis = async () => {
        return await Teacher.find();
    };

    getAllTeachers = async () => {
        return await Teacher.find();
    };

    getTeacherById = async (email) => {
        return await Teacher.findOne({email}).populate('students');
    };

    createTeacher = async (teacherData) => {
        const teacher = new Teacher(teacherData);
        return await teacher.save();
    };

    updateTeacher = async (email, teacherData) => {
            return await Teacher.findOneAndUpdate({ email }, teacherData, { new: true, runValidators: true });
         };

    deleteTeacher = async (email) => {
        return await Teacher.findOneAndDelete({ email });
    };
}
