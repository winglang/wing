import { InformationCircleIcon } from "@heroicons/react/20/solid";
import { Button, useTheme } from "@wingconsole/design-system";
import classNames from "classnames";

export interface UnsupportedInteractionProps {
  resourceType: string;
  onOpenIssueClick: (url: string) => void;
}
const newIssueUrl = "https://github.com/winglang/wing/issues/new/choose";

export const UnsupportedInteraction = ({
  resourceType,
  onOpenIssueClick,
}: UnsupportedInteractionProps) => {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col gap-y-1 gap-x-4">
      <div className="h-full flex-1 flex flex-col text-sm space-y-2">
        <p className={classNames(theme.text2)}>
          <span className={classNames(theme.text2, "font-medium")}>
            {resourceType}
          </span>{" "}
          resource is not supported by the Wing Console.
        </p>

        <div className="flex space-x-2">
          <div className="flex-shrink-0">
            <InformationCircleIcon
              className={classNames(theme.text2, "h-5 w-5")}
              aria-hidden="true"
            />
          </div>
          <div className="text-left">
            <h3 className={classNames(theme.text2, "text-sm")}>
              Do you want this resource to be supported?
            </h3>
            <div className="mt-2">
              <Button
                onClick={() => onOpenIssueClick(newIssueUrl)}
                label="Open an issue"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
