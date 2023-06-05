import { Construct } from "constructs";
import { fqnForType } from "../constants";
import { App } from "../core";
import { Json, Resource } from "../std";

/**
 * Global identifier for `Table`.
 */
export const TABLE_FQN = fqnForType("cloud.Table");

/**
 * Table column types
 */
export enum ColumnType {
  /** string type */
  STRING,
  /** number type */
  NUMBER,
  /** bool type */
  BOOLEAN,
  /** date type */
  DATE,
  /** json type */
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
}

/**
 * Represents a NoSQL database table that can be used to store and query data.
 * @inflight `@winglang/sdk.cloud.ITableClient`
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

    this.display.title = "Table";
    this.display.description =
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

    this._addInflightOps(
      TableInflightMethods.INSERT,
      TableInflightMethods.UPDATE,
      TableInflightMethods.DELETE,
      TableInflightMethods.GET,
      TableInflightMethods.LIST
    );
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
   * @inflight
   */
  get(key: string): Promise<Json>;
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
  /** `Table.update` */
  UPDATE = "update",
  /** `Table.delete` */
  DELETE = "delete",
  /** `Table.get` */
  GET = "get",
  /** `Table.list` */
  LIST = "list",
}
