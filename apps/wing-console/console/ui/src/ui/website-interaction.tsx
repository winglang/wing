import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import { Attribute, useTheme } from "@wingconsole/design-system";
import classNames from "classnames";

import type { AppMode } from "../AppContext.js";

export interface WebsiteInteractionProps {
  url: string;
  appMode: AppMode;
  onUrlClick: (url: string) => void;
}
export const WebsiteInteraction = ({
  appMode,
  url,
  onUrlClick,
}: WebsiteInteractionProps) => {
  const { theme } = useTheme();
  return (
    <div className="h-full flex-1 flex flex-col text-sm space-y-1">
      <div className="relative grow flex-row flex items-center">
        {appMode === "local" && (
          <>
            <Attribute
              name="URL"
              value={url}
              noLeftPadding
              dataTestId="cloud.website:url"
            />
            <ArrowTopRightOnSquareIcon
              className={classNames(
                theme.text2,
                "text-sm flex ml-2 h-4 w-4 cursor-pointer",
              )}
              onClick={() => onUrlClick(url)}
              data-testid="cloud.website:open-url"
            />
          </>
        )}
      </div>
    </div>
  );
};
