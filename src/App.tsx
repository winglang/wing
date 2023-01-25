import { IpcRendererEvent } from "electron";
import { useEffect, useState } from "react";

import { VscodeLayout } from "./components/VscodeLayout.js";
import { NotificationsProvider } from "./design-system/Notification.js";
import { trpc } from "./utils/trpc.js";
import { useIpcEventListener } from "./utils/useIpcEventListener.js";

export interface AppProps {}

export const App = ({}: AppProps) => {
  const [simulatorStatus, setSimulatorStatus] = useState<
    "loading" | "error" | "success" | "idle"
  >("idle");
  const [compilerStatus, setCompilerStatus] = useState<
    "loading" | "error" | "success" | "idle"
  >("idle");
  const trpcContext = trpc.useContext();

  trpc["app.invalidateQueries"].useSubscription(undefined, {
    async onData() {
      await trpcContext.invalidate();
    },
  });

  useEffect(() => {
    trpcContext.client["app.status"]
      .query()
      .then((data) => {
        setSimulatorStatus(data.simulatorStatus);
        setCompilerStatus(data.compilerStatus);
      })
      .catch((error) => console.log(error));
  }, []);

  // TODO: Use TRPC directly.
  useIpcEventListener(
    "trpc.invalidate",
    async (e: IpcRendererEvent, pathAndInput: any) => {
      if (!pathAndInput) {
        await trpcContext.invalidate();
        return;
      }
      try {
        await (trpcContext as any)[pathAndInput].invalidate();
      } catch (error) {
        console.log(error);
      }
    },
  );

  // TODO: Use TRPC directly.
  useIpcEventListener(
    "app.compilerStatusChange",
    (e: IpcRendererEvent, data) => {
      setCompilerStatus(data);
    },
  );

  // TODO: Use TRPC directly.
  useIpcEventListener(
    "app.simulatorStatusChange",
    (e: IpcRendererEvent, data) => {
      setSimulatorStatus(data);
    },
  );

  return (
    <NotificationsProvider>
      <VscodeLayout
        simulatorStatus={simulatorStatus}
        compilerStatus={compilerStatus}
      />
    </NotificationsProvider>
  );
};
