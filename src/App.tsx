import { WingSimulatorSchema } from "../electron/main/wingsdk.js";

import { VscodeLayout } from "./components/VscodeLayout.js";
import { NotificationsProvider } from "./design-system/Notification.js";
import { trpc } from "./utils/trpc.js";
import { useIpcEventListener } from "./utils/useIpcEventListener.js";

export interface AppProps {}

export const App = ({}: AppProps) => {
  const logs = trpc.useQuery(["app.logs"]);

  const { invalidateQueries } = trpc.useContext();
  useIpcEventListener("trpc.invalidate", async (pathAndInput: any) => {
    await invalidateQueries(pathAndInput);
  });

  return (
    <NotificationsProvider>
      <VscodeLayout logs={logs.data} />
    </NotificationsProvider>
  );
};
