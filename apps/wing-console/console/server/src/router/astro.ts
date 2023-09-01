import { z } from "zod";

import { createProcedure, createRouter } from "../utils/createRouter.js";
import { AstroSchema } from "../wingsdk.js";

export const createAstroRouter = () => {
  return createRouter({
    "astro.url": createProcedure
      .input(
        z.object({
          resourcePath: z.string(),
        }),
      )
      .query(async ({ input, ctx }) => {
        const simulator = await ctx.simulator();
        const config = simulator.getResourceConfig(
          input.resourcePath,
        ) as AstroSchema;
        return config?.attrs?.url ?? "";
      }),
  });
};
