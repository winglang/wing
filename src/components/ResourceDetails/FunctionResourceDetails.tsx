import { Button } from "../../design-system/Button.js";
import { trpc } from "../../utils/trpc.js";
import { ResourceNode } from "../ExpandedNode.js";

export interface FunctionResourceDetailsProps {
  resource: ResourceNode;
}

export const FunctionResourceDetails = ({
  resource,
}: FunctionResourceDetailsProps) => {
  const resourcePath = resource.path;
  const invoke = trpc["function.invoke"].useMutation();

  return (
    <>
      <dt className="truncate text-slate-500"></dt>
      <dd className="col-span-4 flex grow">
        <Button
          label="Invoke"
          className="px-1 h-5 font-normal"
          onClick={(e) => {
            e.stopPropagation();
            invoke.mutate({ message: "", resourcePath });
          }}
        />
      </dd>
    </>
  );
};
