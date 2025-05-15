import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI!);
    console.log("Connected to MongoDb", conn.connection.host);
  } catch (error) {
    console.log("Failed to connect to MongoDB", (error as Error).message);
    process.exit(1);
  }
};
