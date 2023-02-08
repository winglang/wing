import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpLink, wsLink, splitLink, createWSClient } from "@trpc/client";
import React from "react";
import ReactDOM from "react-dom/client";

import { WingSimulatorSchema } from "../electron/main/wingsdk.js";

import { App } from "./App.js";
import { AppContext, AppMode } from "./AppContext.js";
import { trpc } from "./utils/trpc.js";

const main = ({
  appMode,
  port,
  schema,
}: {
  appMode: AppMode;
  port?: number;
  schema?: WingSimulatorSchema;
}) => {
  const url = `http://localhost:${port}`;
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        networkMode: "offlineFirst",
        refetchOnWindowFocus: false,
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

  ReactDOM.createRoot(document.querySelector("#root")!).render(
    <React.StrictMode>
      <AppContext.Provider value={{ appMode }}>
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </trpc.Provider>
      </AppContext.Provider>
    </React.StrictMode>,
  );
};

const query = new URLSearchParams(location.search);

main({
  appMode: "electron",
  port: Number(query.get("port")),
});

document.querySelector("#loader")?.remove();
