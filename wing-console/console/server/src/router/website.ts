import * as z from "zod";

import {
  createEnvironmentProcedure,
  createRouter,
} from "../utils/createRouter.js";
import type { WebsiteSchema } from "../wingsdk.js";

export const createWebsiteRouter = () => {
  return createRouter({
    "website.url": createEnvironmentProcedure
      .input(
        z.object({
          resourcePath: z.string(),
        }),
      )
      .query(async ({ input, ctx }) => {
        const simulator = await ctx.simulator();
        const config = simulator.getResourceConfig(
          input.resourcePath,
        ) as WebsiteSchema;
        if (!config || !config.attrs?.url) {
          return "";
        }
        return config.attrs.url;
      }),
  });
};
