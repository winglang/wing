import React from "react";

export type AppMode = "remote" | "local";

export interface AppContextValue {
  appMode: AppMode;
  title: string;
  githubSignInURL?: string;
  googleSignInURL?: string;
}

export const AppContext = React.createContext<AppContextValue>({
  appMode: "local",
  title: "Wing Console",
});
