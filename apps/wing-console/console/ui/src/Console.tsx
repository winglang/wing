import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpLink, wsLink, splitLink, createWSClient } from "@trpc/client";
import { Mode } from "@wingconsole/design-system";
import { Trace } from "@wingconsole/server";
import { useEffect, useMemo } from "react";

import { App } from "./App.js";
import { AppContext } from "./AppContext.js";
import { LayoutType } from "./layout/layout-provider.js";
import { trpc } from "./services/trpc.js";

export const Console = ({
  trpcUrl,
  wsUrl,
  layout = LayoutType.Default,
  title,
  theme,
  color,
  onTrace,
}: {
  trpcUrl: string;
  wsUrl: string;
  title?: string;
  layout?: LayoutType;
  theme?: Mode;
  color?: string;
  onTrace?: (trace: Trace) => void;
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

  const appMode = useMemo(() => {
    return layout === LayoutType.Default || LayoutType.Vscode
      ? "local"
      : "remote";
  }, [layout]);

  useEffect(() => {
    const vscodeCommands = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.code === "KeyC") {
        document.execCommand("copy");
      } else if ((event.ctrlKey || event.metaKey) && event.code === "KeyX") {
        document.execCommand("cut");
      } else if ((event.ctrlKey || event.metaKey) && event.code === "KeyV") {
        document.execCommand("paste");
      } else if (
        (event.ctrlKey || event.metaKey) &&
        event.code === "KeyA" &&
        document.activeElement?.tagName !== "INPUT"
      ) {
        document.execCommand("selectAll");
      }
    };
    if (layout === LayoutType.Vscode) {
      window.addEventListener("keydown", vscodeCommands);
    }
    return () => {
      window.removeEventListener("keydown", vscodeCommands);
    };
  }, [layout]);

  return (
    <AppContext.Provider value={{ appMode, title: windowTitle }}>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <App layout={layout} theme={theme} color={color} onTrace={onTrace} />
        </QueryClientProvider>
      </trpc.Provider>
    </AppContext.Provider>
  );
};
