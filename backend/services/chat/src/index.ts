import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.ts";
import chatRoutes from "./routes/chat.routes.ts";

dotenv.config();

const port = process.env.PORT;

const app = express();

app.get("/", (_req, res) => {
  res.send("Hello from chat!");
});

app.use("/api/v1/chat", chatRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDB();
});
