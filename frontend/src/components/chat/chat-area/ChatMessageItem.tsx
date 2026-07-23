import React, {useState} from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {cn} from "@/lib/utils";
import type {ChatMessage} from "@/services/chatService";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageHeader,
} from "@/components/ui/message";
import {Bubble, BubbleContent} from "@/components/ui/bubble";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {Sparkles, Copy, Check} from "lucide-react";
import toast from "react-hot-toast";

interface ChatMessageItemProps {
  message: ChatMessage;
  userName?: string;
}

const markdownComponents: React.ComponentProps<
  typeof ReactMarkdown
>["components"] = {
  p: ({children}) => (
    <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>
  ),
  h1: ({children}) => (
    <h1 className="text-lg font-bold my-3 tracking-tight border-b border-border/30 pb-1.5">
      {children}
    </h1>
  ),
  h2: ({children}) => (
    <h2 className="text-base font-semibold my-2.5 tracking-tight">
      {children}
    </h2>
  ),
  h3: ({children}) => (
    <h3 className="text-sm font-semibold my-2">{children}</h3>
  ),
  ul: ({children}) => (
    <ul className="my-2 flex flex-col gap-1.5">{children}</ul>
  ),
  ol: ({children}) => (
    <ol className="my-2 list-decimal list-inside flex flex-col gap-1.5">
      {children}
    </ol>
  ),
  li: ({children}) => (
    <li className="flex items-start gap-2 text-sm">
      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-muted-foreground/40" />
      <span>{children}</span>
    </li>
  ),
  a: ({href, children}) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary underline underline-offset-4 decoration-primary/40 hover:decoration-primary transition-colors"
    >
      {children}
    </a>
  ),
  blockquote: ({children}) => (
    <blockquote className="my-2.5 border-l-2 border-primary/50 pl-4 py-1 italic text-muted-foreground">
      {children}
    </blockquote>
  ),
  table: ({children}) => (
    <div className="my-3 overflow-x-auto rounded-lg border border-border/50">
      <table className="w-full text-left text-xs border-collapse">
        {children}
      </table>
    </div>
  ),
  th: ({children}) => (
    <th className="border-b border-border bg-muted/50 px-3 py-2 font-semibold text-[11px] uppercase tracking-wide">
      {children}
    </th>
  ),
  td: ({children}) => (
    <td className="border-b border-border/30 px-3 py-2">{children}</td>
  ),
  code({className, children, ...props}) {
    const match = /language-(\w+)/.exec(className || "");
    const isInline = !className && !String(children).includes("\n");

    if (isInline) {
      return (
        <code
          className="rounded bg-muted px-1.5 py-0.5 font-mono text-[11px] border border-border/40"
          {...props}
        >
          {children}
        </code>
      );
    }

    return (
      <div className="my-3 overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-950 text-zinc-100">
        <div className="flex items-center justify-between border-b border-zinc-800/60 bg-zinc-900/80 px-4 py-2">
          <div className="flex items-center gap-2">
            <span className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-red-500/70" />
              <span className="size-2.5 rounded-full bg-yellow-500/70" />
              <span className="size-2.5 rounded-full bg-emerald-500/70" />
            </span>
            <span className="font-mono text-[11px] text-zinc-500">
              {match ? match[1] : "code"}
            </span>
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText(
                String(children).replace(/\n$/, ""),
              );
              toast.success("Code copied");
            }}
            className="flex cursor-pointer items-center gap-1.5 font-mono text-[11px] text-zinc-500 transition-colors hover:text-zinc-300"
          >
            <Copy className="size-3" />
            Copy
          </button>
        </div>
        <pre className="overflow-x-auto p-4 font-mono text-[12px] leading-relaxed [scrollbar-width:thin]">
          <code {...props}>{children}</code>
        </pre>
      </div>
    );
  },
};

export const ChatMessageItem: React.FC<ChatMessageItemProps> = ({
  message,
  userName,
}) => {
  const isUser = message.role === "user";
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    toast.success("Copied");
    setTimeout(() => setCopied(false), 2000);
  };

  const initials = userName
    ? userName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  const time = message.createdAt
    ? new Date(message.createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  return (
    <Message align={isUser ? "end" : "start"}>
      <MessageAvatar>
        <Avatar
          className={cn("size-7 ring-2 ring-border/30", !isUser && "bg-muted")}
        >
          <AvatarFallback className="text-[10px] font-semibold">
            {isUser ? (
              initials
            ) : (
              <Sparkles className="size-3.5 text-muted-foreground" />
            )}
          </AvatarFallback>
        </Avatar>
      </MessageAvatar>

      <MessageContent>
        <MessageHeader>
          <span>{isUser ? userName || "You" : "SadAI"}</span>
          {time && (
            <span className="ml-1.5 font-mono text-muted-foreground/50">
              {time}
            </span>
          )}
        </MessageHeader>

        <Bubble
          variant={isUser ? "default" : "muted"}
          align={isUser ? "end" : "start"}
        >
          <BubbleContent
            className={cn(!isUser && "prose-sm max-w-none text-foreground")}
          >
            {isUser ? (
              <span className="whitespace-pre-wrap">{message.content}</span>
            ) : (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={markdownComponents}
              >
                {message.content}
              </ReactMarkdown>
            )}
            {!isUser && message.images && message.images.length > 0 && (
              <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
                {message.images.map((imgUrl, idx) => (
                  <a
                    key={idx}
                    href={imgUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative overflow-hidden rounded-xl border border-border/40 bg-muted/30 aspect-video flex items-center justify-center transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] hover:border-primary/50"
                  >
                    <img
                      src={imgUrl}
                      alt={`Search result ${idx + 1}`}
                      className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                  </a>
                ))}
              </div>
            )}
          </BubbleContent>
        </Bubble>

        {!isUser && (
          <MessageFooter className="opacity-0 transition-opacity duration-150 group-hover/message:opacity-100">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={handleCopy}
              className="size-6 text-muted-foreground/60 hover:text-foreground active:scale-[0.97] transition-transform duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
            >
              {copied ? (
                <Check data-icon className="text-emerald-500" />
              ) : (
                <Copy data-icon />
              )}
              <span className="sr-only">Copy</span>
            </Button>
          </MessageFooter>
        )}
      </MessageContent>
    </Message>
  );
};

export default ChatMessageItem;


