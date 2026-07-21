import axios from "axios";
import {Request, Response} from "express";
import {graph} from "../graph/graph.ts";

export const agent = async (req: Request, res: Response) => {
  try {
    const {prompt, conversationId} = req.body;

    await axios.post(`${process.env.AGENT_SERVICE_URL}/save-message`, {
      content: prompt,
      conversationId,
      role: "user",
    });

    const result = await graph.invoke({
      prompt,
      conversationId,
    });

    return res.status(200).json({
      success: true,
      message: "Agent executed successfully",
      data: result.aiResponse,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server agent error";
    return res.status(500).json({success: false, message});
  }
};
