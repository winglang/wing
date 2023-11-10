import { memo } from "react";

import { useOpenExternal } from "../services/use-open-external.js";
import { UnsupportedInteraction } from "../ui/unsupported-interaction.js";

export interface UnsupportedInteractionViewProps {
  resourceType: string;
}

export const UnsupportedInteractionView = memo(
  ({ resourceType }: UnsupportedInteractionViewProps) => {
    const { open } = useOpenExternal();

    return (
      <UnsupportedInteraction
        onOpenIssueClick={open}
        resourceType={resourceType}
      />
    );
  },
);
