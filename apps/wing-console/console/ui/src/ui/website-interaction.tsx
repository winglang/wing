import { Attribute } from "@wingconsole/design-system";

import type { AppMode } from "../AppContext.js";

export interface WebsiteInteractionProps {
  url: string;
  appMode: AppMode;
}
export const WebsiteInteraction = ({
  appMode,
  url,
}: WebsiteInteractionProps) => {
  return (
    <div className="h-full flex-1 flex flex-col text-sm space-y-1">
      <div className="relative grow flex-row flex items-center">
        {appMode === "local" && (
          <>
            <Attribute
              name="URL"
              type={"url"}
              value={url}
              url={url}
              noLeftPadding
              dataTestId="cloud.website:open-url"
            />
          </>
        )}
      </div>
    </div>
  );
};
