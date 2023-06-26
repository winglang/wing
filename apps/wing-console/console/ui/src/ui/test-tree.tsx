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
import classNames from "classnames";

import { TestItem } from "../shared/test-item.js";
export interface TestTreeProps {
  testList: TestItem[];
  handleRunAllTests: () => void;
  handleRunTest: (testPath: string) => void;
}
export const TestTree = ({
  testList,
  handleRunTest,
  handleRunAllTests,
}: TestTreeProps) => {
  const { theme } = useTheme();

  return (
    <div className="w-full h-full flex flex-col" data-testid="test-tree-menu">
      <Toolbar title="Tests">
        <ToolbarButton
          onClick={() => handleRunAllTests()}
          title="Run All Tests"
          disabled={testList.length === 0}
        >
          <PlayAllIcon className="w-4 h-4" />
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
              {testList.length === 0 && (
                <div
                  className={classNames(
                    theme.text2,
                    "text-2xs px-3 py-2 font-mono",
                  )}
                >
                  No Tests
                </div>
              )}
              <TreeView>
                {testList.map((test) => (
                  <TreeItem
                    key={test.id}
                    itemId={test.id}
                    label={
                      <div className="flex items-center gap-1">
                        <span className="truncate">{test.label}</span>
                        {test.time && (
                          <span className={classNames(theme.text2, "text-xs")}>
                            {test.time}ms
                          </span>
                        )}
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
                        {test.status === "pending" && (
                          <MinusCircleIcon
                            className={classNames(theme.text2, "w-4 h-4")}
                          />
                        )}
                      </>
                    }
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
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
