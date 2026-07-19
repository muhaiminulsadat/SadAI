import express from "express";
import dotenv from "dotenv";
import proxy from "express-http-proxy";
import cors from "cors";
import cookieParser from "cookie-parser";
import {authMiddleware} from "./middleware/authMiddleware.ts";
import proxyWithHeader from "./utils/proxyHeader.ts";

dotenv.config();

const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

// ─── Public routes (no auth required) ───────────────────────────────────────
app.use(
  "/api/v1/auth",
  proxy(process.env.AUTH_SERVICE_URL!, {
    proxyReqPathResolver: (req) => req.originalUrl,
  }),
);

// ─── Protected routes (session required) ────────────────────────────────────
app.use(
  "/api/v1/chat",
  authMiddleware,
  proxyWithHeader(process.env.CHAT_SERVICE_URL!),
);

app.use(
  "/api/v1/agent",
  authMiddleware,
  proxyWithHeader(process.env.AGENT_SERVICE_URL!),
);

app.get("/", (_req, res) => {
  res.send("Gateway is running");
});

app.listen(port, () => {
  console.log(`Gateway is running on port ${port}`);
});
