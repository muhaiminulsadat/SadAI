import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleRightPanel } from "@/redux/slices/conversation.slice";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  X,
  Code2,
  Eye,
  Copy,
  Check,
  FileCode,
  Download,
  Sparkles,
} from "lucide-react";
import toast from "react-hot-toast";

interface ArtifactProps {
  title?: string;
  codeContent?: string;
  language?: string;
}

export const Artifact: React.FC<ArtifactProps> = ({
  title = "Generated Code",
  codeContent,
  language = "typescript",
}) => {
  const dispatch = useAppDispatch();
  const { isRightPanelOpen } = useAppSelector((state) => state.conversation);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("code");

  if (!isRightPanelOpen) return null;

  const handleCopy = () => {
    if (!codeContent) return;
    navigator.clipboard.writeText(codeContent);
    setCopied(true);
    toast.success("Code copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <aside
      className="w-full sm:w-[420px] md:w-[480px] lg:w-[520px] h-full border-l border-border/40 bg-card/40 backdrop-blur-2xl flex flex-col shrink-0 z-20 transition-all duration-300 ease-out shadow-2xl"
    >
      {/* Header */}
      <header className="flex h-14 items-center justify-between border-b border-border/40 px-4 shrink-0 bg-muted/20">
        <div className="flex items-center gap-2 min-w-0">
          <FileCode className="size-4 text-primary shrink-0" />
          <h2 className="text-xs font-semibold truncate text-foreground/90">
            {title}
          </h2>
          <Badge
            variant="outline"
            className="text-[10px] uppercase font-mono px-2 py-0.5 bg-primary/10 border-primary/20 text-primary shrink-0 rounded-full"
          >
            {language}
          </Badge>
        </div>

        <div className="flex items-center gap-1">
          {codeContent && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCopy}
              className="size-7.5 text-muted-foreground hover:text-foreground active:scale-[0.97] transition-transform"
            >
              {copied ? (
                <Check className="size-3.5 text-emerald-500" />
              ) : (
                <Copy className="size-3.5" />
              )}
              <span className="sr-only">Copy code</span>
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={() => dispatch(toggleRightPanel())}
            className="size-7.5 text-muted-foreground hover:text-foreground active:scale-[0.97] transition-transform"
          >
            <X className="size-4" />
            <span className="sr-only">Close artifact panel</span>
          </Button>
        </div>
      </header>

      {/* Tabs & Content */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex flex-col flex-1 min-h-0"
      >
        <div className="px-4 py-2 border-b border-border/30 bg-muted/10 flex items-center justify-between shrink-0">
          <TabsList className="h-8 bg-muted/40 p-1 rounded-xl">
            <TabsTrigger
              value="code"
              className="text-xs px-3 py-1 gap-1.5 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-xs transition-all"
            >
              <Code2 className="size-3.5" />
              <span>Code</span>
            </TabsTrigger>
            <TabsTrigger
              value="preview"
              className="text-xs px-3 py-1 gap-1.5 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-xs transition-all"
            >
              <Eye className="size-3.5" />
              <span>Preview</span>
            </TabsTrigger>
          </TabsList>

          {codeContent && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="h-7 text-xs gap-1.5 active:scale-[0.97] transition-transform rounded-lg"
            >
              <Download className="size-3" />
              <span>Export</span>
            </Button>
          )}
        </div>

        <TabsContent
          value="code"
          className="flex-1 min-h-0 p-4 m-0 overflow-y-auto focus-visible:outline-none"
        >
          {codeContent ? (
            <pre className="p-4 rounded-xl bg-zinc-950 border border-border/60 text-xs font-mono text-zinc-100 leading-relaxed overflow-x-auto selection:bg-primary/30">
              <code>{codeContent}</code>
            </pre>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3 my-auto">
              <div className="p-3.5 rounded-2xl bg-primary/10 text-primary border border-primary/20 shadow-xs">
                <Sparkles className="size-6 animate-pulse" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-foreground">
                  No Artifact Selected
                </h3>
                <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
                  Generated code snippets, UI components, and document outputs from SadAI will appear here.
                </p>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent
          value="preview"
          className="flex-1 min-h-0 p-4 m-0 overflow-y-auto focus-visible:outline-none"
        >
          <div className="h-full rounded-2xl border border-border/60 bg-card/50 backdrop-blur-md p-6 flex flex-col items-center justify-center text-center text-xs text-muted-foreground gap-2">
            <Eye className="size-8 text-muted-foreground/50 animate-pulse" />
            <p>Preview frame ready for active artifact rendering.</p>
          </div>
        </TabsContent>
      </Tabs>
    </aside>
  );
};

export default Artifact;
