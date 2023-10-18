import { IWebsiteClient } from "@winglang/sdk/lib/cloud";
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
        ) as IWebsiteClient;
        if (!client) {
          return;
        }
        return await client.visualModel();
      }),
  });
};
