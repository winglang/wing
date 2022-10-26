import { ComponentMeta } from "@storybook/react";
import { createTRPCClient } from "@trpc/client";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { trpc } from "../utils/trpc.js";

import { NodeInteractionView } from "./NodeInteractionView.js";

export default {
  title: "Components/NodeInteractionView",
  // component: BaseNodeAttributes,
  // args: {},
} as ComponentMeta<typeof NodeInteractionView>;

export const EndpointInteraction = () => {
  return (
    <div className="max-w-lg">
      <NodeInteractionView
        node={{
          path: "path",
          type: "wingsdk.cloud.Endpoint",
          props: {
            targetId: "targetId",
            requestPath: "/",
            requestMethod: "GET",
          },
        }}
      />
    </div>
  );
};

export const FunctionInteraction = () => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    createTRPCClient({
      url: `http://localhost:3000`,
    }),
  );

  return (
    <div className="max-w-lg">
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <NodeInteractionView
            node={{
              path: "path",
              type: "wingsdk.cloud.Function",
              props: {
                sourceCodeFile: "file.js",
                sourceCodeLanguage: "javascript",
                environmentVariables: {},
              },
            }}
          />
        </QueryClientProvider>
      </trpc.Provider>
    </div>
  );
};

export const BucketInteraction = () => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    createTRPCClient({
      url: `http://localhost:3000`,
    }),
  );

  return (
    <div className="max-w-lg">
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <NodeInteractionView
            node={{
              path: "path",
              type: "wingsdk.cloud.Bucket",
            }}
          />
        </QueryClientProvider>
      </trpc.Provider>
    </div>
  );
};
