import { createTRPCClient } from "@trpc/client";
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
  const queryClient = new QueryClient();
  const trpcClient = createTRPCClient<Router>({
    url: `http://localhost:${port}`,
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

  document.querySelector("#loader")?.remove();
};

const getSchemaFromQueryString = () => {
  const query = new URLSearchParams(location.search);
  const base64Schema = query.get("schema");
  try {
    const jsonSchema = atob(base64Schema ?? DemoBase64WingSchema);
    return JSON.parse(jsonSchema) as WingSimulatorSchema;
  } catch (error) {
    console.error("failed to read schema from url", error);
  }
};

if (window.electronTRPC) {
  window.electronTRPC.ipcRenderer.once(
    "init",
    async (event, { port, simfile }) => {
      main({
        appMode: "electron",
        port,
      });
    },
  );
  window.electronTRPC.ipcRenderer.send("init");
} else {
  // Only in Vercel.
  main({
    appMode: "webapp",
    schema: getSchemaFromQueryString(),
  });
}
