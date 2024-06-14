import { memo } from "react";

import { useEndpoints } from "../inspector-pane/resource-panes/use-endpoints.js";

import { EndpointTree } from "./endpoint-tree.js";

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
