import * as trpc from "@trpc/server";
import { z } from "zod";

import { Simulator } from "../wingsdk.js";

export const createQueueRouter = (simulator: Simulator) => {
  return trpc.router().mutation("queue.push", {
    input: z.object({
      resourcePath: z.string(),
      message: z.string(),
    }),
    async resolve({ input }) {
      const client = simulator.getResourceByPath(input.resourcePath);
      return client.push(input.message);
    },
  });
};
