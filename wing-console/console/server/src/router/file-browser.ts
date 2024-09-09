import { z } from "zod";

import { createProcedure, createRouter } from "../utils/createRouter.js";
import type { IFunctionClient } from "../wingsdk.js";

export const createFileBrowserRouter = () => {
  return createRouter({
    "fileBrowser.get": createProcedure
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
          JSON.stringify({ fileName: input.fileName }),
        );
      }),

    "fileBrowser.list": createProcedure
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

    "fileBrowser.put": createProcedure
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
          JSON.stringify({
            fileName: input.fileName,
            fileContent: input.fileContent,
          }),
        );
      }),

    "fileBrowser.delete": createProcedure
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
          JSON.stringify({
            fileName: input.fileName,
          }),
        );
      }),

    "fileBrowser.download": createProcedure
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
          JSON.stringify({
            fileName: input.fileName,
          }),
        );
      }),
  });
};
