import mongoose from "mongoose";

export const connectDB = async (url) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected: ${conn.connnection host}');

  } catch (error) {
    console.log("MongoDB connection error:", error);
    
  }
};