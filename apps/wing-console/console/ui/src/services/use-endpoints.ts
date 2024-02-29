import { useEffect, useState } from "react";

import type { EndpointItem } from "../shared/endpoint-item.js";

import { trpc } from "./trpc.js";

export const useEndpoints = () => {
  const [endpointList, setEndpointList] = useState<EndpointItem[]>([]);

  const endpointListQuery = trpc["endpoint.list"].useQuery();

  useEffect(() => {
    return setEndpointList(endpointListQuery.data || []);
  }, [endpointListQuery.data]);

  return {
    endpointList,
  };
};
