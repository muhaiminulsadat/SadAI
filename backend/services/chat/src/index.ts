import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.ts";
import chatRoutes from "./routes/chat.routes.ts";

dotenv.config();

const port = process.env.PORT || 8002;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.send("Hello from chat!");
});

app.use("/api/v1/chat", chatRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDB();
});
