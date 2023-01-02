import { z } from "zod";

import { publicProcedure, router } from "../utils/createRouter.js";
import { IQueueClient } from "../wingsdk.js";

export const createQueueRouter = () => {
  return router({
    "queue.push": publicProcedure
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
