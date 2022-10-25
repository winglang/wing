import * as trpc from "@trpc/server";
import { z } from "zod";

import { createQueueClient, Simulator } from "../wingsdk";

export const createQueueRouter = (simulator: Simulator) => {
  return trpc.router().mutation("queue.push", {
    input: z.object({
      resourcePath: z.string(),
      message: z.string(),
    }),
    async resolve({ input }) {
      const addr = simulator.getAttributes(input.resourcePath).queueAddr;
      const client = createQueueClient(addr);
      return client.push(input.message);
    },
  });
};
