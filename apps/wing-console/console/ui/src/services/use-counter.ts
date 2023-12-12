import { useCallback, useEffect, useState } from "react";

import { trpc } from "./trpc.js";

export interface UseCounterOptions {
  resourcePath: string;
}

export const useCounter = ({ resourcePath }: UseCounterOptions) => {
  const incrementCounter = trpc["counter.inc"].useMutation();
  const decrementCounter = trpc["counter.dec"].useMutation();
  const counterValue = trpc["counter.peek"].useQuery({ resourcePath });
  const resetCounter = trpc["counter.set"].useMutation();

  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    setCurrentValue(counterValue.data ?? 0);
  }, [counterValue.data]);

  const increment = useCallback(() => {
    incrementCounter.mutate({ resourcePath, amount: 1 });
  }, [incrementCounter, resourcePath]);

  const decrement = useCallback(() => {
    decrementCounter.mutate({ resourcePath, amount: 1 });
  }, [decrementCounter, resourcePath]);

  const reset = useCallback(() => {
    resetCounter.mutate({ resourcePath, value: 0 });
  }, [resetCounter, resourcePath]);

  return {
    increment,
    decrement,
    reset,
    currentValue,
  };
};
