import React, { useState } from "react";
import { signOut } from "../../lib/auth-client";
import { LogOut, ShieldCheck, Mail, Calendar, Key, User, Loader2 } from "lucide-react";
import { Button } from "../ui/button";

interface DashboardProps {
  user: {
    id: string;
    name: string;
    email?: string;
    emailVerified: boolean;
    createdAt?: Date | string;
  };
}

export const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          setLoading(false);
        },
        onError: () => {
          setLoading(false);
        },
      },
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const formatDate = (dateInput?: Date | string) => {
    if (!dateInput) return "N/A";
    const date = new Date(dateInput);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="w-full max-w-2xl bg-card border border-border/60 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-primary/5 hover:border-primary/10 animate-fade-in">
      {/* Header section with cover gradient */}
      <div className="h-32 bg-gradient-to-r from-primary/80 to-primary-foreground/90 relative">
        <div className="absolute -bottom-10 left-8">
          <div className="w-20 h-20 rounded-2xl bg-background border-4 border-card shadow-lg flex items-center justify-center font-bold text-2xl text-primary bg-gradient-to-br from-primary/10 to-primary/5">
            {getInitials(user.name)}
          </div>
        </div>
      </div>

      <div className="pt-14 pb-8 px-8">
        {/* User identification */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              {user.name}
              {user.emailVerified && (
                <span title="Verified Account">
                  <ShieldCheck className="h-5 w-5 text-emerald-500 fill-emerald-500/10" />
                </span>
              )}
            </h1>
            <p className="text-muted-foreground text-sm flex items-center gap-1.5 mt-1">
              <Mail className="h-3.5 w-3.5" />
              {user.email}
            </p>
          </div>
          
          <Button
            onClick={handleSignOut}
            disabled={loading}
            variant="outline"
            className="flex items-center gap-2 border-border/80 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-all px-4 py-2"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <LogOut className="h-4 w-4" />
                Sign Out
              </>
            )}
          </Button>
        </div>

        <hr className="border-border/50 mb-8" />

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-background/50 border border-border/50 rounded-xl space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" />
              Account details
            </span>
            <div className="space-y-1.5 pt-1 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">User ID:</span>
                <span className="font-mono text-xs max-w-[150px] truncate text-foreground/80" title={user.id}>
                  {user.id}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span className="font-medium text-emerald-600 dark:text-emerald-400">Active</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-background/50 border border-border/50 rounded-xl space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              Membership Info
            </span>
            <div className="space-y-1.5 pt-1 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Joined:</span>
                <span className="text-foreground/80">{formatDate(user.createdAt)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Auth Method:</span>
                <span className="text-foreground/80 flex items-center gap-1">
                  <Key className="h-3 w-3" />
                  Credentials
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 bg-primary/5 border border-primary/10 rounded-xl flex items-start gap-3">
          <span className="w-2 h-2 mt-1.5 rounded-full bg-primary animate-pulse flex-shrink-0" />
          <div className="text-sm">
            <p className="font-medium text-primary">Better Auth is Active</p>
            <p className="text-muted-foreground mt-0.5">
              Your session is securely managed on MongoDB using HTTP-only cookies routed through the Express gateway.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
