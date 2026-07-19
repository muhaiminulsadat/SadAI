import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
      throw new Error(
        "MONGODB_URI is not defined in the environment variables",
      );
    }

    await mongoose.connect(mongoURI);
    console.log("Database connected successfully");
  } catch (error: any) {
    console.log("Database connection error", error.message);
    process.exit(1);
  }
};

export default connectDB;
