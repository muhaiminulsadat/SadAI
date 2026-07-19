import express from "express";
import dotenv from "dotenv";
import proxy from "express-http-proxy";
import cors from "cors";
import cookieParser from "cookie-parser";

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

app.use(
  "/api/v1/auth",
  proxy(process.env.AUTH_SERVICE_URL!, {
    proxyReqPathResolver: (req) => req.originalUrl,
  }),
);

app.use(
  "/api/auth",
  proxy(process.env.AUTH_SERVICE_URL!, {
    proxyReqPathResolver: (req) => req.originalUrl,
  }),
);

app.get("/", (_req, res) => {
  res.send("Gateway is running");
});

app.listen(port, () => {
  console.log(`Gateway is running on port ${port}`);
});
