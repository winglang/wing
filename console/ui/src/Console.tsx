import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpLink, wsLink, splitLink, createWSClient } from "@trpc/client";

import { App } from "./App.js";
import { AppContext } from "./AppContext.js";
import { trpc } from "./utils/trpc.js";

export const Console = ({ port }: { port?: number }) => {
  const url = `http://localhost:${port}`;
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        networkMode: "offlineFirst",
        refetchOnWindowFocus: false,
        keepPreviousData: true,
      },
    },
  });
  const wsClient = createWSClient({
    url: `ws://localhost:${port}`,
  });
  const trpcClient = trpc.createClient({
    links: [
      splitLink({
        condition(op) {
          return op.type === "subscription";
        },
        true: wsLink({
          client: wsClient,
        }),
        false: httpLink({
          url,
        }),
      }),
    ],
  });

  return (
    <AppContext.Provider value={{ appMode: "electron" }}>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </trpc.Provider>
    </AppContext.Provider>
  );
};
