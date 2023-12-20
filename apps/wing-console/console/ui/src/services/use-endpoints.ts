import { useEffect, useState } from "react";

import { EndpointItem } from "../shared/endpoint-item.js";

import { trpc } from "./trpc.js";

export const useEndpoints = () => {
  const [endpointList, setEndpointList] = useState<EndpointItem[]>([]);

  useEffect(() => {
    return setEndpointList(trpc["endpoint.list"].useQuery().data || []);
  }, [trpc["endpoint.list"].useQuery().data]);

  return {
    endpointList,
  };
};
