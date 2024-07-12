import type { ITestRunnerClient } from "@winglang/sdk/lib/std/test-runner.js";
import { TraceType } from "@winglang/sdk/lib/std/test-runner.js";

import type { ConsoleLogger } from "../../consoleLogger.js";
import type { InternalTestResult } from "../../router/test.js";
import type { Simulator } from "../../wingsdk.js";
import { createCompiler } from "../compiler.js";
import { formatTraceError } from "../format-wing-error.js";

import { createSimulatorManager } from "./simulator-manager.js";

export type TestStatus = "success" | "error" | "idle" | "running";

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

  // Run a single test.
  runTest(testId: string): void;

  // Run all tests.
  runAllTests(): void;

  // Register a callback to be called when the tests change.
  onTestsChange(callback: (testId?: string) => void): void;

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

    const { default: prettyMs } = await import("pretty-ms");

    logger.log(output, "console", {
      messageType: "fail",
    });
    logger.log(
      `Test "${getTestName(resourcePath)}" failed (${prettyMs(
        Date.now() - startTime,
      )})`,
      "console",
      {
        messageType: "fail",
      },
    );
  }
  result.time = Date.now() - startTime;
  return result;
};

const createTestStateManager = () => {
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
    },
    setTest: (test: TestItem) => {
      const index = tests.findIndex((t) => t.id === test.id);
      if (index === -1) {
        tests.push(test);
      } else {
        tests[index] = test;
      }
    },
  };
};

export const createTestRunner = ({
  wingfile,
  platform,
  watchGlobs,
  logger,
}: CreateTestRunnerProps): TestRunner => {
  const testCompiler = createCompiler({
    wingfile,
    platform,
    watchGlobs,
    testing: true,
  });

  // Callbacks to be called when the tests change.
  const onTestsChangeCallbacks: Array<() => void> = [];
  const onTestsChange = () => {
    for (const callback of onTestsChangeCallbacks) {
      callback();
    }
  };

  const testsState = createTestStateManager();

  const simulatorManager = createSimulatorManager({
    compiler: testCompiler,
  });
  testCompiler.on("compiled", async () => {
    const tests = await simulatorManager.getTests();

    testsState.setTests(
      tests.map((testId) => ({
        id: testId,
        label: getTestName(testId),
        status: "idle",
        datetime: Date.now(),
      })),
    );
    onTestsChange();
  });

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
    onTestsChange();

    await simulatorManager.useSimulatorInstance(
      async (simulator: Simulator) => {
        const response = await executeTest(simulator, testId, logger);
        testsState.setTest({
          ...test,
          status: response.error ? "error" : "success",
          time: response.time,
          datetime: Date.now(),
        });
        onTestsChange();
      },
    );
  };

  const runAllTests = async () => {
    // Filter out tests that are already running.
    const testList = testsState
      .getTests()
      .filter((t) => t.status !== "running");

    if (testList.length === 0) {
      return;
    }

    for (const test of testList) {
      testsState.setTest({
        ...test,
        status: "running",
      });
    }
    onTestsChange();

    const startTime = Date.now();
    const result = await simulatorManager.useSimulatorInstance(
      async (simulator: Simulator) => {
        const promises = testList.map(async (test) => {
          const response = await executeTest(simulator, test.id, logger);

          testsState.setTest({
            ...test,
            status: response.error ? "error" : "success",
            time: response.time,
            datetime: Date.now(),
          });
          onTestsChange();

          return response;
        });
        return await Promise.all(promises);
      },
    );

    const testPassed = result.filter((r) => r.pass);
    const time = Date.now() - startTime;

    const { default: prettyMs } = await import("pretty-ms");
    const message = `Tests completed: ${testPassed.length}/${
      testList.length
    } passed. (${prettyMs(time)})`;

    logger.log(message, "console", {
      messageType: "summary",
    });
  };

  return {
    listTests: () => {
      return testsState.getTests();
    },
    runTest,
    runAllTests,
    onTestsChange: (callback: (testId?: string) => void) => {
      onTestsChangeCallbacks.push(callback);
    },
    forceStop: () => {
      testCompiler.stop();
    },
  };
};
