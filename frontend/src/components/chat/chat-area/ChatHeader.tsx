import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Sparkles,
  PanelRight,
  MoreVertical,
  Trash2,
  Share2,
  RotateCcw,
} from "lucide-react";

interface ChatHeaderProps {
  title?: string;
  isRightPanelOpen: boolean;
  onToggleRightPanel: () => void;
  onClearMessages?: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  title,
  isRightPanelOpen,
  onToggleRightPanel,
  onClearMessages,
}) => {
  return (
    <header className="flex h-14 items-center justify-between border-b border-border/40 px-4 sm:px-6 bg-background/70 backdrop-blur-xl shrink-0 z-20 sticky top-0">
      <div className="flex items-center gap-3 min-w-0">
        <SidebarTrigger className="size-8 text-muted-foreground hover:text-foreground active:scale-[0.97] transition-all duration-150" />
        <div className="h-4 w-px bg-border/60 shrink-0" />
        
        <div className="flex items-center gap-2.5 min-w-0">
          <h1 className="text-sm font-semibold truncate text-foreground/90 max-w-[240px] sm:max-w-[360px]">
            {title || "New Chat"}
          </h1>
          <Badge
            variant="outline"
            className="hidden sm:inline-flex gap-1 items-center px-2 py-0.5 text-[10px] font-medium bg-primary/10 border-primary/20 text-primary shrink-0 rounded-full"
          >
            <Sparkles className="size-2.5 animate-pulse text-primary" />
            SadAI v1.0
          </Badge>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger render={
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleRightPanel}
                className={`relative size-8.5 rounded-lg active:scale-[0.97] transition-all duration-150 ${
                  isRightPanelOpen
                    ? "text-primary bg-primary/15 hover:bg-primary/20 ring-1 ring-primary/30"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                }`}
              >
                <PanelRight className="size-4" />
                {isRightPanelOpen && (
                  <span className="absolute top-1 right-1 size-1.5 rounded-full bg-primary animate-pulse" />
                )}
                <span className="sr-only font-sans">Toggle Panel</span>
              </Button>
            } />
            <TooltipContent side="bottom" className="text-xs">
              {isRightPanelOpen ? "Hide Artifact Panel" : "Show Artifact Panel"}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <DropdownMenu>
          <DropdownMenuTrigger render={
            <Button
              variant="ghost"
              size="icon"
              className="size-8 text-muted-foreground hover:text-foreground active:scale-95 transition-transform"
            >
              <MoreVertical className="size-4" />
              <span className="sr-only font-sans">More options</span>
            </Button>
          } />
          <DropdownMenuContent
            align="end"
            className="w-48 z-50 shadow-xl border border-border/80 bg-popover/95 backdrop-blur-md p-1"
          >
            <DropdownMenuItem
              className="gap-2 text-xs cursor-pointer"
              onClick={onClearMessages}
            >
              <RotateCcw className="size-3.5 text-muted-foreground" />
              <span>Reset Chat</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 text-xs cursor-pointer">
              <Share2 className="size-3.5 text-muted-foreground" />
              <span>Share Chat</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="my-1" />
            <DropdownMenuItem
              variant="destructive"
              className="gap-2 text-xs cursor-pointer"
              onClick={onClearMessages}
            >
              <Trash2 className="size-3.5" />
              <span>Clear Messages</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
