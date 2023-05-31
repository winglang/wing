import { useMemo } from "react";

import { trpc } from "../utils/trpc.js";

export interface UseQueueOptions {
  resourcePath: string;
}

export const useQueue = ({ resourcePath }: UseQueueOptions) => {
  const push = trpc["queue.push"].useMutation();

  const pushMessage = (message: string) => {
    push.mutate({
      resourcePath,
      message: message,
    });
  };

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
  };
};
