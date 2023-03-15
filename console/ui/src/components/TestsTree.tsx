import {
  ArrowPathIcon,
  CheckCircleIcon,
  MinusCircleIcon,
  PlayIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import classNames from "classnames";
import { useEffect } from "react";

import { TreeMenu } from "../design-system/TreeMenu.js";
import { useTreeMenuItems } from "../utils/useTreeMenuItems.js";

export type TestStatus = "success" | "error" | "running" | "pending";

export interface TestItem {
  id: string;
  label: string;
  status: TestStatus;
  time?: number;
}
export interface TestsTreeProps {
  items: TestItem[];
  onItemClick?: (resourcePath: string) => void;
}

export const TestsTree = ({ items, onItemClick }: TestsTreeProps) => {
  const treeMenu = useTreeMenuItems();

  useEffect(() => {
    treeMenu.setItems(
      items.map((item) => {
        return {
          id: item.id,
          label: () => (
            <div className="flex items-center space-x-1">
              <span
                className={classNames(
                  "truncate text-slate-800 group-hover:text-slate-900",
                )}
              >
                {item.label}
              </span>
              {item.time && (
                <span className="text-slate-400 text-xs">{item.time}ms</span>
              )}
            </div>
          ),
          icon: (item.status === "success" && (
            <CheckCircleIcon className="w-4 h-4 text-green-500" />
          )) ||
            (item.status === "error" && (
              <XCircleIcon className="w-4 h-4 text-red-500" />
            )) ||
            (item.status === "running" && (
              <ArrowPathIcon className="w-4 h-4 text-slate-500 animate-spin" />
            )) || <MinusCircleIcon className="w-4 h-4 text-slate-500" />,
          secondaryLabel: (
            <div
              className={classNames(
                "pr-2 flex items-center group-hover:visible",
                item.status !== "running" && "invisible",
              )}
            >
              <button className="p-0.5 hover:bg-slate-200 rounded">
                <PlayIcon className="w-4 h-4 text-slate-500" />
              </button>
            </div>
          ),
        };
      }),
    );
  }, [items]);

  return (
    <TreeMenu
      items={treeMenu.items}
      selectedItemId={treeMenu.currentItemId}
      onItemClick={(item) => onItemClick?.(item.id)}
      openMenuItemIds={treeMenu.openItemIds}
      hideToolbar
      hideChevrons
      dataTestId={"test-tree-menu"}
    />
  );
};
