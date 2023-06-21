import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";
import { useTheme, Button } from "@wingconsole/design-system";
import classNames from "classnames";
import { useId } from "react";

export interface CounterInteractionProps {
  handleIncrement: () => void;
  handleDecrement: () => void;
  handleReset: () => void;
  currentValue: number;
}
export const CounterInteraction = ({
  handleDecrement,
  handleIncrement,
  handleReset,
  currentValue,
}: CounterInteractionProps) => {
  const { theme } = useTheme();

  const actualValueElementId = useId();
  const resetValueElementId = useId();

  return (
    <div className={classNames("flex flex-col gap-1", theme.bg3, theme.text2)}>
      <div className="flex flex-row items-center">
        <label
          htmlFor={actualValueElementId}
          className={classNames(" min-w-[100px]", theme.text2)}
        >
          Actual value
        </label>

        <div className={classNames("w-full flex gap-1 min-w-0")}>
          <Button
            small
            icon={MinusSmallIcon}
            className="px-0.5"
            onClick={() => handleDecrement()}
          />
          <input
            id={actualValueElementId}
            className={classNames(
              "w-full border opacity-70 ease-in-out items-center px-2 select-text text-sm transition truncate rounded",
              theme.bgInput,
              theme.borderInput,
              theme.textInput,
              theme.focusInput,
            )}
            value={currentValue}
            readOnly
          />
          <Button
            small
            icon={PlusSmallIcon}
            className="px-0.5"
            onClick={() => handleIncrement()}
          />
        </div>
      </div>

      <div className="flex flex-row items-center">
        <label
          htmlFor={resetValueElementId}
          className={classNames("min-w-[100px] invisible", theme.text2)}
        >
          Reset value
        </label>
        <Button
          id={resetValueElementId}
          title="Reset value"
          label="Reset value"
          onClick={() => handleReset()}
        />
      </div>
    </div>
  );
};
