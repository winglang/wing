import { useEffect, useMemo } from "react";

import { ApiRequest } from "../shared/api.js";
import { trpc } from "../utils/trpc.js";

export interface UseApiOptions {
  resourcePath: string;
  onFetchDataUpdate: (data: any) => void;
  onSchemaDataUpdate: (data: any) => void;
}
export const useApi = ({
  resourcePath,
  onFetchDataUpdate,
  onSchemaDataUpdate,
}: UseApiOptions) => {
  const fetch = trpc["api.fetch"].useMutation();
  const schema = trpc["api.schema"].useQuery({ resourcePath });

  useEffect(() => {
    // if (!fetch.data?.textResponse) {
    //   return;
    // }
    onFetchDataUpdate(fetch.data);
  }, [fetch.data]);

  useEffect(() => {
    if (!schema.data) {
      return;
    }
    onSchemaDataUpdate(schema.data);
  }, [schema.data]);

  const callFetch = async ({
    url,
    route,
    method,
    variables,
    headers,
    body,
  }: ApiRequest) => {
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
  };

  const isLoading = useMemo(() => {
    return fetch.isLoading || schema.isLoading;
  }, [fetch.isLoading, schema.isLoading]);

  return {
    isLoading,
    callFetch,
  };
};
