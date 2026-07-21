import React from "react";
import { useAppSelector } from "../redux/hooks";
import { ChatLayout } from "../components/chat/ChatLayout";
import { AuthView } from "../components/auth/AuthView";

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
    return <ChatLayout />;
  }

  return <AuthView />;
};
