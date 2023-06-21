import { errorMessage } from "@wingconsole/error-message";
import { createClient } from "redis";
import { z } from "zod";

import { createProcedure, createRouter } from "../utils/createRouter.js";
import { IRedisClient } from "../wingsdk.js";

const parseRedisErrorMessage = (response: string) => {
  const emptyArgumentsText = ", with args beginning with: ";
  if (response.endsWith(emptyArgumentsText)) {
    return response.replace(emptyArgumentsText, "");
  }
  return response;
};

export const createRedisRouter = () => {
  return createRouter({
    "redis.info": createProcedure
      .input(
        z.object({
          resourcePath: z.string(),
        }),
      )
      .query(async ({ input, ctx }) => {
        const simulator = await ctx.simulator();
        const client = simulator.getResource(
          input.resourcePath,
        ) as IRedisClient;

        return {
          url: await client.url(),
        };
      }),
    "redis.exec": createProcedure
      .input(
        z.object({
          resourcePath: z.string(),
          command: z.string(),
        }),
      )
      .mutation(async ({ input, ctx }) => {
        const simulator = await ctx.simulator();
        const client = simulator.getResource(
          input.resourcePath,
        ) as IRedisClient;
        const url = await client.url();

        const redisClient = createClient({ url });
        try {
          await redisClient.connect();
          const response = await redisClient.sendCommand(
            input.command.split(" "),
          );
          return response ? `"${response}"` : "(nil)";
        } catch (error) {
          return parseRedisErrorMessage(errorMessage(error));
        } finally {
          await redisClient.disconnect();
        }
      }),
  });
};
