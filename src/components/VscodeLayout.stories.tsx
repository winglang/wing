import { createWingLocalClient } from "@monadahq/wing-local-client";
import { ComponentMeta } from "@storybook/react";
import { PropsWithChildren, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { trpc } from "@/utils/trpc.js";

import { constructHubTreeToWingSchema } from "../stories/utils.js";

import { VscodeLayout } from "./VscodeLayout.js";

export default {
  title: "Layouts/Vscode",
} as ComponentMeta<typeof VscodeLayout>;

const Container = ({ children }: PropsWithChildren) => {
  return <div className="fixed top-0 left-0 h-full w-full">{children}</div>;
};
export const Default = () => {
  const schema = constructHubTreeToWingSchema();
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    createWingLocalClient({
      url: `http://localhost:3000`,
    }),
  );

  return (
    <Container>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <VscodeLayout schema={schema} />
        </QueryClientProvider>
      </trpc.Provider>
    </Container>
  );
};

export const Empty = () => {
  return (
    <Container>
      <VscodeLayout schema={undefined} />
    </Container>
  );
};
