import * as z from "zod";

import {
  createEnvironmentProcedure,
  createRouter,
} from "../utils/createRouter.js";
import type { IFunctionClient } from "../wingsdk.js";

export const createHttpClientRouter = () => {
  return createRouter({
    "httpClient.getUrl": createEnvironmentProcedure
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

        // @ts-ignore
        const url = await getUrlClient.invoke("");
        return {
          url,
        };
      }),

    "httpClient.getOpenApiSpec": createEnvironmentProcedure
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

        // @ts-ignore
        const openApiSpec = await getApiSpecClient.invoke("");
        return {
          // @ts-ignore
          openApiSpec: JSON.parse(openApiSpec ?? "{}"),
        };
      }),
  });
};
