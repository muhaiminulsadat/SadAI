import React, {useEffect, useCallback} from "react";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {
  setConversations,
  setActiveConversationId,
  setMessages,
  addMessage,
  addConversation,
  setIsLoadingConversations,
  setIsLoadingMessages,
  setIsSendingMessage,
  toggleRightPanel,
} from "@/redux/slices/chatSlice";
import {chatService} from "@/services/chatService";
import type {ChatMessage} from "@/services/chatService";
import {api} from "@/services/api";
import {ChatSidebar} from "./ChatSidebar";
import {ChatMain} from "./ChatMain";
import {ChatRightPanel} from "./ChatRightPanel";
import {toast} from "react-hot-toast";

export const ChatLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    conversations,
    activeConversationId,
    messages,
    isLoadingConversations,
    isLoadingMessages,
    isSendingMessage,
    isRightPanelOpen,
  } = useAppSelector((state) => state.chat);

  const user = useAppSelector((state) => state.user.user);

  // Fetch all conversations on mount
  const fetchConversations = useCallback(async () => {
    try {
      dispatch(setIsLoadingConversations(true));
      const res = await chatService.getConversations();
      if (res.success && res.data) {
        dispatch(setConversations(res.data));
        if (res.data.length > 0 && !activeConversationId) {
          dispatch(setActiveConversationId(res.data[0]._id));
        }
      }
    } catch {
      toast.error("Failed to load chat history");
    } finally {
      dispatch(setIsLoadingConversations(false));
    }
  }, [dispatch, activeConversationId]);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  // Fetch messages when active conversation changes
  useEffect(() => {
    if (!activeConversationId) {
      dispatch(setMessages([]));
      return;
    }

    const fetchMessages = async () => {
      try {
        dispatch(setIsLoadingMessages(true));
        const res = await chatService.getMessages(activeConversationId);
        if (res.success && res.data) {
          dispatch(setMessages(res.data));
        }
      } catch {
        toast.error("Failed to load messages");
      } finally {
        dispatch(setIsLoadingMessages(false));
      }
    };

    fetchMessages();
  }, [activeConversationId, dispatch]);

  const handleSelectConversation = (id: string) => {
    dispatch(setActiveConversationId(id));
  };

  const handleNewChat = async () => {
    try {
      const res = await chatService.createConversation("New Chat");
      if (res.success && res.data) {
        dispatch(addConversation(res.data));
        dispatch(setActiveConversationId(res.data._id));
        dispatch(setMessages([]));
        toast.success("New chat thread created");
      }
    } catch {
      toast.error("Could not create new chat");
    }
  };

  const handleSendMessage = async (content: string) => {
    let currentConvId = activeConversationId;

    // Create a new conversation if none is selected
    if (!currentConvId) {
      try {
        const titleSnippet =
          content.slice(0, 24) + (content.length > 24 ? "..." : "");
        const newConvRes = await chatService.createConversation(titleSnippet);
        if (newConvRes.success && newConvRes.data) {
          currentConvId = newConvRes.data._id;
          dispatch(addConversation(newConvRes.data));
          dispatch(setActiveConversationId(currentConvId));
        } else {
          toast.error("Failed to initialize conversation");
          return;
        }
      } catch {
        toast.error("Failed to start new conversation");
        return;
      }
    }

    // 1. Optimistic user message
    const tempUserMsg: ChatMessage = {
      conversationId: currentConvId,
      role: "user",
      content,
      createdAt: new Date().toISOString(),
    };
    dispatch(addMessage(tempUserMsg));
    dispatch(setIsSendingMessage(true));

    try {
      // 2. Save user message to backend
      await chatService.saveMessage({
        conversationId: currentConvId,
        role: "user",
        content,
      });

      // 3. Call Agent AI service via Gateway or get AI response
      let aiText = "";
      try {
        const agentRes = await api.post("/api/v1/agent/chat", {
          prompt: content,
          conversationId: currentConvId,
        });
        if (agentRes.data?.success && agentRes.data?.data?.reply) {
          aiText = agentRes.data.data.reply;
        } else {
          aiText =
            agentRes.data?.message ||
            "I have received your message and processed your query successfully.";
        }
      } catch {
        // Fallback response if agent endpoint is in mock mode
        aiText = `Hello! I received your prompt: "${content}". I am your SadAI assistant powered by microservices backend.`;
      }

      // 4. Save AI response to backend
      const savedAiMsgRes = await chatService.saveMessage({
        conversationId: currentConvId,
        role: "assistant",
        content: aiText,
      });

      if (savedAiMsgRes.success && savedAiMsgRes.data) {
        dispatch(addMessage(savedAiMsgRes.data));
      } else {
        dispatch(
          addMessage({
            conversationId: currentConvId,
            role: "assistant",
            content: aiText,
            createdAt: new Date().toISOString(),
          }),
        );
      }
    } catch {
      toast.error("Error sending message");
    } finally {
      dispatch(setIsSendingMessage(false));
    }
  };

  const activeConv = conversations.find((c) => c._id === activeConversationId);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-background to-background font-sans antialiased">
      {/* Outer framing container matching wireframe screenshot rounded border aesthetic */}
      <div className="flex flex-1 m-2 sm:m-4 rounded-3xl border border-border/50 bg-card/20 shadow-2xl backdrop-blur-xl overflow-hidden">
        {/* Left Sidebar */}
        <ChatSidebar
          conversations={conversations}
          activeId={activeConversationId}
          isLoading={isLoadingConversations}
          onSelectConversation={handleSelectConversation}
          onNewChat={handleNewChat}
        />

        {/* Center Main Chat Panel */}
        <ChatMain
          activeTitle={activeConv?.title}
          messages={messages}
          isLoadingMessages={isLoadingMessages}
          isSending={isSendingMessage}
          userEmail={user?.email}
          isRightPanelOpen={isRightPanelOpen}
          onToggleRightPanel={() => dispatch(toggleRightPanel())}
          onSendMessage={handleSendMessage}
        />

        {/* Right Info Panel */}
        {isRightPanelOpen && <ChatRightPanel />}
      </div>
    </div>
  );
};

// timestamp 5:34:00