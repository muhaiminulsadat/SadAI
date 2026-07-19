import mongoose from "mongoose";
import {MongoClient} from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const mongoURI = process.env.MONGODB_URI;
if (!mongoURI) {
  throw new Error("MONGODB_URI is not defined in the environment variables");
}

export const client = new MongoClient(mongoURI);
export const db = client.db();

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Database connected successfully");
  } catch (error: any) {
    console.log("Database connection error", error.message);
    process.exit(1);
  }
};

export default connectDB;
