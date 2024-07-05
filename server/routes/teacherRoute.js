// routes/teacherRoutes.js
import express from 'express';
import TeacherController from '../controllers/teacherController.js';
import upload from '../middlewares/upload.js';
import teacherPermission from '../middlewares/teacherPermission.js'

const router = express.Router();
const teacherController = new TeacherController();

router.get('/:id',teacherPermission, teacherController.getTeacherById);
router.get('/:teacherEmail/students',teacherPermission, teacherController.getStudentsByTeacherEmail);
router.put('/:id',teacherPermission, teacherController.updateTeacher);
router.delete('/:id',teacherPermission, teacherController.deleteTeacher);
router.post('/students', upload.single('file'), teacherController.createStudent);

export default router;
