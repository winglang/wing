import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { ComponentMeta } from "@storybook/react";
import { createTRPCClient } from "@trpc/client";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { QueueInteractionView } from "./QueueInteractionView.js";

export default {
  title: "Components/NodeInteractionView",
  // component: BaseNodeAttributes,
  // args: {},
} as ComponentMeta<typeof QueueInteractionView>;

export const QueueInteraction = () => {
  return (
    <div className="max-w-lg h-96 shadow rounded p-4 border border-slate-200">
      <div className="relative h-full">
        <QueueInteractionView
          node={{
            path: "path",
            type: "wingsdk.cloud.Queue",
            props: {
              timeout: "3000",
            },
          }}
        />
      </div>
    </div>
  );
};
