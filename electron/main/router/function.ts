import * as trpc from "@trpc/server";
import { z } from "zod";

import { IFunctionClient, Simulator } from "../wingsdk.js";

type ResponseEnvelope =
  | {
      success: true;
      response: string;
    }
  | {
      success: false;
      error: unknown;
    };

export const createFunctionRouter = (simulator: Simulator) => {
  return trpc.router().mutation("function.invoke", {
    input: z.object({
      resourcePath: z.string(),
      message: z.string(),
    }),
    async resolve({ input }) {
      const client = simulator.getResourceByPath(
        input.resourcePath,
      ) as IFunctionClient;
      try {
        const response: ResponseEnvelope = {
          success: true,
          response: await client.invoke(input.message),
        };
        return response;
      } catch (error) {
        const response: ResponseEnvelope = {
          success: false,
          error: error instanceof Error ? error.message : error,
        };
        return response;
      }
    },
  });
};
