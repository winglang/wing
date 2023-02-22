import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";

import { Button } from "../../design-system/Button.js";
import { trpc } from "../../utils/trpc.js";

export interface CounterViewProps {
  resourcePath: string;
}

export const CounterView = ({ resourcePath }: CounterViewProps) => {
  const incrementCounter = trpc["counter.inc"].useMutation();
  const decreaseCounter = trpc["counter.dec"].useMutation();
  const counterValue = trpc["counter.peek"].useQuery({ resourcePath });

  return (
    <div className="px-4 py-1.5 flex flex-col gap-y-1 gap-x-4 bg-slate-100">
      <div className="flex flex-row">
        <div className="text-slate-500 min-w-[100px]">Counter value</div>
        <div className="text-slate-700 ml-2.5 max-w-full flex space-x-2 min-w-0 text-right">
          <span className="text-right truncate min-w-[25px]">
            {counterValue.data}
          </span>
          <div className="flex space-x-1">
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
          </div>
        </div>
      </div>
    </div>
  );
};
