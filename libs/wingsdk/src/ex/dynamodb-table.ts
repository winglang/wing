import {
  DeleteItemCommand,
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  QueryCommand,
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
   * Table attribute definitions. e.g.  { "myKey": "S", "myOtherKey": "S" }.
   */
  readonly attributeDefinitions: Json;
  /**
   * Hash key for this table.
   */
  readonly hashKey: string;
  /**
   * Range key for this table.
   * @default undefined
   */
  readonly rangeKey?: string;
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

  constructor(scope: Construct, id: string, props: DynamodbTableProps) {
    super(scope, id);

    Node.of(this).title = "DynamodbTable";
    Node.of(this).description = "A DynamoDb Table";

    if (!props.name) {
      throw new Error("Dynamodb table name is not defined");
    }
    this.name = props.name;
  }

  /** @internal */
  public _getInflightOps(): string[] {
    return [
      DynamodbTableInflightMethods.PUT_ITEM,
      DynamodbTableInflightMethods.UPDATE_ITEM,
      DynamodbTableInflightMethods.DELETE_ITEM,
      DynamodbTableInflightMethods.GET_ITEM,
      DynamodbTableInflightMethods.SCAN,
      DynamodbTableInflightMethods.QUERY,
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
 * Properties for `DynamodbTable.scan`.
 */
export interface DynamodbTableScanProps {
  /**
   * Determines the read consistency model: If set to true, then the operation uses strongly consistent reads; otherwise, the operation uses eventually consistent reads.
   *
   * @default false
   * @see https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html#DDB-Scan-request-ConsistentRead
   */
  readonly consistentRead?: boolean;

  /**
   * The primary key of the first item that this operation will evaluate.
   *
   * @default undefined
   * @see https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html#DDB-Scan-request-ExclusiveStartKey
   */
  readonly exclusiveStartKey?: Json;

  /**
   * One or more substitution tokens for attribute names in an expression.
   *
   * @default undefined
   * @see https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html#DDB-Scan-request-ExpressionAttributeNames
   */
  readonly expressionAttributeNames?: Json;

  /**
   * One or more values that can be substituted in an expression.
   *
   * @default undefined
   * @see https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html#DDB-Scan-request-ExpressionAttributeValues
   */
  readonly expressionAttributeValues?: Json;

  /**
   * A string that contains conditions that DynamoDB applies after the Query operation, but before the data is returned to you.
   *
   * @default undefined
   * @see https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html#DDB-Scan-request-FilterExpression
   */
  readonly filterExpression?: string;

  /**
   * The name of an index to query.
   *
   * @default undefined
   * @see https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html#DDB-Scan-request-IndexName
   */
  readonly indexName?: string;

  /**
   * The maximum number of items to evaluate (not necessarily the number of matching items).
   *
   * @minimum 1
   * @default undefined
   * @see https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html#DDB-Scan-request-Limit
   */
  readonly limit?: number;

  /**
   * A string that identifies one or more attributes to retrieve from the table.
   *
   * @default undefined
   * @see https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html#DDB-Scan-request-ProjectionExpression
   */
  readonly projectionExpression?: string;

  /**
   * Determines the level of detail about either provisioned or on-demand throughput consumption.
   *
   * @default "NONE"
   * @see https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html#DDB-Scan-request-ReturnConsumedCapacity
   */
  readonly returnConsumedCapacity?: "INDEXES" | "TOTAL" | "NONE";

  /**
   * For a parallel Scan request, Segment identifies an individual segment to be scanned by an application worker.
   *
   * @minimum 0
   * @maximum 999999
   * @default 0
   * @see https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html#DDB-Scan-request-Segment
   */
  readonly segment?: number;

  /**
   * The attributes to be returned in the result.
   *
   * @default undefined
   * @see https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html#DDB-Scan-request-Select
   */
  readonly select?:
    | "ALL_ATTRIBUTES"
    | "ALL_PROJECTED_ATTRIBUTES"
    | "SPECIFIC_ATTRIBUTES"
    | "COUNT";

  /**
   * For a parallel Scan request, TotalSegments represents the total number of segments into which the Scan operation will be divided.
   *
   * @minimum 1
   * @maximum 1000000
   * @default 1
   * @see https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html#DDB-Scan-request-TotalSegments
   */
  readonly totalSegments?: number;
}

/**
 * Result for `DynamodbTable.scan`.
 * @see https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html#API_Scan_ResponseSyntax
 */
export interface DynamodbTableScanResult {
  /**
   * The capacity units consumed by the Scan operation.
   */
  readonly consumedCapacity?: Json;

  /**
   * The number of items in the response.
   */
  readonly count: number;

  /**
   * An array of item attributes that match the scan criteria.
   */
  readonly items: Array<Json>;

  /**
   * The primary key of the item where the operation stopped, inclusive of the previous result set.
   */
  readonly lastEvaluatedKey?: Json;

  /**
   * The number of items evaluated, before any ScanFilter is applied.
   */
  readonly scannedCount: number;
}

/**
 * Properties for `DynamodbTable.query`.
 */
export interface DynamodbTableQueryProps {
  /**
   * Determines the read consistency model: If set to true, then the operation uses strongly consistent reads; otherwise, the operation uses eventually consistent reads.
   *
   * @default false
   * @see https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Query.html#DDB-Query-request-ConsistentRead
   */
  readonly consistentRead?: boolean;

  /**
   * The primary key of the first item that this operation will evaluate.
   *
   * @default undefined
   * @see https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Query.html#DDB-Query-request-ExclusiveStartKey
   */
  readonly exclusiveStartKey?: Json;

  /**
   * One or more substitution tokens for attribute names in an expression.
   *
   * @default undefined
   * @see https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Query.html#DDB-Query-request-ExpressionAttributeNames
   */
  readonly expressionAttributeNames?: Json;

  /**
   * One or more values that can be substituted in an expression.
   *
   * @default undefined
   * @see https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Query.html#DDB-Query-request-ExpressionAttributeValues
   */
  readonly expressionAttributeValues?: Json;

  /**
   * A string that contains conditions that DynamoDB applies after the Query operation, but before the data is returned to you.
   *
   * @default undefined
   * @see https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Query.html#DDB-Query-request-FilterExpression
   */
  readonly filterExpression?: string;

  /**
   * The name of an index to query.
   *
   * @default undefined
   * @see https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Query.html#DDB-Query-request-IndexName
   */
  readonly indexName?: string;

  /**
   * The condition that specifies the key values for items to be retrieved by the Query action.
   *
   * @see https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Query.html#DDB-Query-request-KeyConditionExpression
   */
  readonly keyConditionExpression: string;

  /**
   * The maximum number of items to evaluate (not necessarily the number of matching items).
   *
   * @minimum 1
   * @default undefined
   * @see https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Query.html#DDB-Query-request-Limit
   */
  readonly limit?: number;

  /**
   * A string that identifies one or more attributes to retrieve from the table.
   *
   * @default undefined
   * @see https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Query.html#DDB-Query-request-ProjectionExpression
   */
  readonly projectionExpression?: string;

  /**
   * Determines the level of detail about either provisioned or on-demand throughput consumption.
   *
   * @default "NONE"
   * @see https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Query.html#DDB-Query-request-ReturnConsumedCapacity
   */
  readonly returnConsumedCapacity?: "INDEXES" | "TOTAL" | "NONE";

  /**
   * Specifies the order for index traversal.
   *
   * @default true
   * @see https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Query.html#DDB-Query-request-ScanIndexForward
   */
  readonly scanIndexForward?: boolean;

  /**
   * The attributes to be returned in the result.
   *
   * @default undefined
   * @see https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Query.html#DDB-Query-request-Select
   */
  readonly select?:
    | "ALL_ATTRIBUTES"
    | "ALL_PROJECTED_ATTRIBUTES"
    | "SPECIFIC_ATTRIBUTES"
    | "COUNT";
}

/**
 * Result for `DynamodbTable.query`.
 *
 * @see https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html#API_Scan_ResponseSyntax
 */
export interface DynamodbTableQueryResult {
  /**
   * The capacity units consumed by the Query operation.
   */
  readonly consumedCapacity?: Json;

  /**
   * The number of items in the response.
   */
  readonly count: number;

  /**
   * An array of item attributes that match the scan criteria.
   */
  readonly items: Array<Json>;

  /**
   * The primary key of the item where the operation stopped, inclusive of the previous result set.
   */
  readonly lastEvaluatedKey?: Json;

  /**
   * The number of items evaluated, before any QueryFilter is applied.
   */
  readonly scannedCount: number;
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
  readonly key: Json;
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
  readonly key: Json;
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
  updateItem(key: Json, props?: DynamodbTableUpdateItemProps): Promise<Json>;

  /**
   * Delete an item from the table.
   * @param key key of the item.
   * @inflight
   */
  deleteItem(key: Json): Promise<void>;

  /**
   * Get an item from the table.
   * @param key key of the item.
   * @inflight
   * @see https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html
   */
  getItem(key: Json): Promise<Json>;

  /**
   * Return one or more items and item attributes by accessing every item in a table or a secondary index.
   * @param props properties for the scan operation.
   * @inflight
   */
  scan(props?: DynamodbTableScanProps): Promise<DynamodbTableScanResult>;

  /**
   * Return all items with a given partition key value.
   * @param props properties for the query operation.
   * @inflight
   * @see https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Query.html
   */
  query(props: DynamodbTableQueryProps): Promise<DynamodbTableQueryResult>;

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
  /** `DynamodbTable.query` */
  QUERY = "query",
  /** `DynamodbTable.transactWriteItems` */
  TRANSACT_WRITE_ITEMS = "transactWriteItems",
}

/**
 * Base class for `DynamodbTable` Client.
 */
export abstract class DynamodbTableClientBase implements IDynamodbTableClient {
  /**
   * @param tableName the table name.
   */
  constructor(protected tableName: string) {}

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
    key: Json,
    props?: DynamodbTableUpdateItemProps
  ): Promise<Json> {
    const client = await this._rawClient();
    const result = await client.send(
      new UpdateItemCommand({
        TableName: this.tableName,
        Key: marshall(key),
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

  public async deleteItem(key: Json): Promise<void> {
    const client = await this._rawClient();
    await client.send(
      new DeleteItemCommand({
        TableName: this.tableName,
        Key: marshall(key),
      })
    );
  }

  public async getItem(key: Json): Promise<Json> {
    const client = await this._rawClient();
    const result = await client.send(
      new GetItemCommand({
        TableName: this.tableName,
        Key: marshall(key),
      })
    );
    if (result.Item) {
      return unmarshall(result.Item) as Json;
    }
    return {} as Json;
  }

  public async scan(
    props?: DynamodbTableScanProps
  ): Promise<DynamodbTableScanResult> {
    const client = await this._rawClient();
    const result = await client.send(
      new ScanCommand({
        TableName: this.tableName,
        ConsistentRead: props?.consistentRead,
        ExclusiveStartKey: props?.exclusiveStartKey
          ? marshall(props.exclusiveStartKey)
          : undefined,
        ExpressionAttributeNames: props?.expressionAttributeNames as any,
        ExpressionAttributeValues: props?.expressionAttributeValues
          ? marshall(props.expressionAttributeValues)
          : undefined,
        FilterExpression: props?.filterExpression,
        IndexName: props?.indexName,
        Limit: props?.limit,
        ProjectionExpression: props?.projectionExpression,
        ReturnConsumedCapacity: props?.returnConsumedCapacity,
        Segment: props?.segment,
        Select: props?.select,
        TotalSegments: props?.totalSegments,
      })
    );
    return {
      consumedCapacity: result.ConsumedCapacity as Json | undefined,
      count: result.Count!,
      items: result.Items!.map((item) => unmarshall(item) as Json),
      lastEvaluatedKey: result.LastEvaluatedKey
        ? (unmarshall(result.LastEvaluatedKey) as Json)
        : undefined,
      scannedCount: result.ScannedCount!,
    };
  }

  public async query(
    props: DynamodbTableQueryProps
  ): Promise<DynamodbTableQueryResult> {
    const client = await this._rawClient();
    const result = await client.send(
      new QueryCommand({
        TableName: this.tableName,
        ConsistentRead: props.consistentRead,
        ExclusiveStartKey: props.exclusiveStartKey
          ? marshall(props.exclusiveStartKey)
          : undefined,
        ExpressionAttributeNames: props.expressionAttributeNames as any,
        ExpressionAttributeValues: props.expressionAttributeValues
          ? marshall(props.expressionAttributeValues)
          : undefined,
        FilterExpression: props.filterExpression,
        IndexName: props.indexName,
        KeyConditionExpression: props.keyConditionExpression,
        Limit: props.limit,
        ProjectionExpression: props.projectionExpression,
        ReturnConsumedCapacity: props.returnConsumedCapacity,
        ScanIndexForward: props.scanIndexForward,
        Select: props.select,
      })
    );
    return {
      consumedCapacity: result.ConsumedCapacity as Json | undefined,
      count: result.Count!,
      items: result.Items!.map((item) => unmarshall(item) as Json),
      lastEvaluatedKey: result.LastEvaluatedKey
        ? (unmarshall(result.LastEvaluatedKey) as Json)
        : undefined,
      scannedCount: result.ScannedCount!,
    };
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
            Key: marshall(item.update.key),
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
            Key: marshall(item.delete.key),
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
