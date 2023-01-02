import fs from "node:fs";

import { z } from "zod";

import { publicProcedure, router } from "../utils/createRouter.js";
import { IBucketClient } from "../wingsdk.js";

export const createBucketRouter = () => {
  return router({
    "bucket.put": publicProcedure
      .input(
        z.object({
          resourcePath: z.string(),
          fileName: z.string(),
          filePath: z.string(),
        }),
      )
      .mutation(async ({ input, ctx }) => {
        const simulator = await ctx.simulator();
        const client = simulator.getResource(
          input.resourcePath,
        ) as IBucketClient;
        const fileContent = await fs.promises.readFile(input.filePath, "utf8");
        const response = await client.put(input.fileName, fileContent);
        return response;
      }),
    "bucket.get": publicProcedure
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
        ) as IBucketClient;
        const response = await client.get(input.fileName);
        return response;
      }),
    "bucket.list": publicProcedure
      .input(
        z.object({
          resourcePath: z.string(),
        }),
      )
      .query(async ({ input, ctx }) => {
        const simulator = await ctx.simulator();
        const client = simulator.getResource(
          input.resourcePath,
        ) as IBucketClient;
        const response = await client.list();
        return response;
      }),
  });
};
