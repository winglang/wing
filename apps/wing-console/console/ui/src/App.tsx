import {
  ThemeProvider,
  NotificationsProvider,
  type Mode,
  buildTheme,
} from "@wingconsole/design-system";
import type { Trace } from "@wingconsole/server";

import type { LayoutType } from "./layout/layout-provider.js";
import { LayoutProvider } from "./layout/layout-provider.js";
import { trpc } from "./services/trpc.js";
import { TestsContextProvider } from "./tests-context.js";

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

  return (
    <ThemeProvider theme={buildTheme(color)}>
      <NotificationsProvider>
        <TestsContextProvider>
          <LayoutProvider
            layoutType={layout}
            layoutProps={{
              cloudAppState: appState.data ?? "compiling",
              wingVersion: appDetails.data?.wingVersion,
              layoutConfig: layoutConfig.data?.config,
            }}
          />
        </TestsContextProvider>
      </NotificationsProvider>
    </ThemeProvider>
  );
};
