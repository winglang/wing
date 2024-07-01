import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  httpBatchLink,
  wsLink,
  splitLink,
  createWSClient,
  httpLink,
} from "@trpc/client";
import type { Mode } from "@wingconsole/design-system";
import type { Trace } from "@wingconsole/server";
import { useEffect, useMemo, useState } from "react";

import { App } from "./App.js";
import { AppContext } from "./AppContext.js";
import { LayoutType } from "./features/layout/layout-provider.js";
import { WebSocketProvider } from "./features/websocket-state/use-websocket.js";
import { trpc } from "./trpc.js";

export const Console = ({
  trpcUrl,
  wsUrl,
  layout = LayoutType.Default,
  title,
  theme,
  color,
  onTrace,
  wingCloudSignInUrl: githubSignInURL,
  googleSignInURL,
}: {
  trpcUrl: string;
  wsUrl: string;
  title?: string;
  layout?: LayoutType;
  theme?: Mode;
  color?: string;
  onTrace?: (trace: Trace) => void;
  wingCloudSignInUrl?: string;
  googleSignInURL?: string;
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
        // For subscriptions, use WebSocket.
        splitLink({
          condition(op) {
            return op.type === "subscription";
          },
          true: wsLink({
            client: wsClient,
          }),
          // For the `test.*` operations, use a single HTTP link. This is necessary
          // to avoid a bug where the Console would not display the data until
          // the app starts correctly. For example, starting a new application
          // with compilation errors, the Console will be stuck.
          //
          // For the rest of the operations, use the batch HTTP link.
          //
          // We should be able to use batch HTTP links everywhere if we refactor
          // the `test.*` operations so they don't wait until the Simulator
          // instance is ready.
          false: splitLink({
            condition(op) {
              return op.path.startsWith("test.");
            },
            true: httpLink({
              url: trpcUrl,
            }),
            false: httpBatchLink({
              url: trpcUrl,
            }),
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
      value={{
        appMode,
        title: windowTitle,
        githubSignInURL,
        googleSignInURL,
      }}
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
