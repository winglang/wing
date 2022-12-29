import { trpc } from "../utils/trpc.js";

export interface DefaultExploreViewProps {
  resourcePath: string;
}

export const DefaultExploreView = ({
  resourcePath,
}: DefaultExploreViewProps) => {
  const incrementCounter = trpc.useMutation("counter.inc");
  const counterValue = trpc.useQuery(["counter.get", { resourcePath }]);

  return (
    <div className="h-full w-full flex flex-col gap-4 p-4">
      <div className="space-y-4 text-center mx-auto">
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">
            Default View
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900 space-x-2">
            <span></span>
          </dd>
        </div>
      </div>
    </div>
  );
};
