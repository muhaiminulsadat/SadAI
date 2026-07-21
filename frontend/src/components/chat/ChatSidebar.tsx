import React from "react";
import { Plus, MessageSquare, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import type { Conversation } from "@/services/chatService";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { clearUser } from "@/redux/slices/user.slice";
import { signOut } from "@/lib/auth-client";
import { toast } from "react-hot-toast";
import { cn } from "@/lib/utils";

interface ChatSidebarProps {
  conversations: Conversation[];
  activeId: string | null;
  isLoading: boolean;
  onSelectConversation: (id: string) => void;
  onNewChat: () => void;
}

export const ChatSidebar: React.FC<ChatSidebarProps> = ({
  conversations,
  activeId,
  isLoading,
  onSelectConversation,
  onNewChat,
}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  const handleLogout = async () => {
    try {
      dispatch(clearUser());
      await signOut();
      toast.success("Logged out successfully");
    } catch {
      toast.error("Logout failed");
    }
  };

  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : user?.email ? user.email.charAt(0).toUpperCase() : "U";

  return (
    <aside className="flex h-full w-64 flex-col border-r border-border/40 bg-card/40 backdrop-blur-md transition-all duration-200">
      {/* Top Header: New Chat Button matching wireframe */}
      <div className="p-3 border-b border-border/40">
        <Button
          onClick={onNewChat}
          className="w-full justify-start gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-md transition-all duration-200 hover:bg-primary/90 active:scale-[0.97]"
        >
          <Plus className="h-4 w-4" />
          <span>New Chat</span>
        </Button>
      </div>

      {/* Middle: History Container matching wireframe */}
      <div className="flex-1 overflow-hidden py-2">
        <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Recent Conversations
        </div>

        <ScrollArea className="h-[calc(100%-24px)] px-2">
          {isLoading ? (
            <div className="space-y-2 px-1 py-1">
              <Skeleton className="h-10 w-full rounded-xl" />
              <Skeleton className="h-10 w-full rounded-xl" />
              <Skeleton className="h-10 w-full rounded-xl" />
            </div>
          ) : conversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-6 text-center text-xs text-muted-foreground">
              <MessageSquare className="h-6 w-6 mb-2 opacity-40" />
              <span>No chat history yet.</span>
            </div>
          ) : (
            <div className="space-y-1">
              {conversations.map((conv) => {
                const isActive = conv._id === activeId;
                return (
                  <button
                    key={conv._id}
                    onClick={() => onSelectConversation(conv._id)}
                    className={cn(
                      "group flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-xs font-medium transition-all duration-200 active:scale-[0.98]",
                      isActive
                        ? "bg-primary/15 text-primary border border-primary/20 shadow-xs"
                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground border border-transparent"
                    )}
                  >
                    <MessageSquare className="h-3.5 w-3.5 shrink-0 opacity-70" />
                    <span className="truncate flex-1">
                      {conv.title || "Untitled Chat"}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </div>

      {/* Bottom: User Profile Bar matching wireframe bottom container */}
      <div className="border-t border-border/40 p-3 bg-card/20">
        <div className="flex items-center justify-between gap-2 rounded-xl p-2 transition-colors hover:bg-muted/40">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="relative">
              <Avatar className="h-8 w-8 border border-border/40">
                <AvatarFallback className="bg-primary/20 text-primary font-semibold text-xs">
                  {userInitial}
                </AvatarFallback>
              </Avatar>
              <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-background" />
            </div>
            <div className="flex flex-col overflow-hidden text-left">
              <span className="truncate text-xs font-semibold text-foreground">
                {user?.name || user?.email || "SadAI User"}
              </span>
              <span className="truncate text-[10px] text-muted-foreground">
                Free Tier
              </span>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10 active:scale-[0.97]"
            title="Sign out"
          >
            <LogOut className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </aside>
  );
};
