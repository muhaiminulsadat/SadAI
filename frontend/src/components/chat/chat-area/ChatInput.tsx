import React, { useState, useRef, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ArrowUp, Paperclip, Code, Loader2 } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  isSending: boolean;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  isSending,
  disabled,
}) => {
  const [content, setContent] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-grow textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        180
      )}px`;
    }
  }, [content]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = content.trim();
    if (!trimmed || isSending || disabled) return;
    onSendMessage(trimmed);
    setContent("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-3 sm:p-4 bg-transparent shrink-0 z-10">
      <form
        onSubmit={handleSubmit}
        className="relative flex flex-col rounded-2xl border border-border/70 bg-card/80 backdrop-blur-2xl shadow-xl shadow-black/5 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/50 transition-all duration-200 ease-out overflow-hidden"
      >
        <Textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask SadAI anything... (Shift + Enter for new line)"
          disabled={disabled || isSending}
          rows={1}
          className="min-h-[46px] max-h-[180px] w-full resize-none border-0 bg-transparent px-4 py-3 text-sm focus-visible:ring-0 placeholder:text-muted-foreground/60 shadow-none leading-relaxed"
        />

        <div className="flex items-center justify-between px-3 py-2 border-t border-border/30 bg-muted/20">
          <div className="flex items-center gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger render={
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-7 text-muted-foreground hover:text-foreground active:scale-95 transition-transform"
                    disabled={disabled || isSending}
                  >
                    <Paperclip className="size-3.5" />
                    <span className="sr-only">Attach file</span>
                  </Button>
                } />
                <TooltipContent side="top" className="text-xs">Attach file</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger render={
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-7 text-muted-foreground hover:text-foreground active:scale-95 transition-transform"
                    disabled={disabled || isSending}
                  >
                    <Code className="size-3.5" />
                    <span className="sr-only">Format code</span>
                  </Button>
                } />
                <TooltipContent side="top" className="text-xs">Insert Code Snippet</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <span className="text-[10px] text-muted-foreground/50 ml-2 font-mono hidden sm:inline select-none">
              Press Enter ↵
            </span>
          </div>

          <Button
            type="submit"
            size="icon"
            disabled={!content.trim() || isSending || disabled}
            className="size-8 rounded-xl bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 active:scale-[0.97] transition-all duration-150 ease-out disabled:opacity-40"
          >
            {isSending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <ArrowUp className="size-4" />
            )}
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </form>
    </div>
  );
};
