import { z } from "zod";

import { createProcedure, createRouter } from "../utils/createRouter.js";
import { DynamodbTableSchema, IDynamodbTableClient, Json } from "../wingsdk.js";

export const createDynamodbTableRouter = () => {
  return createRouter({
    "dynamodb-table.info": createProcedure
      .input(
        z.object({
          resourcePath: z.string(),
        }),
      )
      .query(async ({ input, ctx }) => {
        const simulator = await ctx.simulator();
        const schema = simulator.getResourceConfig(
          input.resourcePath,
        ) as DynamodbTableSchema;
        const client = simulator.getResource(
          input.resourcePath,
        ) as IDynamodbTableClient;
        const rows = await client.scan();
        const primaryKey = schema.props.primaryKey;
        return {
          name: schema.props.name,
          primaryKey,
          rows,
        };
      }),
    "dynamodb-table.get": createProcedure
      .input(
        z.object({
          resourcePath: z.string(),
          id: z.string(),
        }),
      )
      .query(async ({ input, ctx }) => {
        const simulator = await ctx.simulator();
        const client = simulator.getResource(
          input.resourcePath,
        ) as IDynamodbTableClient;
        return await client.getItem(input.id);
      }),
    "dynamodb-table.insert": createProcedure
      .input(
        z.object({
          resourcePath: z.string(),
          data: z.record(z.any()),
        }),
      )
      .mutation(async ({ input, ctx }) => {
        const simulator = await ctx.simulator();
        const client = simulator.getResource(
          input.resourcePath,
        ) as IDynamodbTableClient;

        await client.putItem(input.data as Json);
      }),
    "dynamodb-table.delete": createProcedure
      .input(
        z.object({
          resourcePath: z.string(),
          data: z.record(z.any()),
        }),
      )
      .mutation(async ({ input, ctx }) => {
        const simulator = await ctx.simulator();
        const client = simulator.getResource(
          input.resourcePath,
        ) as IDynamodbTableClient;

        const schema = simulator.getResourceConfig(
          input.resourcePath,
        ) as DynamodbTableSchema;
        const id = input.data[schema.props.primaryKey] as string;
        return await client.deleteItem(id);
      }),
  });
};
