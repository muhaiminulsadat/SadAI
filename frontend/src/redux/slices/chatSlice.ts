import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Conversation, ChatMessage } from "../../services/chatService";

interface ChatState {
  conversations: Conversation[];
  activeConversationId: string | null;
  messages: ChatMessage[];
  isLoadingConversations: boolean;
  isLoadingMessages: boolean;
  isSendingMessage: boolean;
  isRightPanelOpen: boolean;
}

const initialState: ChatState = {
  conversations: [],
  activeConversationId: null,
  messages: [],
  isLoadingConversations: false,
  isLoadingMessages: false,
  isSendingMessage: false,
  isRightPanelOpen: true,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setConversations: (state, action: PayloadAction<Conversation[]>) => {
      state.conversations = action.payload;
    },
    setActiveConversationId: (state, action: PayloadAction<string | null>) => {
      state.activeConversationId = action.payload;
    },
    setMessages: (state, action: PayloadAction<ChatMessage[]>) => {
      state.messages = action.payload;
    },
    addMessage: (state, action: PayloadAction<ChatMessage>) => {
      state.messages.push(action.payload);
    },
    addConversation: (state, action: PayloadAction<Conversation>) => {
      state.conversations.unshift(action.payload);
    },
    setIsLoadingConversations: (state, action: PayloadAction<boolean>) => {
      state.isLoadingConversations = action.payload;
    },
    setIsLoadingMessages: (state, action: PayloadAction<boolean>) => {
      state.isLoadingMessages = action.payload;
    },
    setIsSendingMessage: (state, action: PayloadAction<boolean>) => {
      state.isSendingMessage = action.payload;
    },
    toggleRightPanel: (state) => {
      state.isRightPanelOpen = !state.isRightPanelOpen;
    },
  },
});

export const {
  setConversations,
  setActiveConversationId,
  setMessages,
  addMessage,
  addConversation,
  setIsLoadingConversations,
  setIsLoadingMessages,
  setIsSendingMessage,
  toggleRightPanel,
} = chatSlice.actions;

export default chatSlice.reducer;
