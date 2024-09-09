import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  wsLink,
  splitLink,
  createWSClient,
  unstable_httpBatchStreamLink,
} from "@trpc/client";
import type { Mode } from "@wingconsole/design-system";
import type { Trace } from "@wingconsole/server";
import { useEffect, useMemo, useState } from "react";
import { useEvent } from "react-use";

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
        splitLink({
          condition(op) {
            return op.type === "subscription";
          },
          true: wsLink({
            client: wsClient,
          }),
          false: unstable_httpBatchStreamLink({
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

  // Prevent the default zoom behavior everywhere in the app.
  // Since the explorer panel handles the zoom manually, sometimes
  // users may end up zooming the whole app by mistake and end up
  // with the explorer panel covering the whole screen. This is
  // a big problem since users won't be able to zoom out of it.
  useEvent(
    "wheel",
    (event) => {
      if ((event as WheelEvent).ctrlKey) {
        event.preventDefault();
      }
    },
    document,
    { passive: false },
  );

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
