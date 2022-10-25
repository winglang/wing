import fs from "node:fs";

import * as trpc from "@trpc/server";
import { z } from "zod";

import { createBucketClient, Simulator } from "../wingsdk";

export const createBucketRouter = (simulator: Simulator) => {
  return trpc
    .router()
    .mutation("bucket.put", {
      input: z.object({
        resourcePath: z.string(),
        fileName: z.string(),
        filePath: z.string(),
      }),
      async resolve({ input }) {
        const addr = simulator.getAttributes(input.resourcePath).bucketAddr;
        const client = createBucketClient(addr);
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
      async resolve({ input }) {
        const addr = simulator.getAttributes(input.resourcePath).bucketAddr;
        const client = createBucketClient(addr);
        const response = await client.get(input.fileName);
        return response;
      },
    });
};
