import { memo } from "react";

import { useEndpoints } from "../services/use-endpoints.js";
import { EndpointInteraction } from "../ui/endpoint-interaction.js";

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
