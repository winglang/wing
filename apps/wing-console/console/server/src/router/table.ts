import { z } from "zod";

import { createProcedure, createRouter } from "../utils/createRouter.js";
import type { IFunctionClient } from "../wingsdk.js";

export const createtableRouter = () => {
  return createRouter({
    "table.primaryKey": createProcedure
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
        return await client.invoke();
      }),
    "table.get": createProcedure
      .input(
        z.object({
          resourcePath: z.string(),
          key: z.string(),
        }),
      )
      .query(async ({ input, ctx }) => {
        const simulator = await ctx.simulator();
        const client = simulator.getResource(
          input.resourcePath,
        ) as IFunctionClient;
        return await client.invoke(JSON.stringify({ key: input.key }));
      }),

    "table.scan": createProcedure
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

    "table.put": createProcedure
      .input(
        z.object({
          resourcePath: z.string(),
          key: z.string(),
          row: z.string(),
        }),
      )
      .mutation(async ({ input, ctx }) => {
        const simulator = await ctx.simulator();
        const client = simulator.getResource(
          input.resourcePath,
        ) as IFunctionClient;
        return await client.invoke(
          JSON.stringify({
            key: input.key,
            row: input.row,
          }),
        );
      }),

    "table.delete": createProcedure
      .input(
        z.object({
          resourcePath: z.string(),
          key: z.string(),
        }),
      )
      .mutation(async ({ input, ctx }) => {
        const simulator = await ctx.simulator();
        const client = simulator.getResource(
          input.resourcePath,
        ) as IFunctionClient;
        return await client.invoke(
          JSON.stringify({
            key: input.key,
          }),
        );
      }),
  });
};
