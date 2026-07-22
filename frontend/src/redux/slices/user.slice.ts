import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface UserData {
  id: string;
  name: string;
  email?: string;
  emailVerified: boolean;
  createdAt?: string;
  updatedAt?: string;
  image?: string | null;
}

export type UserDataInput = Omit<UserData, "createdAt" | "updatedAt"> & {
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export const sanitizeUserData = (
  input: UserDataInput | null | undefined
): UserData | null => {
  if (!input) return null;
  const { createdAt, updatedAt, ...rest } = input;
  return {
    ...rest,
    createdAt: createdAt
      ? createdAt instanceof Date
        ? createdAt.toISOString()
        : String(createdAt)
      : undefined,
    updatedAt: updatedAt
      ? updatedAt instanceof Date
        ? updatedAt.toISOString()
        : String(updatedAt)
      : undefined,
  };
};

interface UserState {
  user: UserData | null;
  isPending: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  isPending: true, // start true — wait for session check on mount
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    /** Called by App.tsx whenever better-auth session resolves */
    setUserData: (state, action: PayloadAction<UserData | null>) => {
      state.user = action.payload;
      state.isPending = false;
      state.error = null;
    },
    /** Mark session check in-flight (called before useSession resolves) */
    setIsPending: (state, action: PayloadAction<boolean>) => {
      state.isPending = action.payload;
    },
    /** Explicit logout — clears user immediately without waiting for session */
    clearUser: (state) => {
      state.user = null;
      state.isPending = false;
      state.error = null;
    },
    setAuthError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isPending = false;
    },
  },
});

export const { setUserData, setIsPending, clearUser, setAuthError } =
  userSlice.actions;
export default userSlice.reducer;
