import {
  ThemeProvider,
  NotificationsProvider,
  type Mode,
  buildTheme,
  Loader,
} from "@wingconsole/design-system";
import type { Trace } from "@wingconsole/server";
import { PersistentStateProvider } from "@wingconsole/use-persistent-state";
import { MotionConfig } from "framer-motion";
import { useMemo } from "react";

import type { LayoutType } from "./features/layout/layout-provider.js";
import { LayoutProvider } from "./features/layout/layout-provider.js";
import { AppLocalStorageProvider } from "./features/localstorage-context/localstorage-context.js";
import { SelectionContextProvider } from "./features/selection-context/selection-context.js";
import { TestsContextProvider } from "./features/tests-pane/tests-context.js";
import { trpc } from "./trpc.js";

export interface AppProps {
  layout?: LayoutType;
  theme?: Mode;
  color?: string;
  onTrace?: (trace: Trace) => void;
}

export const App = ({ layout, theme, color, onTrace }: AppProps) => {
  const trpcContext = trpc.useContext();

  trpc["app.invalidateQuery"].useSubscription(undefined, {
    async onData(query) {
      console.debug("app.invalidateQuery", { query });
      // eslint-disable-next-line unicorn/prefer-ternary
      if (query) {
        await (trpcContext as any)[query]?.invalidate();
      } else {
        await trpcContext.invalidate();
      }
    },
  });

  trpc["app.traces"].useSubscription(undefined, {
    onData(data) {
      onTrace?.(data as Trace);
    },
  });

  const layoutConfig = trpc["app.layoutConfig"].useQuery();
  const appDetails = trpc["app.details"].useQuery();
  const appState = trpc["app.state"].useQuery();
  const wingfileQuery = trpc["app.wingfile"].useQuery();
  const wingfile = useMemo(() => {
    return wingfileQuery.data;
  }, [wingfileQuery.data]);

  return (
    <ThemeProvider theme={buildTheme(color)}>
      <NotificationsProvider>
        <TestsContextProvider>
          <AppLocalStorageProvider storageKey={wingfile}>
            {!wingfile && <Loader />}
            {wingfile && (
              <SelectionContextProvider>
                <PersistentStateProvider>
                  <MotionConfig transition={{ duration: 0.15 }}>
                    <LayoutProvider
                      layoutType={layout}
                      layoutProps={{
                        cloudAppState: appState.data ?? "compiling",
                        wingVersion: appDetails.data?.wingVersion,
                        layoutConfig: layoutConfig.data?.config,
                      }}
                    />
                  </MotionConfig>
                </PersistentStateProvider>
              </SelectionContextProvider>
            )}
          </AppLocalStorageProvider>
        </TestsContextProvider>
      </NotificationsProvider>
    </ThemeProvider>
  );
};
