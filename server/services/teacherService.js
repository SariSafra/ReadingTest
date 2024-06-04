import Teacher from '../models/Teacher.js';

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
        const teacher = new Teacher(teacherData);
        return await teacher.save();
    };

    updateTeacher = async (id, teacherData) => {
        return await Teacher.findByIdAndUpdate(id, teacherData, { new: true, runValidators: true });
    };

    deleteTeacher = async (id) => {
        return await Teacher.findByIdAndDelete(id);
    };
}
