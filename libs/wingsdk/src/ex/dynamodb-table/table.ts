import {
  BatchGetItemCommand,
  BatchWriteItemCommand,
  DeleteItemCommand,
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  QueryCommand,
  ScanCommand,
  TransactGetItem,
  TransactGetItemsCommand,
  TransactWriteItem,
  TransactWriteItemsCommand,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { Construct } from "constructs";
import {
  DynamodbTableBatchGetItemOptions,
  DynamodbTableBatchGetItemResult,
  DynamodbTableBatchWriteItemOptions,
  DynamodbTableBatchWriteItemRequestItem,
  DynamodbTableBatchWriteItemResult,
  DynamodbTableDeleteItemOptions,
  DynamodbTableDeleteItemResult,
  DynamodbTableGetItemOptions,
  DynamodbTableGetItemResult,
  DynamodbTablePutItemOptions,
  DynamodbTablePutItemResult,
  DynamodbTableQueryOptions,
  DynamodbTableQueryResult,
  DynamodbTableScanOptions,
  DynamodbTableScanResult,
  DynamodbTableTransactGetItemsResult,
  DynamodbTableTransactWriteItemsResult,
  DynamodbTableUpdateItemOptions,
  DynamodbTableUpdateItemResult,
  DynamodbTransactGetItemsOptions,
  DynamodbTransactWriteItemsOptions,
} from ".";
import { fqnForType } from "../../constants";
import { INFLIGHT_SYMBOL } from "../../core/types";
import { Json, Node, Resource } from "../../std";

/**
 * Global identifier for `DynamodbTable`.
 */
export const DYNAMODB_TABLE_FQN = fqnForType("ex.DynamodbTable");

/**
 * Options for `DynamodbTable.GlobalSecondaryIndex`.
 */
export interface GlobalSecondaryIndex {
  /**
   * The name of the index.
   */
  readonly name: string;
  /**
   * The name of the hash key in the index.
   */
  readonly hashKey: string;
  /**
   * The name of the range key.
   * @default undefined
   */
  readonly rangeKey?: string;
  /**
   * Number of read units for this index.
   * @default undefined
   */
  readonly writeCapacity?: number;
  /**
   * Number of write units for this index
   * @default undefined
   */
  readonly readCapacity?: number;
  /**
   * The set of attributes that are projected into the index.
   * @default "ALL"
   */
  readonly projectionType: "ALL" | "INCLUDE" | "KEYS_ONLY";
  /**
   * A list of attributes to project into the index.
   * @default undefined
   */
  readonly nonKeyAttributes?: string[];
}

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
  /**
   * The GSI for the table.
   * @default undefined
   */
  readonly globalSecondaryIndex?: GlobalSecondaryIndex[];
}

/**
 * A cloud Dynamodb table.
 *
 * @inflight `@winglang/sdk.ex.IDynamodbTableClient`
 * @abstract
 */
export class DynamodbTable extends Resource {
  /** @internal */
  public [INFLIGHT_SYMBOL]?: IDynamodbTableClient;

  /**
   * Table name
   */
  public readonly name!: string;

  constructor(scope: Construct, id: string, props: DynamodbTableProps) {
    if (new.target === DynamodbTable) {
      return Resource._newFromFactory(DYNAMODB_TABLE_FQN, scope, id, props);
    }

    super(scope, id);

    Node.of(this).title = "DynamodbTable";
    Node.of(this).description = "A DynamoDb Table";

    if (!props.name) {
      throw new Error("Dynamodb table name is not defined");
    }
    this.name = props.name;
  }
}

/**
 * Inflight interface for `DynamodbTable`.
 */
export interface IDynamodbTableClient {
  /**
   * Put an item into the table.
   * @param options dynamodb PutItem options.
   * @inflight
   * @see https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_PutItem.html
   */
  putItem(
    options: DynamodbTablePutItemOptions,
  ): Promise<DynamodbTablePutItemResult>;

