import type { ITestRunnerClient } from "@winglang/sdk/lib/std/test-runner.js";
import { TraceType } from "@winglang/sdk/lib/std/test-runner.js";

import type { ConsoleLogger } from "../consoleLogger.js";
import type { InternalTestResult } from "../router/test.js";
import type { Simulator } from "../wingsdk.js";

import { createCompiler } from "./compiler.js";
import { formatTraceError } from "./format-wing-error.js";
import { createSimulator } from "./simulator.js";

export type TestStatus = "success" | "error" | "idle" | "running";

export interface TestItem {
  id: string;
  label: string;
  status: TestStatus;
  datetime: number;
  time?: number;
}

export interface TestsStateManager {
  getTests: () => TestItem[];
  setTests: (tests: TestItem[]) => void;
  setTest: (test: TestItem) => void;
}

export interface TestRunner {
  // List of all of the tests and their status.
  listTests(): Array<TestItem>;

  // Status of the test runner as a whole.
  status(): TestStatus;

  // Starts running a test.
  runTest(testId: string): void;

  // Run all tests.
  runAllTests(): void;

  // Used to report tests status changes to the frontend via websockets.
  onTestsChange(callback: () => void): void;

  // Restart
  restart(): void;
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

const testsStateManager = (): TestsStateManager => {
  let tests: TestItem[] = [];

  return {
    getTests: () => {
      return tests;
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

const listSimulatorTests = (simulator: Simulator): Promise<string[]> => {
  const testRunner = simulator.getResource(
    "root/cloud.TestRunner",
  ) as ITestRunnerClient;
  return testRunner.listTests();
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
  const testsState = testsStateManager();

  const onTestChangeCallbacks: Array<() => void> = [];

  const getSimulatorInstance = async () => {
    return new Promise<Simulator>((resolve) => {
      const testCompiler = createCompiler({
        wingfile,
        platform,
        watchGlobs,
        testing: true,
      });
      const testSimulator = createSimulator();

      testCompiler.on("compiled", async ({ simfile }) => {
        await testSimulator.start(simfile);

        const simulator = await testSimulator.waitForInstance();
        resolve(simulator);
      });
    });
  };

  const runOnTestChangeCallbacks = () => {
    for (const callback of onTestChangeCallbacks) {
      callback();
    }
  };

  const initialize = async () => {
    const simulator = await getSimulatorInstance();

    const testRunner = simulator.getResource(
      "root/cloud.TestRunner",
    ) as ITestRunnerClient;

    const tests = await testRunner.listTests();

    testsState.setTests(
      tests.map((test) => ({
        id: test,
        label: getTestName(test),
        status: "idle",
        datetime: Date.now(),
      })),
    );
    await simulator.stop();
    runOnTestChangeCallbacks();
  };

  initialize();

  const listTests = () => {
    return testsState.getTests();
  };

  const status = () => {
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
    const simulator = await getSimulatorInstance();
    const response = await executeTest(simulator, testId, logger);
    testsState.setTest({
      id: testId,
      label: getTestName(testId),
      status: response.error ? "error" : "success",
      time: response.time,
      datetime: Date.now(),
    });
    await simulator.stop();
    runOnTestChangeCallbacks();
  };

  const runAllTests = async () => {
    const simulator = await getSimulatorInstance();

    const testList = await listSimulatorTests(simulator);
    const result: InternalTestResult[] = [];

    for (const resourcePath of testList) {
      await simulator.reload(true);
      const response = await executeTest(simulator, resourcePath, logger);
      result.push(response);
      testsState.setTest({
        id: resourcePath,
        label: getTestName(resourcePath),
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
    await simulator.stop();
  };

  const onTestsChange = (callback: () => void) => {
    onTestChangeCallbacks.push(callback);
  };

  const restart = () => {
    testsState.setTests([]);
    runOnTestChangeCallbacks();
  };

  return {
    listTests,
    status,
    runTest,
    runAllTests,
    onTestsChange,
    restart,
  };
};
