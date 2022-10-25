import type { WingSimulatorSchema } from "@monadahq/wingsdk/lib/sim";
import { createTRPCClient } from "@trpc/client";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { NotificationsProvider } from "@/design-system/Notification";
import { ipcLink } from "@/utils/ipcLink";

import { VscodeLayout } from "./components/VscodeLayout";
import { trpc } from "./utils/trpc";

export interface AppProps {}

export const App = ({}: AppProps) => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    createTRPCClient({
      links: [ipcLink()],
    }),
  );

  const [schema, setSchema] = useState<WingSimulatorSchema>();
  useEffect(() => {
    void trpcClient.query("app.tree").then((schema) => setSchema(schema));
  }, []);

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
