import {betterAuth} from "better-auth";
import {mongodbAdapter} from "better-auth/adapters/mongodb";
import {db, client} from "./db.ts";

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },
  basePath: "/api/auth",
  trustedOrigins: [
    process.env.CLIENT_URL ||
      process.env.FRONTEND_URL ||
      "http://localhost:5173",
  ],
});
export type Auth = typeof auth;
