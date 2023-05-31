import { Button } from "@wingconsole/design-system";

import { ResourceNode } from "../../ui/detailed-node.js";
import { trpc } from "../../utils/trpc.js";

export interface FunctionResourceDetailsProps {
  resource: ResourceNode;
}

export const FunctionValue = ({ resource }: FunctionResourceDetailsProps) => {
  const resourcePath = resource.path;
  const invoke = trpc["function.invoke"].useMutation();

  return (
    <>
      <dt className="truncate"></dt>
      <dd className="col-span-4 flex grow">
        <Button
          label="Invoke"
          className="px-1 h-5 font-normal"
          onClick={(event) => {
            event.stopPropagation();
            invoke.mutate({ message: "", resourcePath });
          }}
        />
      </dd>
    </>
  );
};
