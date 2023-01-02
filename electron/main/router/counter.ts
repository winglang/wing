import { z } from "zod";

import { publicProcedure, router } from "../utils/createRouter.js";
import { ICounterClient } from "../wingsdk.js";

export const createCounterRouter = () => {
  return router({
    "counter.inc": publicProcedure
      .input(
        z.object({
          resourcePath: z.string(),
          amount: z.number(),
        }),
      )
      .mutation(async ({ input, ctx }) => {
        const simulator = await ctx.simulator();
        const client = simulator.getResource(
          input.resourcePath,
        ) as ICounterClient;
        const response = await client.inc(input.amount);
        return response;
      }),
    "counter.get": publicProcedure
      .input(
        z.object({
          resourcePath: z.string(),
        }),
      )
      .query(async ({ input, ctx }) => {
        const simulator = await ctx.simulator();
        const client = simulator.getResource(
          input.resourcePath,
        ) as ICounterClient;
        const response = await client.inc(0);
        return response;
      }),
  });
};
