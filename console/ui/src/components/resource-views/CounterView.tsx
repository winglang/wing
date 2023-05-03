import {
  ArrowPathIcon,
  MinusSmallIcon,
  PlusSmallIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "@wingconsole/design-system";
import classNames from "classnames";
import { useId } from "react";

import { Button } from "../../design-system/Button.js";
import { trpc } from "../../utils/trpc.js";

export interface CounterViewProps {
  resourcePath: string;
}

export const CounterView = ({ resourcePath }: CounterViewProps) => {
  const { theme } = useTheme();

  const incrementCounter = trpc["counter.inc"].useMutation();
  const decreaseCounter = trpc["counter.dec"].useMutation();
  const counterValue = trpc["counter.peek"].useQuery({ resourcePath });
  const resetCounter = trpc["counter.reset"].useMutation();

  const actualValueId = useId();
  const resetValueId = useId();

  return (
    <div className={classNames("flex flex-col gap-1", theme.bg3, theme.text2)}>
      <div className="flex flex-row items-center">
        <label
          htmlFor={actualValueId}
          className={classNames(" min-w-[100px]", theme.text2)}
        >
          Actual value
        </label>

        <div className={classNames("w-full flex gap-1 min-w-0")}>
          <Button
            small
            icon={MinusSmallIcon}
            className="px-0.5"
            onClick={() => decreaseCounter.mutate({ amount: 1, resourcePath })}
          />
          <input
            id={actualValueId}
            className={classNames(
              "w-full border opacity-70 ease-in-out items-center px-2 select-text text-sm transition truncate rounded",
              theme.bgInput,
              theme.borderInput,
              theme.textInput,
              theme.focusInput,
            )}
            value={counterValue.data}
            readOnly
          />
          <Button
            small
            icon={PlusSmallIcon}
            className="px-0.5"
            onClick={() => incrementCounter.mutate({ amount: 1, resourcePath })}
          />

          {/* <div className="flex grow justify-end">
              <Button
                small
                icon={ArrowPathIcon}
                title="Reset"
                className="px-0.5"
                onClick={() => resetCounter.mutate({ resourcePath })}
              />
            </div> */}
        </div>
      </div>

      <div className="flex flex-row items-center">
        <label
          htmlFor={resetValueId}
          className={classNames("min-w-[100px] invisible", theme.text2)}
        >
          Reset value
        </label>
        <Button
          id={resetValueId}
          title="Reset value"
          label="Reset value"
          onClick={() => resetCounter.mutate({ resourcePath })}
        />
      </div>
    </div>
  );
};
