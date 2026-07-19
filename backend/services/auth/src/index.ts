import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.ts";
import authRoutes from "./routes/auth.routes.ts";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./config/auth.ts";

dotenv.config();

const port = process.env.PORT;

const app = express();

app.use(express.json());

app.all("/api/auth/{*path}", toNodeHandler(auth));

app.get("/api/v1/auth", (_req, res) => {
  res.send("Auth Service is running");
});

app.use("/api/v1/auth", authRoutes);

app.listen(port, async () => {
  console.log(`Auth Service is running on port ${port}`);
  await connectDB();
});
