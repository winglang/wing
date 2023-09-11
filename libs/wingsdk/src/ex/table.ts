import { Construct } from "constructs";
import { fqnForType } from "../constants";
import { App } from "../core";
import { Json, Node, Resource } from "../std";

/**
 * Global identifier for `Table`.
 */
export const TABLE_FQN = fqnForType("ex.Table");

/**
 * Table column types
 */
export enum ColumnType {
  /** String type */
  STRING,
  /** Number type */
  NUMBER,
  /** Bool type */
  BOOLEAN,
  /** Date type */
  DATE,
  /** Json type */
  JSON,
}

/**
 * Properties for `Table`.
 */
export interface TableProps {
  /**
   * The table's name.
   * @default undefined
   */
  readonly name?: string;
  /**
   * The table's columns.
   * @default undefined
   */
  readonly columns?: { [key: string]: ColumnType };
  /**
   * The table's primary key. No two rows can have the same value for the
   * primary key.
   * @default undefined
   */
  readonly primaryKey?: string;
  /**
   * The table's initial rows.
   * @default undefined
   */
  readonly initialRows?: { [key: string]: Json };
}

/**
 * A NoSQL database table that can be used to store and query data.
 * @inflight `@winglang/sdk.ex.ITableClient`
 */
export abstract class Table extends Resource {
  /**
   * Create a new `Table` instance.
   * @internal
   */
  public static _newTable(
    scope: Construct,
    id: string,
    props: TableProps = {}
  ): Table {
    return App.of(scope).newAbstract(TABLE_FQN, scope, id, props);
  }

  /**
   * Table name
   */
  public readonly name: string;
  /**
   * Table primary key name
   */
  public readonly primaryKey: string;
  /**
   * Table columns
   */
  public readonly columns: { [key: string]: ColumnType };

  constructor(scope: Construct, id: string, props: TableProps) {
    super(scope, id);

    Node.of(this).title = "Table";
    Node.of(this).description =
      "A cloud NoSQL database table that can be used to store and query data";

    if (!props.name) {
      throw new Error("Table name is not defined");
    }
    this.name = props.name;
    if (!props.primaryKey) {
      throw new Error("Primary Key is not defined");
    }
    this.primaryKey = props.primaryKey;

    if (!props.columns) {
      throw new Error("No column is defined");
    }
    this.columns = props.columns;
  }

  /** @internal */
  public _getInflightOps(): string[] {
    return [
      TableInflightMethods.INSERT,
      TableInflightMethods.UPSERT,
      TableInflightMethods.UPDATE,
      TableInflightMethods.DELETE,
      TableInflightMethods.GET,
      TableInflightMethods.TRYGET,
      TableInflightMethods.LIST,
    ];
  }

  /**
   * Add a row to the table that is created when the app is deployed.
   */
  public abstract addRow(key: string, row: Json): void;
}

/**
 * Inflight interface for `Table`.
 */
export interface ITableClient {
  /**
   * Insert a row into the table.
   * @param key primary key to insert the row.
   * @param row data to be inserted.
   * @inflight
   */
  insert(key: string, row: Json): Promise<void>;
  /**
   * Insert a row into the table if it doesn't exist, otherwise update it.
   * @param key primary key to upsert the row.
   * @param row data to be upserted.
   * @inflight
   */
  upsert(key: string, row: Json): Promise<void>;
  /**
   * Update a row in the table.
   * @param key primary key to update the row.
   * @param row data to be updated.
   * @inflight
   */
  update(key: string, row: Json): Promise<void>;
  /**
   * Delete a row from the table, by primary key.
   * @param key primary key to delete the row.
   * @inflight
   */
  delete(key: string): Promise<void>;
  /**
   * Get a row from the table, by primary key.
   * @param key primary key to search.
   * @returns get the row from table.
   * @throws if no row with the given key exists.
   * @inflight
   */
  get(key: string): Promise<Json>;
  /**
   * Get a row from the table if exists, by primary key.
   * @param key primary key to search.
   * @returns get the row from table if it exists, nil otherwise.
   * @inflight
   */
  tryGet(key: string): Promise<Json | undefined>;
  /**
   * List all rows in the table.
   * @returns list all row.
   * @inflight
   */
  // TODO: change the return type to Iterator<Map<string, Json>> in the future.
  list(): Promise<Array<Json>>;
}

/**
 * List of inflight operations available for `Table`.
 * @internal
 */
export enum TableInflightMethods {
  /** `Table.insert` */
  INSERT = "insert",
  /** `Table.insert` */
  UPSERT = "upsert",
  /** `Table.update` */
  UPDATE = "update",
  /** `Table.delete` */
  DELETE = "delete",
  /** `Table.get` */
  GET = "get",
  /** `Table.tryGet` */
  TRYGET = "tryGet",
  /** `Table.list` */
  LIST = "list",
}
