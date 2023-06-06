import { useCallback, useEffect, useMemo, useState } from "react";

import { trpc } from "./trpc.js";

export interface UseQueueOptions {
  resourcePath: string;
}

export const useQueue = ({ resourcePath }: UseQueueOptions) => {
  const push = trpc["queue.push"].useMutation();
  const approxSize = trpc["queue.approxSize"].useQuery({ resourcePath });
  const purge = trpc["queue.purge"].useMutation();

  const [approxSizeValue, setApproxSizeValue] = useState(0);

  useEffect(() => {
    setApproxSizeValue(approxSize.data ?? 0);
  }, [approxSize.data]);

  const pushMessage = (message: string) => {
    push.mutate({
      resourcePath,
      message: message,
    });
  };

  const purgeQueue = useCallback(
    (onSuccess: () => void) => {
      purge.mutateAsync({ resourcePath }).then(onSuccess);
    },
    [purge, resourcePath],
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
