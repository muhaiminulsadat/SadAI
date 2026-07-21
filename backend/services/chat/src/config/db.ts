import mongoose from "mongoose";
import {MongoClient} from "mongodb";
import dotenv from "dotenv";
import dns from "node:dns";

dns.setDefaultResultOrder("ipv4first");
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (e) {
  console.warn("Could not set custom DNS servers:", e);
}

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
