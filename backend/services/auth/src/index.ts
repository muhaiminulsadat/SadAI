import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.ts";

dotenv.config();

const port = process.env.PORT;

const app = express();

app.get("/", (req, res) => {
  res.send("Auth Service is running");
});

app.listen(port, async () => {
  console.log(`Auth Service is running on port ${port}`);
  await connectDB();
});
