import { Json } from "../../std";

/**
 * Options for `DynamodbTable.putItem`.
 */
export interface DynamodbTablePutItemOptions {
  /**
   * The values of the item to be put.
   */
  readonly item: Json;

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
   * The primary key of the item to be updated.
   */
  readonly key: Json;

  /**
   * An expression that defines one or more attributes to be updated.
   */
  readonly updateExpression?: string;

  /**
   * One or more substitution tokens for attribute names in an expression.
   */
  readonly expressionAttributeNames?: Json;

  /**
   * One or more values that can be substituted in an expression.
   */
  readonly expressionAttributeValues?: Json;

  /**
   * A condition that must be satisfied in order for a conditional update to succeed.
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
   * The primary key of the item to be deleted.
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
   * The primary key of the item to be retrieved.
   */
  readonly key: Json;

  /**
   * Determines the read consistency model: If set to true, then the operation uses strongly consistent reads; otherwise, the operation uses eventually consistent reads.
   *
   * @default false
   */
  readonly consistentRead?: boolean;

  /**
   * One or more substitution tokens for attribute names in an expression.
   */
  readonly expressionAttributeNames?: Json;

  /**
   * A string that identifies one or more attributes to retrieve from the table.
   */
  readonly projectionExpression?: string;

  /**
   * Determines the level of detail about either provisioned or on-demand throughput consumption.
   *
   * @default "NONE"
   */
  readonly returnConsumedCapacity?: "INDEXES" | "TOTAL" | "NONE";
}

/**
 * Result for `DynamodbTable.getItem`.
 *
 */
export interface DynamodbTableGetItemResult {
  /**
   * The capacity units consumed by the operation.
   */
  readonly consumedCapacity?: Json;

  /**
   * A map of attribute names to `AttributeValue` objects, as specified by `ProjectionExpression`.
   */
  readonly item?: Json;
}

/**
 * Options for `DynamodbTable.scan`.
 */
export interface DynamodbTableScanOptions {
  /**
   * Determines the read consistency model: If set to true, then the operation uses strongly consistent reads; otherwise, the operation uses eventually consistent reads.
   *
   * @default false
   */
  readonly consistentRead?: boolean;

  /**
   * The primary key of the first item that this operation will evaluate.
   *
   */
  readonly exclusiveStartKey?: Json;

  /**
   * One or more substitution tokens for attribute names in an expression.
   *
   */
  readonly expressionAttributeNames?: Json;

  /**
   * One or more values that can be substituted in an expression.
   *
   */
  readonly expressionAttributeValues?: Json;

  /**
   * A string that contains conditions that DynamoDB applies after the Query operation, but before the data is returned to you.
   *
   */
  readonly filterExpression?: string;

  /**
   * The name of an index to query.
   *
   */
  readonly indexName?: string;

  /**
   * The maximum number of items to evaluate (not necessarily the number of matching items).
   *
   * @minimum 1
   */
  readonly limit?: number;

  /**
   * A string that identifies one or more attributes to retrieve from the table.
   *
   */
  readonly projectionExpression?: string;

  /**
   * Determines the level of detail about either provisioned or on-demand throughput consumption.
   *
   * @default "NONE"
   */
  readonly returnConsumedCapacity?: "INDEXES" | "TOTAL" | "NONE";

  /**
   * For a parallel Scan request, Segment identifies an individual segment to be scanned by an application worker.
   *
   * @minimum 0
   * @maximum 999999
   * @default 0
   */
  readonly segment?: number;

  /**
   * The attributes to be returned in the result.
   *
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
   */
  readonly totalSegments?: number;
}

