import {
  ArrowPathIcon,
  MinusSmallIcon,
  PlusSmallIcon,
} from "@heroicons/react/24/outline";
import { useId } from "react";

import { Button } from "../../design-system/Button.js";
import { trpc } from "../../utils/trpc.js";

export interface CounterViewProps {
  resourcePath: string;
}

export const CounterView = ({ resourcePath }: CounterViewProps) => {
  const incrementCounter = trpc["counter.inc"].useMutation();
  const decreaseCounter = trpc["counter.dec"].useMutation();
  const counterValue = trpc["counter.peek"].useQuery({ resourcePath });
  const resetCounter = trpc["counter.reset"].useMutation();

  const actualValueId = useId();
  const resetValueId = useId();

  return (
    <div className="flex flex-col gap-1 bg-slate-50">
      <div className="flex flex-row items-center">
        <label htmlFor={actualValueId} className="text-slate-500 min-w-[100px]">
          Actual value
        </label>

        <div className="text-slate-600 w-full flex gap-1 min-w-0">
          <Button
            small
            icon={MinusSmallIcon}
            className="px-0.5"
            onClick={() => decreaseCounter.mutate({ amount: 1, resourcePath })}
          />
          <input
            id={actualValueId}
            className="w-full bg-white border border-slate-300 opacity-70 ease-in-out focus:border-sky-500 focus:ring-2 focus:ring-sky-500/50 items-center outline-none px-2 select-text text-slate-600 text-sm transition truncate rounded"
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
          className="text-slate-500 min-w-[100px] invisible"
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
