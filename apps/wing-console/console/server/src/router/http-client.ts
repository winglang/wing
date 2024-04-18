import { z } from "zod";

import { createProcedure, createRouter } from "../utils/createRouter.js";
import type { IFunctionClient } from "../wingsdk.js";

export const createHttpClientRouter = () => {
  return createRouter({
    "httpClient.getUrl": createProcedure
      .input(
        z.object({
          resourcePath: z.string(),
        }),
      )
      .query(async ({ input, ctx }) => {
        const simulator = await ctx.simulator();
        const getUrlClient = simulator.getResource(
          input.resourcePath,
        ) as IFunctionClient;

        const url = await getUrlClient.invoke("");
        return {
          url,
        };
      }),

    "httpClient.getOpenApiSpec": createProcedure
      .input(
        z.object({
          resourcePath: z.string(),
        }),
      )
      .query(async ({ input, ctx }) => {
        const simulator = await ctx.simulator();
        const getApiSpecClient = simulator.getResource(
          input.resourcePath,
        ) as IFunctionClient;

        const openApiSpec = await getApiSpecClient.invoke("");
        return {
          openApiSpec: JSON.parse(openApiSpec ?? "{}"),
        };
      }),
  });
};
