import {
  ArrowPathIcon,
  CheckCircleIcon,
  MinusCircleIcon,
  PlayIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import {
  PlayAllIcon,
  ScrollableArea,
  Toolbar,
  ToolbarButton,
  TreeItem,
  TreeView,
  useTheme,
} from "@wingconsole/design-system";
import type { TestItem } from "@wingconsole/server";
import classNames from "classnames";
import { useMemo } from "react";

import { NoTests } from "./no-tests.js";

export interface TestTreeProps {
  testList: TestItem[];
  handleRunAllTests: () => void;
  handleRunTest: (testPath: string) => void;
  onSelectedItemsChange?: (ids: string[]) => void;
  selectedItemId?: string;
}

export const TestTree = ({
  testList,
  handleRunTest,
  handleRunAllTests,
  onSelectedItemsChange,
  selectedItemId,
}: TestTreeProps) => {
  const { theme } = useTheme();

  const selectedItems = useMemo(
    () => (selectedItemId ? [selectedItemId] : undefined),
    [selectedItemId],
  );

  return (
    <div
      className={classNames("w-full h-full flex flex-col", theme.bg3)}
      data-testid="test-tree-menu"
    >
      <Toolbar title="Tests">
        {testList.length > 0 && (
          <ToolbarButton
            onClick={handleRunAllTests}
            title="Run All Tests"
            disabled={testList.length === 0}
          >
            <PlayAllIcon className="w-4 h-4" />
          </ToolbarButton>
        )}
      </Toolbar>

      <div className="relative grow">
        <div className="absolute inset-0">
          <ScrollableArea
            overflowY
            className={classNames(
              "h-full w-full text-sm flex flex-col gap-1",
              theme.bg3,
              theme.text2,
            )}
          >
            <div className="flex flex-col">
              {testList.length === 0 && <NoTests />}
              <TreeView
                selectedItems={selectedItems}
                onSelectedItemsChange={onSelectedItemsChange}
              >
                {testList.map((test) => (
                  <TreeItem
                    key={test.id}
                    itemId={test.id}
                    label={
                      <div className="flex items-center gap-1">
                        <span className="truncate">{test.label}</span>

                        <span className={classNames(theme.text2, "text-xs")}>
                          {test.time && test.time > 0 ? `${test.time}ms` : ""}
                        </span>
                      </div>
                    }
                    secondaryLabel={
                      <div
                        className={classNames(
                          "hidden group-hover:flex items-center ",
                        )}
                      >
                        <ToolbarButton
                          title={`Run ${test.label}`}
                          onClick={() => handleRunTest(test.id)}
                          disabled={test.status === "running"}
                        >
                          <PlayIcon className="w-4 h-4" />
                        </ToolbarButton>
                      </div>
                    }
                    title={test.label}
                    icon={
                      <>
                        {test.status === "success" && (
                          <CheckCircleIcon className="w-4 h-4 text-green-500" />
                        )}
                        {test.status === "error" && (
                          <XCircleIcon className="w-4 h-4 text-red-500" />
                        )}
                        {test.status === "running" && (
                          <ArrowPathIcon
                            className={classNames(
                              theme.text2,
                              "w-4 h-4 animate-spin",
                            )}
                          />
                        )}
                        {test.status === "idle" && (
                          <MinusCircleIcon
                            className={classNames(theme.text2, "w-4 h-4")}
                          />
                        )}
                      </>
                    }
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && test.status !== "running") {
                        handleRunTest(test.id);
                      }
                    }}
                  />
                ))}
              </TreeView>
            </div>
          </ScrollableArea>
        </div>
      </div>
    </div>
  );
};
