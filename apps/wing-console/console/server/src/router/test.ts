import { type TestResult } from "@winglang/sdk/lib/std";
import { z } from "zod";

import { createProcedure, createRouter } from "../utils/createRouter.js";

export interface InternalTestResult extends TestResult {
  response: string;
  time: number;
}

export const createTestRouter = () => {
  return createRouter({
    "test.status": createProcedure.query(async ({ ctx }) => {
      return ctx.getTestRunner().status();
    }),
    "test.list": createProcedure.query(async ({ ctx }) => {
      return ctx.getTestRunner().listTests();
    }),
    "test.run": createProcedure
      .input(
        z.object({
          resourcePath: z.string(),
        }),
      )
      .mutation(async ({ input, ctx }) => {
        ctx.getTestRunner().runTest(input.resourcePath);
      }),
    "test.runAll": createProcedure.mutation(async ({ ctx }) => {
      ctx.getTestRunner().runAllTests();
    }),
  });
};
