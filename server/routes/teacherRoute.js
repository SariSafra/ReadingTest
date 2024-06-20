import express from 'express';
import TeacherController from '../controllers/teacherController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();
const teacherController = new TeacherController();

router.get('/', authMiddleware, teacherController.getAllTeachers);
router.get('/:id', authMiddleware, teacherController.getTeacherById);
router.post('/', teacherController.createTeacher);
router.put('/:id', authMiddleware, teacherController.updateTeacher);
router.delete('/:id', authMiddleware, teacherController.deleteTeacher);
router.post('/students', authMiddleware, teacherController.createStudent);
router.put('/password', authMiddleware, teacherController.updateTeacherPassword);

export default router;
