import classNames from "classnames";
import { PropsWithChildren, forwardRef } from "react";

import { useTheme } from "./theme-provider.js";

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
    const { theme } = useTheme();
    return (
      <div
        ref={ref}
        className={classNames(
          "z-10 absolute inset-0",
          theme.scrollbar,
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
