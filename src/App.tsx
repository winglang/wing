import { createTRPCClient } from "@trpc/client";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { UnityLayout as UnityLayout } from "./components/UnityLayout";
import { VscodeLayout } from "./components/VscodeLayout";
import { constructHubTreeToWingSchema } from "./stories/utils";
import { trpc } from "./utils/trpc";

export interface AppProps {}

export const App = ({}: AppProps) => {
  const [port] = useState(() => {
    const search = new URLSearchParams(location.search);
    const port = search.get("port");
    if (!port) {
      throw new Error("Port query parameter is empty or undefined");
    }
    return Number.parseInt(port);
  });

  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    createTRPCClient({
      url: `http://localhost:${port}`,
    }),
  );

  const [schema] = useState(() => constructHubTreeToWingSchema());

  const [Layout, setLayout] = useState(() => VscodeLayout);
  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.key === "x") {
        setLayout(() => {
          return Layout === VscodeLayout ? UnityLayout : VscodeLayout;
        });
      }
    };
    document.body.addEventListener("keypress", listener);
    return () => {
      document.body.removeEventListener("keypress", listener);
    };
  }, [Layout]);

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Layout schema={schema} />
      </QueryClientProvider>
    </trpc.Provider>
  );
};
