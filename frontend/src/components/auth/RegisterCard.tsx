import React, { useState } from "react";
import { signUp } from "../../lib/auth-client";
import { Loader2, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/redux/hooks";
import { setUserData } from "@/redux/slices/user.slice";

interface RegisterCardProps {
  onSwitchToLogin: () => void;
}

export const RegisterCard: React.FC<RegisterCardProps> = ({ onSwitchToLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      const msg = "Please fill in all fields";
      setError(msg);
      toast.error(msg);
      return;
    }

    if (password.length < 6) {
      const msg = "Password must be at least 6 characters long";
      setError(msg);
      toast.error(msg);
      return;
    }

    if (password !== confirmPassword) {
      const msg = "Passwords do not match";
      setError(msg);
      toast.error(msg);
      return;
    }

    await signUp.email({
      email,
      password,
      name,
      fetchOptions: {
        onRequest: () => {
          setLoading(true);
          setError("");
        },
        onSuccess: (ctx) => {
          setLoading(false);
          toast.success("Account created successfully!");
          if (ctx.data?.user) {
            dispatch(setUserData(ctx.data.user));
          }
        },
        onError: (ctx) => {
          setLoading(false);
          const msg =
            ctx.error.message ||
            ctx.error.statusText ||
            "Failed to create account. Please check backend service.";
          setError(msg);
          toast.error(msg);
        },
      },
    });
  };

  return (
    <div className="w-full max-w-md p-6 bg-card border border-border/40 rounded-xl shadow-xs animate-fade-in">
      <div className="flex flex-col space-y-1.5 text-center mb-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Create account
        </h2>
        <p className="text-sm text-muted-foreground">
          Join us today to get started
        </p>
      </div>

      {error && (
        <div className="p-3 mb-4 bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-md flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground/90">
            Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm placeholder:text-muted-foreground/60 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring focus-visible:border-ring/80 transition-colors"
            required
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground/90">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm placeholder:text-muted-foreground/60 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring focus-visible:border-ring/80 transition-colors"
            required
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground/90">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm placeholder:text-muted-foreground/60 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring focus-visible:border-ring/80 transition-colors"
            required
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground/90">
            Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm placeholder:text-muted-foreground/60 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring focus-visible:border-ring/80 transition-colors"
            required
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full h-10 mt-2 font-medium transition-all duration-200 active:scale-[0.98] cursor-pointer"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              Sign Up
              <ArrowRight className="h-4 w-4 ml-1" />
            </>
          )}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <button
          onClick={onSwitchToLogin}
          className="font-medium text-primary hover:underline hover:text-primary/95 transition-colors cursor-pointer"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};
