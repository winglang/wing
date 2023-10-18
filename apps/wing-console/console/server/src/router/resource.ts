import { IDisplayableResource } from "@winglang/sdk/lib/std";
import { z } from "zod";

import { createProcedure, createRouter } from "../utils/createRouter.js";

export const createResourceRouter = () => {
  return createRouter({
    "resource.visualModel": createProcedure
      .input(
        z.object({
          resourcePath: z.string(),
        }),
      )
      .query(async ({ input, ctx }) => {
        const simulator = await ctx.simulator();
        const client = simulator.getResource(
          input.resourcePath,
        ) as IDisplayableResource;
        if (!client) {
          return;
        }
        return await client.visualModel();
      }),
  });
};
