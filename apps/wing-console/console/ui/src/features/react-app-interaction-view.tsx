import { memo, useContext } from "react";

import { AppContext } from "../AppContext.js";
import { useOpenExternal } from "../services/use-open-external.js";
import { useReactApp } from "../services/use-react-app.js";
import { WebsiteInteraction } from "../ui/website-interaction.js";

export interface ReactAppInteractionViewProps {
  resourcePath: string;
}
export const ReactAppInteractionView = memo(
  ({ resourcePath }: ReactAppInteractionViewProps) => {
    const { appMode } = useContext(AppContext);
    const { open } = useOpenExternal();
    const { url } = useReactApp({ resourcePath });

    return <WebsiteInteraction appMode={appMode} onUrlClick={open} url={url} />;
  },
);
