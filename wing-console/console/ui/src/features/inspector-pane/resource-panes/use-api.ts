import { useCallback, useEffect, useMemo } from "react";

import { trpc } from "../../../trpc.js";
import { useConsoleEnvironment } from "../../console-environment-context/console-environment-context.js";

import type { ApiRequest } from "./api.js";

export interface UseApiOptions {
  onFetchDataUpdate: (data: any) => void;
}

export const useApi = ({ onFetchDataUpdate }: UseApiOptions) => {
  const fetch = trpc["api.fetch"].useMutation();

  useEffect(() => {
    onFetchDataUpdate(fetch.data);
  }, [fetch.data, onFetchDataUpdate]);

  const { consoleEnvironment: environmentId } = useConsoleEnvironment();
  const callFetch = useCallback(
    async ({ url, route, method, variables, headers, body }: ApiRequest) => {
      if (!url || !method || !route) {
        return;
      }
      await fetch.mutateAsync({
        environmentId,
        url,
        route,
        variables,
        method,
        headers,
        body,
      });
    },
    [environmentId, fetch],
  );

  const isLoading = useMemo(() => {
    return fetch.isLoading;
  }, [fetch.isLoading]);

  return {
    isLoading,
    callFetch,
  };
};
