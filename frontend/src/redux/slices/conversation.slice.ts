import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {Conversation, ChatMessage} from "../../services/chatService";

export interface ConversationState {
  conversations: Conversation[];
  selectedConversation: string | null;
  activeConversationId: string | null;
  messages: ChatMessage[];
  isLoadingConversations: boolean;
  isLoadingMessages: boolean;
  isSendingMessage: boolean;
  isRightPanelOpen: boolean;
}

const initialState: ConversationState = {
  conversations: [],
  selectedConversation: null,
  activeConversationId: null,
  messages: [],
  isLoadingConversations: false,
  isLoadingMessages: false,
  isSendingMessage: false,
  isRightPanelOpen: false,
};

const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    setConversations: (state, action: PayloadAction<Conversation[]>) => {
      state.conversations = action.payload;
    },

    addConversation: (state, action: PayloadAction<Conversation>) => {
      state.conversations.unshift(action.payload);
    },

    removeConversation: (state, action: PayloadAction<string>) => {
      state.conversations = state.conversations.filter(
        (c) => c._id !== action.payload,
      );
      if (state.selectedConversation === action.payload) {
        state.selectedConversation =
          state.conversations.length > 0 ? state.conversations[0]._id : null;
      }
      if (state.activeConversationId === action.payload) {
        state.activeConversationId = state.selectedConversation;
      }
    },

    setSelectedConversation: (state, action: PayloadAction<string | null>) => {
      state.selectedConversation = action.payload;
      state.activeConversationId = action.payload;
    },

    setActiveConversationId: (state, action: PayloadAction<string | null>) => {
      state.activeConversationId = action.payload;
      state.selectedConversation = action.payload;
    },

    setMessages: (state, action: PayloadAction<ChatMessage[]>) => {
      state.messages = action.payload;
    },

    addMessage: (state, action: PayloadAction<ChatMessage>) => {
      state.messages.push(action.payload);
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
  addConversation,
  removeConversation,
  setSelectedConversation,
  setActiveConversationId,
  setMessages,
  addMessage,
  setIsLoadingConversations,
  setIsLoadingMessages,
  setIsSendingMessage,
  toggleRightPanel,
} = conversationSlice.actions;

export default conversationSlice.reducer;


