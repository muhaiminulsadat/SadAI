import axios from "axios";
import {Request, Response} from "express";
import {graph} from "../graph/graph.ts";
import {getConversationHistory} from "../lib/memory.ts";

export const agent = async (req: Request, res: Response) => {
  try {
    const { prompt, conversationId } = req.body;

    if (!prompt || !conversationId) {
      return res.status(400).json({
        success: false,
        message: "prompt and conversationId are required",
      });
    }

    const envUrl = process.env.CHAT_SERVICE_URL?.trim();
    const chatServiceUrl = envUrl || "http://chat-service:8002";

    const saveChatMessage = async (role: "user" | "assistant", content: string) => {
      try {
        await axios.post(`${chatServiceUrl}/api/v1/chat/save-message`, {
          content,
          conversationId,
          role,
        });
      } catch (err: any) {
        if (chatServiceUrl !== "http://localhost:8002") {
          try {
            await axios.post(`http://localhost:8002/api/v1/chat/save-message`, {
              content,
              conversationId,
              role,
            });
          } catch (fallbackErr: any) {
            console.error(
              `[AgentController] ${role} message save fallback error:`,
              fallbackErr?.message
            );
          }
        } else {
          console.error(
            `[AgentController] ${role} message save warning:`,
            err?.message
          );
        }
      }
    };

    // 1. Fetch existing conversation memory before saving current message
    const history = await getConversationHistory(conversationId);

    // 2. Save user message to chat service
    await saveChatMessage("user", prompt);

    // 3. Invoke AI agent graph with prompt, conversationId, and history
    const result = await graph.invoke({
      prompt,
      conversationId,
      history,
    });

    const aiResponse = result?.aiResponse || "No response generated.";

    // 4. Save assistant message to chat service
    await saveChatMessage("assistant", aiResponse);

    return res.status(200).json({
      success: true,
      message: "Agent executed successfully",
      data: aiResponse,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server agent error";
    return res.status(500).json({ success: false, message });
  }
};
