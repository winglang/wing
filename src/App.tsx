import { createWingLocalClient } from "@monadahq/wing-local-client";
import { WingLocalSchema } from "@monadahq/wing-local-schema";
import { ipcRenderer } from "electron";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { RightResizableWidget } from "./components/RightResizableWidget";
import { TopResizableWidget } from "./components/TopResizableWidget";
import { trpc } from "./utils/trpc";
import { useIpcEventListener } from "./utils/useIpcEventListener";

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

  const [schema, setSchema] = useState<WingLocalSchema | undefined>();
  useIpcEventListener(
    "schema-update",
    async () => {
      setSchema(await trpcClient.query("schema"));
    },
    { immediate: true },
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <div className="h-full flex flex-col">
          <div className="flex-1 flex">
            <RightResizableWidget className="w-60 min-w-[62px] overflow-x-auto">
              <div className="h-full bg-blue-100"></div>
            </RightResizableWidget>
            <div className="flex-1 bg-green-100"></div>
          </div>

          <TopResizableWidget className="h-60 min-h-[62px] overflow-y-auto">
            <div className="bg-red-100">
              <pre className="p-4 text-xs">
                {JSON.stringify(schema, undefined, 2)}
              </pre>
            </div>
          </TopResizableWidget>
        </div>
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default App;
