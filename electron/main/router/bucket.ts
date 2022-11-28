import fs from "node:fs";

import { z } from "zod";

import { createRouter } from "../utils/createRouter.js";
import { IBucketClient } from "../wingsdk.js";

export const createBucketRouter = () => {
  return createRouter()
    .mutation("bucket.put", {
      input: z.object({
        resourcePath: z.string(),
        fileName: z.string(),
        filePath: z.string(),
      }),
      async resolve({ input, ctx }) {
        const simulator = await ctx.simulator();
        const client = simulator.getResourceByPath(
          input.resourcePath,
        ) as IBucketClient;
        const fileContent = await fs.promises.readFile(input.filePath, "utf8");
        const response = await client.put(input.fileName, fileContent);
        return response;
      },
    })
    .mutation("bucket.get", {
      input: z.object({
        resourcePath: z.string(),
        fileName: z.string(),
      }),
      async resolve({ input, ctx }) {
        const simulator = await ctx.simulator();
        const client = simulator.getResourceByPath(
          input.resourcePath,
        ) as IBucketClient;
        const response = await client.get(input.fileName);
        return response;
      },
    })
    .query("bucket.list", {
      input: z.object({
        resourcePath: z.string(),
      }),
      async resolve({ input, ctx }) {
        const simulator = await ctx.simulator();
        const client = simulator.getResourceByPath(
          input.resourcePath,
        ) as IBucketClient;
        const response = await client.list();
        return response;
      },
    });
};
