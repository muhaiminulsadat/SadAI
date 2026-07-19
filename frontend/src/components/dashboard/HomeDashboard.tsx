import React, { useState } from "react";
import { signOut } from "../../lib/auth-client";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { BlankState } from "./BlankState";
import { Dashboard as AccountCard } from "./Dashboard";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { clearUser } from "@/redux/slices/user.slice";

export const HomeDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [signOutLoading, setSignOutLoading] = useState(false);
  const dispatch = useAppDispatch();
  // Read user directly from Redux — no prop drilling
  const user = useAppSelector((s) => s.user.user)!;

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onRequest: () => {
          setSignOutLoading(true);
        },
        onSuccess: () => {
          setSignOutLoading(false);
          toast.success("Successfully signed out!");
          // Immediately clear Redux — no waiting for session hook to re-fire
          dispatch(clearUser());
        },
        onError: (ctx) => {
          setSignOutLoading(false);
          toast.error(
            ctx.error.message || "Failed to sign out. Please try again.",
          );
        },
      },
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar - fixed width */}
      <Sidebar
        user={user}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSignOut={handleSignOut}
        isSignOutLoading={signOutLoading}
      />

      {/* Main Layout Area - padded for sidebar */}
      <div className="flex-1 flex flex-col min-h-screen pl-64">
        <Header activeTab={activeTab} />

        <main className="flex-1 p-8 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(120,119,198,0.03),transparent_100%)]">
          <div className="max-w-4xl mx-auto w-full transition-all duration-300 ease-out animate-fade-in">
            {activeTab === "home" && <BlankState />}

            {activeTab === "projects" && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold tracking-tight">
                  Your Projects
                </h3>
                <BlankState />
              </div>
            )}

            {activeTab === "settings" && (
              <div className="space-y-6 flex flex-col items-center">
                <h3 className="text-xl font-bold tracking-tight self-start">
                  Account Settings
                </h3>
                <AccountCard user={user} />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
