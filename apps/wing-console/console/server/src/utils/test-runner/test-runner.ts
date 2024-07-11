import type { ITestRunnerClient } from "@winglang/sdk/lib/std/test-runner.js";
import { TraceType } from "@winglang/sdk/lib/std/test-runner.js";

import type { ConsoleLogger } from "../../consoleLogger.js";
import type { InternalTestResult } from "../../router/test.js";
import type { Simulator } from "../../wingsdk.js";
import { formatTraceError } from "../format-wing-error.js";

import { createSimulatorManager } from "./simulator-manager.js";

export type TestStatus = "success" | "error" | "idle" | "running";

export type TestRunnerStatus = TestStatus | "uninitialized";

export interface TestItem {
  id: string;
  label: string;
  status: TestStatus;
  datetime: number;
  time?: number;
}

export interface TestRunner {
  // List of all of the tests and their status.
  listTests(): Array<TestItem>;

  // Status of the test runner as a whole.
  status(): TestRunnerStatus;

  // Run a single test.
  runTest(testId: string): void;

  // Run all tests.
  runAllTests(): void;

  // Register a callback to be called when the tests change.
  onTestsChange(callback: (testId?: string) => void): void;

  // Initialize the test runner.
  initialize(): void;

  // Stop the test runner.
  forceStop(): void;
}

export interface CreateTestRunnerProps {
  wingfile: string;
  platform?: string[];
  watchGlobs?: string[];
  logger: ConsoleLogger;
}

const getTestName = (testPath: string) => {
  const test = testPath.split("/").pop() ?? testPath;
  return test.replaceAll("test:", "");
};

const executeTest = async (
  simulator: Simulator,
  resourcePath: string,
  logger: ConsoleLogger,
): Promise<InternalTestResult> => {
  const client = simulator.getResource(
    "root/cloud.TestRunner",
  ) as ITestRunnerClient;
  let result: InternalTestResult = {
    response: "",
    error: "",
    path: resourcePath,
    time: 0,
    pass: false,
    traces: [],
  };
  const startTime = Date.now();
  try {
    const t = await client.runTest(resourcePath);
    for (const log of t.traces) {
      if (log.type === TraceType.LOG) {
        logger.log(log.data.message, "simulator");
      } else {
        logger.verbose(log.data.message, "simulator");
      }
    }
    result = {
      ...result,
      ...t,
    };
    if (result.error) {
      throw new Error(result.error);
    }
    logger.log(
      `Test "${getTestName(resourcePath)}" succeeded (${
        Date.now() - startTime
      }ms)`,
      "console",
      {
        messageType: "success",
      },
    );
  } catch (error: any) {
    let output = await formatTraceError(error?.message);
    logger.log(output, "console", {
      messageType: "fail",
    });
    logger.log(
      `Test "${getTestName(resourcePath)}" failed (${
        Date.now() - startTime
      }ms)`,
      "console",
      {
        messageType: "fail",
      },
    );
  }
  result.time = Date.now() - startTime;
  return result;
};

const createTestStateManager = ({
  onTestsChange,
}: {
  onTestsChange: (testId?: string) => void;
}) => {
  let tests: TestItem[] = [];

  return {
    getTests: () => {
      return tests;
    },
    getTest: (testId: string) => {
      return tests.find((t) => t.id === testId);
    },
    setTests: (newTests: TestItem[]) => {
      tests = newTests;
      onTestsChange();
    },
    setTest: (test: TestItem) => {
      const index = tests.findIndex((t) => t.id === test.id);
      if (index === -1) {
        tests.push(test);
      } else {
        tests[index] = test;
      }
      onTestsChange(test.id);
    },
  };
};

export const createTestRunner = ({
  wingfile,
  platform,
  watchGlobs,
  logger,
}: CreateTestRunnerProps): TestRunner => {
  let testRunnerState: TestRunnerStatus = "uninitialized";

  // Callbacks to be called when the tests change.
  const onTestsChangeCallbacks: Array<() => void> = [];
  const onTestsChange = () => {
    for (const callback of onTestsChangeCallbacks) {
      callback();
    }
  };

  const testsState = createTestStateManager({ onTestsChange });

  const simulatorManager = createSimulatorManager({
    wingfile,
    platform,
    watchGlobs,
  });

  const initialize = async () => {
    testRunnerState = "uninitialized";

    // Notify initialization started.
    onTestsChange();

    try {
      const tests = await simulatorManager.useSimulatorInstance(
        async (simulator: Simulator) => {
          const simTestRunner = simulator.getResource(
            "root/cloud.TestRunner",
          ) as ITestRunnerClient;

          return await simTestRunner.listTests();
        },
      );

      testsState.setTests(
        tests.map((testId) => ({
          id: testId,
          label: getTestName(testId),
          status: "idle",
          datetime: Date.now(),
        })),
      );
    } catch (error) {
      console.log(error);
    }
    testRunnerState = "idle";
    onTestsChange();
  };

  const status = (): TestRunnerStatus => {
    if (testRunnerState === "uninitialized") {
      return testRunnerState;
    }

    const tests = testsState.getTests();

    for (const test of tests) {
      if (test.status === "running") {
        testRunnerState = "running";
        return testRunnerState;
      }
      if (test.status === "error") {
        testRunnerState = "error";
        return testRunnerState;
      }
      if (test.status === "idle") {
        testRunnerState = "idle";
        return testRunnerState;
      }
    }

    testRunnerState = "success";
    return testRunnerState;
  };

  const runTest = async (testId: string) => {
    const test = testsState.getTest(testId);
    if (!test) {
      return;
    }

    // Set the test to running.
    testsState.setTest({
      ...test,
      status: "running",
    });

    await simulatorManager.useSimulatorInstance(
      async (simulator: Simulator) => {
        const response = await executeTest(simulator, testId, logger);
        testsState.setTest({
          ...test,
          status: response.error ? "error" : "success",
          time: response.time,
          datetime: Date.now(),
        });
      },
    );
  };

  const runAllTests = async () => {
    // Set all tests to running.
    const testList = testsState.getTests();
    testsState.setTests(
      testList.map((test) => ({
        ...test,
        status: "running",
      })),
    );

    const result = await simulatorManager.useSimulatorInstance(
      async (simulator: Simulator) => {
        const result: InternalTestResult[] = [];
        for (const test of testList) {
          const response = await executeTest(simulator, test.id, logger);

          testsState.setTest({
            ...test,
            status: response.error ? "error" : "success",
            time: response.time,
            datetime: Date.now(),
          });

          await simulator.reload(true);

          result.push(response);
        }
        return result;
      },
    );

    const testPassed = result.filter((r) => r.pass);
    const time = result.reduce((accumulator, r) => accumulator + r.time, 0);
    const message = `Tests completed: ${testPassed.length}/${testList.length} passed. (${time}ms)`;
    logger.log(message, "console", {
      messageType: "summary",
    });
  };

  const listTests = () => {
    if (!testRunnerState) {
      return [];
    }
    return testsState.getTests();
  };

  return {
    listTests,
    status,
    runTest,
    runAllTests,
    onTestsChange: (callback: (testId?: string) => void) => {
      onTestsChangeCallbacks.push(callback);
    },
    initialize,
    forceStop: () => {
      simulatorManager.forceStop();
    },
  };
};
