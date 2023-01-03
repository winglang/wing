import { BucketView } from "./BucketView.js";
import { CounterView } from "./CounterView.js";
import { FunctionView } from "./FunctionView.js";
import { QueueView } from "./QueueView.js";

export interface ResourceViewProps {
  resourceType: string;
  resourcePath: string;
}

export const ResourceView = ({
  resourceType,
  resourcePath,
}: ResourceViewProps) => {
  return (
    <div className={"flex-1 flex w-full"}>
      {resourceType === "wingsdk.cloud.Queue" && (
        <QueueView resourcePath={resourcePath} />
      )}
      {resourceType === "wingsdk.cloud.Function" && (
        <FunctionView resourcePath={resourcePath} />
      )}
      {resourceType === "wingsdk.cloud.Bucket" && (
        <BucketView resourcePath={resourcePath} />
      )}
      {resourceType === "wingsdk.cloud.Counter" && (
        <CounterView resourcePath={resourcePath} />
      )}
    </div>
  );
};
