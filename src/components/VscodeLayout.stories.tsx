import { ComponentMeta } from "@storybook/react";
import { createTRPCClient } from "@trpc/client";
import { PropsWithChildren, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { NotificationsProvider } from "../design-system/Notification.js";
import { trpc } from "../utils/trpc.js";

import { VscodeLayout } from "./VscodeLayout.js";

export default {
  title: "Layouts/Vscode",
} as ComponentMeta<typeof VscodeLayout>;

const Container = ({ children }: PropsWithChildren) => {
  return <div className="fixed top-0 left-0 h-full w-full">{children}</div>;
};

export const Default = () => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    createTRPCClient({
      url: `http://localhost:3000`,
    }),
  );

  return (
    <Container>
      <NotificationsProvider>
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>
            <VscodeLayout />
          </QueryClientProvider>
        </trpc.Provider>
      </NotificationsProvider>
    </Container>
  );
};
