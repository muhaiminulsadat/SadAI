import React, { useState, useRef, type KeyboardEvent } from "react";
import { Send, Paperclip, Code2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  disabled = false,
}) => {
  const [content, setContent] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    if (!content.trim() || disabled) return;
    onSendMessage(content.trim());
    setContent("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        160
      )}px`;
    }
  };

  const addSnippet = (prefix: string) => {
    setContent((prev) => prev + prefix);
    textareaRef.current?.focus();
  };

  return (
    <div className="p-3 sm:p-4 border-t border-border/40 bg-card/40 backdrop-blur-md">
      <div className="mx-auto max-w-4xl rounded-2xl border border-border/60 bg-background/60 p-2 shadow-inner backdrop-blur-lg transition-all focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/20">
        {/* Top toolbar buttons inside input container (matching wireframe demo image) */}
        <div className="flex items-center space-x-1 px-2 pb-1 border-b border-border/30 mb-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/40 active:scale-[0.97]"
                  onClick={() => addSnippet("```ts\n// Code snippet\n```")}
                >
                  <Code2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Add Code Block</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/40 active:scale-[0.97]"
                  onClick={() => addSnippet("Help me optimize: ")}
                >
                  <Sparkles className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Quick Prompt</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/40 active:scale-[0.97]"
                >
                  <Paperclip className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Attach File</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <span className="ml-auto text-[10px] text-muted-foreground hidden sm:inline-block">
            Shift + Enter for new line
          </span>
        </div>

        {/* Text area and Send button */}
        <div className="flex items-end gap-2 px-1">
          <Textarea
            ref={textareaRef}
            value={content}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            disabled={disabled}
            rows={1}
            className="min-h-[40px] max-h-[160px] resize-none border-0 bg-transparent px-2 py-1.5 text-sm shadow-none focus-visible:ring-0 placeholder:text-muted-foreground/60"
          />

          <Button
            size="icon"
            disabled={!content.trim() || disabled}
            onClick={handleSubmit}
            className="h-9 w-9 shrink-0 rounded-xl bg-primary text-primary-foreground shadow-md transition-all duration-200 hover:bg-primary/90 active:scale-[0.97] disabled:opacity-40"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
