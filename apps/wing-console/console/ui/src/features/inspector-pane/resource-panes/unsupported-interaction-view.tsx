import { memo } from "react";

import { UnsupportedInteraction } from "./unsupported-interaction.js";

export interface UnsupportedInteractionViewProps {
  resourceType: string;
}

export const UnsupportedInteractionView = memo(
  ({ resourceType }: UnsupportedInteractionViewProps) => {
    return <UnsupportedInteraction resourceType={resourceType} />;
  },
);
