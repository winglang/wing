import {
  BatchGetItemCommand,
  BatchWriteItemCommand,
  DeleteItemCommand,
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  QueryCommand,
  ScanCommand,
  TransactWriteItem,
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
 * Options for `DynamodbTable.putItem`.
 */
export interface DynamodbTablePutItemOptions {
  /**
   * A map of attribute names to `AttributeValue` objects, representing the primary key of the item to retrieve.
   */
  readonly item: Json;

  /**
   * A condition that must be satisfied in order for an operation to succeed.
   * @default undefined
   */
  readonly conditionExpression?: string;

  /**
   * One or more substitution tokens for attribute names in an expression.
   * @default undefined
   */
  readonly expressionAttributeNames?: Json;

  /**
   * One or more values that can be substituted in an expression.
   * @default undefined
   */
  readonly expressionAttributeValues?: Json;

  /**
   * Determines the level of detail about either provisioned or on-demand throughput consumption.
   * @default "NONE"
   */
  readonly returnConsumedCapacity?: "INDEXES" | "TOTAL" | "NONE";

  /**
   * Determines whether item collection metrics are returned.
   * @default "NONE"
   */
  readonly returnItemCollectionMetrics?: "SIZE" | "NONE";

  /**
   * Use ReturnValuesOnConditionCheckFailure to get the item attributes if the Put condition fails.
   * @default "NONE"
   */
  readonly returnValuesOnConditionCheckFailure?: "ALL_OLD" | "NONE";
}

/**
 * Result for `DynamodbTable.putItem`.
 */
export interface DynamodbTablePutItemResult {
  /**
   * The attribute values as they appeared before the operation, but only if `ReturnValues` is specified as `"ALL_OLD"` in the request.
   */
  readonly attributes?: Json;

  /**
   * The capacity units consumed by the operation.
   */
  readonly consumedCapacity?: Json;

  /**
   * Information about item collections, if any, that were affected by the operation.
   */
  readonly itemCollectionMetrics?: Json;
}

/**
 * Options for `DynamodbTable.updateItem`.
 */
export interface DynamodbTableUpdateItemOptions {
  /**
   * The primary key of the item to be updated. Each element consists of an attribute name and a value for that attribute.
   *
   * @see https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_UpdateItem.html#DDB-UpdateItem-request-Key
   */
  readonly key: Json;

  /**
   * An expression that defines one or more attributes to be updated.
   * @default undefined
   */
  readonly updateExpression?: string;

  /**
   * One or more substitution tokens for attribute names in an expression.
   * @default undefined
   */
  readonly expressionAttributeNames?: Json;

  /**
   * One or more values that can be substituted in an expression.
   * @default undefined
   */
  readonly expressionAttributeValues?: Json;

  /**
   * A condition that must be satisfied in order for a conditional update to succeed.
   * @default undefined
   */
  readonly conditionExpression?: string;

  /**
   * Determines the level of detail about either provisioned or on-demand throughput consumption.
   * @default "NONE"
   */
  readonly returnConsumedCapacity?: "INDEXES" | "TOTAL" | "NONE";

  /**
   * Determines whether item collection metrics are returned.
   * @default "NONE"
   */
  readonly returnItemCollectionMetrics?: "SIZE" | "NONE";

  /**
   * Use ReturnValuesOnConditionCheckFailure to get the item attributes if the Update condition fails.
   * @default "NONE"
   */
  readonly returnValuesOnConditionCheckFailure?: "ALL_OLD" | "NONE";

  /**
   * Use ReturnValues to get the item attributes if the Update operation succeeds.
   * @default "NONE"
   */
  readonly returnValues?: "ALL_OLD" | "NONE";
}

/**
 * Result for `DynamodbTable.updateItem`.
 */
export interface DynamodbTableUpdateItemResult {
  /**
   * The capacity units consumed by the operation.
   */
  readonly consumedCapacity?: Json;

  /**
   * Information about item collections, if any, that were affected by the operation.
   */
  readonly itemCollectionMetrics?: Json;

  /**
   * The attribute values as they appeared before the operation, but only if `ReturnValues` is specified as `"ALL_OLD"` in the request.
   */
  readonly attributes?: Json;
}

/**
 * Options for `DynamodbTable.deleteItem`.
 */
export interface DynamodbTableDeleteItemOptions {
  /**
   * A map of attribute names to `AttributeValue` objects, representing the primary key of the item to delete.
   */
  readonly key: Json;

  /**
   * A condition that must be satisfied in order for an operation to succeed.
   */
  readonly conditionExpression?: string;

  /**
   * One or more substitution tokens for attribute names in an expression.
   */
  readonly expressionAttributeNames?: Json;

  /**
   * One or more values that can be substituted in an expression.
   */
  readonly expressionAttributeValues?: Json;

  /**
   * Determines the level of detail about either provisioned or on-demand throughput consumption.
   * @default "NONE"
   */
  readonly returnConsumedCapacity?: "INDEXES" | "TOTAL" | "NONE";

  /**
   * Determines whether item collection metrics are returned.
   * @default "NONE"
   */
  readonly returnItemCollectionMetrics?: "SIZE" | "NONE";

  /**
   * Whether to return the item attributes as they appeared before they were deleted.
   * @default "NONE"
   */
  readonly returnValues?: "NONE" | "ALL_OLD";

  /**
   * Whether to return the item attributes if the condition fails.
   * @default "NONE"
   */
  readonly returnValuesOnConditionCheckFailure?: "ALL_OLD" | "NONE";
}

/**
 * Result for `DynamodbTable.deleteItem`.
 */
export interface DynamodbTableDeleteItemResult {
  /**
   * The capacity units consumed by the operation.
   */
  readonly consumedCapacity?: Json;

  /**
   * Information about item collections, if any, that were affected by the operation.
   */
  readonly itemCollectionMetrics?: Json;

  /**
   * The attribute values as they appeared before the operation, but only if `ReturnValues` is specified as `"ALL_OLD"` in the request.
   */
  readonly attributes?: Json;
}

/**
 * Options for `DynamodbTable.getItem`.
 */
export interface DynamodbTableGetItemOptions {
  /**
   * A map of attribute names to `AttributeValue` objects, representing the primary key of the item to retrieve.
   *
   * @see https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_GetItem.html#API_GetItem_RequestSyntax
   */
  readonly key: Json;

  /**
   * Determines the read consistency model: If set to true, then the operation uses strongly consistent reads; otherwise, the operation uses eventually consistent reads.
   *
   * @default false
   * @see https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_GetItem.html#DDB-GetItem-request-ConsistentRead
   */
  readonly consistentRead?: boolean;

  /**
   * One or more substitution tokens for attribute names in an expression.
   *
   * @default undefined
   * @see https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_GetItem.html#DDB-GetItem-request-ExpressionAttributeNames
   */
  readonly expressionAttributeNames?: Json;

  /**
   * A string that identifies one or more attributes to retrieve from the table.
   *
   * @default undefined
   * @see https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_GetItem.html#DDB-GetItem-request-ProjectionExpression
   */
  readonly projectionExpression?: string;

  /**
   * Determines the level of detail about either provisioned or on-demand throughput consumption.
   *
   * @default "NONE"
   * @see https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_GetItem.html#DDB-GetItem-request-ReturnConsumedCapacity
   */
  readonly returnConsumedCapacity?: "INDEXES" | "TOTAL" | "NONE";
}

/**
 * Result for `DynamodbTable.getItem`.
 *
 * @see https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html#API_Scan_ResponseSyntax
 */
export interface DynamodbTableGetItemResult {
  /**
   * The capacity units consumed by the operation.
   */
  readonly consumedCapacity?: Json;

  /**
   * A map of attribute names to `AttributeValue` objects, as specified by `ProjectionExpression`.
   */
  readonly item: Json;
}

/**
 * Options for `DynamodbTable.scan`.
 */
export interface DynamodbTableScanOptions {
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
   * The capacity units consumed by the operation.
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
 * Options for `DynamodbTable.query`.
 */
export interface DynamodbTableQueryOptions {
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
   * The capacity units consumed by the operation.
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
 * Options for transact write item's update operation.
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
 * Options for transact write item's update operation.
 */
export interface DynamodbTransactWriteItemUpdateOptions {
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
   * A condition that must be satisfied in order for an operation to succeed.
   * @default undefined
   */
  readonly conditionExpression?: string;

  /**
   * One or more substitution tokens for attribute names in an expression.
   * @default undefined
   */
  readonly expressionAttributeNames?: Json;

  /**
   * One or more values that can be substituted in an expression.
   * @default undefined
   */
  readonly expressionAttributeValues?: Json;

  /**
   * Determines the level of detail about either provisioned or on-demand throughput consumption.
   * @default "NONE"
   */
  readonly returnValuesOnConditionCheckFailure?: "ALL_OLD" | "NONE";
}

/**
 * Options for transact write item's delete operation.
 */
export interface DynamodbTransactWriteItemDeleteOptions {
  /**
   * The item to delete.
   */
  readonly key: Json;

  /**
   * A condition that must be satisfied in order for an operation to succeed.
   * @default undefined
   */
  readonly conditionExpression?: string;

  /**
   * One or more substitution tokens for attribute names in an expression.
   * @default undefined
   */
  readonly expressionAttributeNames?: Json;

  /**
   * One or more values that can be substituted in an expression.
   * @default undefined
   */
  readonly expressionAttributeValues?: Json;

  /**
   * Determines the level of detail about either provisioned or on-demand throughput consumption.
   * @default "NONE"
   */
  readonly returnValuesOnConditionCheckFailure?: "ALL_OLD" | "NONE";
}

/**
 * Options for transact write item's condition check operation.
 */
export interface DynamodbTransactWriteItemConditionCheckOptions {
  /**
   * The item to check.
   */
  readonly key: Json;

  /**
   * A condition that must be satisfied in order for an operation to succeed.
   * @default undefined
   */
  readonly conditionExpression?: string;

  /**
   * One or more substitution tokens for attribute names in an expression.
   * @default undefined
   */
  readonly expressionAttributeNames?: Json;

  /**
   * One or more values that can be substituted in an expression.
   * @default undefined
   */
  readonly expressionAttributeValues?: Json;

  /**
   * Determines the level of detail about either provisioned or on-demand throughput consumption.
   * @default "NONE"
   */
  readonly returnValuesOnConditionCheckFailure?: "ALL_OLD" | "NONE";
}

/**
 * Options for `DynamodbTable.batchGetItem` request item.
 */
export interface DynamodbTableBatchGetItemRequestItem {
  /**
   * The primary key attribute values that define the items and the attributes associated with the items.
   */
  readonly keys: Json[];

  /**
   * The consistency of a read operation.
   * @default false
   */
  readonly consistentRead?: boolean;

  /**
   * One or more substitution tokens for attribute names in an expression.
   * @default undefined
   */
  readonly expressionAttributeNames?: Json;

  /**
   * A string that identifies one or more attributes to retrieve from the table.
   * @default undefined
   */
  readonly projectionExpression?: string;
}

/**
 * Options for `DynamodbTable.batchGetItem`.
 */
export interface DynamodbTableBatchGetItemOptions {
  /**
   * Describes one or more items to retrieve from that table.
   */
  readonly requestItem: DynamodbTableBatchGetItemRequestItem;

  /**
   * Determines the level of detail about either provisioned or on-demand throughput consumption.
   *
   * @default "NONE"
   */
  readonly returnConsumedCapacity?: "INDEXES" | "TOTAL" | "NONE";
}

/**
 * Result for `DynamodbTable.batchGetItem`.
 */
export interface DynamodbTableBatchGetItemResult {
  /**
   * The capacity units consumed by the operation.
   */
  readonly consumedCapacity?: Json;

  /**
   * The list of items that are returned, with the attributes requested.
   */
  readonly responses?: Json[];

  /**
   * A list of keys that were not processed.
   */
  readonly unprocessedKeys?: DynamodbTableBatchGetItemRequestItem;
}

/**
 * Options for `DynamodbTable.batchWriteItem`'s delete request.
 */
export interface DynamodbTableBatchWriteItemDeleteRequestOptions {
  /**
   * A map of attribute names to `AttributeValue` objects, representing the primary key of the item to delete.
   */
  readonly key: Json;
}

/**
 * Options for `DynamodbTable.batchWriteItem`'s put request.
 */
export interface DynamodbTableBatchWriteItemPutRequestOptions {
  /**
   * A map of attribute name to attribute values, representing the primary key of an item to be processed by `PutItem`.
   */
  readonly item: Json;
}

/**
 * Options for `DynamodbTable.batchWriteItem` request item.
 */
export interface DynamodbTableBatchWriteItemRequestItem {
  /**
   * A request to perform a delete operation.
   */
  readonly deleteRequest?: DynamodbTableBatchWriteItemDeleteRequestOptions;

  /**
   * A request to perform a put operation.
   */
  readonly putRequest?: DynamodbTableBatchWriteItemPutRequestOptions;
}

/**
 * Options for `DynamodbTable.batchWriteItem`.
 */
export interface DynamodbTableBatchWriteItemOptions {
  /**
   * A list of operations to be performed (`DeleteRequest` or `PutRequest`).
   */
  readonly requestItems: DynamodbTableBatchWriteItemRequestItem[];

  /**
   * Determines the level of detail about either provisioned or on-demand throughput consumption.
   *
   * @default "NONE"
   */
  readonly returnConsumedCapacity?: "INDEXES" | "TOTAL" | "NONE";

  /**
   * Determines whether item collection metrics are returned.
   *
   * @default "NONE"
   */
  readonly returnItemCollectionMetrics?: "SIZE" | "NONE";
}

/**
 * Result for `DynamodbTable.batchWriteItem`.
 */
export interface DynamodbTableBatchWriteItemResult {
  /**
   * The unprocessed items from the operation.
   */
  readonly unprocessedItems?: DynamodbTableBatchWriteItemRequestItem[];

  /**
   * The capacity units consumed by the operation.
   */
  readonly consumedCapacity?: Json;

  /**
   * Information about item collections, if any, that were affected by the operation.
   */
  readonly itemCollectionMetrics?: Json;
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
  readonly update?: DynamodbTransactWriteItemUpdateOptions;

  /**
   * A request to perform a delete operation.
   */
  readonly delete?: DynamodbTransactWriteItemDeleteOptions;

  /**
   * A request to perform a condition check operation.
   */
  readonly conditionCheck?: DynamodbTransactWriteItemConditionCheckOptions;
}

/**
 * Options for `DynamodbTable.transactWriteItems`.
 */
export interface DynamodbTransactWriteItemsOptions {
  /**
   * The write transact items.
   */
  readonly transactItems: DynamodbTransactWriteItem[];
}

/**
 * Result for `DynamodbTable.transactWriteItems`.
 */
export interface DynamodbTableTransactWriteItemsResult {
  /**
   * The capacity units consumed by the operation.
   */
  readonly consumedCapacity?: Json;

  /**
   * Information about item collections, if any, that were affected by the operation.
   */
  readonly itemCollectionMetrics?: Json;

  /**
   * The attribute values as they appeared before the operation, but only if `ReturnValues` is specified as `"ALL_OLD"` in the request.
   */
  readonly attributes?: Json;
}

/**
 * Inflight interface for `DynamodbTable`.
 */
export interface IDynamodbTableClient {
  /**
   * Put an item into the table.
   * @param options dynamodb PutItem options.
   * @inflight
   */
  putItem(options: DynamodbTablePutItemOptions): Promise<void>;

  /**
   * Get an item from the table.
   * @param options dynamodb UpdateItem options.
   * @inflight
   */
  updateItem(
    options: DynamodbTableUpdateItemOptions
  ): Promise<DynamodbTableUpdateItemResult>;

  /**
   * Delete an item from the table.
   * @param options dynamodb DeleteItem options.
   * @inflight
   * @see https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_DeleteItem.html
   */
  deleteItem(
    options: DynamodbTableDeleteItemOptions
  ): Promise<DynamodbTableDeleteItemResult>;

  /**
   * Get an item from the table.
   * @param options options for the getItem operation.
   * @inflight
   * @see https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_GetItem.html
   */
  getItem(
    options: DynamodbTableGetItemOptions
  ): Promise<DynamodbTableGetItemResult>;

  /**
   * Return one or more items and item attributes by accessing every item in a table or a secondary index.
   * @param options options for the scan operation.
   * @inflight
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
   * Perform a synchronous write operation that groups up to 100 action requests.
   * @param options options for the transact write items operation.
   * @inflight
   */
  transactWriteItems(
    options: DynamodbTransactWriteItemsOptions
  ): Promise<DynamodbTableTransactWriteItemsResult>;

  /**
   * Return the attributes of one or more items.
   * @param options options for the batch get item operation.
   * @inflight
   */
  batchGetItem(
    options: DynamodbTableBatchGetItemOptions
  ): Promise<DynamodbTableBatchGetItemResult>;

  /**
   * Put or delete multiple items.
   * @param options options for the batch write item operation.
   * @inflight
   */
  batchWriteItem(
    options: DynamodbTableBatchWriteItemOptions
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
  /** `DynamodbTable.transactWriteItems` */
  TRANSACT_WRITE_ITEMS = "transactWriteItems",
  /** `DynamodbTable.batchGetItem` */
  BATCH_GET_ITEM = "batchGetItem",
  /** `DynamodbTable.batchWriteItem` */
  BATCH_Write_ITEM = "batchWriteItem",
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

  public async putItem(options: DynamodbTablePutItemOptions): Promise<void> {
    const client = await this._rawClient();
    await client.send(
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
      })
    );
  }

  public async updateItem(
    options: DynamodbTableUpdateItemOptions
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
      })
    );
    return {
      attributes: result.Attributes as Json | undefined,
      consumedCapacity: result.ConsumedCapacity as Json | undefined,
      itemCollectionMetrics: result.ItemCollectionMetrics as Json | undefined,
    };
  }

  public async deleteItem(
    options: DynamodbTableDeleteItemOptions
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
      })
    );
    return {
      attributes: result.Attributes as Json | undefined,
      consumedCapacity: result.ConsumedCapacity as Json | undefined,
      itemCollectionMetrics: result.ItemCollectionMetrics as Json | undefined,
    };
  }

  public async getItem(
    options: DynamodbTableGetItemOptions
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
      })
    );
    return {
      consumedCapacity: result.ConsumedCapacity as Json | undefined,
      item: result.Item ? (unmarshall(result.Item) as Json) : ({} as Json),
    };
  }

  public async scan(
    options?: DynamodbTableScanOptions
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
    options: DynamodbTableQueryOptions
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
    options: DynamodbTransactWriteItemsOptions
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
          "A write transact item must define either `put`, `update`, `delete` or `conditionCheck`."
        );
      }
    });

    const result = await client.send(
      new TransactWriteItemsCommand({
        TransactItems: items,
      })
    );

    return {
      consumedCapacity: result.ConsumedCapacity as Json | undefined,
      itemCollectionMetrics: result.ItemCollectionMetrics as Json | undefined,
    };
  }

  public async batchGetItem(
    options: DynamodbTableBatchGetItemOptions
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
      })
    );
    const unprocessedKeys = result.UnprocessedKeys?.[this.tableName];
    return {
      consumedCapacity: result.ConsumedCapacity as Json | undefined,
      responses: result.Responses
        ? result.Responses[this.tableName].map(
            (item) => unmarshall(item) as Json
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
    options: DynamodbTableBatchWriteItemOptions
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
                "A batch write item must define either `deleteRequest` or `putRequest`."
              );
            }
          }),
        },
        ReturnConsumedCapacity: options.returnConsumedCapacity,
        ReturnItemCollectionMetrics: options.returnItemCollectionMetrics,
      })
    );
    return {
      consumedCapacity: result.ConsumedCapacity as Json | undefined,
      itemCollectionMetrics: result.ItemCollectionMetrics as Json | undefined,
      unprocessedItems: result.UnprocessedItems
        ? result.UnprocessedItems[
            this.tableName
          ].map<DynamodbTableBatchWriteItemRequestItem>((item) => {
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
