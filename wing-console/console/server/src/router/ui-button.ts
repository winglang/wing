import * as z from "zod";

import {
  createEnvironmentProcedure,
  createRouter,
} from "../utils/createRouter.js";
import type { IFunctionClient } from "../wingsdk.js";

export const createUiButtonRouter = () => {
  return createRouter({
    "uiButton.invoke": createEnvironmentProcedure
      .input(
        z.object({
          resourcePath: z.string(),
        }),
      )
      .mutation(async ({ input, ctx }) => {
        const simulator = await ctx.simulator();
        const client = simulator.getResource(
          input.resourcePath,
        ) as IFunctionClient;
        // @ts-ignore
        await client.invoke("");
      }),
  });
};
