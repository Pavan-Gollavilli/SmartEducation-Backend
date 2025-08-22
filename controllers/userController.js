import User from '../models/userModel.js';
import Course from '../models/courseModel.js';
import mongoose from 'mongoose';

// @desc    Create a new user (for simulation purposes)
// @route   POST /api/users
export const createUser = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'User name is required' });
    }
    const userExists = await User.findOne({ name });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const user = await User.create({ name });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server Error: ' + error.message });
  }
};

// @desc    Enroll a user in a course
// @route   POST /api/users/:userId/enroll
export const enrollInCourse = async (req, res) => {
  try {
    const { userId } = req.params;
    const { courseId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(courseId)) {
        return res.status(400).json({ message: 'Invalid User or Course ID' });
    }
    
    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    if (!user || !course) {
      return res.status(404).json({ message: 'User or Course not found' });
    }

    // Check if already enrolled
    const isEnrolled = user.enrolledCourses.some(enrollment => enrollment.course.toString() === courseId);
    if (isEnrolled) {
      return res.status(400).json({ message: 'User is already enrolled in this course' });
    }

    // Add to enrolled courses array
    user.enrolledCourses.push({ course: courseId, progress: Math.floor(Math.random() * 20) }); // Start with some random initial progress
    await user.save();

    res.status(200).json({ message: 'Enrollment successful', user });

  } catch (error) {
    res.status(500).json({ message: 'Server Error: ' + error.message });
  }
};


// @desc    Get enrolled courses for a user
// @route   GET /api/users/:userId/courses
export const getEnrolledCourses = async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid User ID' });
    }

    const user = await User.findById(userId).populate('enrolledCourses.course');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user.enrolledCourses);
  } catch (error) {
    res.status(500).json({ message: 'Server Error: ' + error.message });
  }
};