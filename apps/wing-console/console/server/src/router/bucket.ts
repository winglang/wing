import fs from "node:fs";

import { z } from "zod";

import { createProcedure, createRouter } from "../utils/createRouter.js";
import { IBucketClient } from "../wingsdk.js";

export const createBucketRouter = () => {
  return createRouter({
    "bucket.put": createProcedure
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
        ) as IBucketClient;
        const response = await client.put(input.fileName, input.fileContent);
        return response;
      }),
    "bucket.get": createProcedure
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
        ) as IBucketClient;
        const response = await client.get(input.fileName);
        return response;
      }),
    "bucket.download": createProcedure
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
    "bucket.list": createProcedure
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
    "bucket.delete": createProcedure
      .input(
        z.object({
          resourcePath: z.string(),
          fileNames: z.array(z.string()),
        }),
      )
      .mutation(async ({ input, ctx }) => {
        const simulator = await ctx.simulator();
        const client = simulator.getResource(
          input.resourcePath,
        ) as IBucketClient;

        let promises = [];
        for (const fileName of input.fileNames) {
          promises.push(client.delete(fileName));
        }
        await Promise.all(promises);
      }),
  });
};
