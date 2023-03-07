import { InformationCircleIcon } from "@heroicons/react/20/solid";

import { Button } from "../../design-system/Button.js";
import { trpc } from "../../utils/trpc.js";

export interface UnsupportedViewProps {
  resourceType: string;
  resourcePath: string;
}
export const UnsupportedView = ({ resourceType }: UnsupportedViewProps) => {
  const newIssueUrl = "https://github.com/winglang/wing/issues/new/choose";

  const openExternal = trpc["app.openExternal"].useMutation();

  return (
    <div className="flex flex-col gap-y-1 gap-x-4 bg-slate-50">
      <div className="h-full flex-1 flex flex-col text-sm space-y-2">
        <p className="text-slate-500">
          <span className="font-medium text-slate-600">{resourceType}</span>{" "}
          resource is not supported by the Wing Console.
        </p>

        <div className="flex space-x-2">
          <div className="flex-shrink-0">
            <InformationCircleIcon
              className="h-5 w-5 text-slate-400"
              aria-hidden="true"
            />
          </div>
          <div className="text-left">
            <h3 className="text-sm text-slate-600">
              Do you want this resource to be supported?
            </h3>
            <div className="mt-2">
              <Button
                onClick={() => openExternal.mutate({ url: newIssueUrl })}
                label="Open an issue"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
