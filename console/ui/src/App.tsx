import {
  DefaultTheme,
  ThemeProvider,
  NotificationsProvider,
  Mode,
} from "@wingconsole/design-system";

import { LayoutProvider, LayoutType } from "./layout/layout-provider.js";
import { trpc } from "./services/trpc.js";
import { TestsContextProvider } from "./tests-context.js";

export interface AppProps {
  layout?: LayoutType;
  theme?: Mode;
}

export const App = ({ layout, theme }: AppProps) => {
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

  const appDetails = trpc["app.details"].useQuery();
  const appState = trpc["app.state"].useQuery();
  const themeMode = trpc["config.getThemeMode"].useQuery();

  return (
    <ThemeProvider mode={theme || themeMode?.data?.mode} theme={DefaultTheme}>
      <NotificationsProvider>
        <TestsContextProvider>
          <LayoutProvider
            layoutType={layout}
            layoutProps={{
              cloudAppState: appState.data ?? "compiling",
              wingVersion: appDetails.data?.wingVersion,
            }}
          ></LayoutProvider>
        </TestsContextProvider>
      </NotificationsProvider>
    </ThemeProvider>
  );
};
