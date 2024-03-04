import classNames from "classnames";
import type { PropsWithChildren } from "react";

import { useTheme } from "./theme-provider.js";

export interface ToolbarProps {
  title?: string;
}

export const Toolbar = ({
  title,
  children,
}: PropsWithChildren<ToolbarProps>) => {
  const { theme } = useTheme();
  return (
    <div className="flex-shrink-0 flex items-center justify-between gap-2 px-2">
      {title && (
        <div className="flex items-center min-w-0">
          <span
            className={classNames("text-sm truncate uppercase", theme.text1)}
          >
            {title}
          </span>
        </div>
      )}

      <div className="flex items-center gap-1 h-9">{children}</div>
    </div>
  );
};
