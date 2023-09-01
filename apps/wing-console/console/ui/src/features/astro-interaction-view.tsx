import { useContext } from "react";

import { AppContext } from "../AppContext.js";
import { useAstro } from "../services/use-astro.js";
import { useOpenExternal } from "../services/use-open-external.js";
import { AstroInteraction } from "../ui/astro-interaction.js";

export interface AstroInteractionViewProps {
  resourcePath: string;
}
export const AstroInteractionView = ({
  resourcePath,
}: AstroInteractionViewProps) => {
  const { appMode } = useContext(AppContext);
  const { open } = useOpenExternal();
  const { url } = useAstro({ resourcePath });

  return <AstroInteraction appMode={appMode} onUrlClick={open} url={url} />;
};
