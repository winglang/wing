import { useCallback } from "react";

import { trpc } from "../../../trpc.js";

export const useEndpoints = () => {
  const endpointListQuery = trpc["endpoint.list"].useQuery();

  const exposeEndpointMutation = trpc["endpoint.expose"].useMutation();

  const hideEndpointMutation = trpc["endpoint.hide"].useMutation();

  const getEndpoint = useCallback(
    (resourcePath: string) => {
      if (!endpointListQuery.data) {
        return;
      }
      return endpointListQuery.data.find(
        (endpoint) => endpoint.id === resourcePath,
      );
    },
    [endpointListQuery],
  );

  return {
    getEndpoint,
    endpointList: endpointListQuery,
    exposeEndpoint: exposeEndpointMutation,
    hideEndpoint: hideEndpointMutation,
  };
};
