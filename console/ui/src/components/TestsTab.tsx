import { PlayIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon, NoSymbolIcon } from "@heroicons/react/24/outline";
import type { inferRouterOutputs } from "@trpc/server";
import { LogEntry, LogLevel, Router } from "@wingconsole/server";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";

import { Button } from "../design-system/Button.js";
import { Input } from "../design-system/Input.js";
import { RightResizableWidget } from "../design-system/RightResizableWidget.js";
import { ScrollableArea } from "../design-system/ScrollableArea.js";
import { trpc } from "../utils/trpc.js";

import { ConsoleLogs, LoggerEntry } from "./ConsoleLogs.js";
import { TestItem, TestStatus, TestsTree } from "./TestsTree.js";

type RouterOutput = inferRouterOutputs<Router>;

interface Trace {
  type: string;
  data?: {
    message: string;
  };
}

const getLogEntry = (entry: {
  path?: string;
  message: string;
  level: LogLevel;
  timestamp?: number;
  logClassName?: string;
  labelClassName?: string;
}): LoggerEntry => {
  return {
    id: `${entry.path}_${entry.message}_${Date.now()}`,
    timestamp: entry.timestamp,
    level: entry.level,
    message: entry.message,
    source: "user",
    ctx: {
      sourcePath: entry.path,
    },
    logClassName: entry.logClassName,
    labelClassName: entry.labelClassName,
  };
};

const getTestName = (testPath: string) => {
  const test = testPath.split("/").pop() ?? testPath;
  return test.replace(/test: /g, "");
};

