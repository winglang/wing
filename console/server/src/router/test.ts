import { Simulator, Trace } from "@winglang/sdk/lib/testing/simulator.js";
import { z } from "zod";

import { ConsoleLogger, MessageType } from "../consoleLogger.js";
import { createProcedure, createRouter } from "../utils/createRouter.js";
import { IFunctionClient } from "../wingsdk.js";

import { isErrorLike } from "./function.js";

const getTestName = (testPath: string) => {
  const test = testPath.split("/").pop() ?? testPath;
  return test.replace(/test: /g, "");
};

const runTest = async (
  simulator: Simulator,
  resourcePath: string,
  logger: ConsoleLogger,
): Promise<TestResult> => {
  logger.log("Reloading simulator...", "console", {
    messageType: "info",
  });
  await simulator.reload();

  const client = simulator.getResource(resourcePath) as IFunctionClient;
  let result: TestResult = {
    response: "",
    error: "",
    path: resourcePath,
    time: 0,
  };
  const startTime = Date.now();
  try {
    result.response = await client.invoke("");
    logger.log(
      `Test "${getTestName(resourcePath)}" succeeded (${
        Date.now() - startTime
      }ms)`,
      "console",
      {
        messageType: "success",
      },
    );
  } catch (error) {
    result.error = isErrorLike(error) ? error.message : String(error);
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

interface TestResult {
  response: string;
  error: string | undefined;
  path: string;
  time: number;
}

export const createTestRouter = () => {
  return createRouter({
    "test.list": createProcedure.query(async ({ input, ctx }) => {
      const simulator = await ctx.simulator();
      return simulator.listTests();
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
      const testList = simulator.listTests();
      const result: TestResult[] = [];
      for (const resourcePath of testList) {
        result.push(await runTest(simulator, resourcePath, ctx.logger));
      }

      const testPassed = result.filter((r) => r.error === "");
      const time = result.reduce((accumulator, r) => accumulator + r.time, 0);

      const message = `Tests completed: ${testPassed.length}/${testList.length} passed. (${time}ms)`;
      ctx.logger.log(message, "console", {
        messageType: "summary",
      });

      return result;
    }),
  });
};
