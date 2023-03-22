import { Trace } from "@winglang/sdk/lib/testing/simulator.js";
import { z } from "zod";

import { createProcedure, createRouter } from "../utils/createRouter.js";
import { TestLog, TestLogger } from "../utils/testLogger.js";

const getTracesMessages = (traces: Trace[]) => {
  return traces
    .filter((trace: Trace) => trace.type === "log" && trace.data?.message)
    .map((trace: Trace) => trace.data?.message);
};

const getTestName = (testPath: string) => {
  const test = testPath.split("/").pop() ?? testPath;
  return test.replace(/test: /g, "");
};

interface TestResult {
  error: string | undefined;
  path: string;
  pass: boolean;
  traces: Trace[];
  timestamp: number;
  time: number;
}

const generateLogs = (logger: TestLogger, logs: TestResult[]) => {
  for (const log of logs) {
    logger.log({
      type: "title",
      message: `Test: ${getTestName(log.path)}`,
      timestamp: Date.now(),
    });

    const messages = getTracesMessages(log.traces);
    for (const message of messages) {
      if (message) {
        logger.log({
          type: "log",
          message: message,
          timestamp: log.timestamp,
        });
      }
    }
    if (log.error) {
      logger.log({
        type: "log",
        message: log.error,
        timestamp: log.timestamp,
      });
    }
    logger.log({
      type: log.error ? "fail" : "success",
      message: `Test ${log.error ? "failed" : "succeeded"} (${log.time}ms)`,
      timestamp: Date.now(),
    });
  }

  const testPassed = logs.filter((output) => !output.error);
  const time = logs.reduce((value, output) => value + output.time, 0);

  const message = `Tests completed: ${testPassed.length}/${logs.length} passed. (${time}ms)`;
  logger.log({
    type: "summary",
    message,
    timestamp: Date.now(),
  });
};

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
        const simulator = await ctx.simulator();

        const startTime = Date.now();
        const result = await simulator.runTest(input.resourcePath);
        const endTime = Date.now();

        const error = result.error?.split("\n")[0];
        const log = {
          timestamp: Date.now(),
          time: endTime - startTime,
          ...result,
          error,
        };

        generateLogs(ctx.testLogger, [log]);
        return log;
      }),
    "test.runAll": createProcedure.mutation(async ({ ctx }) => {
      const simulator = await ctx.simulator();
      const testList = simulator.listTests();

      const logs = [];
      for (const testName of testList) {
        const startTime = Date.now();
        const result = await simulator.runTest(testName);
        const endTime = Date.now();

        const error = result.error?.split("\n")[0];
        logs.push({
          timestamp: Date.now(),
          time: endTime - startTime,
          ...result,
          error,
        });
      }
      generateLogs(ctx.testLogger, logs);
      return logs;
    }),
    "test.logs": createProcedure
      .input(
        z.object({
          filters: z.object({
            timestamp: z.number(),
            text: z.string(),
          }),
        }),
      )
      .query(async ({ input, ctx }) => {
        return ctx.testLogger.messages.filter(
          (entry) =>
            (!entry.timestamp || entry.timestamp >= input.filters.timestamp) &&
            (!input.filters.text ||
              entry.message
                .toLowerCase()
                .includes(input.filters.text.toLowerCase())),
        );
      }),
  });
};
