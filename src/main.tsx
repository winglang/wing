import { createTRPCClient } from "@trpc/client";
import { httpLink } from "@trpc/client/links/httpLink";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";

import { Router } from "../electron/main/router/index.js";
import { WingSimulatorSchema } from "../electron/main/wingsdk.js";

import { App } from "./App.js";
import { AppContext, AppMode } from "./AppContext.js";
import { DemoBase64WingSchema } from "./stories/mockData.js";
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
  const queryClient = new QueryClient();
  const trpcClient = createTRPCClient<Router>({
    url,
    links: [httpLink({ url })],
  });

  ReactDOM.createRoot(document.querySelector("#root")!).render(
    <React.StrictMode>
      <AppContext.Provider value={{ appMode }}>
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>
            <App querySchema={schema} />
          </QueryClientProvider>
        </trpc.Provider>
      </AppContext.Provider>
    </React.StrictMode>,
  );
};

const query = new URLSearchParams(location.search);

const getSchemaFromQueryString = () => {
  const base64Schema = query.get("schema");
  try {
    const jsonSchema = atob(base64Schema ?? DemoBase64WingSchema);
    return JSON.parse(jsonSchema) as WingSimulatorSchema;
  } catch (error) {
    console.error("failed to read schema from url", error);
  }
};

if (window.electronTRPC) {
  main({
    appMode: "electron",
    port: Number(query.get("port")),
  });
} else {
  // Only in Vercel.
  main({
    appMode: "webapp",
    schema: getSchemaFromQueryString(),
  });
}

document.querySelector("#loader")?.remove();
