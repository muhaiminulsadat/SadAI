import React, { useState } from "react";
import { LoginCard } from "./LoginCard";
import { RegisterCard } from "./RegisterCard";

export const AuthView: React.FC = () => {
  const [view, setView] = useState<"login" | "register">("login");

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gradient-to-tr from-background via-background to-primary/5 px-4 relative overflow-hidden">
      {/* Decorative blurred background blobs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-primary-foreground/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="w-full max-w-4xl flex flex-col items-center relative z-10 py-12">
        <div className="w-full max-w-md transition-all duration-300 ease-out transform scale-100 opacity-100">
          {view === "login" ? (
            <LoginCard onSwitchToRegister={() => setView("register")} />
          ) : (
            <RegisterCard onSwitchToLogin={() => setView("login")} />
          )}
        </div>
      </div>
    </div>
  );
};
