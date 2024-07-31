import { z } from "zod";

import { createProcedure, createRouter } from "../utils/createRouter.js";

export const createtableRouter = () => {
  return createRouter({
    "table.scan": createProcedure
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
