import { VscodeLayout } from "./components/VscodeLayout.js";
import { NotificationsProvider } from "./design-system/Notification.js";
import { TestsContextProvider } from "./utils/tests-context.js";
import { trpc } from "./utils/trpc.js";

export interface AppProps {}

export const App = ({}: AppProps) => {
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
    <NotificationsProvider>
      <TestsContextProvider>
        <VscodeLayout
          cloudAppState={appState.data ?? "compiling"}
          wingVersion={appDetails.data?.wingVersion}
        />
      </TestsContextProvider>
    </NotificationsProvider>
  );
};
