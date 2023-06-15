import { TestResult } from "@winglang/sdk/lib/cloud";
import { z } from "zod";

import { ConsoleLogger } from "../consoleLogger.js";
import { createProcedure, createRouter } from "../utils/createRouter.js";
import { ITestRunnerClient, Simulator } from "../wingsdk.js";

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

const runTest = async (
  simulator: Simulator,
  resourcePath: string,
  logger: ConsoleLogger,
): Promise<InternalTestResult> => {
  logger.log("Reloading simulator...", "console", {
    messageType: "info",
  });
  await simulator.reload();

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
    result = {
      ...result,
      ...t,
    };
    logger.log(
      `Test "${getTestName(resourcePath)}" succeeded (${
        Date.now() - startTime
      }ms)`,
      "console",
      {
        messageType: "success",
      },
    );
  } catch {
    logger.log(
      `Test "${getTestName(resourcePath)} failed (${Date.now() - startTime}ms)`,
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
      const simulator = await ctx.simulator();
      return listTests(simulator);
    }),
    "test.run": createProcedure
      .input(
        z.object({
          resourcePath: z.string(),
        }),
      )
      .mutation(async ({ input, ctx }) => {
        return await runTest(
          await ctx.simulator(),
          input.resourcePath,
          ctx.logger,
        );
      }),
    "test.runAll": createProcedure.mutation(async ({ ctx }) => {
      const simulator = await ctx.simulator();
      const testList = await listTests(simulator);
      const result: InternalTestResult[] = [];
      for (const resourcePath of testList) {
        result.push(await runTest(simulator, resourcePath, ctx.logger));
      }

      const testPassed = result.filter((r) => r.error === undefined);
      const time = result.reduce((accumulator, r) => accumulator + r.time, 0);

      const message = `Tests completed: ${testPassed.length}/${testList.length} passed. (${time}ms)`;
      ctx.logger.log(message, "console", {
        messageType: "summary",
      });

      return result;
    }),
  });
};
