import { useEffect, useState, useCallback } from "react";

import type { EndpointItem } from "../shared/endpoint-item.js";

import { trpc } from "./trpc.js";

export const useEndpoints = () => {
  const [endpointList, setEndpointList] = useState<EndpointItem[]>([]);

  const endpointListQuery = trpc["endpoint.list"].useQuery();

  useEffect(() => {
    return setEndpointList(endpointListQuery.data ?? []);
  }, [endpointListQuery.data]);

  const exposeEndpointMutation = trpc["endpoint.expose"].useMutation();
  const exposeEndpoint = (resourcePath: string) => {
    exposeEndpointMutation.mutate({ resourcePath });
    setTimeout(endpointListQuery.refetch);
  };

  const hideEndpointMutation = trpc["endpoint.hide"].useMutation();
  const hideEndpoint = (resourcePath: string) => {
    hideEndpointMutation.mutate({ resourcePath });
    setTimeout(endpointListQuery.refetch);
  };

  const getEndpoint = useCallback(
    (resourcePath: string) => {
      return endpointList.find((endpoint) => endpoint.id === resourcePath);
    },
    [endpointList],
  );

  return {
    getEndpoint,
    endpointList,
    exposeEndpoint,
    hideEndpoint,
  };
};
