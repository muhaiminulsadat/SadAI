import React from "react";
import { useAppSelector } from "../redux/hooks";

import { AuthView } from "../components/auth/AuthView";
import SideBar from "@/components/chat/sidebar/SideBar";
import ChatArea from "@/components/chat/ChatArea";
import Artifact from "@/components/chat/Artifact";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export const Home: React.FC = () => {
  const { user, isPending } = useAppSelector((s) => s.user);

  if (isPending) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <div className="size-10 rounded-full border-2 border-primary/20 animate-pulse" />
            <div className="absolute inset-0 size-10 rounded-full border-t-2 border-primary animate-spin" />
          </div>
          <span className="text-xs text-muted-foreground font-medium animate-pulse">
            Loading secure session...
          </span>
        </div>
      </div>
    );
  }

  if (user) {
    return (
      <SidebarProvider>
        <div className="flex h-screen w-full overflow-hidden bg-background text-foreground bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/5 via-background to-background">
          <SideBar />
          <SidebarInset className="flex flex-1 overflow-hidden relative">
            <ChatArea />
            <Artifact />
          </SidebarInset>
        </div>
      </SidebarProvider>
    );
  }

  return <AuthView />;
};

