import React from "react";
import { Bot, PanelRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChatBlankState } from "./ChatBlankState";
import { ChatMessageList } from "./ChatMessageList";
import { ChatInput } from "./ChatInput";
import type { ChatMessage } from "@/services/chatService";

interface ChatMainProps {
  activeTitle?: string;
  messages: ChatMessage[];
  isLoadingMessages: boolean;
  isSending: boolean;
  userEmail?: string;
  isRightPanelOpen: boolean;
  onToggleRightPanel: () => void;
  onSendMessage: (content: string) => void;
}

export const ChatMain: React.FC<ChatMainProps> = ({
  activeTitle,
  messages,
  isLoadingMessages,
  isSending,
  userEmail,
  isRightPanelOpen,
  onToggleRightPanel,
  onSendMessage,
}) => {
  return (
    <main className="flex flex-1 flex-col h-full overflow-hidden bg-background/50 relative">
      {/* Top Bar matching wireframe top section in middle column */}
      <header className="flex h-14 items-center justify-between border-b border-border/40 bg-card/40 px-4 backdrop-blur-md">
        <div className="flex items-center space-x-3 overflow-hidden">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary">
            <Bot className="h-4 w-4" />
          </div>
          <div className="flex flex-col overflow-hidden">
            <h1 className="truncate text-sm font-semibold text-foreground">
              {activeTitle || "New Conversation"}
            </h1>
            <div className="flex items-center space-x-1.5 text-[10px] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span>SadAI Agent</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="hidden sm:inline-flex gap-1 text-[10px]">
            <Sparkles className="h-3 w-3 text-primary" />
            <span>v1.0</span>
          </Badge>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleRightPanel}
            className={`h-8 w-8 text-muted-foreground hover:text-foreground active:scale-[0.97] ${isRightPanelOpen ? "bg-accent text-foreground" : ""}`}
            title="Toggle details panel"
          >
            <PanelRight className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Center Messages / Blank State Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {messages.length === 0 && !isLoadingMessages ? (
          <ChatBlankState onSelectPrompt={onSendMessage} />
        ) : (
          <ChatMessageList
            messages={messages}
            isLoading={isLoadingMessages}
            isSending={isSending}
            userEmail={userEmail}
          />
        )}
      </div>

      {/* Bottom Input Form matching wireframe bottom section */}
      <ChatInput onSendMessage={onSendMessage} disabled={isSending} />
    </main>
  );
};
