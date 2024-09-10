import type { ConsoleEnvironmentId } from "@wingconsole/server";
import { useMemo, useState } from "react";

import { trpc } from "../../../trpc.js";

export interface UseFunctionOptions {
  environmentId: ConsoleEnvironmentId;
  resourcePath: string;
}

export const useFunction = ({
  environmentId,
  resourcePath,
}: UseFunctionOptions) => {
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
    invoke.mutate({ environmentId, resourcePath, message: payload });
  };

  return {
    isLoading,
    isError,
    response,
    invokeFunction,
  };
};
