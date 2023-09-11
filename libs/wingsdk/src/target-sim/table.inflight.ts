import { TableAttributes, TableSchema } from "./schema-resources";
import { ColumnType, ITableClient } from "../ex";
import { validateRow } from "../shared/table-utils";
import { Json } from "../std";
import {
  ISimulatorContext,
  ISimulatorResourceInstance,
} from "../testing/simulator";

export class Table implements ITableClient, ISimulatorResourceInstance {
  private name: string;
  private columns: { [key: string]: ColumnType };
  private primaryKey: string;
  private table: Map<string, any>;
  private readonly context: ISimulatorContext;
  private readonly initialRows: Record<string, Json>;

  public constructor(props: TableSchema["props"], context: ISimulatorContext) {
    this.name = props.name;
    this.columns = props.columns;
    this.primaryKey = props.primaryKey;
    this.table = new Map<string, any>();
    this.context = context;
    this.initialRows = props.initialRows ?? {};
  }

  public async init(): Promise<TableAttributes> {
    for (const [key, row] of Object.entries(this.initialRows)) {
      await this.context.withTrace({
        message: `Adding initial row (key=${key}).`,
        activity: async () => {
          return this.table.set(key, row);
        },
      });
    }
    return {};
  }

  public async cleanup(): Promise<void> {}

  public async insert(key: string, row: Json): Promise<void> {
    validateRow(row, this.columns);
    const anyRow = row as any;
    return this.context.withTrace({
      message: `insert row ${key} into the table ${this.name}.`,
      activity: async () => {
        if (await this.tryGet(key)) {
          throw new Error(
            `The primary key "${key}" already exists in the "${this.name}" table.`
          );
        }
        let item: Record<string, any> = {};
        item[this.primaryKey] = key;
        for (const column of Object.keys(this.columns)) {
          item[column] = anyRow[column];
        }
        this.table.set(key, item);
      },
    });
  }
  public async upsert(key: string, row: Json): Promise<void> {
    validateRow(row, this.columns);
    const anyRow = row as any;
    return this.context.withTrace({
      message: `upsert row ${key} into the table ${this.name}.`,
      activity: async () => {
        let item: Record<string, any> = {};
        item[this.primaryKey] = key;
        for (const column of Object.keys(this.columns)) {
          item[column] = anyRow[column];
        }
        this.table.set(key, item);
      },
    });
  }
  public async update(key: string, row: Json): Promise<void> {
    validateRow(row, this.columns);
    const anyRow = row as any;
    return this.context.withTrace({
      message: `update row ${key} in table ${this.name}.`,
      activity: async () => {
        try {
          let item: any = await this.get(key);

          for (const column of Object.keys(this.columns)) {
            if (anyRow[column]) {
              item[column] = anyRow[column];
            }
          }
          this.table.set(key, item);
        } catch {
          throw new Error(
            `The primary key "${key}" was not found in the "${this.name}" table.`
          );
        }
      },
    });
  }
  public async delete(key: string): Promise<void> {
    return this.context.withTrace({
      message: `remove row ${key} from table ${this.name}.`,
      activity: async () => {
        if (!this.table.delete(key)) {
          throw new Error(
            `The primary key "${key}" not found in the "${this.name}" table.`
          );
        }
      },
    });
  }
  public async get(key: string): Promise<Json> {
    return this.context.withTrace({
      message: `get row ${key} from table ${this.name}.`,
      activity: async () => {
        let item = this.table.get(key);
        if (item) {
          return item;
        }
        throw new Error(`Row does not exist (key=${key})`);
      },
    });
  }

  public async tryGet(key: string): Promise<Json | undefined> {
    if (this.table.has(key)) {
      return this.get(key);
    }
    return undefined;
  }

  public async list(): Promise<Array<Json>> {
    return this.context.withTrace({
      message: `list all rows from table ${this.name}.`,
      activity: async () => {
        return Array.from(this.table.values());
      },
    });
  }
}
