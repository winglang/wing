import classNames from "classnames";
import {
  PropsWithChildren,
  forwardRef,
  memo,
  useEffect,
  useState,
} from "react";

import { useTheme } from "./theme-provider.js";

export interface ScrollableAreaProps extends PropsWithChildren {
  className?: string;
  scrollbarSize?: "xs" | "sm";
  overflowX?: boolean;
  overflowY?: boolean;
  dataTestid?: string;
  onScrolledToBottomChange?: (scrolledToBottom: boolean) => void;
}

export const ScrollableArea = memo(
  forwardRef<HTMLDivElement, ScrollableAreaProps>(
    (
      {
        className,
        scrollbarSize = "sm",
        overflowX,
        overflowY,
        dataTestid,
        onScrolledToBottomChange,
        children,
      },
      ref,
    ) => {
      const { theme } = useTheme();
      const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
      useEffect(() => {
        onScrolledToBottomChange?.(isScrolledToBottom);
      }, [isScrolledToBottom, onScrolledToBottomChange]);
      return (
        <div
          ref={ref}
          data-testid={dataTestid}
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
          onScroll={(event) => {
            const element = event.currentTarget;
            setIsScrolledToBottom(
              element.scrollTop >=
                element.scrollHeight - element.clientHeight - 1,
            );
          }}
        >
          {children}
        </div>
      );
    },
  ),
);
