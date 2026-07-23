import {api, type ApiResponse} from "./api";

export interface Conversation {
  _id: string;
  userId: string;
  title: string;
  messages: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  _id?: string;
  conversationId: string;
  role: "user" | "assistant" | "system";
  content: string;
  images?: string[];
  createdAt?: string;
}

export const chatService = {
  async getConversations(): Promise<ApiResponse<Conversation[]>> {
    const res = await api.get<ApiResponse<Conversation[]>>(
      "/chat/get-conversations",
    );
    return res.data;
  },

  async createConversation(title?: string): Promise<ApiResponse<Conversation>> {
    const res = await api.post<ApiResponse<Conversation>>(
      "/chat/create-conversation",
      {title},
    );
    return res.data;
  },

  async getMessages(
    conversationId: string,
  ): Promise<ApiResponse<ChatMessage[]>> {
    const res = await api.get<ApiResponse<ChatMessage[]>>(
      `/chat/get-messages/${conversationId}`,
    );
    return res.data;
  },

  async saveMessage(data: {
    conversationId: string;
    role: "user" | "assistant";
    content: string;
    images?: string[];
  }): Promise<ApiResponse<ChatMessage>> {
    const res = await api.post<ApiResponse<ChatMessage>>(
      "/chat/save-message",
      data,
    );
    return res.data;
  },

  async updateConversationTitle(
    conversationId: string,
    title: string,
  ): Promise<ApiResponse<Conversation>> {
    const res = await api.put<ApiResponse<Conversation>>(
      "/chat/update-conversation",
      {conversationId, title},
    );
    return res.data;
  },

  async deleteConversation(
    conversationId: string,
  ): Promise<ApiResponse<{conversationId: string}>> {
    const res = await api.delete<ApiResponse<{conversationId: string}>>(
      `/chat/delete-conversation/${conversationId}`,
    );
    return res.data;
  },

  async sendAgentPrompt(data: {
    prompt: string;
    conversationId: string;
    agent?: string;
    mode?: string;
  }): Promise<ApiResponse<string | { aiResponse: string; images?: string[] }>> {
    const res = await api.post<
      ApiResponse<string | { aiResponse: string; images?: string[] }>
    >("/agent/chat", data);
    return res.data;
  },
};
