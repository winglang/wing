import { BaseResourceSchema } from "../../electron/main/wingsdk.js";
import { BucketInteractionView } from "../components/BucketInteractionView.js";
import { EndpointInteractionView } from "../components/EndpointInteractionView.js";
import { FunctionInteractionView } from "../components/FunctionInteractionView.js";
import { QueueInteractionView } from "../components/QueueInteractionView.js";

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
