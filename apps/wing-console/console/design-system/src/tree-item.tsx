import { ChevronRightIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { PropsWithChildren, ReactNode, KeyboardEvent } from "react";

import { TreeItem as HeadlessTreeItem } from "./headless/tree-item.js";
import { useTheme } from "./theme-provider.js";

export interface TreeItemProps {
  itemId: string;
  label: ReactNode | (() => JSX.Element);
  secondaryLabel?: ReactNode | (() => JSX.Element);
  icon?: ReactNode;
  title?: string;
  onKeyDown?: (event: KeyboardEvent<HTMLElement>) => void;
}

export const TreeItem = ({
  label,
  secondaryLabel,
  title,
  icon,
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
            "cursor-pointer",
            "border border-transparent",
            item.focused && "group-focus:border-sky-500",
            item.selected && theme.bg2,
            !item.selected && theme.bg2Hover,
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
            title={`Toggle ${label} expanded`}
          >
            <ChevronRightIcon
              className={classNames("w-4 h-4", "transition-transform", {
                "rotate-90": item.expanded,
              })}
            />
          </div>

          {icon && <div className="shrink-0">{icon}</div>}

          <div className="grow flex items-center gap-1 justify-around min-w-0">
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
};
