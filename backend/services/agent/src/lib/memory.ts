import axios from "axios";

export interface ChatHistoryMessage {
  role: "user" | "assistant";
  content: string;
}

export const getConversationHistory = async (
  conversationId: string
): Promise<Array<[string, string]>> => {
  const envUrl = process.env.CHAT_SERVICE_URL?.trim();
  const primaryUrl = envUrl || "http://chat-service:8002";
  const fallbackUrl = "http://localhost:8002";

  const tryFetch = async (baseUrl: string) => {
    const response = await axios.get(
      `${baseUrl}/api/v1/chat/get-messages/${conversationId}`,
      { timeout: 3000 }
    );
    if (response.data?.success && Array.isArray(response.data.data)) {
      return response.data.data.map((msg: ChatHistoryMessage) => [
        msg.role === "user" ? "human" : "ai",
        msg.content,
      ]);
    }
    return null;
  };

  try {
    const history = await tryFetch(primaryUrl);
    if (history) return history;
  } catch {
    if (primaryUrl !== fallbackUrl) {
      try {
        const history = await tryFetch(fallbackUrl);
        if (history) return history;
      } catch (fallbackError: any) {
        console.error(
          "[Memory] Fallback failed for conversation history:",
          fallbackError?.message
        );
      }
    }
  }

  return [];
};
