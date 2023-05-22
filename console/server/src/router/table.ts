import { ColumnType } from "@winglang/sdk/lib/cloud/table.js";
import { z } from "zod";

import { createProcedure, createRouter } from "../utils/createRouter.js";
import { TableSchema, ITableClient, Json } from "../wingsdk.js";

interface Column {
  name: string;
  type: string;
}

const getColumns = (columns: Record<string, ColumnType>): Column[] => {
  const keys = Object.keys(ColumnType);
  const values = Object.values(ColumnType);

  return Object.keys(columns).map((key) => {
    const index = values.indexOf(columns[key] as ColumnType);
    const type = keys[index]?.toLowerCase() || "";
    return {
      name: key,
      type,
    };
  });
};

const parseRow = (row: any, schema: Column[]) => {
  for (const key in row) {
    const column = schema.find((item) => item.name === key);
    if (!column) {
      continue;
    }
    switch (column.type) {
      case "number": {
        const value = Number(row[key]);
        if (!Number.isNaN(value)) {
          row[key] = Number(row[key]);
        }
        break;
      }
      case "boolean": {
        row[key] = Boolean(row[key]);
        break;
      }
    }
  }
  return row;
};

export const createTableRouter = () => {
  return createRouter({
    "table.info": createProcedure
      .input(
        z.object({
          resourcePath: z.string(),
        }),
      )
      .query(async ({ input, ctx }) => {
        const simulator = await ctx.simulator();
        const schema = simulator.getResourceConfig(
          input.resourcePath,
        ) as TableSchema;
        const client = simulator.getResource(
          input.resourcePath,
        ) as ITableClient;
        const rows = await client.list();
        return {
          name: schema.props.name,
          primaryKey: schema.props.primaryKey,
          columns: getColumns(schema.props.columns),
          rows,
        };
      }),
    "table.get": createProcedure
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
        ) as ITableClient;
        return await client.get(input.id);
      }),
    "table.insert": createProcedure
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
        ) as ITableClient;

        const schema = simulator.getResourceConfig(
          input.resourcePath,
        ) as TableSchema;
        const id = input.data[schema.props.primaryKey] as string;
        const columns = getColumns(schema.props.columns);
        await client.insert(id, parseRow(input.data, columns));
      }),
    "table.update": createProcedure
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
        ) as ITableClient;

        const schema = simulator.getResourceConfig(
          input.resourcePath,
        ) as TableSchema;
        const id = input.data[schema.props.primaryKey] as string;
        const columns = getColumns(schema.props.columns);
        return await client.update(id, parseRow(input.data, columns));
      }),
    "table.delete": createProcedure
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
        ) as ITableClient;

        const schema = simulator.getResourceConfig(
          input.resourcePath,
        ) as TableSchema;
        const id = input.data[schema.props.primaryKey] as string;
        return await client.delete(id);
      }),
  });
};
