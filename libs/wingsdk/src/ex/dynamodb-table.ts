import {
  DeleteItemCommand,
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  ScanCommand,
  TransactWriteItemsCommand,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { Construct } from "constructs";
import { fqnForType } from "../constants";
import { App } from "../core";
import { Json, Node, Resource } from "../std";

/**
 * Global identifier for `DynamodbTable`.
 */
export const DYNAMODB_TABLE_FQN = fqnForType("ex.DynamodbTable");

/**
 * Properties for `DynamodbTable`.
 */
export interface DynamodbTableProps {
  /**
   * The table's name.
   */
  readonly name: string;
  /**
   * The table's primary key. No two rows can have the same value for the
   * primary key.
   */
  readonly primaryKey: string;
}

/**
 * A cloud Dynamodb table.
 *
 * @inflight `@winglang/sdk.ex.IDynamodbTableClient`
 */
export abstract class DynamodbTable extends Resource {
  /**
   * Create a new DynamodbTable.
   * @internal
   */
  public static _newDynamodbTable(
    scope: Construct,
    id: string,
    props: DynamodbTableProps
  ): DynamodbTable {
    return App.of(scope).newAbstract(DYNAMODB_TABLE_FQN, scope, id, props);
  }

  /**
   * Table name
   */
  public readonly name: string;
  /**
   * Table primary key name
   */
  public readonly primaryKey: string;

  constructor(scope: Construct, id: string, props: DynamodbTableProps) {
    super(scope, id);

    Node.of(this).title = "DynamodbTable";
    Node.of(this).description = "A DynamoDb Table";

    if (!props.name) {
      throw new Error("Dynamodb table name is not defined");
    }
    this.name = props.name;

    if (!props.primaryKey) {
      throw new Error("Dynamodb primary key is not defined");
    }
    this.primaryKey = props.primaryKey;
  }

  /** @internal */
  public _getInflightOps(): string[] {
    return [
      DynamodbTableInflightMethods.PUT_ITEM,
      DynamodbTableInflightMethods.UPDATE_ITEM,
      DynamodbTableInflightMethods.DELETE_ITEM,
      DynamodbTableInflightMethods.GET_ITEM,
      DynamodbTableInflightMethods.SCAN,
      DynamodbTableInflightMethods.TRANSACT_WRITE_ITEMS,
    ];
  }
}

/**
 * Properties for `DynamodbTable.putItem`.
 */
export interface DynamodbTablePutItemProps {
  /**
   * A condition that must be satisfied in order for an operation to succeed.
   * @default undefined
   */
  readonly conditionExpression?: string;
}

/**
 * Properties for `DynamodbTable.updateItem`.
 */
export interface DynamodbTableUpdateItemProps {
  /**
   * An expression that defines one or more attributes to be updated.
   * @default undefined
   */
  readonly updateExpression?: string;

  /**
   * One or more values that can be substituted in an expression.
   * @default undefined
   */
  readonly expressionAttributeValues?: Json;
}

/**
 * Properties for transact write item's update operation.
 */
export interface DynamodbTransactWriteItemPutProps {
  /**
   * The item to put.
   */
  readonly item: Json;
  /**
   * A condition that must be satisfied in order for an operation to succeed.
   * @default undefined
   */
  readonly conditionExpression?: string;
}

/**
 * Properties for transact write item's update operation.
 */
export interface DynamodbTransactWriteItemUpdateProps {
  /**
   * The item to update.
   */
  readonly key: string;
  /**
   * An expression that defines one or more attributes to be updated.
   * @default undefined
   */
  readonly updateExpression?: string;
  /**
   * One or more values that can be substituted in an expression.
   * @default undefined
   */
  readonly expressionAttributeValues?: Json;
}

/**
 * Properties for transact write item's delete operation.
 */
export interface DynamodbTransactWriteItemDeleteProps {
  /**
   * The item to delete.
   */
  readonly key: string;
}

/**
 * Dynamodb transact write operation
 */
export interface DynamodbTransactWriteItem {
  /**
   * A request to perform a put operation.
   */
  readonly put?: DynamodbTransactWriteItemPutProps;
  /**
   * A request to perform a update operation.
   */
  readonly update?: DynamodbTransactWriteItemUpdateProps;
  /**
   * A request to perform a delete operation.
   */
  readonly delete?: DynamodbTransactWriteItemDeleteProps;
}

/**
 * Properties for `DynamodbTable.transactWriteItems`.
 */
export interface DynamodbTransactWriteItemsProps {
  /**
   * The write transact items.
   */
  readonly transactItems: DynamodbTransactWriteItem[];
}

/**
 * Inflight interface for `DynamodbTable`.
 */
export interface IDynamodbTableClient {
  /**
   * Put an item into the table.
   * @param item data to be inserted.
   * @param props dynamodb PutItem props.
   * @inflight
   */
  putItem(item: Json, props?: DynamodbTablePutItemProps): Promise<void>;

  /**
   * Get an item from the table.
   * @param key key of the item.
   * @param props dynamodb UpdateItem props.
   * @inflight
   */
  updateItem(key: string, props?: DynamodbTableUpdateItemProps): Promise<Json>;

  /**
   * Delete an item from the table.
   * @param key key of the item.
   * @inflight
   */
  deleteItem(key: string): Promise<void>;

  /**
   * Get an item from the table.
   * @param key key of the item.
   * @inflight
   */
  getItem(key: string): Promise<Json>;

  /**
   * Get the table.
   * @inflight
   */
  scan(): Promise<Array<Json>>;

  /**
   * Perform a synchronous write operation that groups up to 100 action requests.
   * @param props properties for the transact write items operation.
   * @inflight
   */
  transactWriteItems(props: DynamodbTransactWriteItemsProps): Promise<void>;
}

/**
 * List of inflight operations available for `DynamodbTable`.
 * @internal
 */
export enum DynamodbTableInflightMethods {
  /** `DynamodbTable.putItem` */
  PUT_ITEM = "putItem",
  /** `DynamodbTable.updateItem` */
  UPDATE_ITEM = "updateItem",
  /** `DynamodbTable.deleteItem` */
  DELETE_ITEM = "deleteItem",
  /** `DynamodbTable.getItem` */
  GET_ITEM = "getItem",
  /** `DynamodbTable.scan` */
  SCAN = "scan",
  /** `DynamodbTable.transactWriteItems` */
  TRANSACT_WRITE_ITEMS = "transactWriteItems",
}

/**
 * Base class for `DynamodbTable` Client.
 */
export abstract class DynamodbTableClientBase implements IDynamodbTableClient {
  /**
   * @param tableName the table name.
   * @param primaryKey the table primary key.
   */
  constructor(protected tableName: string, protected primaryKey: string) {}

  /**
   * Dynamodb table client.
   * @internal
   */
  public abstract _rawClient(): Promise<DynamoDBClient>;

  public async putItem(
    item: Json,
    props?: DynamodbTablePutItemProps
  ): Promise<void> {
    const client = await this._rawClient();
    await client.send(
      new PutItemCommand({
        TableName: this.tableName,
        Item: marshall(item),
        ConditionExpression: props?.conditionExpression,
      })
    );
  }

  public async updateItem(
    key: string,
    props?: DynamodbTableUpdateItemProps
  ): Promise<Json> {
    const client = await this._rawClient();
    const result = await client.send(
      new UpdateItemCommand({
        TableName: this.tableName,
        Key: { [this.primaryKey]: { S: key } },
        UpdateExpression: props?.updateExpression,
        ExpressionAttributeValues: props?.expressionAttributeValues
          ? marshall(props?.expressionAttributeValues)
          : undefined,
      })
    );
    if (result.Attributes) {
      return unmarshall(result.Attributes) as Json;
    }
    return {} as Json;
  }

  public async deleteItem(key: string): Promise<void> {
    const client = await this._rawClient();
    await client.send(
      new DeleteItemCommand({
        TableName: this.tableName,
        Key: { [this.primaryKey]: { S: key } },
      })
    );
  }

  public async getItem(key: string): Promise<Json> {
    const client = await this._rawClient();
    const result = await client.send(
      new GetItemCommand({
        TableName: this.tableName,
        Key: { [this.primaryKey]: { S: key } },
      })
    );
    if (result.Item) {
      return unmarshall(result.Item) as Json;
    }
    return {} as Json;
  }

  public async scan(): Promise<Array<Json>> {
    const client = await this._rawClient();
    const result = await client.send(
      new ScanCommand({
        TableName: this.tableName,
      })
    );
    const response = [];
    if (result.Items) {
      for (const item of result.Items) {
        response.push(unmarshall(item) as Json);
      }
    }
    return response;
  }

  public async transactWriteItems(
    props: DynamodbTransactWriteItemsProps
  ): Promise<void> {
    const client = await this._rawClient();

    const items = props.transactItems.map((item) => {
      if (item.put) {
        return {
          Put: {
            TableName: this.tableName,
            Item: marshall(item.put.item),
            ConditionExpression: item.put.conditionExpression,
          },
        };
      } else if (item.update) {
        return {
          Update: {
            TableName: this.tableName,
            Key: { [this.primaryKey]: { S: item.update.key } },
            UpdateExpression: item.update.updateExpression,
            ExpressionAttributeValues: item.update.expressionAttributeValues
              ? marshall(item.update.expressionAttributeValues)
              : undefined,
          },
        };
      } else if (item.delete) {
        return {
          Delete: {
            TableName: this.tableName,
            Key: { [this.primaryKey]: { S: item.delete.key } },
          },
        };
      } else {
        throw Error(
          "A write transact item must define either `put`, `update` or `delete`."
        );
      }
    });
    await client.send(
      new TransactWriteItemsCommand({
        TransactItems: items,
      })
    );
  }
}
