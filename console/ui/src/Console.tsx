import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpLink, wsLink, splitLink, createWSClient } from "@trpc/client";

import { App } from "./App.js";
import { AppContext } from "./AppContext.js";
import { LayoutType } from "./layout/layout-provider.js";
import { trpc } from "./services/trpc.js";

export const Console = ({
  trpcUrl,
  wsUrl,
  layout = LayoutType.Vscode,
  title,
}: {
  trpcUrl: string;
  wsUrl: string;
  title?: string;
  layout?: LayoutType;
}) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        networkMode: "always",
        refetchOnWindowFocus: false,
        keepPreviousData: true,
      },
      mutations: {
        networkMode: "always",
      },
    },
  });
  const wsClient = createWSClient({
    url: wsUrl,
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
          url: trpcUrl,
        }),
      }),
    ],
  });

  let windowTitle = title ?? "Wing Console";

  const appMode = layout === LayoutType.Vscode ? "electron" : "webapp";

  return (
    <AppContext.Provider value={{ appMode, title: windowTitle }}>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <App layout={layout} />
        </QueryClientProvider>
      </trpc.Provider>
    </AppContext.Provider>
  );
};
