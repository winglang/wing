import { z } from "zod";

import { createProcedure, createRouter } from "../utils/createRouter.js";
import { IQueueClient } from "../wingsdk.js";

export const createQueueRouter = () => {
  return createRouter({
    "queue.purge": createProcedure
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
    "queue.approxSize": createProcedure
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
    "queue.push": createProcedure
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
