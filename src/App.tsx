import { IpcRendererEvent } from "electron";
import { useEffect, useState } from "react";

import { VscodeLayout } from "./components/VscodeLayout.js";
import { NotificationsProvider } from "./design-system/Notification.js";
import { trpc } from "./utils/trpc.js";
import { useIpcEventListener } from "./utils/useIpcEventListener.js";

export interface AppProps {}

let initialized = false;

export const App = ({}: AppProps) => {
  const [simulatorStatus, setSimulatorStatus] = useState<
    "loading" | "error" | "success" | "idle"
  >("loading");
  const [compilerStatus, setCompilerStatus] = useState<
    "loading" | "error" | "success" | "idle"
  >("loading");
  const trpcContext = trpc.useContext();

  const [wingVersion, setWingVersion] = useState<string>();
  trpc["app.invalidateQueries"].useSubscription(undefined, {
    async onData() {
      await trpcContext.invalidate();
    },
  });

  useEffect(() => {
    // DEV NOTICE: spacial use case, avoid double invocation of this useEffect function when running in dev mode (react 18.x.x new strictMode)
    if (initialized) {
      return;
    }

    initialized = true;
    trpcContext.client["app.status"]
      .query()
      .then((data) => {
        setSimulatorStatus(data.simulatorStatus);
        setCompilerStatus(data.compilerStatus);
        setWingVersion(data.wingVersion);
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
        wingVersion={wingVersion}
      />
    </NotificationsProvider>
  );
};
