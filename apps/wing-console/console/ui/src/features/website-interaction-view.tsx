import { WebsiteInteraction } from "../ui/website-interaction";
import { useContext } from "react";
import { AppContext } from "../AppContext";
import { useOpenExternal } from "../services/use-open-external";
import { useWebsite } from "../services/use-website";

export interface WebsiteInteractionViewProps {
  resourcePath: string;
}
export const WebsiteInteractionView = ({
  resourcePath,
}: WebsiteInteractionViewProps) => {
  const { appMode } = useContext(AppContext);
  const { open } = useOpenExternal();
  const { url } = useWebsite({ resourcePath });

  return <WebsiteInteraction appMode={appMode} onUrlClick={open} url={url} />;
};
