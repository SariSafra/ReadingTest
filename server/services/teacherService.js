import Teacher from "../models/Teacher.js";

export default class TeacherService{
    getAllDiagnoses = async () => {
        return await Teacher.find();
      }

      getTeacherById = async (id) => {
        return await Teacher.findById(id);
      }

      createTeacher = async (teacherData) => {
        const Teacher = new Teacher(teacherData);
        return await Teacher.save();
      }

      updateTeacher = async (id, teacherData) => {
        return await Teacher.findByIdAndUpdate(id, teacherData, { new: true, runValidators: true });
      }

      deleteTeacher = async (id) => {
        return await Teacher.findByIdAndDelete(id);
      }
}
