import * as z from "zod";

import {
  createEnvironmentProcedure,
  createProcedure,
  createRouter,
} from "../utils/createRouter.js";
import type { IQueueClient } from "../wingsdk.js";

export const createQueueRouter = () => {
  return createRouter({
    "queue.purge": createEnvironmentProcedure
      .meta({
        analytics: {
          action: "purge",
          resource: "Queue",
        },
      })
      .input(
        z.object({
          resourcePath: z.string(),
        }),
      )
      .mutation(async ({ input, ctx }) => {
        const simulator = await ctx.simulator();
        const client = simulator.getResource(
          input.resourcePath,
        ) as IQueueClient;
        return client.purge();
      }),
    "queue.approxSize": createEnvironmentProcedure
      .meta({
        analytics: {
          action: "approxSize",
          resource: "Queue",
        },
      })
      .input(
        z.object({
          resourcePath: z.string(),
        }),
      )
      .query(async ({ input, ctx }) => {
        const simulator = await ctx.simulator();
        const client = simulator.getResource(
          input.resourcePath,
        ) as IQueueClient;
        return client.approxSize();
      }),
    "queue.push": createEnvironmentProcedure
      .meta({
        analytics: {
          action: "push",
          resource: "Queue",
        },
      })
      .input(
        z.object({
          resourcePath: z.string(),
          message: z.string(),
        }),
      )
      .mutation(async ({ input, ctx }) => {
        const simulator = await ctx.simulator();
        const client = simulator.getResource(
          input.resourcePath,
        ) as IQueueClient;
        return client.push(input.message);
      }),
  });
};
