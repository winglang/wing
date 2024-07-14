import { memo, useContext } from "react";

import { AppContext } from "../../../AppContext.js";

import { useWebsite } from "./use-website.js";
import { WebsiteInteraction } from "./website-interaction.js";

export interface WebsiteInteractionViewProps {
  resourcePath: string;
}
export const WebsiteInteractionView = memo(
  ({ resourcePath }: WebsiteInteractionViewProps) => {
    const { appMode } = useContext(AppContext);
    const { url } = useWebsite({ resourcePath });

    return <WebsiteInteraction appMode={appMode} url={url} />;
  },
);
