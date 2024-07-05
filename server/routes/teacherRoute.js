// routes/teacherRoutes.js
import express from 'express';
import TeacherController from '../controllers/teacherController.js';
import upload from '../middlewares/upload.js';
import teacherPermission from '../middlewares/teacherPermission.js'

const router = express.Router();
const teacherController = new TeacherController();

router.get('/:email',teacherPermission, teacherController.getTeacherByEmail);
router.get('/:email/students',teacherPermission, teacherController.getStudentsByTeacherEmail);
router.put('/:email',teacherPermission, upload.single('file'), teacherController.updateTeacherByEmail);
router.delete('/:id',teacherPermission, teacherController.deleteTeacher);
router.post('/students', upload.single('file'), teacherController.createStudent);

export default router;
