import React from "react";

export type AppMode = "remote" | "local";

export interface AppContextValue {
  appMode: AppMode;
  title: string;
  wingCloudSignInUrl?: string;
}

export const AppContext = React.createContext<AppContextValue>({
  appMode: "local",
  title: "Wing Console",
});
