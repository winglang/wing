import { ComponentMeta } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpLink } from "@trpc/client";
import { PropsWithChildren, useState } from "react";

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
    trpc.createClient({
      links: [
        httpLink({
          url: `http://localhost:3000`,
        }),
      ],
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
