import type { BaseResourceSchema } from "@monadahq/wingsdk/lib/sim";

import { BucketInteractionView } from "@/components/BucketInteractionView";
import { EndpointInteractionView } from "@/components/EndpointInteractionView";
import { FunctionInteractionView } from "@/components/FunctionInteractionView";
import { QueueInteractionView } from "@/components/QueueInteractionView";

export interface NodeInteractionViewProps {
  node: BaseResourceSchema;
}

export function NodeInteractionView({ node }: NodeInteractionViewProps) {
  switch (node.type) {
    case "wingsdk.cloud.Endpoint": {
      return <EndpointInteractionView node={node} />;
    }
    case "wingsdk.cloud.Function": {
      return <FunctionInteractionView node={node} />;
    }
    case "wingsdk.cloud.Bucket": {
      return <BucketInteractionView node={node} />;
    }
    case "wingsdk.cloud.Queue": {
      return <QueueInteractionView node={node} />;
    }
    default: {
      return <></>;
    }
  }
}
