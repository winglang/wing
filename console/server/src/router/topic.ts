import { z } from "zod";

import { createProcedure, createRouter } from "../utils/createRouter.js";
import { ITopicClient } from "../wingsdk.js";

export const createTopicRouter = () => {
  return createRouter({
    "topic.publish": createProcedure
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
        ) as ITopicClient;
        return client.publish(input.message);
      }),
  });
};
