import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.ts";
import agentRouter from "./routes/agent.route.ts";

dotenv.config();

const port = process.env.PORT || 8003;

const app = express();

app.use(express.json());
app.use("/api/v1/agent", agentRouter);

app.get("/", (req, res) => {
  res.send("Hello from agent!");
});

app.listen(port, () => {
  console.log(`Agent Server is running on port ${port}`);
  connectDB();
});
