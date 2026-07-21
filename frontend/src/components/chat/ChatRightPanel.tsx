import React from "react";
import { Bot, Cpu, Zap, Sliders, ShieldCheck, Database, Info } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const ChatRightPanel: React.FC = () => {
  return (
    <aside className="hidden lg:flex h-full w-72 flex-col border-l border-border/40 bg-card/30 backdrop-blur-md p-4 space-y-4">
      {/* Top Header Card matching wireframe top section */}
      <div className="flex items-center justify-between pb-2 border-b border-border/40">
        <div className="flex items-center space-x-2">
          <Sliders className="h-4 w-4 text-primary" />
          <span className="text-xs font-semibold text-foreground uppercase tracking-wider">
            Agent Config
          </span>
        </div>
        <Badge variant="outline" className="text-[10px] border-emerald-500/40 text-emerald-400 bg-emerald-500/10">
          Online
        </Badge>
      </div>

      {/* Main Panel Box matching wireframe large right container */}
      <div className="flex-1 space-y-4 overflow-y-auto pr-1">
        {/* Model Card */}
        <Card className="border-border/40 bg-card/40 backdrop-blur-md">
          <CardHeader className="p-3 pb-1">
            <CardTitle className="flex items-center gap-2 text-xs font-semibold text-foreground">
              <Bot className="h-4 w-4 text-primary" />
              Active Model
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 text-xs space-y-2">
            <div className="flex justify-between items-center text-muted-foreground">
              <span>Model Name:</span>
              <span className="font-mono font-medium text-foreground">SadAI-v1</span>
            </div>
            <div className="flex justify-between items-center text-muted-foreground">
              <span>Temperature:</span>
              <span className="font-mono text-foreground">0.7</span>
            </div>
            <div className="flex justify-between items-center text-muted-foreground">
              <span>Max Tokens:</span>
              <span className="font-mono text-foreground">4096</span>
            </div>
          </CardContent>
        </Card>

        {/* Capabilities Card */}
        <Card className="border-border/40 bg-card/40 backdrop-blur-md">
          <CardHeader className="p-3 pb-1">
            <CardTitle className="flex items-center gap-2 text-xs font-semibold text-foreground">
              <Zap className="h-4 w-4 text-amber-400" />
              Agent Capabilities
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 text-xs space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>Session Authentication</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Database className="h-3.5 w-3.5 text-blue-400" />
              <span>Context Persistence</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Cpu className="h-3.5 w-3.5 text-purple-400" />
              <span>Microservice Gateway</span>
            </div>
          </CardContent>
        </Card>

        {/* Info summary */}
        <div className="rounded-xl border border-border/30 bg-muted/20 p-3 text-[11px] text-muted-foreground leading-relaxed">
          <div className="flex items-center gap-1.5 font-semibold text-foreground mb-1">
            <Info className="h-3.5 w-3.5 text-primary" />
            <span>Architecture Note</span>
          </div>
          <span>
            Connected via HTTP Gateway proxy to Agent Microservice and MongoDB persistence layer.
          </span>
        </div>
      </div>
    </aside>
  );
};
