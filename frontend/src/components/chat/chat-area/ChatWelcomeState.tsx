import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Code2, Cpu, FileCode2, Terminal } from "lucide-react";

interface ChatWelcomeStateProps {
  onSelectPrompt: (prompt: string) => void;
}

const SAMPLE_PROMPTS = [
  {
    icon: Code2,
    title: "Build a Component",
    description: "Design a clean dashboard layout with glassmorphic cards and dark mode.",
    prompt: "Help me design a clean dashboard component with glassmorphism and Tailwind CSS.",
  },
  {
    icon: Cpu,
    title: "Debug & Optimize",
    description: "Analyze code performance, identify memory leaks, or fix React re-renders.",
    prompt: "How can I prevent unnecessary React re-renders in my custom hooks?",
  },
  {
    icon: FileCode2,
    title: "Write PRD & Architecture",
    description: "Draft project specifications, ER diagrams, or microservices architecture.",
    prompt: "Write a high-level PRD for a real-time collaborative chat application.",
  },
  {
    icon: Terminal,
    title: "Refactor Codebase",
    description: "Clean up code slop, improve TypeScript types, and apply best practices.",
    prompt: "Show me best practices for structuring Redux Toolkit slices with TypeScript.",
  },
];

export const ChatWelcomeState: React.FC<ChatWelcomeStateProps> = ({
  onSelectPrompt,
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-8 max-w-3xl mx-auto text-center relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Badge & Header */}
      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
        <Sparkles className="size-3.5 animate-pulse" />
        <span>SadAI Intelligence Engine</span>
      </div>

      <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground mb-3">
        What would you like to build today?
      </h2>
      <p className="text-sm text-muted-foreground max-w-lg mb-8 leading-relaxed">
        SadAI is ready to pair program, debug code, design modern UIs, or synthesize project architectures.
      </p>

      {/* Suggestion Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full text-left">
        {SAMPLE_PROMPTS.map((item, idx) => {
          const Icon = item.icon;
          return (
            <Card
              key={idx}
              onClick={() => onSelectPrompt(item.prompt)}
              className="group relative cursor-pointer border-border/60 bg-card/40 backdrop-blur-md hover:bg-card/80 hover:border-primary/40 transition-all duration-200 active:scale-[0.98] shadow-xs hover:shadow-md"
            >
              <CardContent className="p-4 flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200 shrink-0">
                  <Icon className="size-4" />
                </div>
                <div className="space-y-1 min-w-0">
                  <h3 className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-muted-foreground/80 leading-snug line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
