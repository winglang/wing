import { TraceType, type TestResult } from "@winglang/sdk/lib/std";
import { z } from "zod";

import type { ConsoleLogger } from "../consoleLogger.js";
import { createProcedure, createRouter } from "../utils/createRouter.js";
import { formatTraceError } from "../utils/format-wing-error.js";
import type { ITestRunnerClient, Simulator } from "../wingsdk.js";

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

export interface InternalTestResult extends TestResult {
  response: string;
  time: number;
}

export const createTestRouter = () => {
  return createRouter({
    "test.list": createProcedure.query(async ({ input, ctx }) => {
      const simulator = await ctx.testSimulator();
      const list = await listTests(simulator);

      const testsState = ctx.testsStateManager();
      const tests = testsState.getTests();

      return list.map((resourcePath) => {
        const test = tests.find((t) => t.id === resourcePath);
        return {
          id: resourcePath,
          label: getTestName(resourcePath),
          status: test?.status ?? "pending",
          time: test?.time ?? 0,
          datetime: test?.datetime,
        };
      });
    }),
    "test.run": createProcedure
      .input(
        z.object({
          resourcePath: z.string(),
        }),
      )
      .mutation(async ({ input, ctx }) => {
        await reloadSimulator(await ctx.testSimulator(), ctx.logger);
        const response = await runTest(
          await ctx.testSimulator(),
          input.resourcePath,
          ctx.logger,
        );

        const testsState = ctx.testsStateManager();
        testsState.setTest({
          id: input.resourcePath,
          label: getTestName(input.resourcePath),
          status: response.error ? "error" : "success",
          time: response.time,
          datetime: Date.now(),
        });

        return response;
      }),
    "test.runAll": createProcedure.mutation(async ({ ctx }) => {
      const simulator = await ctx.testSimulator();
      await reloadSimulator(simulator, ctx.logger);
      const testsState = ctx.testsStateManager();

      const testList = await listTests(simulator);
      const result: InternalTestResult[] = [];
      for (const resourcePath of testList) {
        const response = await runTest(simulator, resourcePath, ctx.logger);
        result.push(response);
        testsState.setTest({
          id: resourcePath,
          label: getTestName(resourcePath),
          status: response.error ? "error" : "success",
          time: response.time,
          datetime: Date.now(),
        });
      }

      const testPassed = result.filter((r) => r.pass);
      const time = result.reduce((accumulator, r) => accumulator + r.time, 0);

      const message = `Tests completed: ${testPassed.length}/${testList.length} passed. (${time}ms)`;
      ctx.logger.log(message, "console", {
        messageType: "summary",
      });

      return result;
    }),
  });
};
