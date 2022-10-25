import * as trpc from "@trpc/server";
import { z } from "zod";

import { createFunctionClient, Simulator } from "../wingsdk";

export const createFunctionRouter = (simulator: Simulator) => {
  return trpc
    .router()
    .query("function.timesCalled", {
      input: z.object({
        resourcePath: z.string(),
      }),
      async resolve({ input }) {
        const addr = simulator.getAttributes(input.resourcePath).functionAddr;
        const client = createFunctionClient(addr);
        const response = await client.timesCalled();
        return response;
      },
    })
    .mutation("function.invoke", {
      input: z.object({
        resourcePath: z.string(),
        message: z.string(),
      }),
      async resolve({ input }) {
        const addr = simulator.getAttributes(input.resourcePath).functionAddr;
        const client = createFunctionClient(addr);
        const response = await client.invoke(input.message);
        return {
          success: true,
          response,
        };
      },
    });
};