  /**
   * Edit an existing item's attributes, or add a new item to the table if it does not already exist.
   * @param options dynamodb UpdateItem options.
   * @inflight
   * @see https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_UpdateItem.html
   */
  updateItem(
    options: DynamodbTableUpdateItemOptions,
  ): Promise<DynamodbTableUpdateItemResult>;

  /**
   * Delete an item from the table.
   * @param options dynamodb DeleteItem options.
   * @inflight
   * @see https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_DeleteItem.html
   */
  deleteItem(
    options: DynamodbTableDeleteItemOptions,
  ): Promise<DynamodbTableDeleteItemResult>;

  /**
   * Get an item from the table.
   * @param options options for the getItem operation.
   * @inflight
   * @see https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_GetItem.html
   */
  getItem(
    options: DynamodbTableGetItemOptions,
  ): Promise<DynamodbTableGetItemResult>;

  /**
   * Return one or more items and item attributes by accessing every item in a table or a secondary index.
   * @param options options for the scan operation.
   * @inflight
   * @see https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html
   */
  scan(options?: DynamodbTableScanOptions): Promise<DynamodbTableScanResult>;

  /**
   * Return all items with a given partition key value.
   * @param options options for the query operation.
   * @inflight
   * @see https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Query.html
   */
  query(options: DynamodbTableQueryOptions): Promise<DynamodbTableQueryResult>;

  /**
   * Perform a synchronous read operation that groups up to 100 item retrievals.
   * @param options options for the query operation.
   * @inflight
   * @see https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_TransactGetItems.html
   */
  transactGetItems(
    options: DynamodbTransactGetItemsOptions,
  ): Promise<DynamodbTableTransactGetItemsResult>;

  /**
   * Perform a synchronous write operation that groups up to 100 action requests.
   * @param options options for the transact write items operation.
   * @inflight
   * @see https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_TransactWriteItems.html
   */
  transactWriteItems(
    options: DynamodbTransactWriteItemsOptions,
  ): Promise<DynamodbTableTransactWriteItemsResult>;

  /**
   * Return the attributes of one or more items.
   * @param options options for the batch get item operation.
   * @inflight
   * @see https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_BatchGetItem.html
   */
  batchGetItem(
    options: DynamodbTableBatchGetItemOptions,
  ): Promise<DynamodbTableBatchGetItemResult>;

