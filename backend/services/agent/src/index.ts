import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.ts";

dotenv.config();

const port = process.env.PORT;

const app = express();

app.get("/", (req, res) => {
  res.send("Hello from agent!");
});

app.listen(port, () => {
  console.log(`Agent Server is running on port ${port}`);
  connectDB()
});
