import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  instructor: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  // 👇 ADD THIS FIELD
  duration: {
    type: String,
    required: true,
    default: "10 hrs", // Set a default duration
  },
}, {
  timestamps: true,
});

const Course = mongoose.model('Course', courseSchema);
export default Course;