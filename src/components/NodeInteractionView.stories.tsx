import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { ComponentMeta } from "@storybook/react";

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
