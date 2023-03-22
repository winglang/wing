import {
  ArrowPathIcon,
  CheckCircleIcon,
  MinusCircleIcon,
  PlayIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import classNames from "classnames";
import { useEffect } from "react";

import { Button } from "../design-system/Button.js";
import { TreeMenu } from "../design-system/TreeMenu.js";
import { useTreeMenuItems } from "../utils/useTreeMenuItems.js";

export type TestStatus = "success" | "error" | "running" | "pending";

export interface TestItem {
  id: string;
  label: string;
  status: TestStatus;
  time?: number;
  onRunAll?: () => void;
  runAllDisabled?: boolean;
}
export interface TestsTreeProps {
  items: TestItem[];
  onItemClick?: (resourcePath: string) => void;
  onRunAll?: () => void;
  runAllDisabled?: boolean;
}

export const TestsTree = ({
  items,
  onRunAll,
  runAllDisabled,
  onItemClick,
}: TestsTreeProps) => {
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
                "pr-2 flex items-center group-hover:visible invisible",
              )}
            >
              <button
                className="p-0.5 hover:bg-slate-200 rounded"
                onClick={() => {
                  onItemClick?.(item.id);
                }}
              >
                <PlayIcon className="w-4 h-4 text-slate-500" />
              </button>
            </div>
          ),
        };
      }),
    );
  }, [items]);

  const toolbarActions = (
    <div>
      <button
        className="p-0.5 hover:bg-slate-200 rounded relative h-5 w-5 text-slate-600 hover:text-slate-700"
        onClick={onRunAll}
        title="Run all tests"
        disabled={runAllDisabled}
      >
        <PlayIcon className="w-4 h-4 -ml-[1.5px]" aria-hidden="true" />

        <div
          className={classNames(
            "absolute transform top-1/2 -translate-y-1/2 ml-[1.5px]",
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985"
            ></path>
          </svg>
        </div>
      </button>
    </div>
  );

  return (
    <TreeMenu
      title="Tests"
      items={treeMenu.items}
      selectedItemId={treeMenu.currentItemId}
      openMenuItemIds={treeMenu.openItemIds}
      hideChevrons
      dataTestId={"test-tree-menu"}
      toolbarActions={toolbarActions}
    />
  );
};
