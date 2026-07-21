import React from "react";
import { Sparkles, MessageSquare, Cpu, Bot } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ChatBlankStateProps {
  onSelectPrompt?: (prompt: string) => void;
}

const samplePrompts = [
  {
    icon: Sparkles,
    title: "Brainstorm AI ideas",
    subtitle: "Help generate project roadmap and feature concepts",
    prompt: "Can you help me brainstorm feature concepts for a modern AI assistant?",
  },
  {
    icon: MessageSquare,
    title: "Analyze Code & Specs",
    subtitle: "Debug microservice architecture and APIs",
    prompt: "Explain the best practices for setting up microservices with Express and Vite.",
  },
  {
    icon: Cpu,
    title: "Design System Advice",
    subtitle: "Craft rich glassmorphism UI components",
    prompt: "What are the key design principles for visual depth and subtle micro-interactions?",
  },
];

export const ChatBlankState: React.FC<ChatBlankStateProps> = ({ onSelectPrompt }) => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
      <div className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105">
        <Bot className="h-8 w-8 text-primary animate-pulse" />
        <div className="absolute -inset-1 -z-10 rounded-2xl bg-primary/20 blur-xl" />
      </div>

      <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        SadAI Workspace
      </h2>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        Start a new conversation or select an existing thread to start chatting with your AI assistant.
      </p>

      <div className="mt-8 grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
        {samplePrompts.map((item, index) => {
          const Icon = item.icon;
          return (
            <Card
              key={index}
              className="group cursor-pointer border-border/40 bg-card/30 backdrop-blur-md transition-all duration-200 hover:border-primary/50 hover:bg-card/60 hover:shadow-md active:scale-[0.97]"
              onClick={() => onSelectPrompt?.(item.prompt)}
            >
              <CardContent className="flex flex-col items-start p-4 text-left">
                <div className="mb-2 rounded-lg bg-primary/10 p-2 text-primary transition-colors group-hover:bg-primary/20">
                  <Icon className="h-4 w-4" />
                </div>
                <h3 className="text-xs font-semibold text-foreground">{item.title}</h3>
                <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                  {item.subtitle}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
