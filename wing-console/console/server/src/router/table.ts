import * as z from "zod";

import {
  createEnvironmentProcedure,
  createRouter,
} from "../utils/createRouter.js";

export const createTableRouter = () => {
  return createRouter({
    "table.scan": createEnvironmentProcedure
      .input(
        z.object({
          resourcePath: z.string(),
        }),
      )
      .query(async ({ input, ctx }) => {
        const simulator = await ctx.simulator();
        const client = simulator.getResource(input.resourcePath);
        return (await client.invoke()) as Record<string, any>[];
      }),
  });
};
