import { PlusIcon } from "@heroicons/react/20/solid";

import { Button } from "../../design-system/Button.js";
import { trpc } from "../../utils/trpc.js";

export interface CounterViewProps {
  resourcePath: string;
}

export const CounterView = ({ resourcePath }: CounterViewProps) => {
  const incrementCounter = trpc["counter.inc"].useMutation();
  const counterValue = trpc["counter.peek"].useQuery({ resourcePath });

  return (
    <div className="h-full w-full flex flex-col gap-4 p-4">
      <div className="space-y-4 text-center mx-auto">
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">
            Counter value
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900 space-x-2">
            <span>{counterValue.data}</span>
          </dd>
        </div>

        <Button
          icon={PlusIcon}
          label="Increment"
          onClick={() => incrementCounter.mutate({ amount: 1, resourcePath })}
        />
      </div>
    </div>
  );
};
