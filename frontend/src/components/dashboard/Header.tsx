import React from "react";
import { Bell, Search } from "lucide-react";

interface HeaderProps {
  activeTab: string;
}

export const Header: React.FC<HeaderProps> = ({ activeTab }) => {
  const getTitle = () => {
    switch (activeTab) {
      case "projects":
        return "Projects";
      case "settings":
        return "Settings";
      case "home":
      default:
        return "Dashboard Overview";
    }
  };

  return (
    <header className="h-16 border-b border-border/40 bg-background/30 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-20">
      {/* Breadcrumb / Title */}
      <div>
        <h2 className="text-sm font-semibold tracking-tight text-foreground flex items-center gap-1">
          <span className="text-muted-foreground font-normal">Console</span>
          <span className="text-muted-foreground/50">/</span>
          <span>{getTitle()}</span>
        </h2>
      </div>

      {/* Global Actions */}
      <div className="flex items-center gap-4">
        {/* Mock Search */}
        <div className="relative hidden sm:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground/75" />
          <input
            type="text"
            placeholder="Quick search... (Ctrl+K)"
            disabled
            className="w-56 h-9 pl-9 pr-3 rounded-lg border border-border/40 bg-muted/30 text-sm placeholder:text-muted-foreground/60 focus:outline-hidden disabled:cursor-not-allowed"
          />
        </div>

        {/* Notification Icon */}
        <button
          className="p-2 rounded-lg border border-border/40 bg-muted/20 text-muted-foreground hover:text-foreground transition-all duration-200 active:scale-[0.95]"
          title="Notifications"
        >
          <Bell className="h-4.5 w-4.5" />
        </button>
      </div>
    </header>
  );
};
