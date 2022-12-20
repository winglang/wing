import { IpcRendererEvent } from "electron";
import { useState } from "react";

import { VscodeLayout } from "./components/VscodeLayout.js";
import { NotificationsProvider } from "./design-system/Notification.js";
import { trpc } from "./utils/trpc.js";
import { useIpcEventListener } from "./utils/useIpcEventListener.js";

export interface AppProps {}

export const App = ({}: AppProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { invalidateQueries } = trpc.useContext();
  useIpcEventListener(
    "trpc.invalidate",
    async (e: IpcRendererEvent, pathAndInput: any) => {
      await invalidateQueries(pathAndInput);
    },
  );

  useIpcEventListener("app.isError", (e: IpcRendererEvent, error) => {
    setIsError(true);
    setIsLoading(false);
  });
  useIpcEventListener(
    "app.isLoading",
    (e: IpcRendererEvent, isLoading: boolean) => {
      if (isLoading) {
        setIsError(false);
      }
      setIsLoading(isLoading);
    },
  );

  return (
    <NotificationsProvider>
      <VscodeLayout isLoading={isLoading} isError={isError} />
    </NotificationsProvider>
  );
};
