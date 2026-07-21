import React, { useState } from "react";
import { Bot, Copy, Check } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { ChatMessage } from "@/services/chatService";
import { cn } from "@/lib/utils";

interface ChatMessageItemProps {
  message: ChatMessage;
  userEmail?: string;
}

export const ChatMessageItem: React.FC<ChatMessageItemProps> = ({
  message,
  userEmail,
}) => {
  const isUser = message.role === "user";
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const userInitial = userEmail ? userEmail.charAt(0).toUpperCase() : "U";

  return (
    <div
      className={cn(
        "flex w-full items-start gap-3 py-2 transition-all duration-200",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      <Avatar className={cn("h-8 w-8 shrink-0 border border-border/40 shadow-xs", isUser ? "bg-primary text-primary-foreground" : "bg-muted text-foreground")}>
        <AvatarFallback className={isUser ? "bg-primary text-primary-foreground font-semibold" : "bg-muted text-muted-foreground font-semibold"}>
          {isUser ? userInitial : <Bot className="h-4 w-4 text-primary" />}
        </AvatarFallback>
      </Avatar>

      <div
        className={cn(
          "group relative max-w-[85%] sm:max-w-[75%]",
          isUser ? "items-end" : "items-start"
        )}
      >
        <Card
          className={cn(
            "p-3 text-sm leading-relaxed shadow-xs transition-all duration-200",
            isUser
              ? "rounded-2xl rounded-tr-xs bg-primary text-primary-foreground border-transparent"
              : "rounded-2xl rounded-tl-xs bg-card/60 backdrop-blur-md border-border/40 text-foreground"
          )}
        >
          <div className="whitespace-pre-wrap break-words">{message.content}</div>
        </Card>

        <div
          className={cn(
            "mt-1 flex items-center gap-1 text-[10px] text-muted-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100",
            isUser ? "justify-end" : "justify-start"
          )}
        >
          <span>{isUser ? "You" : "SadAI"}</span>
          <span>•</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5 hover:bg-accent/50 text-muted-foreground hover:text-foreground"
            onClick={handleCopy}
            title="Copy message"
          >
            {copied ? (
              <Check className="h-3 w-3 text-emerald-500" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
