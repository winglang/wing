import { createWingLocalClient } from "@monadahq/wing-local-client";
import { WingLocalSchema } from "@monadahq/wing-local-schema";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { VscodeLayout } from "./components/VscodeLayout";
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
        <VscodeLayout schema={schema} />
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default App;
