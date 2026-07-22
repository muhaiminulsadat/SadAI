import React from "react";
import type {Conversation} from "@/services/chatService";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
} from "@/components/ui/sidebar";
import {Skeleton} from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {MessageSquare, MoreHorizontal, Trash2, Edit3} from "lucide-react";

interface SidebarConversationListProps {
  conversations: Conversation[];
  activeId: string | null;
  isLoading: boolean;
  onSelect: (id: string) => void;
  onDelete?: (id: string) => void;
  onRename?: (id: string) => void;
}

export const SidebarConversationList: React.FC<
  SidebarConversationListProps
> = ({conversations, activeId, isLoading, onSelect, onDelete, onRename}) => {
  return (
    <SidebarContent className="px-2">
      <SidebarGroup className="py-1">
        <SidebarGroupLabel className="px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70 group-data-[collapsible=icon]:hidden">
          Recent Conversations
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu className="gap-0.5">
            {isLoading ? (
              Array.from({length: 4}).map((_, idx) => (
                <SidebarMenuItem key={idx}>
                  <div className="flex items-center gap-2 px-2.5 py-2 w-full">
                    <Skeleton className="size-3.5 rounded-md" />
                    <Skeleton className="h-3.5 flex-1 rounded group-data-[collapsible=icon]:hidden" />
                  </div>
                </SidebarMenuItem>
              ))
            ) : conversations.length === 0 ? (
              <div className="py-6 text-center text-xs text-muted-foreground/80 group-data-[collapsible=icon]:hidden">
                No chats found
              </div>
            ) : (
              conversations.map((convo) => {
                const isActive = activeId === convo._id;
                return (
                  <SidebarMenuItem
                    key={convo._id}
                    className="group/item relative"
                  >
                    <SidebarMenuButton
                      isActive={isActive}
                      onClick={() => onSelect(convo._id)}
                      tooltip={convo.title || "Untitled Chat"}
                      className={`h-8.5 px-2.5 text-xs font-normal transition-all duration-150 ease-out active:scale-[0.98] ${
                        isActive
                          ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground shadow-xs ring-1 ring-sidebar-border/50"
                          : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50"
                      }`}
                    >
                      <MessageSquare
                        className={`size-3.5 shrink-0 transition-colors ${
                          isActive ? "text-primary" : "text-muted-foreground/70"
                        }`}
                      />
                      <span className="truncate">
                        {convo.title || "Untitled Chat"}
                      </span>
                    </SidebarMenuButton>

                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <SidebarMenuAction
                            showOnHover
                            className="size-6 text-muted-foreground hover:text-foreground active:scale-95"
                          >
                            <MoreHorizontal className="size-3.5" />
                            <span className="sr-only">More options</span>
                          </SidebarMenuAction>
                        }
                      />
                      <DropdownMenuContent
                        side="right"
                        align="start"
                        sideOffset={3}
                        className="w-36 z-50 shadow-lg border border-border/80 bg-popover backdrop-blur-md p-1"
                      >
                        <DropdownMenuItem
                          className="gap-2 text-xs cursor-pointer"
                          onClick={() => onRename?.(convo._id)}
                        >
                          <Edit3 className="size-3.5 text-muted-foreground" />
                          <span>Rename</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="my-1" />
                        <DropdownMenuItem
                          variant="destructive"
                          className="gap-2 text-xs cursor-pointer"
                          onClick={() => onDelete?.(convo._id)}
                        >
                          <Trash2 className="size-3.5" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </SidebarMenuItem>
                );
              })
            )}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
};
