import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { createWingLocalClient } from "@monadahq/wing-local-client";
import { ComponentMeta } from "@storybook/react";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { trpc } from "@/utils/trpc.js";

import { meta } from "../stories/mockData.js";

import { NodeInteractionView } from "./NodeInteractionView";

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
          id: "id",
          path: "path",
          type: "cloud.Endpoint",
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
    createWingLocalClient({
      url: `http://localhost:3000`,
    }),
  );

  return (
    <div className="max-w-lg">
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <NodeInteractionView
            node={{
              id: "id",
              path: "path",
              type: "cloud.Function",
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
