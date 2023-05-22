import { ColumnType as SdkColumnType } from "@winglang/sdk/lib/cloud/table.js";
import { z } from "zod";

import { createProcedure, createRouter } from "../utils/createRouter.js";
import { TableSchema, ITableClient, Json } from "../wingsdk.js";

type ColumnType = "string" | "number" | "boolean" | "date" | "json";

interface Column {
  name: string;
  type: ColumnType;
}

const getColumns = (
  columns: Record<string, SdkColumnType>,
  primaryKey?: string, // add primaryKey to columns if not exists
): Column[] => {
  const keys = Object.keys(SdkColumnType);
  const values = Object.values(SdkColumnType);

  const newColumns = Object.keys(columns).map((key) => {
    const index = values.indexOf(columns[key] as SdkColumnType);
    const type = keys[index]?.toLowerCase() as ColumnType;
    return {
      name: key,
      type,
    };
  });

  if (primaryKey && !newColumns.some((column) => column.name === primaryKey)) {
    newColumns.unshift({
      name: primaryKey,
      type: "string",
    });
  }

  return newColumns;
};

const parseRow = (row: any, schema: Column[]): any => {
  const parsedRow: any = {};

  for (const column of schema) {
    const { name, type } = column;
    if (row.hasOwnProperty(name)) {
      let value = row[name];

      switch (type) {
        case "number": {
          value = Number(value);
          parsedRow[name] = Number.isNaN(value) ? row[name] : value;
          break;
        }
        case "boolean": {
          parsedRow[name] = Boolean(value);
          break;
        }

        default: {
          parsedRow[name] = value;
        }
      }
    }
  }
  return parsedRow;
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
        const primaryKey = schema.props.primaryKey;
        return {
          name: schema.props.name,
          primaryKey,
          columns: getColumns(schema.props.columns, primaryKey),
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

        const primaryKey = schema.props.primaryKey;
        const id = input.data[primaryKey] as string;
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

        const primaryKey = schema.props.primaryKey;
        const id = input.data[primaryKey] as string;
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
