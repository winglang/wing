import { memo, useContext } from "react";

import { AppContext } from "../AppContext.js";
import { useOpenExternal } from "../services/use-open-external.js";
import { useWebsite } from "../services/use-website.js";
import { WebsiteInteraction } from "../ui/website-interaction.js";

export interface WebsiteInteractionViewProps {
  resourcePath: string;
}
export const WebsiteInteractionView = memo(
  ({ resourcePath }: WebsiteInteractionViewProps) => {
    const { appMode } = useContext(AppContext);
    const { open } = useOpenExternal();
    const { url } = useWebsite({ resourcePath });

    return <WebsiteInteraction appMode={appMode} onUrlClick={open} url={url} />;
  },
);
