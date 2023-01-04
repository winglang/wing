import { CubeIcon, CubeTransparentIcon } from "@heroicons/react/24/outline";
export interface EmptyConstructViewProps {
  resourceType: string;
  resourcePath: string;
}
export const EmptyConstructView = ({
  resourceType,
  resourcePath,
}: EmptyConstructViewProps) => {
  return (
    <div className="text-center mt-8">
      <div className="flex justify-center">
        <div className="relative text-slate-500">
          <div className="opacity-40">
            <CubeIcon className="h-12 w-12" />
          </div>
          <CubeTransparentIcon className="absolute inset-0 opacity-70 h-12 w-12" />
        </div>
      </div>

      <h3 className="mt-2 text-sm font-medium text-slate-900">No Resources</h3>
      <p className="mt-1 text-sm text-slate-500">
        This Construct has no resources.
      </p>
    </div>
  );
};
