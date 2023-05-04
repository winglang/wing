import { errorMessage } from "@wingconsole/error-message";
import fetch from "node-fetch";
import { z } from "zod";

import { createProcedure, createRouter } from "../utils/createRouter.js";
import { ApiSchema, OpenApiSpec } from "../wingsdk.js";

export const createApiRouter = () => {
  return createRouter({
    "api.schema": createProcedure
      .input(
        z.object({
          resourcePath: z.string(),
        }),
      )
      .query(async ({ input, ctx }) => {
        const simulator = await ctx.simulator();
        const config = simulator.getResourceConfig(
          input.resourcePath,
        ) as ApiSchema;
        return {
          url: config.attrs.url,
          // TODO: remove this cast when https://github.com/winglang/wing/blob/a0ee4a0ae81ffb88d87464c6d54f8cd7e2371008/libs/wingsdk/src/cloud/api.ts#L20 is done
          openApiSpec: config.props.openApiSpec as unknown,
        };
      }),

    "api.fetch": createProcedure
      .input(
        z.object({
          url: z.string(),
          route: z.string(),
          method: z.string(),
          headers: z
            .array(z.object({ key: z.string(), value: z.string() }))
            .optional(),
          variables: z
            .array(z.object({ key: z.string(), value: z.string() }))
            .optional(),
          body: z.string().optional(),
        }),
      )
      .mutation(async ({ input, ctx }) => {
        const startTime = Date.now();
        let route = input.route;
        for (const { key, value } of input.variables ?? []) {
          route = route.replace(`{${key}}`, value);
        }
        try {
          const url = new URL(`${input.url}${route}`);
          const response = await fetch(url.toString(), {
            method: input.method,
            headers: input.headers?.reduce(
              (accumulator, { key, value }) => ({
                ...accumulator,
                [key]: value,
              }),
              {},
            ),
            body:
              input.method !== "GET" && input.method !== "HEAD"
                ? input.body
                : undefined,
          });
          return {
            url: url.toString(),
            status: response.status,
            statusText: response.statusText,
            headers: [...response.headers.entries()].map(([key, value]) => ({
              key,
              value,
            })),
            textResponse: await response.text(),
            duration: Date.now() - startTime,
          };
        } catch (error) {
          return {
            url: `${input.url}${input.route}`,
            status: 500,
            statusText: "Internal Server Error",
            headers: [],
            textResponse: errorMessage(error),
            duration: Date.now() - startTime,
          };
        }
      }),
  });
};
