import { PlusIcon } from "@heroicons/react/20/solid";

import { Button } from "../../design-system/Button.js";
import { trpc } from "../../utils/trpc.js";
import { ResourceNode } from "../DetailedNode.js";

export interface CounterResourceDetailsProps {
  resource: ResourceNode;
}

export const CounterValue = ({ resource }: CounterResourceDetailsProps) => {
  const resourcePath = resource.path;
  const incrementCounter = trpc["counter.inc"].useMutation();
  const counterValue = trpc["counter.get"].useQuery({ resourcePath });

  return (
    <>
      <dt className="truncate text-slate-500 flex items-center">Value</dt>
      <dd className="col-span-4 flex space-x-2 items-center">
        <div>{counterValue.data}</div>
        <div className="flex grow">
          <Button
            icon={PlusIcon}
            title="Increment"
            className="px-1 h-5"
            onClick={(e) => {
              e.stopPropagation();
              incrementCounter.mutate({ amount: 1, resourcePath });
            }}
          />
        </div>
      </dd>
    </>
  );
};
