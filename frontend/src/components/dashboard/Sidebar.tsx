import React from "react";
import { LayoutDashboard, FolderKanban, Settings, LogOut, Shield } from "lucide-react";
import { Button } from "../ui/button";

interface SidebarProps {
  user: {
    name: string;
    email?: string;
  };
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onSignOut: () => void;
  isSignOutLoading: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  user,
  activeTab,
  setActiveTab,
  onSignOut,
  isSignOutLoading,
}) => {
  const menuItems = [
    { id: "home", label: "Overview", icon: LayoutDashboard },
    { id: "projects", label: "Projects", icon: FolderKanban },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <aside className="w-64 border-r border-border/40 bg-card/40 backdrop-blur-md flex flex-col justify-between h-screen fixed left-0 top-0 z-30 transition-transform duration-300 md:translate-x-0">
      <div className="flex flex-col flex-1 py-6 px-4 space-y-8">
        {/* Brand/Logo */}
        <div className="flex items-center gap-2 px-2">
          <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20 shadow-xs">
            <Shield className="h-4.5 w-4.5 text-primary" />
          </div>
          <span className="font-bold tracking-tight text-foreground text-lg">SadAI Console</span>
        </div>

        {/* Menu Navigation */}
        <nav className="space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ease-out outline-none select-none active:scale-[0.98] ${
                  isActive
                    ? "bg-primary/10 text-primary border-l-2 border-primary"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* User Section / Footer */}
      <div className="p-4 border-t border-border/40 bg-muted/20 flex flex-col gap-4">
        <div className="flex items-center gap-3 px-2">
          <div className="size-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center font-semibold text-primary text-sm shadow-xs select-none">
            {getInitials(user.name)}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-semibold truncate text-foreground/90">{user.name}</span>
            {user.email && (
              <span className="text-xs text-muted-foreground truncate">{user.email}</span>
            )}
          </div>
        </div>

        <Button
          onClick={onSignOut}
          disabled={isSignOutLoading}
          variant="ghost"
          className="w-full flex items-center justify-start gap-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors duration-200 active:scale-[0.98]"
        >
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </Button>
      </div>
    </aside>
  );
};
