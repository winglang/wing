import { VscodeLayout } from "./components/VscodeLayout.js";
import { NotificationsProvider } from "./design-system/Notification.js";
import { trpc } from "./utils/trpc.js";

export interface AppProps {}

export const App = ({}: AppProps) => {
  const trpcContext = trpc.useContext();

  trpc["app.invalidateQuery"].useSubscription(undefined, {
    async onData({ query }) {
      console.debug("app.invalidateQuery", { query });
      // eslint-disable-next-line unicorn/prefer-ternary
      if (query) {
        await trpcContext[query].invalidate();
      } else {
        await trpcContext.invalidate();
      }
    },
  });

  const appDetails = trpc["app.details"].useQuery();
  const appState = trpc["app.state"].useQuery();

  return (
    <NotificationsProvider>
      <VscodeLayout
        cloudAppState={appState.data ?? "loading"}
        wingVersion={appDetails.data?.wingVersion}
      />
    </NotificationsProvider>
  );
};
