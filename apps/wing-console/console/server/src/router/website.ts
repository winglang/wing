import { createProcedure, createRouter } from "../utils/createRouter";
import { z } from "zod";
import { WebsiteSchema } from "../wingsdk.js";

export const createWebsiteRouter = () => {
  return createRouter({
    "website.url": createProcedure
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
