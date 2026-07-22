import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {ChatMessage} from "../../services/chatService";

export interface MessageState {
  messages: ChatMessage[];
  isLoadingMessages: boolean;
  isSendingMessage: boolean;
  error: string | null;
}

const initialState: MessageState = {
  messages: [],
  isLoadingMessages: false,
  isSendingMessage: false,
  error: null,
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<ChatMessage[]>) => {
      state.messages = action.payload;
    },
    addMessage: (state, action: PayloadAction<ChatMessage>) => {
      state.messages.push(action.payload);
    },
    updateMessage: (
      state,
      action: PayloadAction<{index: number; message: Partial<ChatMessage>}>,
    ) => {
      const {index, message} = action.payload;
      if (state.messages[index]) {
        state.messages[index] = {...state.messages[index], ...message};
      }
    },
    clearMessages: (state) => {
      state.messages = [];
    },
    setIsLoadingMessages: (state, action: PayloadAction<boolean>) => {
      state.isLoadingMessages = action.payload;
    },
    setIsSendingMessage: (state, action: PayloadAction<boolean>) => {
      state.isSendingMessage = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setMessages,
  addMessage,
  updateMessage,
  clearMessages,
  setIsLoadingMessages,
  setIsSendingMessage,
  setError,
} = messageSlice.actions;

export default messageSlice.reducer;
