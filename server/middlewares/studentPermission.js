import StudentService from '../services/studentService.js';

const studentService = new StudentService();


const studentPermission = async (req, res, next) => {
    try {
        if (req.role == 'student' && req.params.id != req.user.studentId)
            throw new Error('No permission')
        else if(req.role == 'teacher' ){
            const isTeacherStudent = req.user.students.some(s=>s.studentId==req.params.id);
            if (!isTeacherStudent)
                throw new Error('No permission')
        }
    }
    catch (error) {
        return res.status(401).json({ message: error.message });
    }
    next();
}

export default studentPermission;