import React, { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { ChatMessageItem } from "./ChatMessageItem";
import type { ChatMessage } from "@/services/chatService";
import { Bot } from "lucide-react";

interface ChatMessageListProps {
  messages: ChatMessage[];
  isLoading: boolean;
  isSending: boolean;
  userEmail?: string;
}

export const ChatMessageList: React.FC<ChatMessageListProps> = ({
  messages,
  isLoading,
  isSending,
  userEmail,
}) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isSending]);

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col space-y-4 p-4">
        <div className="flex items-start gap-3">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-16 w-3/4 rounded-2xl" />
        </div>
        <div className="flex flex-row-reverse items-start gap-3">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-12 w-1/2 rounded-2xl" />
        </div>
        <div className="flex items-start gap-3">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-20 w-2/3 rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1 p-4 sm:p-6">
      <div className="flex flex-col space-y-3 max-w-4xl mx-auto">
        {messages.map((msg, index) => (
          <ChatMessageItem
            key={msg._id || index}
            message={msg}
            userEmail={userEmail}
          />
        ))}

        {isSending && (
          <div className="flex items-center gap-3 py-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted border border-border/40 text-primary">
              <Bot className="h-4 w-4 animate-spin" />
            </div>
            <div className="flex items-center space-x-1 rounded-2xl bg-card/60 px-4 py-3 border border-border/40 text-xs text-muted-foreground backdrop-blur-md">
              <span className="h-1.5 w-1.5 animate-ping rounded-full bg-primary" />
              <span>Thinking...</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  );
};
