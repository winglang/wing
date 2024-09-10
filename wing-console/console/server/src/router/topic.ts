import * as z from "zod";

import {
  createEnvironmentProcedure,
  createRouter,
} from "../utils/createRouter.js";
import type { ITopicClient } from "../wingsdk.js";

export const createTopicRouter = () => {
  return createRouter({
    "topic.publish": createEnvironmentProcedure
      .meta({
        analytics: {
          action: "publish",
          resource: "Topic",
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
        ) as ITopicClient;
        return client.publish(input.message);
      }),
  });
};