/**
 * Result for `DynamodbTable.scan`.
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
   */
  readonly consistentRead?: boolean;

  /**
   * The primary key of the first item that this operation will evaluate.
   *
   */
  readonly exclusiveStartKey?: Json;

  /**
   * One or more substitution tokens for attribute names in an expression.
   *
   */
  readonly expressionAttributeNames?: Json;

  /**
   * One or more values that can be substituted in an expression.
   *
   */
  readonly expressionAttributeValues?: Json;

  /**
   * A string that contains conditions that DynamoDB applies after the Query operation, but before the data is returned to you.
   *
   */
  readonly filterExpression?: string;

  /**
   * The name of an index to query.
   *
   */
  readonly indexName?: string;

  /**
   * The condition that specifies the key values for items to be retrieved by the Query action.
   *
   */
  readonly keyConditionExpression: string;

  /**
   * The maximum number of items to evaluate (not necessarily the number of matching items).
   *
   * @minimum 1
   */
  readonly limit?: number;

  /**
   * A string that identifies one or more attributes to retrieve from the table.
   *
   */
  readonly projectionExpression?: string;

  /**
   * Determines the level of detail about either provisioned or on-demand throughput consumption.
   *
   * @default "NONE"
   */
  readonly returnConsumedCapacity?: "INDEXES" | "TOTAL" | "NONE";

  /**
   * Specifies the order for index traversal.
   *
   * @default true
   */
  readonly scanIndexForward?: boolean;

  /**
   * The attributes to be returned in the result.
   *
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
export interface DynamodbTransactWriteItemPutOptions {
  /**
   * The values of the item to be put.
   */
  readonly item: Json;

  /**
   * A condition that must be satisfied in order for the operation to succeed.
   * @default undefined
   */
  readonly conditionExpression?: string;
}

/**
 * Options for transact write item's update operation.
 */
export interface DynamodbTransactWriteItemUpdateOptions {
  /**
   * The primary key of the item to be updated.
   */
  readonly key: Json;

  /**
   * An expression that defines one or more attributes to be updated.
   */
  readonly updateExpression?: string;

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
  readonly returnValuesOnConditionCheckFailure?: "ALL_OLD" | "NONE";
}

/**
 * Options for transact write item's delete operation.
 */
export interface DynamodbTransactWriteItemDeleteOptions {
  /**
   * The primary key of the item to be deleted.
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
  readonly returnValuesOnConditionCheckFailure?: "ALL_OLD" | "NONE";
}

/**
 * Options for transact write item's condition check operation.
 */
export interface DynamodbTransactWriteItemConditionCheckOptions {
  /**
   * The primary key of the item to be checked.
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
   */
  readonly expressionAttributeNames?: Json;

  /**
   * A string that identifies one or more attributes to retrieve from the table.
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
   * The primary key of the item to be deleted.
   */
  readonly key: Json;
}

/**
 * Options for `DynamodbTable.batchWriteItem`'s put request.
 */
export interface DynamodbTableBatchWriteItemPutRequestOptions {
  /**
   * The values of the item to be put.
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
  readonly put?: DynamodbTransactWriteItemPutOptions;

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
 * Options for `DynamodbTable.transactGetItems`'s get operation.
 */
export interface DynamodbTransactGetItemGetOptions {
  /**
   * The primary key of the item to be retrieved.
   */
  readonly key: Json;

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
 * Dynamodb transact get operation.
 */
export interface DynamodbTransactGetItem {
  /**
   * A request to perform a get operation.
   */
  readonly get?: DynamodbTransactGetItemGetOptions;
}

/**
 * Options for `DynamodbTable.transactGetItems`.
 */
export interface DynamodbTransactGetItemsOptions {
  /**
   * An ordered array of up to 100 `DynamodbTransactGetItem` objects, each of which contains a `DynamodbTransactGetItem` structure.
   */
  readonly transactItems: DynamodbTransactGetItem[];

  /**
   * Determines the level of detail about either provisioned or on-demand throughput consumption.
   * @default "NONE"
   */
  readonly returnConsumedCapacity?: "INDEXES" | "TOTAL" | "NONE";
}

/**
 * Details of the requested item.
 */
export interface DynamodbTableTransactGetItemsResponseItem {
  /**
   * The values of the item.
   */
  readonly item: Json;
}

/**
 * Result for `DynamodbTable.transactGetItems`.
 */
export interface DynamodbTableTransactGetItemsResult {
  /**
   * An ordered array of up to 100 `DynamodbTableTransactGetItemsResponseItem` objects.
   */
  readonly responses: DynamodbTableTransactGetItemsResponseItem[];

  /**
   * The capacity units consumed by the operation.
   */
  readonly consumedCapacity?: Json;
}
