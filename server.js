import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import courseRoutes from './routes/courseRoutes.js';
import userRoutes from './routes/userRoutes.js'; 

dotenv.config();
const app = express();

// --- Middleware ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Database Connection ---
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://admin:admin@cluster0.wvwvp2i.mongodb.net/courses?retryWrites=true&w=majority&appName=Cluster0');
    console.log('🚀 MongoDB Connected Successfully!');
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

connectDB();

// --- API Routes ---
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Use the course routes for any request to /api/courses
app.use('/api/courses', courseRoutes);
app.use('/api/users', userRoutes);

// --- Server Listening ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server is running on http://localhost:${PORT}`));