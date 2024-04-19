import { z } from "zod";

import { createProcedure, createRouter } from "../utils/createRouter.js";
import type { IFunctionClient } from "../wingsdk.js";

export const createUiFieldRouter = () => {
  return createRouter({
    "uiField.get": createProcedure
      .input(
        z.object({
          resourcePath: z.string(),
        }),
      )
      .query(async ({ input, ctx }) => {
        const simulator = await ctx.simulator();
        const client = simulator.getResource(
          input.resourcePath,
        ) as IFunctionClient;
        return {
          value: await client.invoke(""),
        };
      }),
  });
};
