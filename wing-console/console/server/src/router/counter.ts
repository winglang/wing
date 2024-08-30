import { z } from "zod";

import { createProcedure, createRouter } from "../utils/createRouter.js";
import type { ICounterClient } from "../wingsdk.js";

export const createCounterRouter = () => {
  return createRouter({
    "counter.inc": createProcedure
      .meta({
        analytics: {
          action: "inc",
          resource: "Counter",
        },
      })
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
      .meta({
        analytics: {
          action: "dec",
          resource: "Counter",
        },
      })
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
      .meta({
        analytics: {
          action: "peek",
          resource: "Counter",
        },
      })
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
      .meta({
        analytics: {
          action: "set",
          resource: "Counter",
        },
      })
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
