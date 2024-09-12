import { useCallback, useEffect, useState } from "react";

import { trpc } from "../../../trpc.js";
import { useConsoleEnvironment } from "../../console-environment-context/console-environment-context.js";

export interface UseCounterOptions {
  resourcePath: string;
}

export const useCounter = ({ resourcePath }: UseCounterOptions) => {
  const { consoleEnvironment: environmentId } = useConsoleEnvironment();
  const incrementCounter = trpc["counter.inc"].useMutation();
  const decrementCounter = trpc["counter.dec"].useMutation();
  const counterValue = trpc["counter.peek"].useQuery({
    environmentId,
    resourcePath,
  });
  const resetCounter = trpc["counter.set"].useMutation();

  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    setCurrentValue(counterValue.data ?? 0);
  }, [counterValue.data]);

  const increment = useCallback(() => {
    incrementCounter.mutate({
      environmentId,
      resourcePath,
      amount: 1,
    });
  }, [environmentId, incrementCounter, resourcePath]);

  const decrement = useCallback(() => {
    decrementCounter.mutate({
      environmentId,
      resourcePath,
      amount: 1,
    });
  }, [decrementCounter, environmentId, resourcePath]);

  const reset = useCallback(() => {
    resetCounter.mutate({
      environmentId,
      resourcePath,
      value: 0,
    });
  }, [environmentId, resetCounter, resourcePath]);

  return {
    increment,
    decrement,
    reset,
    currentValue,
  };
};
