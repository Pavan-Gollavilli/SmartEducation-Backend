import express from 'express';
import { createUser, enrollInCourse, getEnrolledCourses } from '../controllers/userController.js';

const router = express.Router();

router.post('/', createUser); // Create a user
router.post('/:userId/enroll', enrollInCourse); // Enroll in a course
router.get('/:userId/courses', getEnrolledCourses); // Get user's enrolled courses

export default router;