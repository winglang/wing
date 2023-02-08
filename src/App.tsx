import { IpcRendererEvent } from "electron";
import { useEffect, useState } from "react";

import { State } from "../electron/main/types.js";

import { VscodeLayout } from "./components/VscodeLayout.js";
import { NotificationsProvider } from "./design-system/Notification.js";
import { trpc } from "./utils/trpc.js";
import { useIpcEventListener } from "./utils/useIpcEventListener.js";

export interface AppProps {}

export const App = ({}: AppProps) => {
  const [cloudAppState, setCloudAppState] = useState<State>("loading");
  const trpcContext = trpc.useContext();

  const [wingVersion, setWingVersion] = useState<string>();
  trpc["app.invalidateQueries"].useSubscription(undefined, {
    async onData() {
      console.debug("app.invalidateQueries");
      await trpcContext.invalidate();
    },
  });

  useEffect(() => {
    trpcContext.client["app.details"]
      .query()
      .then((data) => {
        setWingVersion(data.wingVersion);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    console.debug("sending webapp.ready to main process");
    if (window.electronTRPC) {
      window.electronTRPC.ipcRenderer.send("webapp.ready");
    }
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
    "app.cloudAppState",
    (e: IpcRendererEvent, data) => {
      console.debug("cloudAppState", data);
      setCloudAppState(data);
    },
    { immediate: true },
  );

  return (
    <NotificationsProvider>
      <VscodeLayout cloudAppState={cloudAppState} wingVersion={wingVersion} />
    </NotificationsProvider>
  );
};
