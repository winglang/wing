import React from "react";

export type AppMode = "webapp" | "electron";

export interface AppContextValue {
  appMode: AppMode;
  title: string;
}

export const AppContext = React.createContext<AppContextValue>({
  appMode: "electron",
  title: "Wing Console",
});
