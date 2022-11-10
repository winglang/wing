import { Node } from "../utils/nodeMap.js";

import { BucketExploreView } from "./BucketExploreView.js";
import { FunctionExploreView } from "./FunctionExploreView.js";
import { QueueExploreView } from "./QueueExploreView.js";

export interface ResourceExploreViewProps {
  node: Node;
}

export const ResourceExploreView = ({ node }: ResourceExploreViewProps) => {
  return (
    <div className={"flex-1 flex w-full"}>
      {node.type === "wingsdk.cloud.Queue" && <QueueExploreView node={node} />}
      {node.type === "wingsdk.cloud.Function" && (
        <FunctionExploreView node={node} />
      )}
      {node.type === "wingsdk.cloud.Bucket" && (
        <BucketExploreView node={node} />
      )}
    </div>
  );
};
