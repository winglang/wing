import { z } from "zod";

import { createProcedure, createRouter } from "../utils/createRouter.js";
import { IFunctionClient } from "../wingsdk.js";

export type ResponseEnvelope =
  | {
      success: true;
      response: string;
    }
  | {
      success: false;
      error: unknown;
    };

export interface ErrorLike {
  message: string;
}

export const isErrorLike = (value: unknown): value is ErrorLike => {
  if (value instanceof Error) {
    return true;
  }

  if (typeof value === "object" && value !== null && "message" in value) {
    return true;
  }

  return false;
};

export const createFunctionRouter = () => {
  return createRouter({
    "function.invoke": createProcedure
      .input(
        z.object({
          resourcePath: z.string(),
          message: z.string(),
        }),
      )
      .mutation(async ({ input, ctx }) => {
        const simulator = await ctx.simulator();
        const client = simulator.getResource(
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
            error: isErrorLike(error) ? error.message : String(error),
          };
          return response;
        }
      }),
  });
};
