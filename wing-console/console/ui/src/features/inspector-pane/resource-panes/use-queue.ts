import { useCallback, useEffect, useMemo, useState } from "react";

import { trpc } from "../../../trpc.js";
import { useConsoleEnvironment } from "../../console-environment-context/console-environment-context.js";

export interface UseQueueOptions {
  resourcePath: string;
}

export const useQueue = ({ resourcePath }: UseQueueOptions) => {
  const { consoleEnvironment: environmentId } = useConsoleEnvironment();
  const push = trpc["queue.push"].useMutation();
  const approxSize = trpc["queue.approxSize"].useQuery({
    environmentId,
    resourcePath,
  });
  const purge = trpc["queue.purge"].useMutation();

  const [approxSizeValue, setApproxSizeValue] = useState(0);

  useEffect(() => {
    setApproxSizeValue(approxSize.data ?? 0);
  }, [approxSize.data]);

  const pushMessage = useCallback(
    (message: string) => {
      push.mutate({
        environmentId,
        resourcePath,
        message: message,
      });
    },
    [environmentId, push, resourcePath],
  );

  const purgeQueue = useCallback(
    (onSuccess: () => void) => {
      purge.mutateAsync({ environmentId, resourcePath }).then(onSuccess);
    },
    [environmentId, purge, resourcePath],
  );

  const isLoading = useMemo(() => {
    return push.isLoading;
  }, [push.isLoading]);

  const isError = useMemo(() => {
    return push.isError;
  }, [push.isError]);

  return {
    isError,
    isLoading,
    pushMessage,
    purgeQueue,
    approxSize: approxSizeValue,
  };
};
