import { ChevronRightIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import type { PropsWithChildren, ReactNode, KeyboardEvent } from "react";
import { memo } from "react";

import { TreeItem as HeadlessTreeItem } from "./headless/tree-item.js";
import { useTheme } from "./theme-provider.js";

export interface TreeItemProps {
  itemId: string;
  label: ReactNode | (() => ReactNode);
  secondaryLabel?: ReactNode | (() => ReactNode);
  icon?: ReactNode;
  title?: string;
  selectable?: boolean;
  onKeyDown?: (event: KeyboardEvent<HTMLElement>) => void;
}

export const TreeItem = memo(
  ({
    label,
    secondaryLabel,
    title,
    icon,
    selectable = true,
    children,
    ...props
  }: PropsWithChildren<TreeItemProps>) => {
    const { theme } = useTheme();

    return (
      <HeadlessTreeItem
        {...props}
        className="outline-none group"
        content={(item) => (
          <div
            className={classNames(
              "flex items-center gap-1.5",
              "px-2 py-0.5",
              "select-none",
              "border border-transparent",
              selectable && [
                "cursor-pointer",
                item.focused && "group-focus:border-sky-500",
                item.selected && theme.bg2,
                !item.selected && theme.bg2Hover,
              ],
            )}
            title={title}
          >
            <div
              className="shrink-0"
              style={{
                paddingLeft: `${item.indentation * 1}rem`,
              }}
            />

            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
            <div
              className={classNames(
                "shrink-0",
                theme.bg2Hover,
                "cursor-pointer",
                "-ml-2.5",
                "px-0.5 py-0.5",
                {
                  invisible: !item.canBeExpanded,
                },
              )}
              onClick={(event) => {
                // Avoid triggering parent handlers.
                event.stopPropagation();
                item.toggleExpanded();
              }}
              title={`Toggle ${
                typeof label === "function" ? label() : label
              } expanded`}
            >
              <ChevronRightIcon
                className={classNames("w-4 h-4", "transition-transform", {
                  "rotate-90": item.expanded,
                })}
              />
            </div>

            {icon && <div className="shrink-0">{icon}</div>}

            <div className="grow flex items-center gap-1.5 justify-around min-w-0">
              <span className={classNames(theme.text1, "grow truncate")}>
                {typeof label === "function" ? label() : label}
              </span>

              {typeof secondaryLabel === "function"
                ? secondaryLabel()
                : secondaryLabel}
            </div>
          </div>
        )}
      >
        {children}
      </HeadlessTreeItem>
    );
  },
);
