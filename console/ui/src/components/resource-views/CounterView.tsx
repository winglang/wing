import {
  ArrowPathIcon,
  MinusSmallIcon,
  PlusSmallIcon,
} from "@heroicons/react/24/outline";

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

  return (
    <div className="flex-col bg-slate-50">
      <div className="flex flex-row items-center gap-x-1">
        <div className="text-slate-500 min-w-[100px]">Counter value</div>
        <div className="text-slate-600 w-full flex space-x-1 min-w-0">
          <span className="text-left truncate min-w-[25px]">
            {counterValue.data}
          </span>
          <div className="flex gap-x-1 grow">
            <Button
              small
              icon={MinusSmallIcon}
              className="px-0.5"
              onClick={() =>
                decreaseCounter.mutate({ amount: 1, resourcePath })
              }
            />
            <Button
              small
              icon={PlusSmallIcon}
              className="px-0.5"
              onClick={() =>
                incrementCounter.mutate({ amount: 1, resourcePath })
              }
            />

            <div className="flex grow justify-end">
              <Button
                small
                icon={ArrowPathIcon}
                title="Reset"
                className="px-0.5"
                onClick={() => resetCounter.mutate({ resourcePath })}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
