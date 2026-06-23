"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { type User } from "@/lib/mock-data";

interface AuthStateContextValue {
  user: User | null;
  isSignedIn: boolean;
  signIn: (user: User) => void;
  signOut: () => void;
}

const AuthStateContext = createContext<AuthStateContextValue | undefined>(undefined);

export function AuthStateProvider({ children }: { children: React.ReactNode }) {
  // A full browser refresh remounts this provider, so we intentionally start from a signed-out state.
  const [user, setUser] = useState<User | null>(() => null);

  const value = useMemo(
    () => ({
      user,
      isSignedIn: Boolean(user),
      signIn: (nextUser: User) => setUser(nextUser),
      signOut: () => setUser(null),
    }),
    [user],
  );

  return <AuthStateContext.Provider value={value}>{children}</AuthStateContext.Provider>;
}

export function useAuthState() {
  const context = useContext(AuthStateContext);
  if (!context) {
    throw new Error("useAuthState must be used inside AuthStateProvider");
  }
  return context;
}
