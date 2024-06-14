import { memo } from "react";

import { EndpointInteraction } from "./endpoint-interaction.js";
import { useEndpoints } from "./use-endpoints.js";

export interface EndpointInteractionViewProps {
  resourcePath: string;
}

export const EndpointInteractionView = memo(
  ({ resourcePath }: EndpointInteractionViewProps) => {
    const { getEndpoint, exposeEndpoint, hideEndpoint } = useEndpoints();

    const endpoint = getEndpoint(resourcePath);
    const handleExposeEndpoint = () => {
      exposeEndpoint(resourcePath);
    };
    const handleHideEndpoint = () => {
      hideEndpoint(resourcePath);
    };

    return (
      <EndpointInteraction
        endpoint={endpoint}
        exposeEndpoint={handleExposeEndpoint}
        hideEndpoint={handleHideEndpoint}
      />
    );
  },
);
