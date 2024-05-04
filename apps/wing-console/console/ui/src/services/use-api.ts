import { useCallback, useEffect, useMemo } from "react";

import type { ApiRequest } from "../shared/api.js";

import { trpc } from "./trpc.js";

export interface UseApiOptions {
  onFetchDataUpdate: (data: any) => void;
}

export const useApi = ({ onFetchDataUpdate }: UseApiOptions) => {
  const fetch = trpc["api.fetch"].useMutation();

  useEffect(() => {
    onFetchDataUpdate(fetch.data);
  }, [fetch.data, onFetchDataUpdate]);

  const callFetch = useCallback(
    async ({ url, route, method, variables, headers, body }: ApiRequest) => {
      if (!url || !method || !route) {
        return;
      }
      await fetch.mutateAsync({
        url,
        route,
        variables,
        method,
        headers,
        body,
      });
    },
    [fetch],
  );

  const isLoading = useMemo(() => {
    return fetch.isLoading;
  }, [fetch.isLoading]);

  return {
    isLoading,
    callFetch,
  };
};
