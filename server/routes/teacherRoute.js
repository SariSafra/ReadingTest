import express from 'express';
import TeacherController from '../controllers/teacherController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();
const teacherController = new TeacherController();

import multer from 'multer';

const upload = multer({ dest: 'uploads/' })

router.post('/', teacherController.createTeacher);
router.use(authMiddleware);
router.get('/', teacherController.getAllTeachers);
router.get('/:id', teacherController.getTeacherById);
router.get('/:teacherEmail/students',upload.single('profile'), teacherController.getStudentsByTeacherEmail);
router.put('/:id', teacherController.updateTeacher);
router.delete('/:id', teacherController.deleteTeacher);
router.post('/students',  teacherController.createStudent);

export default router;
