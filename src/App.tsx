import { createTRPCClient } from "@trpc/client";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { Router } from "../electron/main/router/index.js";
import { WingSimulatorSchema } from "../electron/main/wingsdk.js";

import { VscodeLayout } from "./components/VscodeLayout.js";
import { NotificationsProvider } from "./design-system/Notification.js";
import { trpc } from "./utils/trpc.js";
import { useIpcEventListener } from "./utils/useIpcEventListener.js";

export interface AppProps {
  querySchema?: WingSimulatorSchema;
}

export const App = ({ querySchema }: AppProps) => {
  const schema = trpc.useQuery(["app.tree"]);
  const logs = trpc.useQuery(["app.logs"]);

  const { invalidateQueries } = trpc.useContext();
  useIpcEventListener("trpc.invalidate", async (pathAndInput: any) => {
    await invalidateQueries(pathAndInput);
  });

  return (
    <NotificationsProvider>
      <VscodeLayout schema={querySchema ?? schema.data} logs={logs.data} />
    </NotificationsProvider>
  );
};
