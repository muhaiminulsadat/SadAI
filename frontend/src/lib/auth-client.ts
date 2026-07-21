import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://localhost:8001", // Auth service port
});

export const { useSession, signIn, signUp, signOut } = authClient;
