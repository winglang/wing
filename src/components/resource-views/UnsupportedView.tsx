import { InformationCircleIcon } from "@heroicons/react/20/solid";

import { Button } from "../../design-system/Button.js";
import { CustomResourceIcon } from "../../stories/utils.js";

export interface UnsupportedViewProps {
  resourceType: string;
  resourcePath: string;
}
export const UnsupportedView = ({
  resourceType,
  resourcePath,
}: UnsupportedViewProps) => {
  const newIssueUrl = "https://github.com/winglang/wing/issues/new/choose";

  const openExternalUrl = (url: string) => {
    if (window.electronTRPC) {
      window.electronTRPC.ipcRenderer.send("open-external-url", url);
    }
  };

  return (
    <div className="text-center mt-8 justify-center flex flex-1">
      <div className="text-sm">
        <div className="space-y-2">
          <div className="flex justify-center">
            <CustomResourceIcon className="h-12 w-12 text-slate-500" />
          </div>
          <h3 className="text-sm font-medium text-slate-900">
            Unsupported Resource
          </h3>
          <p className="text-slate-500">
            <span className="font-medium text-slate-600">{resourceType}</span>{" "}
            resource is not supported by the Wing Console.
          </p>
        </div>

        <div className="rounded-md bg-slate-100 p-4 mt-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <InformationCircleIcon
                className="h-5 w-5 text-slate-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3 text-left">
              <h3 className="text-sm text-slate-600">
                Do you want this resource to be supported?
              </h3>
              <div className="mt-2 text-sm text-slate-500">
                Please, open an issue to GitHub.
              </div>
              <div className="mt-2">
                <Button
                  onClick={() => openExternalUrl(newIssueUrl)}
                  label="Open an issue"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
