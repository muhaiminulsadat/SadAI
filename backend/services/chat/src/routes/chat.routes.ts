import express from "express";
import {
  createConversation,
  getConversations,
  saveMessage,
  getMessages,
  updateConversation,
} from "../controllers/chat.controller.ts";

const router = express.Router();

router.post("/create-conversation", createConversation);
router.get("/get-conversations", getConversations);
router.post("/save-message", saveMessage);
router.get("/get-messages/:conversationId", getMessages);
router.put("/update-conversation", updateConversation);

export default router;
