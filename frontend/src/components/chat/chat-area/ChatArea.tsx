import React, { useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setMessages,
  addMessage,
  setIsLoadingMessages,
  setIsSendingMessage,
  toggleRightPanel,
  addConversation,
  setSelectedConversation,
} from "@/redux/slices/conversation.slice";
import { chatService } from "@/services/chatService";
import toast from "react-hot-toast";

import { ChatHeader } from "./ChatHeader";
import { ChatMessageList } from "./ChatMessageList";
import { ChatInput } from "./ChatInput";
import type { AgentMode } from "./AgentModeSelector";

export const MainChatArea: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    conversations,
    selectedConversation,
    messages,
    isLoadingMessages,
    isSendingMessage,
    isRightPanelOpen,
  } = useAppSelector((state) => state.conversation);
  const { user } = useAppSelector((state) => state.user);

  const activeConvo = conversations.find((c) => c._id === selectedConversation);

  // Fetch messages when selectedConversation changes
  useEffect(() => {
    if (!selectedConversation) {
      dispatch(setMessages([]));
      return;
    }

    const fetchMessages = async () => {
      dispatch(setIsLoadingMessages(true));
      try {
        const response = await chatService.getMessages(selectedConversation);
        if (response.success && response.data) {
          dispatch(setMessages(response.data));
        }
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to load messages"
        );
      } finally {
        dispatch(setIsLoadingMessages(false));
      }
    };

    fetchMessages();
  }, [selectedConversation, dispatch]);

  const handleSendMessage = useCallback(
    async (content: string, mode?: AgentMode) => {
      let currentConvoId = selectedConversation;

      // If no conversation selected, create one automatically
      if (!currentConvoId) {
        try {
          const title = content.slice(0, 30);
          const newConvoRes = await chatService.createConversation(title);
          if (newConvoRes.success && newConvoRes.data) {
            dispatch(addConversation(newConvoRes.data));
            dispatch(setSelectedConversation(newConvoRes.data._id));
            currentConvoId = newConvoRes.data._id;
          } else {
            toast.error("Failed to create conversation");
            return;
          }
        } catch {
          toast.error("Failed to start new chat session");
          return;
        }
      }

      // Add user message locally
      const userMsg = {
        conversationId: currentConvoId,
        role: "user" as const,
        content,
        createdAt: new Date().toISOString(),
      };
      dispatch(addMessage(userMsg));
      dispatch(setIsSendingMessage(true));

      try {
        // Send prompt with selected agent to AI service (which saves user prompt & assistant response)
        const agentRes = await chatService.sendAgentPrompt({
          prompt: content,
          conversationId: currentConvoId,
          agent: mode || "auto",
        });

        if (agentRes.success && agentRes.data) {
          let responseContent = "";
          let responseImages: string[] = [];

          if (typeof agentRes.data === "string") {
            responseContent = agentRes.data;
          } else if (typeof agentRes.data === "object" && agentRes.data !== null) {
            responseContent = agentRes.data.aiResponse || "";
            responseImages = Array.isArray(agentRes.data.images)
              ? agentRes.data.images
              : [];
          }

          const assistantMsg = {
            conversationId: currentConvoId,
            role: "assistant" as const,
            content: responseContent,
            images: responseImages,
            createdAt: new Date().toISOString(),
          };
          dispatch(addMessage(assistantMsg));
        } else {
          toast.error(agentRes.message || "Failed to get AI response");
        }
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to get AI response"
        );
      } finally {
        dispatch(setIsSendingMessage(false));
      }
    },
    [selectedConversation, dispatch]
  );

  const handleClearMessages = () => {
    dispatch(setMessages([]));
    toast.success("Messages cleared");
  };

  return (
    <div className="flex flex-col flex-1 h-full bg-background overflow-hidden relative">
      <ChatHeader
        title={activeConvo?.title}
        isRightPanelOpen={isRightPanelOpen}
        onToggleRightPanel={() => dispatch(toggleRightPanel())}
        onClearMessages={handleClearMessages}
      />

      <ChatMessageList
        messages={messages}
        isLoading={isLoadingMessages}
        isSending={isSendingMessage}
        userName={user?.name || user?.email}
        onSelectPrompt={handleSendMessage}
      />

      <ChatInput
        onSendMessage={handleSendMessage}
        isSending={isSendingMessage}
        disabled={isLoadingMessages}
      />
    </div>
  );
};

export default MainChatArea;
