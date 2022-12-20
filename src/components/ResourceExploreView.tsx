import { BucketExploreView } from "./BucketExploreView.js";
import { CounterExploreView } from "./CounterExploreView.js";
import { FunctionExploreView } from "./FunctionExploreView.js";
import { QueueExploreView } from "./QueueExploreView.js";

export interface ResourceExploreViewProps {
  resourceType: string;
  resourcePath: string;
}

export const ResourceExploreView = ({
  resourceType,
  resourcePath,
}: ResourceExploreViewProps) => {
  return (
    <div className={"flex-1 flex w-full"}>
      {resourceType === "wingsdk.cloud.Queue" && (
        <QueueExploreView resourcePath={resourcePath} />
      )}
      {resourceType === "wingsdk.cloud.Function" && (
        <FunctionExploreView resourcePath={resourcePath} />
      )}
      {resourceType === "wingsdk.cloud.Bucket" && (
        <BucketExploreView resourcePath={resourcePath} />
      )}
      {resourceType === "wingsdk.cloud.Counter" && (
        <CounterExploreView resourcePath={resourcePath} />
      )}
    </div>
  );
};
