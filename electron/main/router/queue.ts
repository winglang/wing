import { z } from "zod";

import { createRouter } from "../utils/createRouter.js";
import { IQueueClient } from "../wingsdk.js";

export const createQueueRouter = () => {
  return createRouter().mutation("queue.push", {
    input: z.object({
      resourcePath: z.string(),
      message: z.string(),
    }),
    async resolve({ input, ctx }) {
      const simulator = await ctx.simulator();
      const client = simulator.getResource(input.resourcePath) as IQueueClient;
      return client.push(input.message);
    },
  });
};
