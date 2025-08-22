import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
}, { _id: false }); // _id: false prevents creating an extra id for this subdocument

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  // We will store an array of enrollments
  enrolledCourses: [enrollmentSchema],
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);
export default User;