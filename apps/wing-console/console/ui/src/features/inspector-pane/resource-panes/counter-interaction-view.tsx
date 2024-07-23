import { memo } from "react";

import { CounterInteraction } from "./counter-interaction.js";
import { useCounter } from "./use-counter.js";

export interface CounterInteractionViewProps {
  resourcePath: string;
}

export const CounterInteractionView = memo(
  ({ resourcePath }: CounterInteractionViewProps) => {
    const { increment, decrement, reset, currentValue } = useCounter({
      resourcePath,
    });

    return (
      <CounterInteraction
        handleIncrement={increment}
        handleDecrement={decrement}
        handleReset={reset}
        currentValue={currentValue}
      />
    );
  },
);
