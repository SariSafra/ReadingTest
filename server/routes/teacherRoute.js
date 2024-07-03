// routes/teacherRoutes.js
import express from 'express';
import TeacherController from '../controllers/teacherController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import upload from '../middlewares/upload.js';

const router = express.Router();
const teacherController = new TeacherController();

router.post('/', teacherController.createTeacher);
router.use(authMiddleware);
router.get('/', teacherController.getAllTeachers);
router.get('/:id', teacherController.getTeacherById);
router.get('/:teacherEmail/students', teacherController.getStudentsByTeacherEmail);
router.put('/:id', teacherController.updateTeacher);
router.delete('/:id', teacherController.deleteTeacher);
router.post('/students', upload.single('file'), teacherController.createStudent);

export default router;
