import type { ReactAppSchema } from "@winglang/sdk/lib/target-sim/schema-resources";
import { z } from "zod";

import { createProcedure, createRouter } from "../utils/createRouter.js";

export const createReactAppRouter = () => {
  return createRouter({
    "reactApp.url": createProcedure
      .input(
        z.object({
          resourcePath: z.string(),
        }),
      )
      .query(async ({ input, ctx }) => {
        const simulator = await ctx.simulator();
        const config = simulator.getResourceConfig(
          input.resourcePath,
        ) as ReactAppSchema;
        if (!config || !config.props?.url) {
          return "";
        }
        return config.props.url;
      }),
  });
};
