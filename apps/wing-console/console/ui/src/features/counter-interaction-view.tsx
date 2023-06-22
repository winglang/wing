import { useCounter } from "../services/use-counter.js";
import { CounterInteraction } from "../ui/counter-interaction.js";

export interface CounterInteractionViewProps {
  resourcePath: string;
}

export const CounterInteractionView = ({
  resourcePath,
}: CounterInteractionViewProps) => {
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
};
