import React from "react";
import {
  Sparkles,
  MessageSquare,
  Code2,
  FileText,
  Presentation,
  Image,
  Search,
  type LucideIcon,
} from "lucide-react";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {cn} from "@/lib/utils";

export type AgentMode =
  | "auto"
  | "chat"
  | "coding"
  | "pdf"
  | "ppt"
  | "image"
  | "search";

interface AgentModeOption {
  id: AgentMode;
  label: string;
  icon: LucideIcon;
  description: string;
}

export const AGENT_MODES: AgentModeOption[] = [
  {
    id: "auto",
    label: "Auto",
    icon: Sparkles,
    description: "Smart mode detection",
  },
  {
    id: "chat",
    label: "Chat",
    icon: MessageSquare,
    description: "General conversation",
  },
  {
    id: "coding",
    label: "Coding",
    icon: Code2,
    description: "Code assistance & debug",
  },
  {id: "pdf", label: "PDF", icon: FileText, description: "Document analysis"},
  {
    id: "ppt",
    label: "PPT",
    icon: Presentation,
    description: "Slide generation",
  },
  {
    id: "image",
    label: "Image",
    icon: Image,
    description: "Image generation & edit",
  },
  {
    id: "search",
    label: "Search",
    icon: Search,
    description: "Web search & research",
  },
];

interface AgentModeSelectorProps {
  selectedMode: AgentMode;
  onSelectMode: (mode: AgentMode) => void;
  disabled?: boolean;
}

export const AgentModeSelector: React.FC<AgentModeSelectorProps> = ({
  selectedMode,
  onSelectMode,
  disabled,
}) => {
  return (
    <TooltipProvider delay={200}>
      <div className="flex items-center overflow-x-auto py-1 px-1 no-scrollbar mb-2 max-w-full">
        <ToggleGroup
          value={[selectedMode]}
          onValueChange={(val) => {
            if (Array.isArray(val) && val.length > 0) {
              const nextMode = val.find((v) => v !== selectedMode) || val[0];
              if (nextMode) {
                onSelectMode(nextMode as AgentMode);
              }
            }
          }}
          disabled={disabled}
          variant="outline"
          size="sm"
          className="flex flex-row items-center gap-1.5 p-1 rounded-full border border-border/50 bg-card/60 backdrop-blur-md shadow-xs"
        >
          {AGENT_MODES.map((mode) => {
            const Icon = mode.icon;

            return (
              <Tooltip key={mode.id}>
                <TooltipTrigger
                  render={
                    <ToggleGroupItem
                      value={mode.id}
                      aria-label={`Select ${mode.label} mode`}
                      className={cn(
                        "rounded-full px-3 h-7 text-xs font-medium transition-all duration-200 ease-out active:scale-[0.97] cursor-pointer text-muted-foreground hover:text-foreground hover:bg-muted/60 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:hover:bg-primary/90 data-[pressed]:bg-primary data-[pressed]:text-primary-foreground data-[pressed]:hover:bg-primary/90 font-medium data-[state=on]:font-semibold data-[pressed]:font-semibold shadow-none data-[state=on]:shadow-sm data-[pressed]:shadow-sm",
                      )}
                    >
                      <Icon data-icon="inline-start" className="size-3.5 text-current" />
                      <span>{mode.label}</span>
                    </ToggleGroupItem>
                  }
                />
                <TooltipContent side="top" className="text-xs font-normal">
                  {mode.description}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </ToggleGroup>
      </div>
    </TooltipProvider>
  );
};