  /**
   * Put or delete multiple items.
   * @param options options for the batch write item operation.
   * @inflight
   * @see https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_BatchWriteItem.html
   */
  batchWriteItem(
    options: DynamodbTableBatchWriteItemOptions,
  ): Promise<DynamodbTableBatchWriteItemResult>;
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
  /** `DynamodbTable.transactGetItems` */
  TRANSACT_GET_ITEMS = "transactGetItems",
  /** `DynamodbTable.transactWriteItems` */
  TRANSACT_WRITE_ITEMS = "transactWriteItems",
  /** `DynamodbTable.batchGetItem` */
  BATCH_GET_ITEM = "batchGetItem",
  /** `DynamodbTable.batchWriteItem` */
  BATCH_WRITE_ITEM = "batchWriteItem",
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
    options: DynamodbTablePutItemOptions,
  ): Promise<DynamodbTablePutItemResult> {
    const client = await this._rawClient();
    const response = await client.send(
      new PutItemCommand({
        TableName: this.tableName,
        Item: marshall(options.item),
        ConditionExpression: options?.conditionExpression,
        ExpressionAttributeNames: options?.expressionAttributeNames as
          | Record<string, string>
          | undefined,
        ExpressionAttributeValues: options?.expressionAttributeValues
          ? marshall(options?.expressionAttributeValues)
          : undefined,
        ReturnConsumedCapacity: options?.returnConsumedCapacity,
        ReturnItemCollectionMetrics: options?.returnItemCollectionMetrics,
        ReturnValuesOnConditionCheckFailure:
          options?.returnValuesOnConditionCheckFailure,
      }),
    );
    return {
      attributes: response.Attributes
        ? (unmarshall(response.Attributes) as Json)
        : undefined,
      consumedCapacity: response.ConsumedCapacity as Json | undefined,
      itemCollectionMetrics: response.ItemCollectionMetrics as Json | undefined,
    };
  }

  public async updateItem(
    options: DynamodbTableUpdateItemOptions,
  ): Promise<DynamodbTableUpdateItemResult> {
    const client = await this._rawClient();
    const result = await client.send(
      new UpdateItemCommand({
        TableName: this.tableName,
        Key: marshall(options.key),
        UpdateExpression: options?.updateExpression,
        ExpressionAttributeValues: options?.expressionAttributeValues
          ? marshall(options?.expressionAttributeValues)
          : undefined,
        ExpressionAttributeNames: options?.expressionAttributeNames as
          | Record<string, string>
          | undefined,
        ConditionExpression: options?.conditionExpression,
        ReturnConsumedCapacity: options?.returnConsumedCapacity,
        ReturnItemCollectionMetrics: options?.returnItemCollectionMetrics,
        ReturnValues: options?.returnValues,
        ReturnValuesOnConditionCheckFailure:
          options?.returnValuesOnConditionCheckFailure,
      }),
    );
    return {
      attributes: result.Attributes
        ? (unmarshall(result.Attributes) as Json)
        : undefined,
      consumedCapacity: result.ConsumedCapacity as Json | undefined,
      itemCollectionMetrics: result.ItemCollectionMetrics as Json | undefined,
    };
  }

  public async deleteItem(
    options: DynamodbTableDeleteItemOptions,
  ): Promise<DynamodbTableDeleteItemResult> {
    const client = await this._rawClient();
    const result = await client.send(
      new DeleteItemCommand({
        TableName: this.tableName,
        Key: marshall(options.key),
        ConditionExpression: options?.conditionExpression,
        ExpressionAttributeNames: options?.expressionAttributeNames as
          | Record<string, string>
          | undefined,
        ExpressionAttributeValues: options?.expressionAttributeValues
          ? marshall(options?.expressionAttributeValues)
          : undefined,
        ReturnConsumedCapacity: options?.returnConsumedCapacity,
        ReturnItemCollectionMetrics: options?.returnItemCollectionMetrics,
        ReturnValues: options?.returnValues,
        ReturnValuesOnConditionCheckFailure:
          options?.returnValuesOnConditionCheckFailure,
      }),
    );
    return {
      attributes: result.Attributes
        ? (unmarshall(result.Attributes) as Json)
        : undefined,
      consumedCapacity: result.ConsumedCapacity as Json | undefined,
      itemCollectionMetrics: result.ItemCollectionMetrics as Json | undefined,
    };
  }

  public async getItem(
    options: DynamodbTableGetItemOptions,
  ): Promise<DynamodbTableGetItemResult> {
    const client = await this._rawClient();
    const result = await client.send(
      new GetItemCommand({
        TableName: this.tableName,
        Key: marshall(options.key),
        ConsistentRead: options.consistentRead,
        ReturnConsumedCapacity: options.returnConsumedCapacity,
        ProjectionExpression: options.projectionExpression,
        ExpressionAttributeNames: options.expressionAttributeNames as
          | Record<string, string>
          | undefined,
      }),
    );
    return {
      consumedCapacity: result.ConsumedCapacity as Json | undefined,
      item: result.Item ? (unmarshall(result.Item) as Json) : undefined,
    };
  }

  public async scan(
    options?: DynamodbTableScanOptions,
  ): Promise<DynamodbTableScanResult> {
    const client = await this._rawClient();
    const result = await client.send(
      new ScanCommand({
        TableName: this.tableName,
        ConsistentRead: options?.consistentRead,
        ExclusiveStartKey: options?.exclusiveStartKey
          ? marshall(options.exclusiveStartKey)
          : undefined,
        ExpressionAttributeNames: options?.expressionAttributeNames as any,
        ExpressionAttributeValues: options?.expressionAttributeValues
          ? marshall(options.expressionAttributeValues)
          : undefined,
        FilterExpression: options?.filterExpression,
        IndexName: options?.indexName,
        Limit: options?.limit,
        ProjectionExpression: options?.projectionExpression,
        ReturnConsumedCapacity: options?.returnConsumedCapacity,
        Segment: options?.segment,
        Select: options?.select,
        TotalSegments: options?.totalSegments,
      }),
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
    options: DynamodbTableQueryOptions,
  ): Promise<DynamodbTableQueryResult> {
    const client = await this._rawClient();
    const result = await client.send(
      new QueryCommand({
        TableName: this.tableName,
        ConsistentRead: options.consistentRead,
        ExclusiveStartKey: options.exclusiveStartKey
          ? marshall(options.exclusiveStartKey)
          : undefined,
        ExpressionAttributeNames: options.expressionAttributeNames as any,
        ExpressionAttributeValues: options.expressionAttributeValues
          ? marshall(options.expressionAttributeValues)
          : undefined,
        FilterExpression: options.filterExpression,
        IndexName: options.indexName,
        KeyConditionExpression: options.keyConditionExpression,
        Limit: options.limit,
        ProjectionExpression: options.projectionExpression,
        ReturnConsumedCapacity: options.returnConsumedCapacity,
        ScanIndexForward: options.scanIndexForward,
        Select: options.select,
      }),
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

  public async transactGetItems(
    options: DynamodbTransactGetItemsOptions,
  ): Promise<DynamodbTableTransactGetItemsResult> {
    const client = await this._rawClient();

    const items = options.transactItems.map<TransactGetItem>((item) => {
      if (item.get) {
        return {
          Get: {
            TableName: this.tableName,
            Key: marshall(item.get.key),
            ProjectionExpression: item.get.projectionExpression,
            ExpressionAttributeNames: item.get.expressionAttributeNames as
              | Record<string, string>
              | undefined,
          },
        };
      } else {
        throw Error("A get transact item must define `get`.");
      }
    });

    const result = await client.send(
      new TransactGetItemsCommand({
        TransactItems: items,
        ReturnConsumedCapacity: options.returnConsumedCapacity,
      }),
    );

    return {
      consumedCapacity: result.ConsumedCapacity as Json | undefined,
      responses:
        result.Responses?.map((item) => ({
          item: unmarshall(item.Item!) as Json,
        })) ?? [],
    };
  }

  public async transactWriteItems(
    options: DynamodbTransactWriteItemsOptions,
  ): Promise<DynamodbTableTransactWriteItemsResult> {
    const client = await this._rawClient();

    const items = options.transactItems.map<TransactWriteItem>((item) => {
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
            ConditionExpression: item.update.conditionExpression,
            UpdateExpression: item.update.updateExpression,
            ExpressionAttributeNames: item.update.expressionAttributeNames as
              | Record<string, string>
              | undefined,
            ExpressionAttributeValues: item.update.expressionAttributeValues
              ? marshall(item.update.expressionAttributeValues)
              : undefined,
            ReturnValuesOnConditionCheckFailure:
              item.update.returnValuesOnConditionCheckFailure,
          },
        };
      } else if (item.delete) {
        return {
          Delete: {
            TableName: this.tableName,
            Key: marshall(item.delete.key),
            ConditionExpression: item.delete.conditionExpression,
            ExpressionAttributeNames: item.delete.expressionAttributeNames as
              | Record<string, string>
              | undefined,
            ExpressionAttributeValues: item.delete.expressionAttributeValues
              ? marshall(item.delete.expressionAttributeValues)
              : undefined,
            ReturnValuesOnConditionCheckFailure:
              item.delete.returnValuesOnConditionCheckFailure,
          },
        };
      } else if (item.conditionCheck) {
        return {
          ConditionCheck: {
            TableName: this.tableName,
            Key: marshall(item.conditionCheck.key),
            ConditionExpression: item.conditionCheck.conditionExpression,
            ExpressionAttributeNames: item.conditionCheck
              .expressionAttributeNames as Record<string, string> | undefined,
            ExpressionAttributeValues: item.conditionCheck
              .expressionAttributeValues
              ? marshall(item.conditionCheck.expressionAttributeValues)
              : undefined,
            ReturnValuesOnConditionCheckFailure:
              item.conditionCheck.returnValuesOnConditionCheckFailure,
          },
        };
      } else {
        throw Error(
          "A write transact item must define either `put`, `update`, `delete` or `conditionCheck`.",
        );
      }
    });

    const result = await client.send(
      new TransactWriteItemsCommand({
        TransactItems: items,
      }),
    );

    return {
      consumedCapacity: result.ConsumedCapacity as Json | undefined,
      itemCollectionMetrics: result.ItemCollectionMetrics as Json | undefined,
    };
  }

  public async batchGetItem(
    options: DynamodbTableBatchGetItemOptions,
  ): Promise<DynamodbTableBatchGetItemResult> {
    const client = await this._rawClient();
    const result = await client.send(
      new BatchGetItemCommand({
        RequestItems: {
          [this.tableName]: {
            Keys: options.requestItem.keys.map((key) => marshall(key)),
            ConsistentRead: options.requestItem.consistentRead,
            ExpressionAttributeNames: options.requestItem
              .expressionAttributeNames as Record<string, string> | undefined,
            ProjectionExpression: options.requestItem.projectionExpression,
          },
        },
        ReturnConsumedCapacity: options.returnConsumedCapacity,
      }),
    );
    const unprocessedKeys = result.UnprocessedKeys?.[this.tableName];
    return {
      consumedCapacity: result.ConsumedCapacity as Json | undefined,
      responses: result.Responses
        ? result.Responses[this.tableName].map(
            (item) => unmarshall(item) as Json,
          )
        : undefined,
      unprocessedKeys: unprocessedKeys
        ? {
            keys: unprocessedKeys.Keys!.map((key) => unmarshall(key) as Json),
            consistentRead: unprocessedKeys.ConsistentRead,
            expressionAttributeNames:
              unprocessedKeys.ExpressionAttributeNames as Json | undefined,
            projectionExpression: unprocessedKeys.ProjectionExpression,
          }
        : undefined,
    };
  }

  public async batchWriteItem(
    options: DynamodbTableBatchWriteItemOptions,
  ): Promise<DynamodbTableBatchWriteItemResult> {
    const client = await this._rawClient();
    const result = await client.send(
      new BatchWriteItemCommand({
        RequestItems: {
          [this.tableName]: options.requestItems.map((item) => {
            if (item.deleteRequest) {
              return {
                DeleteRequest: {
                  Key: marshall(item.deleteRequest.key),
                },
              };
            } else if (item.putRequest) {
              return {
                PutRequest: {
                  Item: marshall(item.putRequest.item),
                },
              };
            } else {
              throw Error(
                "A batch write item must define either `deleteRequest` or `putRequest`.",
              );
            }
          }),
        },
        ReturnConsumedCapacity: options.returnConsumedCapacity,
        ReturnItemCollectionMetrics: options.returnItemCollectionMetrics,
      }),
    );
    return {
      consumedCapacity: result.ConsumedCapacity as Json | undefined,
      itemCollectionMetrics: result.ItemCollectionMetrics as Json | undefined,
      unprocessedItems: result.UnprocessedItems
        ? result.UnprocessedItems[
            this.tableName
          ]?.map<DynamodbTableBatchWriteItemRequestItem>((item) => {
            if (item.PutRequest) {
              return {
                putRequest: {
                  item: unmarshall(item.PutRequest.Item!) as Json,
                },
              };
            } else if (item.DeleteRequest) {
              return {
                deleteRequest: {
                  key: unmarshall(item.DeleteRequest.Key!) as Json,
                },
              };
            } else {
              throw Error("Invalid batch write item.");
            }
          })
        : undefined,
    };
  }
}
