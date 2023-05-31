import { ResourceNode } from "../../ui/detailed-node.js";

import { BucketValue } from "./BucketValue.js";
import { CounterValue } from "./CounterValue.js";
import { FunctionValue } from "./FunctionValue.js";

export interface ResourceMapInfoProps {
  node: ResourceNode;
}

export const ResourceValue = ({ node }: ResourceMapInfoProps) => {
  return (
    <>
      {node.type === "wingsdk.cloud.Counter" && (
        <CounterValue resource={node} />
      )}
      {node.type === "wingsdk.cloud.Bucket" && <BucketValue resource={node} />}
      {node.type === "wingsdk.cloud.Function" && (
        <FunctionValue resource={node} />
      )}
    </>
  );
};
