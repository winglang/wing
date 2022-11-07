import { createTRPCClient } from "@trpc/client";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { WingSimulatorSchema } from "../electron/main/wingsdk.js";

import { VscodeLayout } from "./components/VscodeLayout.js";
import { NotificationsProvider } from "./design-system/Notification.js";
import { ipcLink } from "./utils/ipcLink.js";
import { trpc } from "./utils/trpc.js";

export interface AppProps {
  querySchema?: WingSimulatorSchema;
}

export const App = ({ querySchema }: AppProps) => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    createTRPCClient({
      links: [ipcLink()],
    }),
  );
  const [schema, setSchema] = useState<WingSimulatorSchema>();

  useEffect(() => {
    if (querySchema) {
      console.log(
        "setting wing application schema from query string",
        querySchema,
      );
      setSchema(querySchema);
      return;
    }
    console.log("loading application schema from simulator");
    const loadSchema = async () => {
      await queryClient.invalidateQueries("app.tree");
      trpcClient
        .query("app.tree")
        .then((schema) => {
          setSchema(schema);
        })
        .catch(console.error);
    };
    const removeCloudChangeListener = window.electronTRPC.ipcRenderer.on(
      "cloud-app-changed",
      loadSchema,
    );
    // initial schema loading
    loadSchema().catch(console.error);
    return () => {
      removeCloudChangeListener();
    };
  }, [queryClient, querySchema]);

  // todo [SA] construct hub story
  // const [schema] = useState(() => constructHubTreeToWingSchema());
  // todo [SA] add vanitiUi
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <NotificationsProvider>
          <VscodeLayout schema={schema} />
        </NotificationsProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
};
