import { ThemeProvider } from "@wingconsole/design-system";

import { NotificationsProvider } from "./design-system/Notification.js";
import { LayoutProvider, LayoutType } from "./utils/layout-provider.js";
import { TestsContextProvider } from "./utils/tests-context.js";
import { trpc } from "./utils/trpc.js";

export interface AppProps {
  layout?: LayoutType;
}

export const App = ({ layout }: AppProps) => {
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

  return (
    <ThemeProvider>
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
