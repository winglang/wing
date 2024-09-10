import * as z from "zod";

import {
  createEnvironmentProcedure,
  createRouter,
} from "../utils/createRouter.js";
import type { ICounterClient } from "../wingsdk.js";

export const createCounterRouter = () => {
  return createRouter({
    "counter.inc": createEnvironmentProcedure
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
    "counter.dec": createEnvironmentProcedure
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
    "counter.peek": createEnvironmentProcedure
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
    "counter.set": createEnvironmentProcedure
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
