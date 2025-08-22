import express from 'express';
import { createCourse, getAllCourses } from '../controllers/courseController.js';

const router = express.Router();

// GET /api/courses -> Fetches all courses
router.get('/', getAllCourses);

// POST /api/courses -> Creates a new course
router.post('/', createCourse);

export default router;