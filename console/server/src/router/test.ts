import { z } from "zod";

import { createProcedure, createRouter } from "../utils/createRouter.js";

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
        return {
          time: endTime - startTime,
          ...result,
          error,
        };
      }),
    "test.runAll": createProcedure.mutation(async ({ ctx }) => {
      const simulator = await ctx.simulator();
      const testList = simulator.listTests();

      const results = [];
      for (const testName of testList) {
        const startTime = Date.now();
        const result = await simulator.runTest(testName);
        const endTime = Date.now();

        const error = result.error?.split("\n")[0];
        results.push({
          time: endTime - startTime,
          ...result,
          error,
        });
      }
      return results;
    }),
  });
};
