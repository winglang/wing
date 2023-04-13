import { ChevronRightIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { PropsWithChildren, ReactNode, KeyboardEvent } from "react";

import { TreeItem as HeadlessTreeItem } from "./headless/tree-item.js";

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
            {
              "group-focus:border-sky-500": item.focused,
              "bg-slate-200": item.selected,
              "hover:bg-slate-100": !item.selected,
            },
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
              "cursor-pointer hover:bg-slate-200",
              "-ml-2.5",
              "px-0.5 py-0.5",
              {
                invisible: !item.canBeExpanded,
              },
            )}
            onClick={(event) => {
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
            <span className="grow text-slate-800 truncate">
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
