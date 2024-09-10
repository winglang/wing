import * as z from "zod";

import {
  createEnvironmentProcedure,
  createRouter,
} from "../utils/createRouter.js";
import type { IFunctionClient } from "../wingsdk.js";

export const createUiFieldRouter = () => {
  return createRouter({
    "uiField.get": createEnvironmentProcedure
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
          // @ts-ignore
          value: await client.invoke(""),
        };
      }),
  });
};
