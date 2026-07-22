import React from "react";
import { SidebarHeader, SidebarInput } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Plus, Sparkles, Search } from "lucide-react";

interface SidebarHeaderSectionProps {
  onNewChat?: () => void;
  isCreating?: boolean;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const SidebarHeaderSection: React.FC<SidebarHeaderSectionProps> = ({
  onNewChat,
  isCreating = false,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <SidebarHeader className="gap-3 p-3 pb-2">
      {/* Brand Header */}
      <div className="flex items-center justify-between px-1.5 py-1">
        <div className="flex items-center gap-2.5 font-semibold text-sm tracking-tight text-foreground select-none">
          <div className="flex size-7 items-center justify-center rounded-lg bg-gradient-to-br from-primary via-primary/90 to-primary/70 text-primary-foreground shadow-sm shadow-primary/20 ring-1 ring-white/10">
            <Sparkles className="size-4 animate-pulse" />
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="font-bold text-sm leading-none tracking-tight">
              SadAI
            </span>
            <span className="text-[10px] font-medium text-muted-foreground/80 leading-tight">
              Workspace v1.0
            </span>
          </div>
        </div>
      </div>

      {/* New Conversation Button */}
      <Button
        onClick={onNewChat}
        disabled={isCreating}
        className="w-full justify-start gap-2 h-9 px-3 text-xs font-medium bg-primary text-primary-foreground shadow-sm hover:bg-primary/95 transition-all duration-150 ease-out active:scale-[0.97] group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
      >
        <Plus className="size-4 shrink-0" />
        <span className="truncate group-data-[collapsible=icon]:hidden">
          {isCreating ? "Creating..." : "New Chat"}
        </span>
      </Button>

      {/* Search Input with Shortcut Badge */}
      <div className="relative group-data-[collapsible=icon]:hidden">
        <Search className="absolute left-2.5 top-2.5 size-3.5 text-muted-foreground/70 pointer-events-none" />
        <SidebarInput
          placeholder="Search chats..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-8 pr-10 h-8 text-xs bg-sidebar-accent/30 border-sidebar-border/60 focus-visible:bg-background focus-visible:ring-1 focus-visible:ring-primary/40 transition-colors"
        />
        <kbd className="absolute right-2 top-2 pointer-events-none inline-flex h-4 select-none items-center rounded border border-sidebar-border/80 bg-sidebar-accent/50 px-1 font-mono text-[9px] font-medium text-muted-foreground opacity-80">
          ⌘K
        </kbd>
      </div>
    </SidebarHeader>
  );
};
