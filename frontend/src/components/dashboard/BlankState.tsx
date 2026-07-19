import React from "react";
import { Plus, Layout } from "lucide-react";
import { Button } from "../ui/button";

export const BlankState: React.FC = () => {
  return (
    <div className="w-full max-w-xl mx-auto py-16 px-6 text-center flex flex-col items-center justify-center min-h-[50vh]">
      {/* Decorative Animated Icon Wrapper */}
      <div className="relative group mb-6">
        {/* Glow behind the icon */}
        <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl scale-90 group-hover:scale-110 transition-transform duration-300 ease-out" />
        <div className="size-16 rounded-2xl bg-card border border-border/50 shadow-md flex items-center justify-center relative z-10 transition-transform duration-300 group-hover:scale-[1.03] group-hover:-translate-y-0.5">
          <Layout className="h-7 w-7 text-primary" />
        </div>
      </div>

      {/* Main Copy */}
      <h3 className="text-xl font-bold tracking-tight text-foreground mb-2">
        Welcome to your Console
      </h3>
      <p className="text-muted-foreground text-sm max-w-sm mb-8 leading-relaxed">
        This is your dashboard's workspace. It is currently blank, ready for your custom layouts and integrations.
      </p>

      {/* Primary Actions with Micro-animations */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="default"
          className="flex items-center gap-2 font-medium shadow-sm transition-all duration-200 ease-out active:scale-[0.97] cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          Create New Project
        </Button>
        <Button
          variant="outline"
          className="font-medium transition-all duration-200 ease-out active:scale-[0.97] cursor-pointer"
        >
          Read Documentation
        </Button>
      </div>
    </div>
  );
};
