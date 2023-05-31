import { useMemo, useState } from "react";

import { trpc } from "../utils/trpc.js";
export interface UseFunctionOptions {
  resourcePath: string;
}
export const useFunction = ({ resourcePath }: UseFunctionOptions) => {
  const [response, setResponse] = useState("");

  const invoke = trpc["function.invoke"].useMutation({
    onSuccess: (data) => {
      setResponse(JSON.stringify(data, undefined, 2));
    },
  });

  const isLoading = useMemo(() => {
    return invoke.isLoading;
  }, [invoke.isLoading]);

  const isError = useMemo(() => {
    return invoke.error;
  }, [invoke.error]);

  const invokeFunction = (payload: string) => {
    invoke.mutate({ resourcePath, message: payload });
  };

  return {
    isLoading,
    isError,
    response,
    invokeFunction,
  };
};
