import type { ITestRunnerClient } from "@winglang/sdk/lib/std/test-runner.js";
import { TraceType } from "@winglang/sdk/lib/std/test-runner.js";

import type { ConsoleLogger } from "../../consoleLogger.js";
import type { InternalTestResult } from "../../router/test.js";
import type { Simulator } from "../../wingsdk.js";
import { formatTraceError } from "../format-wing-error.js";

import { createSimulatorManager } from "./simulator-manager.js";
import { createTestStateManager } from "./test-state-manager.js";

export type TestStatus =
  | "success"
  | "error"
  | "idle"
  | "running"
  | "uninitialized";

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
  status(): TestStatus;

  // Run a single test.
  runTest(testId: string): void;

  // Run all tests.
  runAllTests(): void;

  // Register a callback to be called when the tests change.
  onTestsChange(callback: () => void): void;

  // Initialize the test runner.
  initialize(): void;

  // Stop the test runner.
  stop(): void;
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

export const createTestRunner = ({
  wingfile,
  platform,
  watchGlobs,
  logger,
}: CreateTestRunnerProps): TestRunner => {
  const testsState = createTestStateManager();

  const simulatorManager = createSimulatorManager({
    wingfile,
    platform,
    watchGlobs,
  });

  const onTestChangeCallbacks: Array<() => void> = [];

  const runOnTestChangeCallbacks = () => {
    for (const callback of onTestChangeCallbacks) {
      callback();
    }
  };

  const initialize = async () => {
    testsState.restart();

    const simulator = await simulatorManager.getSimulator();

    const simTestRunner = simulator.getResource(
      "root/cloud.TestRunner",
    ) as ITestRunnerClient;

    const tests = await simTestRunner.listTests();

    simulator.stop();

    testsState.setTests(
      tests.map((test) => ({
        id: test,
        label: getTestName(test),
        status: "idle",
        datetime: Date.now(),
      })),
    );

    runOnTestChangeCallbacks();
  };

  const status = (): TestStatus => {
    if (!testsState.initialized()) {
      return "uninitialized";
    }
    if (testsState.getTests().some((t) => t.status === "running")) {
      return "running";
    }
    if (testsState.getTests().some((t) => t.status === "error")) {
      return "error";
    }
    if (testsState.getTests().some((t) => t.status === "idle")) {
      return "idle";
    }
    return "success";
  };

  const runTest = async (testId: string) => {
    const simulator = await simulatorManager.getSimulator();

    const response = await executeTest(simulator, testId, logger);
    testsState.setTest({
      id: testId,
      label: getTestName(testId),
      status: response.error ? "error" : "success",
      time: response.time,
      datetime: Date.now(),
    });

    runOnTestChangeCallbacks();
    simulator.stop();
  };

  const runAllTests = async () => {
    const result: InternalTestResult[] = [];

    // Set all tests to running.
    const testList = testsState.getTests();
    testsState.setTests(
      testList.map((test) => ({
        ...test,
        status: "running",
        datetime: Date.now(),
      })),
    );

    const simulator = await simulatorManager.getSimulator();

    for (const test of testList) {
      await simulator.reload(true);
      const response = await executeTest(simulator, test.id, logger);
      result.push(response);
      testsState.setTest({
        ...test,
        status: response.error ? "error" : "success",
        time: response.time,
        datetime: Date.now(),
      });
      const testPassed = result.filter((r) => r.pass);
      const time = result.reduce((accumulator, r) => accumulator + r.time, 0);
      const message = `Tests completed: ${testPassed.length}/${testList.length} passed. (${time}ms)`;
      logger.log(message, "console", {
        messageType: "summary",
      });
      runOnTestChangeCallbacks();
    }
    simulator.stop();
  };

  const listTests = () => {
    return testsState.getTests();
  };

  const onTestsChange = (callback: () => void) => {
    onTestChangeCallbacks.push(callback);
  };

  const stop = async () => {
    simulatorManager.stop();
  };

  return {
    listTests,
    status,
    runTest,
    runAllTests,
    onTestsChange,
    initialize,
    stop,
  };
};
