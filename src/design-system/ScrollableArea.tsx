import classNames from "classnames";
import { PropsWithChildren, forwardRef } from "react";

export interface ScrollableAreaProps extends PropsWithChildren {
  className?: string;
  scrollbarSize?: "xs" | "sm";
  overflowX?: boolean;
  overflowY?: boolean;
}

export const ScrollableArea = forwardRef<HTMLDivElement, ScrollableAreaProps>(
  (
    { className, scrollbarSize = "sm", overflowX, overflowY, children },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={classNames(
          "z-10 absolute inset-0 scrollbar hover:scrollbar-bg-slate-500/10 hover:scrollbar-thumb-slate-700/30 scrollbar-thumb-hover-slate-700/40 scrollbar-thumb-active-slate-700/60 dark:hover:scrollbar-bg-slate-400/10 dark:hover:scrollbar-thumb-slate-400/30 dark:scrollbar-thumb-hover-slate-400/40 dark:scrollbar-thumb-active-slate-400/60 transition-colors ease-in-out duration-700",
          className,
          {
            "scrollbar-w-[3px] scrollbar-h-[3px]": scrollbarSize === "xs",
            "scrollbar-w-[0.625rem] scrollbar-h-[0.625rem]":
              scrollbarSize === "sm",
            "overflow-x-overlay": overflowX,
            "overflow-y-overlay": overflowY,
          },
        )}
      >
        {children}
      </div>
    );
  },
);
