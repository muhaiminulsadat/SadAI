import React from "react";
import type { UserData } from "@/redux/slices/user.slice";
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, LogOut, User } from "lucide-react";

interface SidebarUserProfileProps {
  user: UserData | null;
  onSignOut?: () => void;
}

export const SidebarUserProfile: React.FC<SidebarUserProfileProps> = ({
  user,
  onSignOut,
}) => {
  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <SidebarFooter className="p-2 border-t border-sidebar-border/60 bg-sidebar/50 backdrop-blur-xs">
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <SidebarMenuButton
                  size="lg"
                  className="h-10 px-2 rounded-lg transition-all duration-150 active:scale-[0.98] data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-sidebar-accent/60"
                >
                  <div className="relative">
                    <Avatar className="size-7 rounded-md ring-1 ring-primary/20">
                      <AvatarFallback className="rounded-md bg-gradient-to-br from-primary/20 via-primary/10 to-transparent text-primary font-bold text-[11px]">
                        {getInitials(user?.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="absolute -bottom-0.5 -right-0.5 size-2 rounded-full bg-emerald-500 ring-2 ring-background" />
                  </div>

                  <div className="grid flex-1 text-left text-xs leading-tight group-data-[collapsible=icon]:hidden">
                    <span className="truncate font-semibold text-foreground/90 text-xs">
                      {user?.name || "User"}
                    </span>
                    <span className="truncate text-muted-foreground/70 text-[10px]">
                      {user?.email || "Pro Plan"}
                    </span>
                  </div>
                  <MoreHorizontal className="ml-auto size-3.5 text-muted-foreground/70 group-data-[collapsible=icon]:hidden" />
                </SidebarMenuButton>
              }
            />
            <DropdownMenuContent
              side="right"
              align="end"
              sideOffset={6}
              className="w-56 text-xs p-1"
            >
              <div className="flex items-center gap-2.5 p-2 rounded-sm bg-muted/30">
                <Avatar className="size-8 rounded-md ring-1 ring-primary/20">
                  <AvatarFallback className="rounded-md bg-primary/10 text-primary font-bold text-xs">
                    {getInitials(user?.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-xs leading-tight">
                  <span className="truncate font-semibold text-foreground">
                    {user?.name || "User"}
                  </span>
                  <span className="truncate text-muted-foreground text-[10px]">
                    {user?.email || ""}
                  </span>
                </div>
              </div>

              <DropdownMenuSeparator className="my-1" />

              <DropdownMenuItem className="gap-2 text-xs cursor-pointer">
                <User className="size-3.5 text-muted-foreground" />
                <span>Account settings</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="my-1" />

              <DropdownMenuItem
                onClick={onSignOut}
                className="gap-2 text-xs text-destructive focus:text-destructive cursor-pointer"
              >
                <LogOut className="size-3.5" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
};
