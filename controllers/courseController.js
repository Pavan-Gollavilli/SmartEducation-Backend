import Course from '../models/courseModel.js';

// @desc    Create a new course
// @route   POST /api/courses
export const createCourse = async (req, res) => {
  try {
    const { title, instructor, image, description } = req.body;

    if (!title || !instructor || !image || !description) {
      return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    const newCourse = new Course({
      title,
      instructor,
      image,
      description,
    });

    const savedCourse = await newCourse.save();

    res.status(201).json({
      message: 'Course created successfully!',
      course: savedCourse,
    });

  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ message: 'Server error. Could not create the course.' });
  }
};

// @desc    Get all courses
// @route   GET /api/courses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.status(200).json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ message: 'Server error. Could not fetch courses.' });
  }
};