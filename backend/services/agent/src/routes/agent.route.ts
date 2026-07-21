import express from "express";
import {agent} from "../controllers/agent.controller.ts";

const router = express.Router();

router.post("/chat", agent);

export default router;
