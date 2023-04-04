import { z } from "zod";

import { createProcedure, createRouter } from "../utils/createRouter.js";
import { IRedisClient } from "../wingsdk.js";

export const createRedisRouter = () => {
  return createRouter({
    "redis.info": createProcedure
      .input(
        z.object({
          resourcePath: z.string(),
        }),
      )
      .query(async ({ input, ctx }) => {
        const simulator = await ctx.simulator();
        const client = simulator.getResource(
          input.resourcePath,
        ) as IRedisClient;

        return {
          url: await client.url(),
        };
      }),
  });
};
