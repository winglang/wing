import { ResourceSchema } from "@monadahq/wing-local-schema";

import { BucketInteractionView } from "@/components/BucketInteractionView";
import { EndpointInteractionView } from "@/components/EndpointInteractionView";
import { FunctionInteractionView } from "@/components/FunctionInteractionView";
import { QueueInteractionView } from "@/components/QueueInteractionView";
export interface NodeInteractionViewProps {
  node: ResourceSchema;
}

export function NodeInteractionView({ node }: NodeInteractionViewProps) {
  switch (node.type) {
    case "cloud.Endpoint":
      return <EndpointInteractionView node={node} />;
    case "cloud.Function":
      return <FunctionInteractionView node={node} />;
    case "cloud.Bucket":
      return <BucketInteractionView node={node} />;
    case "cloud.Queue":
      return <QueueInteractionView node={node} />;
    default:
      return <></>;
  }
}
