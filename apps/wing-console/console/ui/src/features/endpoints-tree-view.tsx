import { memo } from "react";

import { useEndpoints } from "../services/use-endpoints.js";
import { EndpointTree } from "../ui/endpoint-tree.js";

export const EndpointsTreeView = memo(() => {
  const { endpointList, exposeEndpoint, hideEndpoint } = useEndpoints();

  return (
    <EndpointTree
      endpointList={endpointList}
      exposeEndpoint={exposeEndpoint}
      hideEndpoint={hideEndpoint}
    />
  );
});
