import { createTRPCClient } from "@trpc/client";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { Router } from "../electron/main/router/index.js";
import { WingSimulatorSchema } from "../electron/main/wingsdk.js";

import { VscodeLayout } from "./components/VscodeLayout.js";
import { NotificationsProvider } from "./design-system/Notification.js";
import { trpc } from "./utils/trpc.js";

export interface AppProps {
  querySchema?: WingSimulatorSchema;
}

export const App = ({ querySchema }: AppProps) => {
  const schema = trpc.useQuery(["app.tree"]);

  const { invalidateQueries } = trpc.useContext();
  useEffect(() => {
    const invalidate = async () => {
      console.log("reload");
      await invalidateQueries("app.tree");
    };
    window.electronTRPC?.ipcRenderer.on("reload", invalidate);
    return () => {
      window.electronTRPC?.ipcRenderer.removeListener("reload", invalidate);
    };
  }, []);

  return (
    <NotificationsProvider>
      {querySchema && <VscodeLayout schema={querySchema} />}
      {schema.data && <VscodeLayout schema={schema.data} />}
    </NotificationsProvider>
  );
};
