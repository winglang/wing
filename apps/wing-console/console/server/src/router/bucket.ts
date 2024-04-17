import { z } from "zod";

import { createProcedure, createRouter } from "../utils/createRouter.js";
import type { IBucketClient } from "../wingsdk.js";

export const createBucketRouter = () => {
  return createRouter({
    "bucket.put": createProcedure
      .meta({
        analytics: {
          resource: "Bucket",
          action: "put",
        },
      })
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
      .meta({
        analytics: {
          resource: "Bucket",
          action: "get",
        },
      })
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
      .meta({
        analytics: {
          resource: "Bucket",
          action: "get",
        },
      })
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
      .meta({
        analytics: {
          resource: "Bucket",
          action: "list",
        },
      })
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
      .meta({
        analytics: {
          resource: "Bucket",
          action: "delete",
        },
      })
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
