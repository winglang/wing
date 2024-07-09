import type { ITestRunnerClient } from "@winglang/sdk/lib/std/test-runner.js";
import { TraceType } from "@winglang/sdk/lib/std/test-runner.js";

import type { ConsoleLogger } from "../consoleLogger.js";
import type { InternalTestResult } from "../router/test.js";
import type { Simulator } from "../wingsdk.js";

import { createCompiler } from "./compiler.js";
import { formatTraceError } from "./format-wing-error.js";
import { createSimulator } from "./simulator.js";

export type TestStatus = "success" | "error" | "idle" | "running";

export interface Test {
  testId: string;
  label: string;
  status: TestStatus;
  time?: number;
  datetime?: number;
}

export interface TestRunner {
  // List of all of the tests and their status.
  listTests(): Array<Test>;

  // Status of the test runner as a whole.
  status(): TestStatus;

  // Starts running a test.
  runTest(testId: string): void;

  // Run all tests.
  runAllTests(): void;

  // Used to report tests status changes to the frontend via websockets.
  onTestsChange(callback: () => void): void;
}

export interface CreateTestRunnerProps {
  wingfile: string;
  platform?: string[];
  watchGlobs?: string[];
}

const getTestName = (testPath: string) => {
  const test = testPath.split("/").pop() ?? testPath;
  return test.replaceAll("test:", "");
};

const listTests = (simulator: Simulator): Promise<string[]> => {
  const testRunner = simulator.getResource(
    "root/cloud.TestRunner",
  ) as ITestRunnerClient;
  return testRunner.listTests();
};

const reloadSimulator = async (simulator: Simulator, logger: ConsoleLogger) => {
  logger.verbose("Reloading simulator...", "console", {
    messageType: "info",
  });
  await simulator.reload(true);
};

const runTest = async (
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
}: CreateTestRunnerProps): TestRunner => {
  const testCompiler = createCompiler({
    wingfile,
    platform,
    watchGlobs,
    testing: true,
  });

  const testSimulator = createSimulator();

  testCompiler.on("compiled", ({ simfile }) => {
    testSimulator.start(simfile);
  });

  const listTests = () => {
    return [];
  };

  const status = () => {
    return "success" as TestStatus;
  };

  const runAllTests = () => {
    // const result: InternalTestResult[] = [];
    // for (const resourcePath of testList) {
    //   const response = await runTest(simulator, resourcePath, ctx.logger);
    //   result.push(response);
    //   testsState.setTest({
    //     id: resourcePath,
    //     label: getTestName(resourcePath),
    //     status: response.error ? "error" : "success",
    //     time: response.time,
    //     datetime: Date.now(),
    //   });
    // const testPassed = result.filter((r) => r.pass);
    // const time = result.reduce((accumulator, r) => accumulator + r.time, 0);
    // const message = `Tests completed: ${testPassed.length}/${testList.length} passed. (${time}ms)`;
    // ctx.logger.log(message, "console", {
    //   messageType: "summary",
    // });
    // return result;
  };

  const runTest = (testId: string) => {
    // testsState.setTest({
    //   id: input.resourcePath,
    //   label: getTestName(input.resourcePath),
    //   status: response.error ? "error" : "success",
    //   time: response.time,
    //   datetime: Date.now(),
    // });
  };

  const onTestsChange = (callback: () => void) => {};

  return {
    listTests,
    status,
    runTest,
    runAllTests,
    onTestsChange,
  };
};