export const TestsTab = () => {
  const logsRef = useRef<HTMLDivElement>(null);

  const [searchText, setSearchText] = useState("");
  const [selectedItem, setSelectedItem] = useState<string | undefined>();
  const [testTree, setTestTree] = useState<TestItem[]>([]);
  const [testLogs, setTestLogs] = useState<LogEntry[]>([]);
  const [filteredTestLogs, setFilteredTestLogs] = useState<LogEntry[]>([]);

  const testListQuery = trpc["test.list"].useQuery();
  useEffect(() => {
    if (!testListQuery.data) {
      return;
    }
    setTestTree(
      testListQuery.data.map((resourcePath) => {
        return {
          id: resourcePath,
          label: getTestName(resourcePath),
          status: "pending",
        };
      }),
    );
    setTestLogs([]);
  }, [testListQuery.data]);

  const setTestStatus = (
    resourcePath: string,
    status: TestStatus,
    time?: number,
  ) => {
    setTestTree((testTree) => {
      return testTree.map((testItem) => {
        if (testItem.id === resourcePath) {
          return {
            ...testItem,
            status,
            time,
          };
        }
        return testItem;
      });
    });
  };

  const setAllTestStatus = (status: TestStatus, time?: number) => {
    setTestTree((testTree) => {
      return testTree.map((testItem) => {
        return {
          ...testItem,
          status,
          time,
        };

        return testItem;
      });
    });
  };

  const addLog = (log: LogEntry) => {
    setTestLogs((testLogs) => [...testLogs, log]);
  };

  const onRunTestsSuccess = (runOutput: RouterOutput["test.run"][]) => {
    for (const [index, output] of runOutput.entries()) {
      setTestStatus(
        output.path,
        output.error ? "error" : "success",
        output.time,
      );
      addLog(
        // Group title log
        getLogEntry({
          path: output.path,
          message: `Test: ${getTestName(output.path)}`,
          level: "info",
          logClassName: classNames(
            "border-none bg-white font-medium",
            index > 0 && "pt-3",
          ),
          labelClassName: "text-slate-500",
        }),
      );

      const messages = output.traces
        .filter((trace: Trace) => trace.type === "log" && trace.data?.message)
        .map((trace: Trace) => trace.data?.message);

      for (const message of messages) {
        if (message) {
          addLog(
            getLogEntry({
              message: message,
              level: "info",
              timestamp: Date.now(),
              logClassName: "border-none bg-white pl-4",
            }),
          );
        }
      }
      if (output.error) {
        addLog(
          getLogEntry({
            path: output.path,
            message: output.error,
            level: "info",
            timestamp: Date.now(),
            logClassName: "border-none pl-4 bg-white",
            labelClassName: "border-none bg-white text-red-500 bg-red-100",
          }),
        );
      }

      // Test summar log
      addLog(
        getLogEntry({
          path: output.path,
          message: `Test ${output.error ? "failed" : "succeeded"} (${
            output.time
          }ms)`,
          level: "info",
          logClassName: "border-none bg-white",
          labelClassName: classNames(
            output.error ? "text-red-500" : "text-green-700",
          ),
        }),
      );
    }

    const testPassed = runOutput.filter((output) => !output.error);
    const time = runOutput.reduce((value, output) => value + output.time, 0);

    // Tests group summary log
    const message = `Tests completed: ${testPassed.length}/${runOutput.length} passed. (${time}ms)`;
    addLog(
      getLogEntry({
        message,
        level: "info",
        logClassName: "border-none",
        labelClassName: "font-medium text-slate-600",
      }),
    );
  };

  const runAllTests = trpc["test.runAll"].useMutation({
    onMutate: () => {
      setAllTestStatus("running");
      addLog(
        getLogEntry({
          message: `Running ${testListQuery.data?.length} tests...`,
          level: "info",
          logClassName: "border-none",
          labelClassName: "font-medium text-slate-600",
        }),
      );
    },
    onSuccess: (data) => onRunTestsSuccess(data),
  });

  const runTest = trpc["test.run"].useMutation({
    onMutate: (data) => {
      setTestStatus(data.resourcePath, "running");
    },
    onSuccess: (data) => onRunTestsSuccess([data]),
  });

  useEffect(() => {
    if (!searchText) {
      setFilteredTestLogs(testLogs);
      return;
    }

    const newFilteredTestLogs = testLogs.filter((log) => {
      return (
        log.message.toLowerCase().includes(searchText.toLowerCase()) ||
        log.ctx?.sourcePath?.toLowerCase().includes(searchText.toLowerCase())
      );
    });
    setFilteredTestLogs(newFilteredTestLogs);
  }, [searchText, testLogs]);

  useEffect(() => {
    const div = logsRef.current;
    if (div) {
      div.scrollTo({ top: div.scrollHeight });
    }
  }, [filteredTestLogs]);

  return (
    <div className="flex flex-col grow">
      <div className="flex items-center px-2 py-1 space-x-2 border-b border-slate-300">
        <Button
          icon={PlayIcon}
          className="px-1.5"
          onClick={() => runAllTests.mutateAsync()}
          title="Run all tests"
          disabled={testTree.length === 0}
        />

        <div className="border-l border-slate-300 h-full" />

        <Button
          icon={NoSymbolIcon}
          className="px-1.5"
          onClick={() => setTestLogs([])}
          title="Clear logs"
          disabled={testLogs.length === 0}
        />
        <Input
          value={searchText}
          className="min-w-[14rem]"
          leftIcon={MagnifyingGlassIcon}
          type="text"
          placeholder="Filter..."
          onChange={(event) => setSearchText(event.target.value)}
        />
      </div>
      <div className="flex grow">
        {testTree.length === 0 && (
          <div className="text-slate-400 text-2xs px-3 py-2 font-mono">
            No Tests
          </div>
        )}
        <RightResizableWidget className="shrink flex flex-col w-80 min-w-[10rem] border-r border-slate-300 z-10">
          <TestsTree
            items={testTree}
            onItemClick={(item) =>
              runTest.mutateAsync({
                resourcePath: item,
              })
            }
          />
        </RightResizableWidget>

        <div className="relative flex flex-col grow">
          <div className="flex-1 h-full flex relative">
            <ScrollableArea ref={logsRef} overflowY className="pb-1.5">
              {filteredTestLogs?.length > 0 && (
                <ConsoleLogs logs={filteredTestLogs ?? []} showIcons={false} />
              )}
              {filteredTestLogs?.length === 0 && (
                <div className="text-slate-400 text-2xs px-3 py-2 font-mono">
                  No logs
                </div>
              )}
            </ScrollableArea>
          </div>
        </div>
      </div>
    </div>
  );
};
