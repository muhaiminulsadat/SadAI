import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./slices/user.slice";
import conversationReducer from "./slices/conversation.slice";
import messageReducer from "./slices/message.slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    conversation: conversationReducer,
    message: messageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
