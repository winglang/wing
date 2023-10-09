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
        const attributeDefinitions = schema.props.attributeDefinitions;
        const hashKey = schema.props.hashKey;
        const rangeKey = schema.props.rangeKey;
        return {
          name: schema.props.name,
          attributeDefinitions,
          hashKey,
          rangeKey,
          rows,
        };
      }),
    "dynamodb-table.get": createProcedure
      .input(
        z.object({
          resourcePath: z.string(),
          key: z.record(z.any()),
        }),
      )
      .query(async ({ input, ctx }) => {
        const simulator = await ctx.simulator();
        const client = simulator.getResource(
          input.resourcePath,
        ) as IDynamodbTableClient;
        const { item } = await client.getItem(input.key as any);
        return item;
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

        await client.putItem({ item: input.data as Json });
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
        const itemKey = {
          [schema.props.hashKey]: input.data[schema.props.hashKey],
          ...(schema.props.rangeKey
            ? { [schema.props.rangeKey]: input.data[schema.props.rangeKey] }
            : {}),
        };
        return await client.deleteItem({ key: itemKey as Json });
      }),
  });
};
