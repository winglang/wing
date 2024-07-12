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
  SpinnerLoader,
  Toolbar,
  ToolbarButton,
  TreeItem,
  TreeView,
  useTheme,
} from "@wingconsole/design-system";
import type { TestItem, TestRunnerStatus } from "@wingconsole/server";
import classNames from "classnames";
import { memo, useMemo } from "react";

const TestTreeItem = memo(
  ({
    test,
    handleRunTest,
  }: {
    test: TestItem;
    handleRunTest: (testPath: string) => void;
  }) => {
    const { theme } = useTheme();

    return (
      <TreeItem
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
          <div className={classNames("hidden group-hover:flex items-center ")}>
            <ToolbarButton
              title={`Run ${test.label}`}
              onClick={() => handleRunTest(test.id)}
              disabled={test.status === "running"}
            >
              <PlayIcon className="size-4" />
            </ToolbarButton>
          </div>
        }
        title={test.label}
        icon={
          <>
            {test.status === "success" && (
              <CheckCircleIcon className="size-4 text-green-500" />
            )}
            {test.status === "error" && (
              <XCircleIcon className="size-4 text-red-500" />
            )}
            {test.status === "running" && (
              <ArrowPathIcon
                className={classNames(theme.text2, "size-4 animate-spin")}
              />
            )}
            {test.status === "idle" && (
              <MinusCircleIcon className={classNames(theme.text2, "size-4")} />
            )}
          </>
        }
        onKeyDown={(event) => {
          if (event.key === "Enter" && test.status !== "running") {
            handleRunTest(test.id);
          }
        }}
      />
    );
  },
);

export interface TestTreeProps {
  status: TestRunnerStatus;
  testList: TestItem[];
  handleRunAllTests: () => void;
  handleRunTest: (testPath: string) => void;
  onSelectedItemsChange?: (ids: string[]) => void;
  selectedItemId?: string;
}

export const TestTree = ({
  status,
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
        <ToolbarButton
          onClick={handleRunAllTests}
          title="Run All Tests"
          disabled={testList.length === 0}
        >
          <PlayAllIcon className="size-4" />
        </ToolbarButton>
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
              {(status === "uninitialized" || testList.length === 0) && (
                <div
                  className={classNames(
                    theme.text2,
                    "flex flex-col text-xs px-3 py-2 items-center",
                  )}
                >
                  {status === "uninitialized" && (
                    <div className="flex items-center gap-2">
                      <SpinnerLoader size="xs" />
                      <div>Loading... </div>
                    </div>
                  )}
                  {status !== "uninitialized" && (
                    <>
                      <div>There are no tests.</div>
                      <div>
                        <span>Learn how to add tests </span>
                        <a
                          className="text-sky-500 hover:text-sky-600"
                          href="https://www.winglang.io/docs/concepts/tests"
                          target="_blank"
                          rel="noreferrer"
                        >
                          here.
                        </a>
                      </div>
                    </>
                  )}
                </div>
              )}
              {status !== "uninitialized" && testList.length > 0 && (
                <TreeView
                  selectedItems={selectedItems}
                  onSelectedItemsChange={onSelectedItemsChange}
                >
                  {testList.map((test) => (
                    <TestTreeItem
                      key={test.id}
                      test={test}
                      handleRunTest={handleRunTest}
                    />
                  ))}
                </TreeView>
              )}
            </div>
          </ScrollableArea>
        </div>
      </div>
    </div>
  );
};
