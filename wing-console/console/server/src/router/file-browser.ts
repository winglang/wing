import * as z from "zod";

import {
  createEnvironmentProcedure,
  createProcedure,
  createRouter,
} from "../utils/createRouter.js";
import type { IFunctionClient } from "../wingsdk.js";

export const createFileBrowserRouter = () => {
  return createRouter({
    "fileBrowser.get": createEnvironmentProcedure
      .input(
        z.object({
          resourcePath: z.string(),
          fileName: z.string(),
        }),
      )
      .query(async ({ input, ctx }) => {
        const simulator = await ctx.simulator();
        const client = simulator.getResource(
          input.resourcePath,
        ) as IFunctionClient;
        return await client.invoke(
          // @ts-ignore
          JSON.stringify({ fileName: input.fileName }),
        );
      }),

    "fileBrowser.list": createEnvironmentProcedure
      .input(
        z.object({
          resourcePath: z.string(),
        }),
      )
      .query(async ({ input, ctx }) => {
        const simulator = await ctx.simulator();
        const client = simulator.getResource(input.resourcePath);
        return (await client.invoke()) as string[];
      }),

    "fileBrowser.put": createEnvironmentProcedure
      .input(
        z.object({
          resourcePath: z.string(),
          fileName: z.string(),
          fileContent: z.string(),
        }),
      )
      .mutation(async ({ input, ctx }) => {
        const simulator = await ctx.simulator();
        const client = simulator.getResource(
          input.resourcePath,
        ) as IFunctionClient;
        return await client.invoke(
          // @ts-ignore
          JSON.stringify({
            fileName: input.fileName,
            fileContent: input.fileContent,
          }),
        );
      }),

    "fileBrowser.delete": createEnvironmentProcedure
      .input(
        z.object({
          resourcePath: z.string(),
          fileName: z.string(),
        }),
      )
      .mutation(async ({ input, ctx }) => {
        const simulator = await ctx.simulator();
        const client = simulator.getResource(
          input.resourcePath,
        ) as IFunctionClient;
        return await client.invoke(
          // @ts-ignore
          JSON.stringify({
            fileName: input.fileName,
          }),
        );
      }),

    "fileBrowser.download": createEnvironmentProcedure
      .input(
        z.object({
          resourcePath: z.string(),
          fileName: z.string(),
        }),
      )
      .mutation(async ({ input, ctx }) => {
        const simulator = await ctx.simulator();
        const client = simulator.getResource(
          input.resourcePath,
        ) as IFunctionClient;
        return await client.invoke(
          // @ts-ignore
          JSON.stringify({
            fileName: input.fileName,
          }),
        );
      }),
  });
};
