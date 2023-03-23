import classNames from "classnames";
import { PropsWithChildren } from "react";

export interface ToolbarProps {
  title: string;
}

export const Toolbar = ({
  title,
  children,
}: PropsWithChildren<ToolbarProps>) => {
  return (
    <div
      className={classNames(
        "flex-shrink-0 flex items-center justify-between gap-2 px-2",
      )}
    >
      <div className="flex items-center min-w-0">
        <span className="text-slate-600 text-sm truncate uppercase">
          {title}
        </span>
      </div>

      <div className="flex items-center gap-1 h-9">{children}</div>
    </div>
  );
};
