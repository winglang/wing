import { useEffect, useState } from "react";

import { trpc } from "../utils/trpc.js";

export interface UseCounterOptions {
  resourcePath: string;
}
export const useCounter = ({ resourcePath }: UseCounterOptions) => {
  const incrementCounter = trpc["counter.inc"].useMutation();
  const decrementCounter = trpc["counter.dec"].useMutation();
  const counterValue = trpc["counter.peek"].useQuery({ resourcePath });
  const resetCounter = trpc["counter.reset"].useMutation();

  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    setCurrentValue(counterValue.data ?? 0);
  }, [counterValue.data]);

  const increment = () => {
    incrementCounter.mutate({ resourcePath, amount: 1 });
  };

  const decrement = () => {
    decrementCounter.mutate({ resourcePath, amount: 1 });
  };

  const reset = () => {
    resetCounter.mutate({ resourcePath });
  };

  return {
    increment,
    decrement,
    reset,
    currentValue,
  };
};
