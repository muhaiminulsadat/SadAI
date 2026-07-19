import {authClient} from "../lib/auth-client";

export const getCurrentUsers = async () => {
  const {data, error} = await authClient.getSession();
  if (error) {
    console.error("Failed to fetch session:", error);
    return null;
  }
  return data;
};
