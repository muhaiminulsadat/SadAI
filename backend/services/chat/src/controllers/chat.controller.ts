import {Request, Response} from "express";
import Conversation from "../models/conversation.model.ts";
import Message from "../models/message.model.ts";

export const createConversation = async (req: Request, res: Response) => {
  try {
    const userId = req.headers["user-id"] as string;
    const { title } = req.body || {};

    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "User ID missing from headers" });
    }

    const conversation = new Conversation({
      userId,
      title: title || "New Conversation",
    });
    await conversation.save();
    return res.status(201).json({
      success: true,
      message: "Conversation created successfully",
      data: conversation,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return res.status(500).json({ success: false, message });
  }
};

export const getConversations = async (req: Request, res: Response) => {
  try {
    const userId = req.headers["user-id"] as string;

    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "User ID missing from headers" });
    }

    const conversations = await Conversation.find({ userId }).sort({
      updatedAt: -1,
    });
    return res.status(200).json({
      success: true,
      message: "Conversations retrieved successfully",
      data: conversations || [],
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return res.status(500).json({ success: false, message });
  }
};

export const saveMessage = async (req: Request, res: Response) => {
  try {
    const { conversationId, role, content, images } = req.body || {};

    if (!conversationId || !role || !content) {
      return res.status(400).json({
        success: false,
        message: "conversationId, role, and content are required",
      });
    }

    const message = await Message.create({
      conversationId,
      role,
      content,
      images: Array.isArray(images) ? images : [],
    });
    const conversation = await Conversation.findByIdAndUpdate(conversationId, {
      $push: { messages: message._id },
    });
    if (!conversation) {
      return res
        .status(404)
        .json({ success: false, message: "Conversation not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Message saved successfully",
      data: message,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return res.status(500).json({ success: false, message });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    const conversationId = req.params.conversationId;

    if (!conversationId) {
      return res
        .status(400)
        .json({success: false, message: "Conversation ID is required"});
    }

    const messages = await Message.find({conversationId}).sort({
      createdAt: 1,
    });

    if (!messages) {
      return res
        .status(404)
        .json({success: false, message: "No messages found"});
    }

    return res.status(200).json({
      success: true,
      message: "Messages retrieved successfully",
      data: messages,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return res.status(500).json({success: false, message});
  }
};

export const updateConversation = async (req: Request, res: Response) => {
  try {
    const {conversationId, title} = req.body;
    const conversation = await Conversation.findByIdAndUpdate(conversationId, {
      title,
    });
    if (!conversation) {
      return res
        .status(404)
        .json({success: false, message: "No conversations found"});
    }
    return res.status(200).json({
      success: true,
      message: "Conversation updated successfully",
      data: conversation,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return res.status(500).json({success: false, message});
  }
};

export const deleteConversation = async (req: Request, res: Response) => {
  try {
    const {conversationId} = req.params;
    const userId = req.headers["user-id"] as string;

    if (!conversationId) {
      return res
        .status(400)
        .json({success: false, message: "Conversation ID is required"});
    }

    const conversation = await Conversation.findOneAndDelete({
      _id: conversationId,
      userId,
    });

    if (!conversation) {
      return res
        .status(404)
        .json({success: false, message: "Conversation not found"});
    }

    await Message.deleteMany({conversationId});

    return res.status(200).json({
      success: true,
      message: "Conversation deleted successfully",
      data: {conversationId},
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return res.status(500).json({success: false, message});
  }
};
