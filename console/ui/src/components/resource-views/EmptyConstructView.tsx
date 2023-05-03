import { CubeIcon, CubeTransparentIcon } from "@heroicons/react/24/outline";
import { useTheme } from "@wingconsole/design-system";
import classNames from "classnames";
export interface EmptyConstructViewProps {
  resourceType: string;
  resourcePath: string;
}
export const EmptyConstructView = ({
  resourceType,
  resourcePath,
}: EmptyConstructViewProps) => {
  const { theme } = useTheme();

  return (
    <div className="text-center px-4">
      <div className="flex justify-center">
        <div className={classNames(theme.text2, "relative")}>
          <div className="opacity-40">
            <CubeIcon className="h-12 w-12" />
          </div>
          <CubeTransparentIcon className="absolute inset-0 opacity-70 h-12 w-12" />
        </div>
      </div>

      <h3 className={classNames(theme.text1, "mt-2 text-sm font-medium")}>
        No Resources
      </h3>
      <p className={classNames(theme.text2, "mt-1 text-sm")}>
        This Construct has no resources.
      </p>
    </div>
  );
};
