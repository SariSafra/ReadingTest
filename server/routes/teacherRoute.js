import express from 'express';
import TeacherController from '../controllers/teacherController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();
const teacherController = new TeacherController();


router.post('/', teacherController.createTeacher);
router.use(authMiddleware);
router.get('/', teacherController.getAllTeachers);
router.get('/:id', teacherController.getTeacherById);
router.put('/:id', teacherController.updateTeacher);
router.delete('/:id', teacherController.deleteTeacher);
router.post('/students',  teacherController.createStudent);

export default router;
