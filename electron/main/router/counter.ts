import { ICounterClient } from "@winglang/wingsdk/lib/cloud/counter.js";
import { z } from "zod";

import { createRouter } from "../utils/createRouter.js";

export const createCounterRouter = () => {
  return createRouter()
    .mutation("counter.inc", {
      input: z.object({
        resourcePath: z.string(),
        amount: z.number(),
      }),
      async resolve({ input, ctx }) {
        const simulator = await ctx.simulator();
        const client = simulator.getResource(
          input.resourcePath,
        ) as ICounterClient;
        const response = await client.inc(input.amount);
        return response;
      },
    })
    .query("counter.get", {
      input: z.object({
        resourcePath: z.string(),
      }),
      async resolve({ input, ctx }) {
        const simulator = await ctx.simulator();
        const client = simulator.getResource(
          input.resourcePath,
        ) as ICounterClient;
        const response = await client.inc(0);
        return response;
      },
    });
};
