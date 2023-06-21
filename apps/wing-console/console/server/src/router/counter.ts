import { z } from "zod";

import { createProcedure, createRouter } from "../utils/createRouter.js";
import { ICounterClient } from "../wingsdk.js";

export const createCounterRouter = () => {
  return createRouter({
    "counter.inc": createProcedure
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
    "counter.dec": createProcedure
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
        const response = await client.dec(input.amount);
        return response;
      }),
    "counter.peek": createProcedure
      .input(
        z.object({
          resourcePath: z.string(),
        }),
      )
      .query(async ({ input, ctx }) => {
        const simulator = await ctx.simulator();
        const client = simulator.tryGetResource(
          input.resourcePath,
        ) as ICounterClient;
        if (!client) {
          return 0;
        }
        const response = await client.peek();
        return response;
      }),
    "counter.set": createProcedure
      .input(
        z.object({
          resourcePath: z.string(),
          value: z.number(),
        }),
      )
      .mutation(async ({ input, ctx }) => {
        const simulator = await ctx.simulator();
        const client = simulator.getResource(
          input.resourcePath,
        ) as ICounterClient;
        const response = await client.set(input.value);
        return response;
      }),
  });
};
