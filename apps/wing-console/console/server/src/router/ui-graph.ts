import { z } from "zod";

import { createProcedure, createRouter } from "../utils/createRouter.js";
import type { IFunctionClient } from "../wingsdk.js";

export interface DataItem {
  timestamp: {
    _date: string;
  };
  value: number;
}

export const createUiGraphRouter = () => {
  return createRouter({
    "uiGraph.getData": createProcedure
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

        return (await client.invoke()) as unknown as DataItem[];
      }),
  });
};
