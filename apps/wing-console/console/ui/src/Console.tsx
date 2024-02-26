import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpLink, wsLink, splitLink, createWSClient } from "@trpc/client";
import { Mode } from "@wingconsole/design-system";
import { Trace } from "@wingconsole/server";
import { useEffect, useMemo, useState } from "react";

import { App } from "./App.js";
import { AppContext } from "./AppContext.js";
import { LayoutType } from "./layout/layout-provider.js";
import { trpc } from "./services/trpc.js";
import { WebSocketProvider } from "./services/use-websocket.js";

export const Console = ({
  trpcUrl,
  wsUrl,
  layout = LayoutType.Default,
  title,
  theme,
  color,
  onTrace,
  wingCloudSignInUrl,
}: {
  trpcUrl: string;
  wsUrl: string;
  title?: string;
  layout?: LayoutType;
  theme?: Mode;
  color?: string;
  onTrace?: (trace: Trace) => void;
  wingCloudSignInUrl?: string;
}) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
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
      }),
  );
  const [wsClient] = useState(() =>
    createWSClient({
      url: wsUrl,
    }),
  );
  const [trpcClient] = useState(() =>
    trpc.createClient({
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
    }),
  );

  let windowTitle = title ?? "Wing Console";

  const appMode = useMemo(() => {
    return layout === LayoutType.Default || layout === LayoutType.Vscode
      ? "local"
      : "remote";
  }, [layout]);

  // This is a workaround for handling copy/paste when running in VSCode
  // There is an open issue in VSCode repo: https://github.com/microsoft/vscode/issues/129178
  useEffect(() => {
    if (layout !== LayoutType.Vscode) {
      return;
    }

    const vscodeCommands = (event: KeyboardEvent) => {
      if (!(event.ctrlKey || event.metaKey)) {
        return;
      }
      switch (event.code) {
        case "KeyC": {
          document.execCommand("copy");
          break;
        }
        case "KeyX": {
          document.execCommand("cut");
          break;
        }
        case "KeyV": {
          document.execCommand("paste");
          break;
        }
        case "KeyA": {
          document.execCommand("selectAll");
        }
      }
    };

    window.addEventListener("keydown", vscodeCommands);
    return () => {
      window.removeEventListener("keydown", vscodeCommands);
    };
  }, [layout]);

  return (
    <AppContext.Provider
      value={{ appMode, title: windowTitle, wingCloudSignInUrl }}
    >
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <WebSocketProvider webSocket={wsClient.getConnection()}>
            <App
              layout={layout}
              theme={theme}
              color={color}
              onTrace={onTrace}
            />
          </WebSocketProvider>
        </QueryClientProvider>
      </trpc.Provider>
    </AppContext.Provider>
  );
};
