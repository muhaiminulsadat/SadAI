import { api, type ApiResponse } from "./api";

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
  createdAt?: string;
}

export const chatService = {
  async getConversations(): Promise<ApiResponse<Conversation[]>> {
    const res = await api.get<ApiResponse<Conversation[]>>("/api/v1/chat/get-conversations");
    return res.data;
  },

  async createConversation(title?: string): Promise<ApiResponse<Conversation>> {
    const res = await api.post<ApiResponse<Conversation>>("/api/v1/chat/create-conversation", { title });
    return res.data;
  },

  async getMessages(conversationId: string): Promise<ApiResponse<ChatMessage[]>> {
    const res = await api.get<ApiResponse<ChatMessage[]>>(`/api/v1/chat/get-messages/${conversationId}`);
    return res.data;
  },

  async saveMessage(data: { conversationId: string; role: "user" | "assistant"; content: string }): Promise<ApiResponse<ChatMessage>> {
    const res = await api.post<ApiResponse<ChatMessage>>("/api/v1/chat/save-message", data);
    return res.data;
  },

  async updateConversationTitle(conversationId: string, title: string): Promise<ApiResponse<Conversation>> {
    const res = await api.put<ApiResponse<Conversation>>("/api/v1/chat/update-conversation", { conversationId, title });
    return res.data;
  },
};
