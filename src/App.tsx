import { ipcRenderer } from "electron";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { trpc } from "./utils/trpc";
import { useIpcEventListener } from "./utils/useIpcEventListener";

import { createWingLocalClient } from "@monadahq/wing-local-client";

interface AppProps {
  localServerPort: number;
}

const App = ({ localServerPort }: AppProps) => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    createWingLocalClient({
      url: `http://localhost:${localServerPort}`,
    }),
  );

  useIpcEventListener(
    "schema-update",
    async () => {
      const schema = await trpcClient.query("schema");
      console.log({ schema });
    },
    { immediate: true },
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <div className="h-full flex flex-col">
          <div className="flex-1 flex">
            <div className="flex-1 bg-blue-100"></div>
            <div className="flex-1 bg-green-100"></div>
          </div>

          <div className="flex-1 bg-red-100"></div>
        </div>
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default App;
