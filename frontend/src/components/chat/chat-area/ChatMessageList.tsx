import React from "react";
import type { ChatMessage } from "@/services/chatService";
import { ChatMessageItem } from "./ChatMessageItem";
import { ChatWelcomeState } from "./ChatWelcomeState";
import { Skeleton } from "@/components/ui/skeleton";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller";

interface ChatMessageListProps {
  messages: ChatMessage[];
  isLoading: boolean;
  isSending: boolean;
  userName?: string;
  onSelectPrompt: (prompt: string) => void;
}

function deduplicateMessages(messages: ChatMessage[]): ChatMessage[] {
  return messages.reduce<ChatMessage[]>((acc, current) => {
    const isDuplicate = acc.some((msg) => {
      if (current._id && msg._id) return msg._id === current._id;
      return (
        msg.role === current.role &&
        msg.content === current.content &&
        Math.abs(
          new Date(msg.createdAt || 0).getTime() -
            new Date(current.createdAt || 0).getTime()
        ) < 5000
      );
    });
    if (!isDuplicate) acc.push(current);
    return acc;
  }, []);
}

export const ChatMessageList: React.FC<ChatMessageListProps> = ({
  messages,
  isLoading,
  isSending,
  userName,
  onSelectPrompt,
}) => {
  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col gap-6 p-4 max-w-4xl mx-auto w-full">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className={`flex gap-3 ${i % 2 === 1 ? "flex-row-reverse" : ""}`}>
            <Skeleton className="size-7 shrink-0 rounded-full" />
            <div className="flex flex-col gap-2 flex-1 max-w-[60%]">
              <Skeleton className="h-3.5 w-20 rounded" />
              <Skeleton className="h-14 w-full rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (messages.length === 0) {
    return <ChatWelcomeState onSelectPrompt={onSelectPrompt} />;
  }

  const deduplicated = deduplicateMessages(messages);

  return (
    <MessageScrollerProvider autoScroll>
      <MessageScroller className="flex-1">
        <MessageScrollerViewport className="px-2 sm:px-4 py-4">
          <MessageScrollerContent className="max-w-4xl mx-auto gap-4">
            {deduplicated.map((msg, idx) => (
              <MessageScrollerItem
                key={msg._id || `msg-${idx}-${msg.role}-${msg.content.slice(0, 10)}`}
                messageId={msg._id || `msg-${idx}`}
                scrollAnchor={msg.role === "user"}
              >
                <ChatMessageItem message={msg} userName={userName} />
              </MessageScrollerItem>
            ))}

            {isSending && (
              <MessageScrollerItem messageId="thinking">
                <div className="flex items-end gap-2 px-2 sm:px-4">
                  <div className="size-7 shrink-0 rounded-full bg-muted flex items-center justify-center">
                    <div className="size-2 rounded-full bg-muted-foreground/40 animate-pulse" />
                  </div>
                  <div className="flex items-center gap-1.5 rounded-xl rounded-bl-sm border border-border/50 bg-muted px-4 py-3 text-xs text-muted-foreground">
                    <span>SadAI is thinking</span>
                    <span className="flex items-center gap-1">
                      <span className="size-1.5 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:-0.3s]" />
                      <span className="size-1.5 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:-0.15s]" />
                      <span className="size-1.5 rounded-full bg-muted-foreground/50 animate-bounce" />
                    </span>
                  </div>
                </div>
              </MessageScrollerItem>
            )}
          </MessageScrollerContent>
        </MessageScrollerViewport>

        <MessageScrollerButton />
      </MessageScroller>
    </MessageScrollerProvider>
  );
};
