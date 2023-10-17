---
title: Dynamodb Table
id: dynamodb-table
description: A cloud Dynamodb table.
keywords: [dynamoDB, NoSQL, store, DB, database, cache, table]
sidebar_position: 1
---
# API Reference <a name="API Reference" id="api-reference"></a>

## Resources <a name="Resources" id="Resources"></a>

### DynamodbTable <a name="DynamodbTable" id="@winglang/sdk.ex.DynamodbTable"></a>

A cloud Dynamodb table.

#### Initializers <a name="Initializers" id="@winglang/sdk.ex.DynamodbTable.Initializer"></a>

```wing
bring ex;

new ex.DynamodbTable(props: DynamodbTableProps);
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.ex.DynamodbTable.Initializer.parameter.props">props</a></code> | <code><a href="#@winglang/sdk.ex.DynamodbTableProps">DynamodbTableProps</a></code> | *No description.* |

---

##### `props`<sup>Required</sup> <a name="props" id="@winglang/sdk.ex.DynamodbTable.Initializer.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.ex.DynamodbTableProps">DynamodbTableProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

##### Inflight Methods

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.ex.IDynamodbTableClient.batchGetItem">batchGetItem</a></code> | Return the attributes of one or more items. |
| <code><a href="#@winglang/sdk.ex.IDynamodbTableClient.batchWriteItem">batchWriteItem</a></code> | Put or delete multiple items. |
| <code><a href="#@winglang/sdk.ex.IDynamodbTableClient.deleteItem">deleteItem</a></code> | Delete an item from the table. |
| <code><a href="#@winglang/sdk.ex.IDynamodbTableClient.getItem">getItem</a></code> | Get an item from the table. |
| <code><a href="#@winglang/sdk.ex.IDynamodbTableClient.putItem">putItem</a></code> | Put an item into the table. |
| <code><a href="#@winglang/sdk.ex.IDynamodbTableClient.query">query</a></code> | Return all items with a given partition key value. |
| <code><a href="#@winglang/sdk.ex.IDynamodbTableClient.scan">scan</a></code> | Return one or more items and item attributes by accessing every item in a table or a secondary index. |
| <code><a href="#@winglang/sdk.ex.IDynamodbTableClient.transactGetItems">transactGetItems</a></code> | Perform a synchronous read operation that groups up to 100 item retrievals. |
| <code><a href="#@winglang/sdk.ex.IDynamodbTableClient.transactWriteItems">transactWriteItems</a></code> | Perform a synchronous write operation that groups up to 100 action requests. |
| <code><a href="#@winglang/sdk.ex.IDynamodbTableClient.updateItem">updateItem</a></code> | Get an item from the table. |

---

##### `batchGetItem` <a name="batchGetItem" id="@winglang/sdk.ex.IDynamodbTableClient.batchGetItem"></a>

```wing
inflight batchGetItem(options: DynamodbTableBatchGetItemOptions): DynamodbTableBatchGetItemResult
```

Return the attributes of one or more items.

> [https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_BatchGetItem.html](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_BatchGetItem.html)

###### `options`<sup>Required</sup> <a name="options" id="@winglang/sdk.ex.IDynamodbTableClient.batchGetItem.parameter.options"></a>

- *Type:* <a href="#@winglang/sdk.ex.DynamodbTableBatchGetItemOptions">DynamodbTableBatchGetItemOptions</a>

options for the batch get item operation.

---

##### `batchWriteItem` <a name="batchWriteItem" id="@winglang/sdk.ex.IDynamodbTableClient.batchWriteItem"></a>

```wing
inflight batchWriteItem(options: DynamodbTableBatchWriteItemOptions): DynamodbTableBatchWriteItemResult
```

Put or delete multiple items.

> [https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_BatchWriteItem.html](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_BatchWriteItem.html)

###### `options`<sup>Required</sup> <a name="options" id="@winglang/sdk.ex.IDynamodbTableClient.batchWriteItem.parameter.options"></a>

- *Type:* <a href="#@winglang/sdk.ex.DynamodbTableBatchWriteItemOptions">DynamodbTableBatchWriteItemOptions</a>

options for the batch write item operation.

---

##### `deleteItem` <a name="deleteItem" id="@winglang/sdk.ex.IDynamodbTableClient.deleteItem"></a>

```wing
inflight deleteItem(options: DynamodbTableDeleteItemOptions): DynamodbTableDeleteItemResult
```

Delete an item from the table.

> [https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_DeleteItem.html](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_DeleteItem.html)

###### `options`<sup>Required</sup> <a name="options" id="@winglang/sdk.ex.IDynamodbTableClient.deleteItem.parameter.options"></a>

- *Type:* <a href="#@winglang/sdk.ex.DynamodbTableDeleteItemOptions">DynamodbTableDeleteItemOptions</a>

dynamodb DeleteItem options.

---

##### `getItem` <a name="getItem" id="@winglang/sdk.ex.IDynamodbTableClient.getItem"></a>

```wing
inflight getItem(options: DynamodbTableGetItemOptions): DynamodbTableGetItemResult
```

Get an item from the table.

> [https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_GetItem.html](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_GetItem.html)

###### `options`<sup>Required</sup> <a name="options" id="@winglang/sdk.ex.IDynamodbTableClient.getItem.parameter.options"></a>

- *Type:* <a href="#@winglang/sdk.ex.DynamodbTableGetItemOptions">DynamodbTableGetItemOptions</a>

options for the getItem operation.

---

##### `putItem` <a name="putItem" id="@winglang/sdk.ex.IDynamodbTableClient.putItem"></a>

```wing
inflight putItem(options: DynamodbTablePutItemOptions): DynamodbTablePutItemResult
```

Put an item into the table.

> [https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_PutItem.html](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_PutItem.html)

###### `options`<sup>Required</sup> <a name="options" id="@winglang/sdk.ex.IDynamodbTableClient.putItem.parameter.options"></a>

- *Type:* <a href="#@winglang/sdk.ex.DynamodbTablePutItemOptions">DynamodbTablePutItemOptions</a>

dynamodb PutItem options.

---

##### `query` <a name="query" id="@winglang/sdk.ex.IDynamodbTableClient.query"></a>

```wing
inflight query(options: DynamodbTableQueryOptions): DynamodbTableQueryResult
```

Return all items with a given partition key value.

> [https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Query.html](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Query.html)

###### `options`<sup>Required</sup> <a name="options" id="@winglang/sdk.ex.IDynamodbTableClient.query.parameter.options"></a>

- *Type:* <a href="#@winglang/sdk.ex.DynamodbTableQueryOptions">DynamodbTableQueryOptions</a>

options for the query operation.

---

##### `scan` <a name="scan" id="@winglang/sdk.ex.IDynamodbTableClient.scan"></a>

```wing
inflight scan(options?: DynamodbTableScanOptions): DynamodbTableScanResult
```

Return one or more items and item attributes by accessing every item in a table or a secondary index.

> [https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html)

###### `options`<sup>Optional</sup> <a name="options" id="@winglang/sdk.ex.IDynamodbTableClient.scan.parameter.options"></a>

- *Type:* <a href="#@winglang/sdk.ex.DynamodbTableScanOptions">DynamodbTableScanOptions</a>

options for the scan operation.

---

##### `transactGetItems` <a name="transactGetItems" id="@winglang/sdk.ex.IDynamodbTableClient.transactGetItems"></a>

```wing
inflight transactGetItems(options: DynamodbTransactGetItemsOptions): DynamodbTableTransactGetItemsResult
```

Perform a synchronous read operation that groups up to 100 item retrievals.

> [https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_TransactGetItems.html](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_TransactGetItems.html)

###### `options`<sup>Required</sup> <a name="options" id="@winglang/sdk.ex.IDynamodbTableClient.transactGetItems.parameter.options"></a>

- *Type:* <a href="#@winglang/sdk.ex.DynamodbTransactGetItemsOptions">DynamodbTransactGetItemsOptions</a>

options for the query operation.

---

##### `transactWriteItems` <a name="transactWriteItems" id="@winglang/sdk.ex.IDynamodbTableClient.transactWriteItems"></a>

```wing
inflight transactWriteItems(options: DynamodbTransactWriteItemsOptions): DynamodbTableTransactWriteItemsResult
```

Perform a synchronous write operation that groups up to 100 action requests.

> [https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_TransactWriteItems.html](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_TransactWriteItems.html)

###### `options`<sup>Required</sup> <a name="options" id="@winglang/sdk.ex.IDynamodbTableClient.transactWriteItems.parameter.options"></a>

- *Type:* <a href="#@winglang/sdk.ex.DynamodbTransactWriteItemsOptions">DynamodbTransactWriteItemsOptions</a>

options for the transact write items operation.

---

##### `updateItem` <a name="updateItem" id="@winglang/sdk.ex.IDynamodbTableClient.updateItem"></a>

```wing
inflight updateItem(options: DynamodbTableUpdateItemOptions): DynamodbTableUpdateItemResult
```

Get an item from the table.

> [https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_UpdateItem.html](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_UpdateItem.html)

###### `options`<sup>Required</sup> <a name="options" id="@winglang/sdk.ex.IDynamodbTableClient.updateItem.parameter.options"></a>

- *Type:* <a href="#@winglang/sdk.ex.DynamodbTableUpdateItemOptions">DynamodbTableUpdateItemOptions</a>

dynamodb UpdateItem options.

---


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.ex.DynamodbTable.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/sdk.ex.DynamodbTable.property.name">name</a></code> | <code>str</code> | Table name. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.ex.DynamodbTable.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `name`<sup>Required</sup> <a name="name" id="@winglang/sdk.ex.DynamodbTable.property.name"></a>

```wing
name: str;
```

- *Type:* str

Table name.

---


## Classes <a name="Classes" id="Classes"></a>

### DynamodbTableClientBase <a name="DynamodbTableClientBase" id="@winglang/sdk.ex.DynamodbTableClientBase"></a>

- *Implements:* <a href="#@winglang/sdk.ex.IDynamodbTableClient">IDynamodbTableClient</a>

Base class for `DynamodbTable` Client.

#### Initializers <a name="Initializers" id="@winglang/sdk.ex.DynamodbTableClientBase.Initializer"></a>

```wing
bring ex;

new ex.DynamodbTableClientBase(tableName: str);
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.ex.DynamodbTableClientBase.Initializer.parameter.tableName">tableName</a></code> | <code>str</code> | the table name. |

---

##### `tableName`<sup>Required</sup> <a name="tableName" id="@winglang/sdk.ex.DynamodbTableClientBase.Initializer.parameter.tableName"></a>

- *Type:* str

the table name.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.ex.DynamodbTableClientBase.batchGetItem">batchGetItem</a></code> | Return the attributes of one or more items. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableClientBase.batchWriteItem">batchWriteItem</a></code> | Put or delete multiple items. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableClientBase.deleteItem">deleteItem</a></code> | Delete an item from the table. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableClientBase.getItem">getItem</a></code> | Get an item from the table. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableClientBase.putItem">putItem</a></code> | Put an item into the table. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableClientBase.query">query</a></code> | Return all items with a given partition key value. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableClientBase.scan">scan</a></code> | Return one or more items and item attributes by accessing every item in a table or a secondary index. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableClientBase.transactGetItems">transactGetItems</a></code> | Perform a synchronous read operation that groups up to 100 item retrievals. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableClientBase.transactWriteItems">transactWriteItems</a></code> | Perform a synchronous write operation that groups up to 100 action requests. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableClientBase.updateItem">updateItem</a></code> | Get an item from the table. |

---

##### `batchGetItem` <a name="batchGetItem" id="@winglang/sdk.ex.DynamodbTableClientBase.batchGetItem"></a>

```wing
batchGetItem(options: DynamodbTableBatchGetItemOptions): DynamodbTableBatchGetItemResult
```

Return the attributes of one or more items.

###### `options`<sup>Required</sup> <a name="options" id="@winglang/sdk.ex.DynamodbTableClientBase.batchGetItem.parameter.options"></a>

- *Type:* <a href="#@winglang/sdk.ex.DynamodbTableBatchGetItemOptions">DynamodbTableBatchGetItemOptions</a>

---

##### `batchWriteItem` <a name="batchWriteItem" id="@winglang/sdk.ex.DynamodbTableClientBase.batchWriteItem"></a>

```wing
batchWriteItem(options: DynamodbTableBatchWriteItemOptions): DynamodbTableBatchWriteItemResult
```

Put or delete multiple items.

###### `options`<sup>Required</sup> <a name="options" id="@winglang/sdk.ex.DynamodbTableClientBase.batchWriteItem.parameter.options"></a>

- *Type:* <a href="#@winglang/sdk.ex.DynamodbTableBatchWriteItemOptions">DynamodbTableBatchWriteItemOptions</a>

---

##### `deleteItem` <a name="deleteItem" id="@winglang/sdk.ex.DynamodbTableClientBase.deleteItem"></a>

```wing
deleteItem(options: DynamodbTableDeleteItemOptions): DynamodbTableDeleteItemResult
```

Delete an item from the table.

###### `options`<sup>Required</sup> <a name="options" id="@winglang/sdk.ex.DynamodbTableClientBase.deleteItem.parameter.options"></a>

- *Type:* <a href="#@winglang/sdk.ex.DynamodbTableDeleteItemOptions">DynamodbTableDeleteItemOptions</a>

---

##### `getItem` <a name="getItem" id="@winglang/sdk.ex.DynamodbTableClientBase.getItem"></a>

```wing
getItem(options: DynamodbTableGetItemOptions): DynamodbTableGetItemResult
```

Get an item from the table.

###### `options`<sup>Required</sup> <a name="options" id="@winglang/sdk.ex.DynamodbTableClientBase.getItem.parameter.options"></a>

- *Type:* <a href="#@winglang/sdk.ex.DynamodbTableGetItemOptions">DynamodbTableGetItemOptions</a>

---

##### `putItem` <a name="putItem" id="@winglang/sdk.ex.DynamodbTableClientBase.putItem"></a>

```wing
putItem(options: DynamodbTablePutItemOptions): DynamodbTablePutItemResult
```

Put an item into the table.

###### `options`<sup>Required</sup> <a name="options" id="@winglang/sdk.ex.DynamodbTableClientBase.putItem.parameter.options"></a>

- *Type:* <a href="#@winglang/sdk.ex.DynamodbTablePutItemOptions">DynamodbTablePutItemOptions</a>

---

##### `query` <a name="query" id="@winglang/sdk.ex.DynamodbTableClientBase.query"></a>

```wing
query(options: DynamodbTableQueryOptions): DynamodbTableQueryResult
```

Return all items with a given partition key value.

###### `options`<sup>Required</sup> <a name="options" id="@winglang/sdk.ex.DynamodbTableClientBase.query.parameter.options"></a>

- *Type:* <a href="#@winglang/sdk.ex.DynamodbTableQueryOptions">DynamodbTableQueryOptions</a>

---

##### `scan` <a name="scan" id="@winglang/sdk.ex.DynamodbTableClientBase.scan"></a>

```wing
scan(options?: DynamodbTableScanOptions): DynamodbTableScanResult
```

Return one or more items and item attributes by accessing every item in a table or a secondary index.

###### `options`<sup>Optional</sup> <a name="options" id="@winglang/sdk.ex.DynamodbTableClientBase.scan.parameter.options"></a>

- *Type:* <a href="#@winglang/sdk.ex.DynamodbTableScanOptions">DynamodbTableScanOptions</a>

---

##### `transactGetItems` <a name="transactGetItems" id="@winglang/sdk.ex.DynamodbTableClientBase.transactGetItems"></a>

```wing
transactGetItems(options: DynamodbTransactGetItemsOptions): DynamodbTableTransactGetItemsResult
```

Perform a synchronous read operation that groups up to 100 item retrievals.

###### `options`<sup>Required</sup> <a name="options" id="@winglang/sdk.ex.DynamodbTableClientBase.transactGetItems.parameter.options"></a>

- *Type:* <a href="#@winglang/sdk.ex.DynamodbTransactGetItemsOptions">DynamodbTransactGetItemsOptions</a>

---

##### `transactWriteItems` <a name="transactWriteItems" id="@winglang/sdk.ex.DynamodbTableClientBase.transactWriteItems"></a>

```wing
transactWriteItems(options: DynamodbTransactWriteItemsOptions): DynamodbTableTransactWriteItemsResult
```

Perform a synchronous write operation that groups up to 100 action requests.

###### `options`<sup>Required</sup> <a name="options" id="@winglang/sdk.ex.DynamodbTableClientBase.transactWriteItems.parameter.options"></a>

- *Type:* <a href="#@winglang/sdk.ex.DynamodbTransactWriteItemsOptions">DynamodbTransactWriteItemsOptions</a>

---

##### `updateItem` <a name="updateItem" id="@winglang/sdk.ex.DynamodbTableClientBase.updateItem"></a>

```wing
updateItem(options: DynamodbTableUpdateItemOptions): DynamodbTableUpdateItemResult
```

Get an item from the table.

###### `options`<sup>Required</sup> <a name="options" id="@winglang/sdk.ex.DynamodbTableClientBase.updateItem.parameter.options"></a>

- *Type:* <a href="#@winglang/sdk.ex.DynamodbTableUpdateItemOptions">DynamodbTableUpdateItemOptions</a>

---




## Structs <a name="Structs" id="Structs"></a>

### DynamodbTableBatchGetItemOptions <a name="DynamodbTableBatchGetItemOptions" id="@winglang/sdk.ex.DynamodbTableBatchGetItemOptions"></a>

Options for `DynamodbTable.batchGetItem`.

#### Initializer <a name="Initializer" id="@winglang/sdk.ex.DynamodbTableBatchGetItemOptions.Initializer"></a>

```wing
bring ex;

let DynamodbTableBatchGetItemOptions = ex.DynamodbTableBatchGetItemOptions{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.ex.DynamodbTableBatchGetItemOptions.property.requestItem">requestItem</a></code> | <code><a href="#@winglang/sdk.ex.DynamodbTableBatchGetItemRequestItem">DynamodbTableBatchGetItemRequestItem</a></code> | Describes one or more items to retrieve from that table. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableBatchGetItemOptions.property.returnConsumedCapacity">returnConsumedCapacity</a></code> | <code>str</code> | Determines the level of detail about either provisioned or on-demand throughput consumption. |

---

##### `requestItem`<sup>Required</sup> <a name="requestItem" id="@winglang/sdk.ex.DynamodbTableBatchGetItemOptions.property.requestItem"></a>

```wing
requestItem: DynamodbTableBatchGetItemRequestItem;
```

- *Type:* <a href="#@winglang/sdk.ex.DynamodbTableBatchGetItemRequestItem">DynamodbTableBatchGetItemRequestItem</a>

Describes one or more items to retrieve from that table.

---

##### `returnConsumedCapacity`<sup>Optional</sup> <a name="returnConsumedCapacity" id="@winglang/sdk.ex.DynamodbTableBatchGetItemOptions.property.returnConsumedCapacity"></a>

```wing
returnConsumedCapacity: str;
```

- *Type:* str
- *Default:* "NONE"

Determines the level of detail about either provisioned or on-demand throughput consumption.

---

### DynamodbTableBatchGetItemRequestItem <a name="DynamodbTableBatchGetItemRequestItem" id="@winglang/sdk.ex.DynamodbTableBatchGetItemRequestItem"></a>

Options for `DynamodbTable.batchGetItem` request item.

#### Initializer <a name="Initializer" id="@winglang/sdk.ex.DynamodbTableBatchGetItemRequestItem.Initializer"></a>

```wing
bring ex;

let DynamodbTableBatchGetItemRequestItem = ex.DynamodbTableBatchGetItemRequestItem{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.ex.DynamodbTableBatchGetItemRequestItem.property.keys">keys</a></code> | <code>MutArray&lt;<a href="#@winglang/sdk.std.Json">Json</a>&gt;</code> | The primary key attribute values that define the items and the attributes associated with the items. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableBatchGetItemRequestItem.property.consistentRead">consistentRead</a></code> | <code>bool</code> | The consistency of a read operation. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableBatchGetItemRequestItem.property.expressionAttributeNames">expressionAttributeNames</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | One or more substitution tokens for attribute names in an expression. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableBatchGetItemRequestItem.property.projectionExpression">projectionExpression</a></code> | <code>str</code> | A string that identifies one or more attributes to retrieve from the table. |

---

##### `keys`<sup>Required</sup> <a name="keys" id="@winglang/sdk.ex.DynamodbTableBatchGetItemRequestItem.property.keys"></a>

```wing
keys: MutArray<Json>;
```

- *Type:* MutArray&lt;<a href="#@winglang/sdk.std.Json">Json</a>&gt;

The primary key attribute values that define the items and the attributes associated with the items.

---

##### `consistentRead`<sup>Optional</sup> <a name="consistentRead" id="@winglang/sdk.ex.DynamodbTableBatchGetItemRequestItem.property.consistentRead"></a>

```wing
consistentRead: bool;
```

- *Type:* bool
- *Default:* false

The consistency of a read operation.

---

##### `expressionAttributeNames`<sup>Optional</sup> <a name="expressionAttributeNames" id="@winglang/sdk.ex.DynamodbTableBatchGetItemRequestItem.property.expressionAttributeNames"></a>

```wing
expressionAttributeNames: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

One or more substitution tokens for attribute names in an expression.

---

##### `projectionExpression`<sup>Optional</sup> <a name="projectionExpression" id="@winglang/sdk.ex.DynamodbTableBatchGetItemRequestItem.property.projectionExpression"></a>

```wing
projectionExpression: str;
```

- *Type:* str

A string that identifies one or more attributes to retrieve from the table.

---

### DynamodbTableBatchGetItemResult <a name="DynamodbTableBatchGetItemResult" id="@winglang/sdk.ex.DynamodbTableBatchGetItemResult"></a>

Result for `DynamodbTable.batchGetItem`.

#### Initializer <a name="Initializer" id="@winglang/sdk.ex.DynamodbTableBatchGetItemResult.Initializer"></a>

```wing
bring ex;

let DynamodbTableBatchGetItemResult = ex.DynamodbTableBatchGetItemResult{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.ex.DynamodbTableBatchGetItemResult.property.consumedCapacity">consumedCapacity</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | The capacity units consumed by the operation. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableBatchGetItemResult.property.responses">responses</a></code> | <code>MutArray&lt;<a href="#@winglang/sdk.std.Json">Json</a>&gt;</code> | The list of items that are returned, with the attributes requested. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableBatchGetItemResult.property.unprocessedKeys">unprocessedKeys</a></code> | <code><a href="#@winglang/sdk.ex.DynamodbTableBatchGetItemRequestItem">DynamodbTableBatchGetItemRequestItem</a></code> | A list of keys that were not processed. |

---

##### `consumedCapacity`<sup>Optional</sup> <a name="consumedCapacity" id="@winglang/sdk.ex.DynamodbTableBatchGetItemResult.property.consumedCapacity"></a>

```wing
consumedCapacity: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

The capacity units consumed by the operation.

---

##### `responses`<sup>Optional</sup> <a name="responses" id="@winglang/sdk.ex.DynamodbTableBatchGetItemResult.property.responses"></a>

```wing
responses: MutArray<Json>;
```

- *Type:* MutArray&lt;<a href="#@winglang/sdk.std.Json">Json</a>&gt;

The list of items that are returned, with the attributes requested.

---

##### `unprocessedKeys`<sup>Optional</sup> <a name="unprocessedKeys" id="@winglang/sdk.ex.DynamodbTableBatchGetItemResult.property.unprocessedKeys"></a>

```wing
unprocessedKeys: DynamodbTableBatchGetItemRequestItem;
```

- *Type:* <a href="#@winglang/sdk.ex.DynamodbTableBatchGetItemRequestItem">DynamodbTableBatchGetItemRequestItem</a>

A list of keys that were not processed.

---

### DynamodbTableBatchWriteItemDeleteRequestOptions <a name="DynamodbTableBatchWriteItemDeleteRequestOptions" id="@winglang/sdk.ex.DynamodbTableBatchWriteItemDeleteRequestOptions"></a>

Options for `DynamodbTable.batchWriteItem`'s delete request.

#### Initializer <a name="Initializer" id="@winglang/sdk.ex.DynamodbTableBatchWriteItemDeleteRequestOptions.Initializer"></a>

```wing
bring ex;

let DynamodbTableBatchWriteItemDeleteRequestOptions = ex.DynamodbTableBatchWriteItemDeleteRequestOptions{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.ex.DynamodbTableBatchWriteItemDeleteRequestOptions.property.key">key</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | The primary key of the item to be deleted. |

---

##### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.ex.DynamodbTableBatchWriteItemDeleteRequestOptions.property.key"></a>

```wing
key: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

The primary key of the item to be deleted.

---

### DynamodbTableBatchWriteItemOptions <a name="DynamodbTableBatchWriteItemOptions" id="@winglang/sdk.ex.DynamodbTableBatchWriteItemOptions"></a>

Options for `DynamodbTable.batchWriteItem`.

#### Initializer <a name="Initializer" id="@winglang/sdk.ex.DynamodbTableBatchWriteItemOptions.Initializer"></a>

```wing
bring ex;

let DynamodbTableBatchWriteItemOptions = ex.DynamodbTableBatchWriteItemOptions{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.ex.DynamodbTableBatchWriteItemOptions.property.requestItems">requestItems</a></code> | <code>MutArray&lt;<a href="#@winglang/sdk.ex.DynamodbTableBatchWriteItemRequestItem">DynamodbTableBatchWriteItemRequestItem</a>&gt;</code> | A list of operations to be performed (`DeleteRequest` or `PutRequest`). |
| <code><a href="#@winglang/sdk.ex.DynamodbTableBatchWriteItemOptions.property.returnConsumedCapacity">returnConsumedCapacity</a></code> | <code>str</code> | Determines the level of detail about either provisioned or on-demand throughput consumption. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableBatchWriteItemOptions.property.returnItemCollectionMetrics">returnItemCollectionMetrics</a></code> | <code>str</code> | Determines whether item collection metrics are returned. |

---

##### `requestItems`<sup>Required</sup> <a name="requestItems" id="@winglang/sdk.ex.DynamodbTableBatchWriteItemOptions.property.requestItems"></a>

```wing
requestItems: MutArray<DynamodbTableBatchWriteItemRequestItem>;
```

- *Type:* MutArray&lt;<a href="#@winglang/sdk.ex.DynamodbTableBatchWriteItemRequestItem">DynamodbTableBatchWriteItemRequestItem</a>&gt;

A list of operations to be performed (`DeleteRequest` or `PutRequest`).

---

##### `returnConsumedCapacity`<sup>Optional</sup> <a name="returnConsumedCapacity" id="@winglang/sdk.ex.DynamodbTableBatchWriteItemOptions.property.returnConsumedCapacity"></a>

```wing
returnConsumedCapacity: str;
```

- *Type:* str
- *Default:* "NONE"

Determines the level of detail about either provisioned or on-demand throughput consumption.

---

##### `returnItemCollectionMetrics`<sup>Optional</sup> <a name="returnItemCollectionMetrics" id="@winglang/sdk.ex.DynamodbTableBatchWriteItemOptions.property.returnItemCollectionMetrics"></a>

```wing
returnItemCollectionMetrics: str;
```

- *Type:* str
- *Default:* "NONE"

Determines whether item collection metrics are returned.

---

### DynamodbTableBatchWriteItemPutRequestOptions <a name="DynamodbTableBatchWriteItemPutRequestOptions" id="@winglang/sdk.ex.DynamodbTableBatchWriteItemPutRequestOptions"></a>

Options for `DynamodbTable.batchWriteItem`'s put request.

#### Initializer <a name="Initializer" id="@winglang/sdk.ex.DynamodbTableBatchWriteItemPutRequestOptions.Initializer"></a>

```wing
bring ex;

let DynamodbTableBatchWriteItemPutRequestOptions = ex.DynamodbTableBatchWriteItemPutRequestOptions{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.ex.DynamodbTableBatchWriteItemPutRequestOptions.property.item">item</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | The values of the item to be put. |

---

##### `item`<sup>Required</sup> <a name="item" id="@winglang/sdk.ex.DynamodbTableBatchWriteItemPutRequestOptions.property.item"></a>

```wing
item: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

The values of the item to be put.

---

### DynamodbTableBatchWriteItemRequestItem <a name="DynamodbTableBatchWriteItemRequestItem" id="@winglang/sdk.ex.DynamodbTableBatchWriteItemRequestItem"></a>

Options for `DynamodbTable.batchWriteItem` request item.

#### Initializer <a name="Initializer" id="@winglang/sdk.ex.DynamodbTableBatchWriteItemRequestItem.Initializer"></a>

```wing
bring ex;

let DynamodbTableBatchWriteItemRequestItem = ex.DynamodbTableBatchWriteItemRequestItem{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.ex.DynamodbTableBatchWriteItemRequestItem.property.deleteRequest">deleteRequest</a></code> | <code><a href="#@winglang/sdk.ex.DynamodbTableBatchWriteItemDeleteRequestOptions">DynamodbTableBatchWriteItemDeleteRequestOptions</a></code> | A request to perform a delete operation. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableBatchWriteItemRequestItem.property.putRequest">putRequest</a></code> | <code><a href="#@winglang/sdk.ex.DynamodbTableBatchWriteItemPutRequestOptions">DynamodbTableBatchWriteItemPutRequestOptions</a></code> | A request to perform a put operation. |

---

##### `deleteRequest`<sup>Optional</sup> <a name="deleteRequest" id="@winglang/sdk.ex.DynamodbTableBatchWriteItemRequestItem.property.deleteRequest"></a>

```wing
deleteRequest: DynamodbTableBatchWriteItemDeleteRequestOptions;
```

- *Type:* <a href="#@winglang/sdk.ex.DynamodbTableBatchWriteItemDeleteRequestOptions">DynamodbTableBatchWriteItemDeleteRequestOptions</a>

A request to perform a delete operation.

---

##### `putRequest`<sup>Optional</sup> <a name="putRequest" id="@winglang/sdk.ex.DynamodbTableBatchWriteItemRequestItem.property.putRequest"></a>

```wing
putRequest: DynamodbTableBatchWriteItemPutRequestOptions;
```

- *Type:* <a href="#@winglang/sdk.ex.DynamodbTableBatchWriteItemPutRequestOptions">DynamodbTableBatchWriteItemPutRequestOptions</a>

A request to perform a put operation.

---

### DynamodbTableBatchWriteItemResult <a name="DynamodbTableBatchWriteItemResult" id="@winglang/sdk.ex.DynamodbTableBatchWriteItemResult"></a>

Result for `DynamodbTable.batchWriteItem`.

#### Initializer <a name="Initializer" id="@winglang/sdk.ex.DynamodbTableBatchWriteItemResult.Initializer"></a>

```wing
bring ex;

let DynamodbTableBatchWriteItemResult = ex.DynamodbTableBatchWriteItemResult{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.ex.DynamodbTableBatchWriteItemResult.property.consumedCapacity">consumedCapacity</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | The capacity units consumed by the operation. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableBatchWriteItemResult.property.itemCollectionMetrics">itemCollectionMetrics</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | Information about item collections, if any, that were affected by the operation. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableBatchWriteItemResult.property.unprocessedItems">unprocessedItems</a></code> | <code>MutArray&lt;<a href="#@winglang/sdk.ex.DynamodbTableBatchWriteItemRequestItem">DynamodbTableBatchWriteItemRequestItem</a>&gt;</code> | The unprocessed items from the operation. |

---

##### `consumedCapacity`<sup>Optional</sup> <a name="consumedCapacity" id="@winglang/sdk.ex.DynamodbTableBatchWriteItemResult.property.consumedCapacity"></a>

```wing
consumedCapacity: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

The capacity units consumed by the operation.

---

##### `itemCollectionMetrics`<sup>Optional</sup> <a name="itemCollectionMetrics" id="@winglang/sdk.ex.DynamodbTableBatchWriteItemResult.property.itemCollectionMetrics"></a>

```wing
itemCollectionMetrics: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

Information about item collections, if any, that were affected by the operation.

---

##### `unprocessedItems`<sup>Optional</sup> <a name="unprocessedItems" id="@winglang/sdk.ex.DynamodbTableBatchWriteItemResult.property.unprocessedItems"></a>

```wing
unprocessedItems: MutArray<DynamodbTableBatchWriteItemRequestItem>;
```

- *Type:* MutArray&lt;<a href="#@winglang/sdk.ex.DynamodbTableBatchWriteItemRequestItem">DynamodbTableBatchWriteItemRequestItem</a>&gt;

The unprocessed items from the operation.

---

### DynamodbTableDeleteItemOptions <a name="DynamodbTableDeleteItemOptions" id="@winglang/sdk.ex.DynamodbTableDeleteItemOptions"></a>

Options for `DynamodbTable.deleteItem`.

#### Initializer <a name="Initializer" id="@winglang/sdk.ex.DynamodbTableDeleteItemOptions.Initializer"></a>

```wing
bring ex;

let DynamodbTableDeleteItemOptions = ex.DynamodbTableDeleteItemOptions{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.ex.DynamodbTableDeleteItemOptions.property.key">key</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | The primary key of the item to be deleted. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableDeleteItemOptions.property.conditionExpression">conditionExpression</a></code> | <code>str</code> | A condition that must be satisfied in order for an operation to succeed. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableDeleteItemOptions.property.expressionAttributeNames">expressionAttributeNames</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | One or more substitution tokens for attribute names in an expression. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableDeleteItemOptions.property.expressionAttributeValues">expressionAttributeValues</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | One or more values that can be substituted in an expression. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableDeleteItemOptions.property.returnConsumedCapacity">returnConsumedCapacity</a></code> | <code>str</code> | Determines the level of detail about either provisioned or on-demand throughput consumption. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableDeleteItemOptions.property.returnItemCollectionMetrics">returnItemCollectionMetrics</a></code> | <code>str</code> | Determines whether item collection metrics are returned. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableDeleteItemOptions.property.returnValues">returnValues</a></code> | <code>str</code> | Whether to return the item attributes as they appeared before they were deleted. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableDeleteItemOptions.property.returnValuesOnConditionCheckFailure">returnValuesOnConditionCheckFailure</a></code> | <code>str</code> | Whether to return the item attributes if the condition fails. |

---

##### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.ex.DynamodbTableDeleteItemOptions.property.key"></a>

```wing
key: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

The primary key of the item to be deleted.

---

##### `conditionExpression`<sup>Optional</sup> <a name="conditionExpression" id="@winglang/sdk.ex.DynamodbTableDeleteItemOptions.property.conditionExpression"></a>

```wing
conditionExpression: str;
```

- *Type:* str

A condition that must be satisfied in order for an operation to succeed.

---

##### `expressionAttributeNames`<sup>Optional</sup> <a name="expressionAttributeNames" id="@winglang/sdk.ex.DynamodbTableDeleteItemOptions.property.expressionAttributeNames"></a>

```wing
expressionAttributeNames: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

One or more substitution tokens for attribute names in an expression.

---

##### `expressionAttributeValues`<sup>Optional</sup> <a name="expressionAttributeValues" id="@winglang/sdk.ex.DynamodbTableDeleteItemOptions.property.expressionAttributeValues"></a>

```wing
expressionAttributeValues: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

One or more values that can be substituted in an expression.

---

##### `returnConsumedCapacity`<sup>Optional</sup> <a name="returnConsumedCapacity" id="@winglang/sdk.ex.DynamodbTableDeleteItemOptions.property.returnConsumedCapacity"></a>

```wing
returnConsumedCapacity: str;
```

- *Type:* str
- *Default:* "NONE"

Determines the level of detail about either provisioned or on-demand throughput consumption.

---

##### `returnItemCollectionMetrics`<sup>Optional</sup> <a name="returnItemCollectionMetrics" id="@winglang/sdk.ex.DynamodbTableDeleteItemOptions.property.returnItemCollectionMetrics"></a>

```wing
returnItemCollectionMetrics: str;
```

- *Type:* str
- *Default:* "NONE"

Determines whether item collection metrics are returned.

---

##### `returnValues`<sup>Optional</sup> <a name="returnValues" id="@winglang/sdk.ex.DynamodbTableDeleteItemOptions.property.returnValues"></a>

```wing
returnValues: str;
```

- *Type:* str
- *Default:* "NONE"

Whether to return the item attributes as they appeared before they were deleted.

---

##### `returnValuesOnConditionCheckFailure`<sup>Optional</sup> <a name="returnValuesOnConditionCheckFailure" id="@winglang/sdk.ex.DynamodbTableDeleteItemOptions.property.returnValuesOnConditionCheckFailure"></a>

```wing
returnValuesOnConditionCheckFailure: str;
```

- *Type:* str
- *Default:* "NONE"

Whether to return the item attributes if the condition fails.

---

### DynamodbTableDeleteItemResult <a name="DynamodbTableDeleteItemResult" id="@winglang/sdk.ex.DynamodbTableDeleteItemResult"></a>

Result for `DynamodbTable.deleteItem`.

#### Initializer <a name="Initializer" id="@winglang/sdk.ex.DynamodbTableDeleteItemResult.Initializer"></a>

```wing
bring ex;

let DynamodbTableDeleteItemResult = ex.DynamodbTableDeleteItemResult{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.ex.DynamodbTableDeleteItemResult.property.attributes">attributes</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | The attribute values as they appeared before the operation, but only if `ReturnValues` is specified as `"ALL_OLD"` in the request. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableDeleteItemResult.property.consumedCapacity">consumedCapacity</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | The capacity units consumed by the operation. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableDeleteItemResult.property.itemCollectionMetrics">itemCollectionMetrics</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | Information about item collections, if any, that were affected by the operation. |

---

##### `attributes`<sup>Optional</sup> <a name="attributes" id="@winglang/sdk.ex.DynamodbTableDeleteItemResult.property.attributes"></a>

```wing
attributes: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

The attribute values as they appeared before the operation, but only if `ReturnValues` is specified as `"ALL_OLD"` in the request.

---

##### `consumedCapacity`<sup>Optional</sup> <a name="consumedCapacity" id="@winglang/sdk.ex.DynamodbTableDeleteItemResult.property.consumedCapacity"></a>

```wing
consumedCapacity: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

The capacity units consumed by the operation.

---

##### `itemCollectionMetrics`<sup>Optional</sup> <a name="itemCollectionMetrics" id="@winglang/sdk.ex.DynamodbTableDeleteItemResult.property.itemCollectionMetrics"></a>

```wing
itemCollectionMetrics: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

Information about item collections, if any, that were affected by the operation.

---

### DynamodbTableGetItemOptions <a name="DynamodbTableGetItemOptions" id="@winglang/sdk.ex.DynamodbTableGetItemOptions"></a>

Options for `DynamodbTable.getItem`.

#### Initializer <a name="Initializer" id="@winglang/sdk.ex.DynamodbTableGetItemOptions.Initializer"></a>

```wing
bring ex;

let DynamodbTableGetItemOptions = ex.DynamodbTableGetItemOptions{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.ex.DynamodbTableGetItemOptions.property.key">key</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | The primary key of the item to be retrieved. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableGetItemOptions.property.consistentRead">consistentRead</a></code> | <code>bool</code> | Determines the read consistency model: If set to true, then the operation uses strongly consistent reads; |
| <code><a href="#@winglang/sdk.ex.DynamodbTableGetItemOptions.property.expressionAttributeNames">expressionAttributeNames</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | One or more substitution tokens for attribute names in an expression. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableGetItemOptions.property.projectionExpression">projectionExpression</a></code> | <code>str</code> | A string that identifies one or more attributes to retrieve from the table. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableGetItemOptions.property.returnConsumedCapacity">returnConsumedCapacity</a></code> | <code>str</code> | Determines the level of detail about either provisioned or on-demand throughput consumption. |

---

##### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.ex.DynamodbTableGetItemOptions.property.key"></a>

```wing
key: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

The primary key of the item to be retrieved.

---

##### `consistentRead`<sup>Optional</sup> <a name="consistentRead" id="@winglang/sdk.ex.DynamodbTableGetItemOptions.property.consistentRead"></a>

```wing
consistentRead: bool;
```

- *Type:* bool
- *Default:* false

Determines the read consistency model: If set to true, then the operation uses strongly consistent reads;

otherwise, the operation uses eventually consistent reads.

---

##### `expressionAttributeNames`<sup>Optional</sup> <a name="expressionAttributeNames" id="@winglang/sdk.ex.DynamodbTableGetItemOptions.property.expressionAttributeNames"></a>

```wing
expressionAttributeNames: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

One or more substitution tokens for attribute names in an expression.

---

##### `projectionExpression`<sup>Optional</sup> <a name="projectionExpression" id="@winglang/sdk.ex.DynamodbTableGetItemOptions.property.projectionExpression"></a>

```wing
projectionExpression: str;
```

- *Type:* str

A string that identifies one or more attributes to retrieve from the table.

---

##### `returnConsumedCapacity`<sup>Optional</sup> <a name="returnConsumedCapacity" id="@winglang/sdk.ex.DynamodbTableGetItemOptions.property.returnConsumedCapacity"></a>

```wing
returnConsumedCapacity: str;
```

- *Type:* str
- *Default:* "NONE"

Determines the level of detail about either provisioned or on-demand throughput consumption.

---

### DynamodbTableGetItemResult <a name="DynamodbTableGetItemResult" id="@winglang/sdk.ex.DynamodbTableGetItemResult"></a>

Result for `DynamodbTable.getItem`.

#### Initializer <a name="Initializer" id="@winglang/sdk.ex.DynamodbTableGetItemResult.Initializer"></a>

```wing
bring ex;

let DynamodbTableGetItemResult = ex.DynamodbTableGetItemResult{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.ex.DynamodbTableGetItemResult.property.consumedCapacity">consumedCapacity</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | The capacity units consumed by the operation. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableGetItemResult.property.item">item</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | A map of attribute names to `AttributeValue` objects, as specified by `ProjectionExpression`. |

---

##### `consumedCapacity`<sup>Optional</sup> <a name="consumedCapacity" id="@winglang/sdk.ex.DynamodbTableGetItemResult.property.consumedCapacity"></a>

```wing
consumedCapacity: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

The capacity units consumed by the operation.

---

##### `item`<sup>Optional</sup> <a name="item" id="@winglang/sdk.ex.DynamodbTableGetItemResult.property.item"></a>

```wing
item: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

A map of attribute names to `AttributeValue` objects, as specified by `ProjectionExpression`.

---

### DynamodbTableProps <a name="DynamodbTableProps" id="@winglang/sdk.ex.DynamodbTableProps"></a>

Properties for `DynamodbTable`.

#### Initializer <a name="Initializer" id="@winglang/sdk.ex.DynamodbTableProps.Initializer"></a>

```wing
bring ex;

let DynamodbTableProps = ex.DynamodbTableProps{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.ex.DynamodbTableProps.property.attributeDefinitions">attributeDefinitions</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | Table attribute definitions. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableProps.property.hashKey">hashKey</a></code> | <code>str</code> | Hash key for this table. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableProps.property.name">name</a></code> | <code>str</code> | The table's name. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableProps.property.rangeKey">rangeKey</a></code> | <code>str</code> | Range key for this table. |

---

##### `attributeDefinitions`<sup>Required</sup> <a name="attributeDefinitions" id="@winglang/sdk.ex.DynamodbTableProps.property.attributeDefinitions"></a>

```wing
attributeDefinitions: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

Table attribute definitions.

e.g.  { "myKey": "S", "myOtherKey": "S" }.

---

##### `hashKey`<sup>Required</sup> <a name="hashKey" id="@winglang/sdk.ex.DynamodbTableProps.property.hashKey"></a>

```wing
hashKey: str;
```

- *Type:* str

Hash key for this table.

---

##### `name`<sup>Required</sup> <a name="name" id="@winglang/sdk.ex.DynamodbTableProps.property.name"></a>

```wing
name: str;
```

- *Type:* str

The table's name.

---

##### `rangeKey`<sup>Optional</sup> <a name="rangeKey" id="@winglang/sdk.ex.DynamodbTableProps.property.rangeKey"></a>

```wing
rangeKey: str;
```

- *Type:* str
- *Default:* undefined

Range key for this table.

---

### DynamodbTablePutItemOptions <a name="DynamodbTablePutItemOptions" id="@winglang/sdk.ex.DynamodbTablePutItemOptions"></a>

Options for `DynamodbTable.putItem`.

#### Initializer <a name="Initializer" id="@winglang/sdk.ex.DynamodbTablePutItemOptions.Initializer"></a>

```wing
bring ex;

let DynamodbTablePutItemOptions = ex.DynamodbTablePutItemOptions{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.ex.DynamodbTablePutItemOptions.property.item">item</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | The values of the item to be put. |
| <code><a href="#@winglang/sdk.ex.DynamodbTablePutItemOptions.property.conditionExpression">conditionExpression</a></code> | <code>str</code> | A condition that must be satisfied in order for an operation to succeed. |
| <code><a href="#@winglang/sdk.ex.DynamodbTablePutItemOptions.property.expressionAttributeNames">expressionAttributeNames</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | One or more substitution tokens for attribute names in an expression. |
| <code><a href="#@winglang/sdk.ex.DynamodbTablePutItemOptions.property.expressionAttributeValues">expressionAttributeValues</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | One or more values that can be substituted in an expression. |
| <code><a href="#@winglang/sdk.ex.DynamodbTablePutItemOptions.property.returnConsumedCapacity">returnConsumedCapacity</a></code> | <code>str</code> | Determines the level of detail about either provisioned or on-demand throughput consumption. |
| <code><a href="#@winglang/sdk.ex.DynamodbTablePutItemOptions.property.returnItemCollectionMetrics">returnItemCollectionMetrics</a></code> | <code>str</code> | Determines whether item collection metrics are returned. |
| <code><a href="#@winglang/sdk.ex.DynamodbTablePutItemOptions.property.returnValuesOnConditionCheckFailure">returnValuesOnConditionCheckFailure</a></code> | <code>str</code> | Use ReturnValuesOnConditionCheckFailure to get the item attributes if the Put condition fails. |

---

##### `item`<sup>Required</sup> <a name="item" id="@winglang/sdk.ex.DynamodbTablePutItemOptions.property.item"></a>

```wing
item: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

The values of the item to be put.

---

##### `conditionExpression`<sup>Optional</sup> <a name="conditionExpression" id="@winglang/sdk.ex.DynamodbTablePutItemOptions.property.conditionExpression"></a>

```wing
conditionExpression: str;
```

- *Type:* str

A condition that must be satisfied in order for an operation to succeed.

---

##### `expressionAttributeNames`<sup>Optional</sup> <a name="expressionAttributeNames" id="@winglang/sdk.ex.DynamodbTablePutItemOptions.property.expressionAttributeNames"></a>

```wing
expressionAttributeNames: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

One or more substitution tokens for attribute names in an expression.

---

##### `expressionAttributeValues`<sup>Optional</sup> <a name="expressionAttributeValues" id="@winglang/sdk.ex.DynamodbTablePutItemOptions.property.expressionAttributeValues"></a>

```wing
expressionAttributeValues: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

One or more values that can be substituted in an expression.

---

##### `returnConsumedCapacity`<sup>Optional</sup> <a name="returnConsumedCapacity" id="@winglang/sdk.ex.DynamodbTablePutItemOptions.property.returnConsumedCapacity"></a>

```wing
returnConsumedCapacity: str;
```

- *Type:* str
- *Default:* "NONE"

Determines the level of detail about either provisioned or on-demand throughput consumption.

---

##### `returnItemCollectionMetrics`<sup>Optional</sup> <a name="returnItemCollectionMetrics" id="@winglang/sdk.ex.DynamodbTablePutItemOptions.property.returnItemCollectionMetrics"></a>

```wing
returnItemCollectionMetrics: str;
```

- *Type:* str
- *Default:* "NONE"

Determines whether item collection metrics are returned.

---

##### `returnValuesOnConditionCheckFailure`<sup>Optional</sup> <a name="returnValuesOnConditionCheckFailure" id="@winglang/sdk.ex.DynamodbTablePutItemOptions.property.returnValuesOnConditionCheckFailure"></a>

```wing
returnValuesOnConditionCheckFailure: str;
```

- *Type:* str
- *Default:* "NONE"

Use ReturnValuesOnConditionCheckFailure to get the item attributes if the Put condition fails.

---

### DynamodbTablePutItemResult <a name="DynamodbTablePutItemResult" id="@winglang/sdk.ex.DynamodbTablePutItemResult"></a>

Result for `DynamodbTable.putItem`.

#### Initializer <a name="Initializer" id="@winglang/sdk.ex.DynamodbTablePutItemResult.Initializer"></a>

```wing
bring ex;

let DynamodbTablePutItemResult = ex.DynamodbTablePutItemResult{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.ex.DynamodbTablePutItemResult.property.attributes">attributes</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | The attribute values as they appeared before the operation, but only if `ReturnValues` is specified as `"ALL_OLD"` in the request. |
| <code><a href="#@winglang/sdk.ex.DynamodbTablePutItemResult.property.consumedCapacity">consumedCapacity</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | The capacity units consumed by the operation. |
| <code><a href="#@winglang/sdk.ex.DynamodbTablePutItemResult.property.itemCollectionMetrics">itemCollectionMetrics</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | Information about item collections, if any, that were affected by the operation. |

---

##### `attributes`<sup>Optional</sup> <a name="attributes" id="@winglang/sdk.ex.DynamodbTablePutItemResult.property.attributes"></a>

```wing
attributes: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

The attribute values as they appeared before the operation, but only if `ReturnValues` is specified as `"ALL_OLD"` in the request.

---

##### `consumedCapacity`<sup>Optional</sup> <a name="consumedCapacity" id="@winglang/sdk.ex.DynamodbTablePutItemResult.property.consumedCapacity"></a>

```wing
consumedCapacity: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

The capacity units consumed by the operation.

---

##### `itemCollectionMetrics`<sup>Optional</sup> <a name="itemCollectionMetrics" id="@winglang/sdk.ex.DynamodbTablePutItemResult.property.itemCollectionMetrics"></a>

```wing
itemCollectionMetrics: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

Information about item collections, if any, that were affected by the operation.

---

### DynamodbTableQueryOptions <a name="DynamodbTableQueryOptions" id="@winglang/sdk.ex.DynamodbTableQueryOptions"></a>

Options for `DynamodbTable.query`.

#### Initializer <a name="Initializer" id="@winglang/sdk.ex.DynamodbTableQueryOptions.Initializer"></a>

```wing
bring ex;

let DynamodbTableQueryOptions = ex.DynamodbTableQueryOptions{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.ex.DynamodbTableQueryOptions.property.keyConditionExpression">keyConditionExpression</a></code> | <code>str</code> | The condition that specifies the key values for items to be retrieved by the Query action. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableQueryOptions.property.consistentRead">consistentRead</a></code> | <code>bool</code> | Determines the read consistency model: If set to true, then the operation uses strongly consistent reads; |
| <code><a href="#@winglang/sdk.ex.DynamodbTableQueryOptions.property.exclusiveStartKey">exclusiveStartKey</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | The primary key of the first item that this operation will evaluate. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableQueryOptions.property.expressionAttributeNames">expressionAttributeNames</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | One or more substitution tokens for attribute names in an expression. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableQueryOptions.property.expressionAttributeValues">expressionAttributeValues</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | One or more values that can be substituted in an expression. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableQueryOptions.property.filterExpression">filterExpression</a></code> | <code>str</code> | A string that contains conditions that DynamoDB applies after the Query operation, but before the data is returned to you. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableQueryOptions.property.indexName">indexName</a></code> | <code>str</code> | The name of an index to query. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableQueryOptions.property.limit">limit</a></code> | <code>num</code> | The maximum number of items to evaluate (not necessarily the number of matching items). |
| <code><a href="#@winglang/sdk.ex.DynamodbTableQueryOptions.property.projectionExpression">projectionExpression</a></code> | <code>str</code> | A string that identifies one or more attributes to retrieve from the table. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableQueryOptions.property.returnConsumedCapacity">returnConsumedCapacity</a></code> | <code>str</code> | Determines the level of detail about either provisioned or on-demand throughput consumption. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableQueryOptions.property.scanIndexForward">scanIndexForward</a></code> | <code>bool</code> | Specifies the order for index traversal. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableQueryOptions.property.select">select</a></code> | <code>str</code> | The attributes to be returned in the result. |

---

##### `keyConditionExpression`<sup>Required</sup> <a name="keyConditionExpression" id="@winglang/sdk.ex.DynamodbTableQueryOptions.property.keyConditionExpression"></a>

```wing
keyConditionExpression: str;
```

- *Type:* str

The condition that specifies the key values for items to be retrieved by the Query action.

---

##### `consistentRead`<sup>Optional</sup> <a name="consistentRead" id="@winglang/sdk.ex.DynamodbTableQueryOptions.property.consistentRead"></a>

```wing
consistentRead: bool;
```

- *Type:* bool
- *Default:* false

Determines the read consistency model: If set to true, then the operation uses strongly consistent reads;

otherwise, the operation uses eventually consistent reads.

---

##### `exclusiveStartKey`<sup>Optional</sup> <a name="exclusiveStartKey" id="@winglang/sdk.ex.DynamodbTableQueryOptions.property.exclusiveStartKey"></a>

```wing
exclusiveStartKey: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

The primary key of the first item that this operation will evaluate.

---

##### `expressionAttributeNames`<sup>Optional</sup> <a name="expressionAttributeNames" id="@winglang/sdk.ex.DynamodbTableQueryOptions.property.expressionAttributeNames"></a>

```wing
expressionAttributeNames: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

One or more substitution tokens for attribute names in an expression.

---

##### `expressionAttributeValues`<sup>Optional</sup> <a name="expressionAttributeValues" id="@winglang/sdk.ex.DynamodbTableQueryOptions.property.expressionAttributeValues"></a>

```wing
expressionAttributeValues: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

One or more values that can be substituted in an expression.

---

##### `filterExpression`<sup>Optional</sup> <a name="filterExpression" id="@winglang/sdk.ex.DynamodbTableQueryOptions.property.filterExpression"></a>

```wing
filterExpression: str;
```

- *Type:* str

A string that contains conditions that DynamoDB applies after the Query operation, but before the data is returned to you.

---

##### `indexName`<sup>Optional</sup> <a name="indexName" id="@winglang/sdk.ex.DynamodbTableQueryOptions.property.indexName"></a>

```wing
indexName: str;
```

- *Type:* str

The name of an index to query.

---

##### `limit`<sup>Optional</sup> <a name="limit" id="@winglang/sdk.ex.DynamodbTableQueryOptions.property.limit"></a>

```wing
limit: num;
```

- *Type:* num

The maximum number of items to evaluate (not necessarily the number of matching items).

---

##### `projectionExpression`<sup>Optional</sup> <a name="projectionExpression" id="@winglang/sdk.ex.DynamodbTableQueryOptions.property.projectionExpression"></a>

```wing
projectionExpression: str;
```

- *Type:* str

A string that identifies one or more attributes to retrieve from the table.

---

##### `returnConsumedCapacity`<sup>Optional</sup> <a name="returnConsumedCapacity" id="@winglang/sdk.ex.DynamodbTableQueryOptions.property.returnConsumedCapacity"></a>

```wing
returnConsumedCapacity: str;
```

- *Type:* str
- *Default:* "NONE"

Determines the level of detail about either provisioned or on-demand throughput consumption.

---

##### `scanIndexForward`<sup>Optional</sup> <a name="scanIndexForward" id="@winglang/sdk.ex.DynamodbTableQueryOptions.property.scanIndexForward"></a>

```wing
scanIndexForward: bool;
```

- *Type:* bool
- *Default:* true

Specifies the order for index traversal.

---

##### `select`<sup>Optional</sup> <a name="select" id="@winglang/sdk.ex.DynamodbTableQueryOptions.property.select"></a>

```wing
select: str;
```

- *Type:* str

The attributes to be returned in the result.

---

### DynamodbTableQueryResult <a name="DynamodbTableQueryResult" id="@winglang/sdk.ex.DynamodbTableQueryResult"></a>

Result for `DynamodbTable.query`.

#### Initializer <a name="Initializer" id="@winglang/sdk.ex.DynamodbTableQueryResult.Initializer"></a>

```wing
bring ex;

let DynamodbTableQueryResult = ex.DynamodbTableQueryResult{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.ex.DynamodbTableQueryResult.property.count">count</a></code> | <code>num</code> | The number of items in the response. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableQueryResult.property.items">items</a></code> | <code>MutArray&lt;<a href="#@winglang/sdk.std.Json">Json</a>&gt;</code> | An array of item attributes that match the scan criteria. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableQueryResult.property.scannedCount">scannedCount</a></code> | <code>num</code> | The number of items evaluated, before any QueryFilter is applied. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableQueryResult.property.consumedCapacity">consumedCapacity</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | The capacity units consumed by the operation. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableQueryResult.property.lastEvaluatedKey">lastEvaluatedKey</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | The primary key of the item where the operation stopped, inclusive of the previous result set. |

---

##### `count`<sup>Required</sup> <a name="count" id="@winglang/sdk.ex.DynamodbTableQueryResult.property.count"></a>

```wing
count: num;
```

- *Type:* num

The number of items in the response.

---

##### `items`<sup>Required</sup> <a name="items" id="@winglang/sdk.ex.DynamodbTableQueryResult.property.items"></a>

```wing
items: MutArray<Json>;
```

- *Type:* MutArray&lt;<a href="#@winglang/sdk.std.Json">Json</a>&gt;

An array of item attributes that match the scan criteria.

---

##### `scannedCount`<sup>Required</sup> <a name="scannedCount" id="@winglang/sdk.ex.DynamodbTableQueryResult.property.scannedCount"></a>

```wing
scannedCount: num;
```

- *Type:* num

The number of items evaluated, before any QueryFilter is applied.

---

##### `consumedCapacity`<sup>Optional</sup> <a name="consumedCapacity" id="@winglang/sdk.ex.DynamodbTableQueryResult.property.consumedCapacity"></a>

```wing
consumedCapacity: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

The capacity units consumed by the operation.

---

##### `lastEvaluatedKey`<sup>Optional</sup> <a name="lastEvaluatedKey" id="@winglang/sdk.ex.DynamodbTableQueryResult.property.lastEvaluatedKey"></a>

```wing
lastEvaluatedKey: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

The primary key of the item where the operation stopped, inclusive of the previous result set.

---

### DynamodbTableScanOptions <a name="DynamodbTableScanOptions" id="@winglang/sdk.ex.DynamodbTableScanOptions"></a>

Options for `DynamodbTable.scan`.

#### Initializer <a name="Initializer" id="@winglang/sdk.ex.DynamodbTableScanOptions.Initializer"></a>

```wing
bring ex;

let DynamodbTableScanOptions = ex.DynamodbTableScanOptions{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.ex.DynamodbTableScanOptions.property.consistentRead">consistentRead</a></code> | <code>bool</code> | Determines the read consistency model: If set to true, then the operation uses strongly consistent reads; |
| <code><a href="#@winglang/sdk.ex.DynamodbTableScanOptions.property.exclusiveStartKey">exclusiveStartKey</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | The primary key of the first item that this operation will evaluate. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableScanOptions.property.expressionAttributeNames">expressionAttributeNames</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | One or more substitution tokens for attribute names in an expression. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableScanOptions.property.expressionAttributeValues">expressionAttributeValues</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | One or more values that can be substituted in an expression. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableScanOptions.property.filterExpression">filterExpression</a></code> | <code>str</code> | A string that contains conditions that DynamoDB applies after the Query operation, but before the data is returned to you. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableScanOptions.property.indexName">indexName</a></code> | <code>str</code> | The name of an index to query. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableScanOptions.property.limit">limit</a></code> | <code>num</code> | The maximum number of items to evaluate (not necessarily the number of matching items). |
| <code><a href="#@winglang/sdk.ex.DynamodbTableScanOptions.property.projectionExpression">projectionExpression</a></code> | <code>str</code> | A string that identifies one or more attributes to retrieve from the table. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableScanOptions.property.returnConsumedCapacity">returnConsumedCapacity</a></code> | <code>str</code> | Determines the level of detail about either provisioned or on-demand throughput consumption. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableScanOptions.property.segment">segment</a></code> | <code>num</code> | For a parallel Scan request, Segment identifies an individual segment to be scanned by an application worker. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableScanOptions.property.select">select</a></code> | <code>str</code> | The attributes to be returned in the result. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableScanOptions.property.totalSegments">totalSegments</a></code> | <code>num</code> | For a parallel Scan request, TotalSegments represents the total number of segments into which the Scan operation will be divided. |

---

##### `consistentRead`<sup>Optional</sup> <a name="consistentRead" id="@winglang/sdk.ex.DynamodbTableScanOptions.property.consistentRead"></a>

```wing
consistentRead: bool;
```

- *Type:* bool
- *Default:* false

Determines the read consistency model: If set to true, then the operation uses strongly consistent reads;

otherwise, the operation uses eventually consistent reads.

---

##### `exclusiveStartKey`<sup>Optional</sup> <a name="exclusiveStartKey" id="@winglang/sdk.ex.DynamodbTableScanOptions.property.exclusiveStartKey"></a>

```wing
exclusiveStartKey: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

The primary key of the first item that this operation will evaluate.

---

##### `expressionAttributeNames`<sup>Optional</sup> <a name="expressionAttributeNames" id="@winglang/sdk.ex.DynamodbTableScanOptions.property.expressionAttributeNames"></a>

```wing
expressionAttributeNames: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

One or more substitution tokens for attribute names in an expression.

---

##### `expressionAttributeValues`<sup>Optional</sup> <a name="expressionAttributeValues" id="@winglang/sdk.ex.DynamodbTableScanOptions.property.expressionAttributeValues"></a>

```wing
expressionAttributeValues: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

One or more values that can be substituted in an expression.

---

##### `filterExpression`<sup>Optional</sup> <a name="filterExpression" id="@winglang/sdk.ex.DynamodbTableScanOptions.property.filterExpression"></a>

```wing
filterExpression: str;
```

- *Type:* str

A string that contains conditions that DynamoDB applies after the Query operation, but before the data is returned to you.

---

##### `indexName`<sup>Optional</sup> <a name="indexName" id="@winglang/sdk.ex.DynamodbTableScanOptions.property.indexName"></a>

```wing
indexName: str;
```

- *Type:* str

The name of an index to query.

---

##### `limit`<sup>Optional</sup> <a name="limit" id="@winglang/sdk.ex.DynamodbTableScanOptions.property.limit"></a>

```wing
limit: num;
```

- *Type:* num

The maximum number of items to evaluate (not necessarily the number of matching items).

---

##### `projectionExpression`<sup>Optional</sup> <a name="projectionExpression" id="@winglang/sdk.ex.DynamodbTableScanOptions.property.projectionExpression"></a>

```wing
projectionExpression: str;
```

- *Type:* str

A string that identifies one or more attributes to retrieve from the table.

---

##### `returnConsumedCapacity`<sup>Optional</sup> <a name="returnConsumedCapacity" id="@winglang/sdk.ex.DynamodbTableScanOptions.property.returnConsumedCapacity"></a>

```wing
returnConsumedCapacity: str;
```

- *Type:* str
- *Default:* "NONE"

Determines the level of detail about either provisioned or on-demand throughput consumption.

---

##### `segment`<sup>Optional</sup> <a name="segment" id="@winglang/sdk.ex.DynamodbTableScanOptions.property.segment"></a>

```wing
segment: num;
```

- *Type:* num
- *Default:* 0

For a parallel Scan request, Segment identifies an individual segment to be scanned by an application worker.

---

##### `select`<sup>Optional</sup> <a name="select" id="@winglang/sdk.ex.DynamodbTableScanOptions.property.select"></a>

```wing
select: str;
```

- *Type:* str

The attributes to be returned in the result.

---

##### `totalSegments`<sup>Optional</sup> <a name="totalSegments" id="@winglang/sdk.ex.DynamodbTableScanOptions.property.totalSegments"></a>

```wing
totalSegments: num;
```

- *Type:* num
- *Default:* 1

For a parallel Scan request, TotalSegments represents the total number of segments into which the Scan operation will be divided.

---

### DynamodbTableScanResult <a name="DynamodbTableScanResult" id="@winglang/sdk.ex.DynamodbTableScanResult"></a>

Result for `DynamodbTable.scan`.

#### Initializer <a name="Initializer" id="@winglang/sdk.ex.DynamodbTableScanResult.Initializer"></a>

```wing
bring ex;

let DynamodbTableScanResult = ex.DynamodbTableScanResult{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.ex.DynamodbTableScanResult.property.count">count</a></code> | <code>num</code> | The number of items in the response. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableScanResult.property.items">items</a></code> | <code>MutArray&lt;<a href="#@winglang/sdk.std.Json">Json</a>&gt;</code> | An array of item attributes that match the scan criteria. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableScanResult.property.scannedCount">scannedCount</a></code> | <code>num</code> | The number of items evaluated, before any ScanFilter is applied. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableScanResult.property.consumedCapacity">consumedCapacity</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | The capacity units consumed by the operation. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableScanResult.property.lastEvaluatedKey">lastEvaluatedKey</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | The primary key of the item where the operation stopped, inclusive of the previous result set. |

---

##### `count`<sup>Required</sup> <a name="count" id="@winglang/sdk.ex.DynamodbTableScanResult.property.count"></a>

```wing
count: num;
```

- *Type:* num

The number of items in the response.

---

##### `items`<sup>Required</sup> <a name="items" id="@winglang/sdk.ex.DynamodbTableScanResult.property.items"></a>

```wing
items: MutArray<Json>;
```

- *Type:* MutArray&lt;<a href="#@winglang/sdk.std.Json">Json</a>&gt;

An array of item attributes that match the scan criteria.

---

##### `scannedCount`<sup>Required</sup> <a name="scannedCount" id="@winglang/sdk.ex.DynamodbTableScanResult.property.scannedCount"></a>

```wing
scannedCount: num;
```

- *Type:* num

The number of items evaluated, before any ScanFilter is applied.

---

##### `consumedCapacity`<sup>Optional</sup> <a name="consumedCapacity" id="@winglang/sdk.ex.DynamodbTableScanResult.property.consumedCapacity"></a>

```wing
consumedCapacity: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

The capacity units consumed by the operation.

---

##### `lastEvaluatedKey`<sup>Optional</sup> <a name="lastEvaluatedKey" id="@winglang/sdk.ex.DynamodbTableScanResult.property.lastEvaluatedKey"></a>

```wing
lastEvaluatedKey: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

The primary key of the item where the operation stopped, inclusive of the previous result set.

---

### DynamodbTableTransactGetItemsResponseItem <a name="DynamodbTableTransactGetItemsResponseItem" id="@winglang/sdk.ex.DynamodbTableTransactGetItemsResponseItem"></a>

Details of the requested item.

#### Initializer <a name="Initializer" id="@winglang/sdk.ex.DynamodbTableTransactGetItemsResponseItem.Initializer"></a>

```wing
bring ex;

let DynamodbTableTransactGetItemsResponseItem = ex.DynamodbTableTransactGetItemsResponseItem{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.ex.DynamodbTableTransactGetItemsResponseItem.property.item">item</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | The values of the item. |

---

##### `item`<sup>Required</sup> <a name="item" id="@winglang/sdk.ex.DynamodbTableTransactGetItemsResponseItem.property.item"></a>

```wing
item: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

The values of the item.

---

### DynamodbTableTransactGetItemsResult <a name="DynamodbTableTransactGetItemsResult" id="@winglang/sdk.ex.DynamodbTableTransactGetItemsResult"></a>

Result for `DynamodbTable.transactGetItems`.

#### Initializer <a name="Initializer" id="@winglang/sdk.ex.DynamodbTableTransactGetItemsResult.Initializer"></a>

```wing
bring ex;

let DynamodbTableTransactGetItemsResult = ex.DynamodbTableTransactGetItemsResult{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.ex.DynamodbTableTransactGetItemsResult.property.responses">responses</a></code> | <code>MutArray&lt;<a href="#@winglang/sdk.ex.DynamodbTableTransactGetItemsResponseItem">DynamodbTableTransactGetItemsResponseItem</a>&gt;</code> | An ordered array of up to 100 `DynamodbTableTransactGetItemsResponseItem` objects. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableTransactGetItemsResult.property.consumedCapacity">consumedCapacity</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | The capacity units consumed by the operation. |

---

##### `responses`<sup>Required</sup> <a name="responses" id="@winglang/sdk.ex.DynamodbTableTransactGetItemsResult.property.responses"></a>

```wing
responses: MutArray<DynamodbTableTransactGetItemsResponseItem>;
```

- *Type:* MutArray&lt;<a href="#@winglang/sdk.ex.DynamodbTableTransactGetItemsResponseItem">DynamodbTableTransactGetItemsResponseItem</a>&gt;

An ordered array of up to 100 `DynamodbTableTransactGetItemsResponseItem` objects.

---

##### `consumedCapacity`<sup>Optional</sup> <a name="consumedCapacity" id="@winglang/sdk.ex.DynamodbTableTransactGetItemsResult.property.consumedCapacity"></a>

```wing
consumedCapacity: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

The capacity units consumed by the operation.

---

### DynamodbTableTransactWriteItemsResult <a name="DynamodbTableTransactWriteItemsResult" id="@winglang/sdk.ex.DynamodbTableTransactWriteItemsResult"></a>

Result for `DynamodbTable.transactWriteItems`.

#### Initializer <a name="Initializer" id="@winglang/sdk.ex.DynamodbTableTransactWriteItemsResult.Initializer"></a>

```wing
bring ex;

let DynamodbTableTransactWriteItemsResult = ex.DynamodbTableTransactWriteItemsResult{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.ex.DynamodbTableTransactWriteItemsResult.property.attributes">attributes</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | The attribute values as they appeared before the operation, but only if `ReturnValues` is specified as `"ALL_OLD"` in the request. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableTransactWriteItemsResult.property.consumedCapacity">consumedCapacity</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | The capacity units consumed by the operation. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableTransactWriteItemsResult.property.itemCollectionMetrics">itemCollectionMetrics</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | Information about item collections, if any, that were affected by the operation. |

---

##### `attributes`<sup>Optional</sup> <a name="attributes" id="@winglang/sdk.ex.DynamodbTableTransactWriteItemsResult.property.attributes"></a>

```wing
attributes: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

The attribute values as they appeared before the operation, but only if `ReturnValues` is specified as `"ALL_OLD"` in the request.

---

##### `consumedCapacity`<sup>Optional</sup> <a name="consumedCapacity" id="@winglang/sdk.ex.DynamodbTableTransactWriteItemsResult.property.consumedCapacity"></a>

```wing
consumedCapacity: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

The capacity units consumed by the operation.

---

##### `itemCollectionMetrics`<sup>Optional</sup> <a name="itemCollectionMetrics" id="@winglang/sdk.ex.DynamodbTableTransactWriteItemsResult.property.itemCollectionMetrics"></a>

```wing
itemCollectionMetrics: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

Information about item collections, if any, that were affected by the operation.

---

### DynamodbTableUpdateItemOptions <a name="DynamodbTableUpdateItemOptions" id="@winglang/sdk.ex.DynamodbTableUpdateItemOptions"></a>

Options for `DynamodbTable.updateItem`.

#### Initializer <a name="Initializer" id="@winglang/sdk.ex.DynamodbTableUpdateItemOptions.Initializer"></a>

```wing
bring ex;

let DynamodbTableUpdateItemOptions = ex.DynamodbTableUpdateItemOptions{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.ex.DynamodbTableUpdateItemOptions.property.key">key</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | The primary key of the item to be updated. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableUpdateItemOptions.property.conditionExpression">conditionExpression</a></code> | <code>str</code> | A condition that must be satisfied in order for a conditional update to succeed. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableUpdateItemOptions.property.expressionAttributeNames">expressionAttributeNames</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | One or more substitution tokens for attribute names in an expression. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableUpdateItemOptions.property.expressionAttributeValues">expressionAttributeValues</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | One or more values that can be substituted in an expression. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableUpdateItemOptions.property.returnConsumedCapacity">returnConsumedCapacity</a></code> | <code>str</code> | Determines the level of detail about either provisioned or on-demand throughput consumption. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableUpdateItemOptions.property.returnItemCollectionMetrics">returnItemCollectionMetrics</a></code> | <code>str</code> | Determines whether item collection metrics are returned. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableUpdateItemOptions.property.returnValues">returnValues</a></code> | <code>str</code> | Use ReturnValues to get the item attributes if the Update operation succeeds. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableUpdateItemOptions.property.returnValuesOnConditionCheckFailure">returnValuesOnConditionCheckFailure</a></code> | <code>str</code> | Use ReturnValuesOnConditionCheckFailure to get the item attributes if the Update condition fails. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableUpdateItemOptions.property.updateExpression">updateExpression</a></code> | <code>str</code> | An expression that defines one or more attributes to be updated. |

---

##### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.ex.DynamodbTableUpdateItemOptions.property.key"></a>

```wing
key: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

The primary key of the item to be updated.

---

##### `conditionExpression`<sup>Optional</sup> <a name="conditionExpression" id="@winglang/sdk.ex.DynamodbTableUpdateItemOptions.property.conditionExpression"></a>

```wing
conditionExpression: str;
```

- *Type:* str

A condition that must be satisfied in order for a conditional update to succeed.

---

##### `expressionAttributeNames`<sup>Optional</sup> <a name="expressionAttributeNames" id="@winglang/sdk.ex.DynamodbTableUpdateItemOptions.property.expressionAttributeNames"></a>

```wing
expressionAttributeNames: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

One or more substitution tokens for attribute names in an expression.

---

##### `expressionAttributeValues`<sup>Optional</sup> <a name="expressionAttributeValues" id="@winglang/sdk.ex.DynamodbTableUpdateItemOptions.property.expressionAttributeValues"></a>

```wing
expressionAttributeValues: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

One or more values that can be substituted in an expression.

---

##### `returnConsumedCapacity`<sup>Optional</sup> <a name="returnConsumedCapacity" id="@winglang/sdk.ex.DynamodbTableUpdateItemOptions.property.returnConsumedCapacity"></a>

```wing
returnConsumedCapacity: str;
```

- *Type:* str
- *Default:* "NONE"

Determines the level of detail about either provisioned or on-demand throughput consumption.

---

##### `returnItemCollectionMetrics`<sup>Optional</sup> <a name="returnItemCollectionMetrics" id="@winglang/sdk.ex.DynamodbTableUpdateItemOptions.property.returnItemCollectionMetrics"></a>

```wing
returnItemCollectionMetrics: str;
```

- *Type:* str
- *Default:* "NONE"

Determines whether item collection metrics are returned.

---

##### `returnValues`<sup>Optional</sup> <a name="returnValues" id="@winglang/sdk.ex.DynamodbTableUpdateItemOptions.property.returnValues"></a>

```wing
returnValues: str;
```

- *Type:* str
- *Default:* "NONE"

Use ReturnValues to get the item attributes if the Update operation succeeds.

---

##### `returnValuesOnConditionCheckFailure`<sup>Optional</sup> <a name="returnValuesOnConditionCheckFailure" id="@winglang/sdk.ex.DynamodbTableUpdateItemOptions.property.returnValuesOnConditionCheckFailure"></a>

```wing
returnValuesOnConditionCheckFailure: str;
```

- *Type:* str
- *Default:* "NONE"

Use ReturnValuesOnConditionCheckFailure to get the item attributes if the Update condition fails.

---

##### `updateExpression`<sup>Optional</sup> <a name="updateExpression" id="@winglang/sdk.ex.DynamodbTableUpdateItemOptions.property.updateExpression"></a>

```wing
updateExpression: str;
```

- *Type:* str

An expression that defines one or more attributes to be updated.

---

### DynamodbTableUpdateItemResult <a name="DynamodbTableUpdateItemResult" id="@winglang/sdk.ex.DynamodbTableUpdateItemResult"></a>

Result for `DynamodbTable.updateItem`.

#### Initializer <a name="Initializer" id="@winglang/sdk.ex.DynamodbTableUpdateItemResult.Initializer"></a>

```wing
bring ex;

let DynamodbTableUpdateItemResult = ex.DynamodbTableUpdateItemResult{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.ex.DynamodbTableUpdateItemResult.property.attributes">attributes</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | The attribute values as they appeared before the operation, but only if `ReturnValues` is specified as `"ALL_OLD"` in the request. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableUpdateItemResult.property.consumedCapacity">consumedCapacity</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | The capacity units consumed by the operation. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableUpdateItemResult.property.itemCollectionMetrics">itemCollectionMetrics</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | Information about item collections, if any, that were affected by the operation. |

---

##### `attributes`<sup>Optional</sup> <a name="attributes" id="@winglang/sdk.ex.DynamodbTableUpdateItemResult.property.attributes"></a>

```wing
attributes: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

The attribute values as they appeared before the operation, but only if `ReturnValues` is specified as `"ALL_OLD"` in the request.

---

##### `consumedCapacity`<sup>Optional</sup> <a name="consumedCapacity" id="@winglang/sdk.ex.DynamodbTableUpdateItemResult.property.consumedCapacity"></a>

```wing
consumedCapacity: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

The capacity units consumed by the operation.

---

##### `itemCollectionMetrics`<sup>Optional</sup> <a name="itemCollectionMetrics" id="@winglang/sdk.ex.DynamodbTableUpdateItemResult.property.itemCollectionMetrics"></a>

```wing
itemCollectionMetrics: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

Information about item collections, if any, that were affected by the operation.

---

### DynamodbTransactGetItem <a name="DynamodbTransactGetItem" id="@winglang/sdk.ex.DynamodbTransactGetItem"></a>

Dynamodb transact get operation.

#### Initializer <a name="Initializer" id="@winglang/sdk.ex.DynamodbTransactGetItem.Initializer"></a>

```wing
bring ex;

let DynamodbTransactGetItem = ex.DynamodbTransactGetItem{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.ex.DynamodbTransactGetItem.property.get">get</a></code> | <code><a href="#@winglang/sdk.ex.DynamodbTransactGetItemGetProps">DynamodbTransactGetItemGetProps</a></code> | A request to perform a get operation. |

---

##### `get`<sup>Optional</sup> <a name="get" id="@winglang/sdk.ex.DynamodbTransactGetItem.property.get"></a>

```wing
get: DynamodbTransactGetItemGetProps;
```

- *Type:* <a href="#@winglang/sdk.ex.DynamodbTransactGetItemGetProps">DynamodbTransactGetItemGetProps</a>

A request to perform a get operation.

---

### DynamodbTransactGetItemGetProps <a name="DynamodbTransactGetItemGetProps" id="@winglang/sdk.ex.DynamodbTransactGetItemGetProps"></a>

Options for `DynamodbTable.transactGetItems`'s get operation.

#### Initializer <a name="Initializer" id="@winglang/sdk.ex.DynamodbTransactGetItemGetProps.Initializer"></a>

```wing
bring ex;

let DynamodbTransactGetItemGetProps = ex.DynamodbTransactGetItemGetProps{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.ex.DynamodbTransactGetItemGetProps.property.key">key</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | The primary key of the item to be retrieved. |
| <code><a href="#@winglang/sdk.ex.DynamodbTransactGetItemGetProps.property.expressionAttributeNames">expressionAttributeNames</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | One or more substitution tokens for attribute names in an expression. |
| <code><a href="#@winglang/sdk.ex.DynamodbTransactGetItemGetProps.property.projectionExpression">projectionExpression</a></code> | <code>str</code> | A string that identifies one or more attributes to retrieve from the table. |

---

##### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.ex.DynamodbTransactGetItemGetProps.property.key"></a>

```wing
key: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

The primary key of the item to be retrieved.

---

##### `expressionAttributeNames`<sup>Optional</sup> <a name="expressionAttributeNames" id="@winglang/sdk.ex.DynamodbTransactGetItemGetProps.property.expressionAttributeNames"></a>

```wing
expressionAttributeNames: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>
- *Default:* undefined

One or more substitution tokens for attribute names in an expression.

---

##### `projectionExpression`<sup>Optional</sup> <a name="projectionExpression" id="@winglang/sdk.ex.DynamodbTransactGetItemGetProps.property.projectionExpression"></a>

```wing
projectionExpression: str;
```

- *Type:* str
- *Default:* undefined

A string that identifies one or more attributes to retrieve from the table.

---

### DynamodbTransactGetItemsOptions <a name="DynamodbTransactGetItemsOptions" id="@winglang/sdk.ex.DynamodbTransactGetItemsOptions"></a>

Options for `DynamodbTable.transactGetItems`.

#### Initializer <a name="Initializer" id="@winglang/sdk.ex.DynamodbTransactGetItemsOptions.Initializer"></a>

```wing
bring ex;

let DynamodbTransactGetItemsOptions = ex.DynamodbTransactGetItemsOptions{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.ex.DynamodbTransactGetItemsOptions.property.transactItems">transactItems</a></code> | <code>MutArray&lt;<a href="#@winglang/sdk.ex.DynamodbTransactGetItem">DynamodbTransactGetItem</a>&gt;</code> | An ordered array of up to 100 `DynamodbTransactGetItem` objects, each of which contains a `DynamodbTransactGetItem` structure. |
| <code><a href="#@winglang/sdk.ex.DynamodbTransactGetItemsOptions.property.returnConsumedCapacity">returnConsumedCapacity</a></code> | <code>str</code> | Determines the level of detail about either provisioned or on-demand throughput consumption. |

---

##### `transactItems`<sup>Required</sup> <a name="transactItems" id="@winglang/sdk.ex.DynamodbTransactGetItemsOptions.property.transactItems"></a>

```wing
transactItems: MutArray<DynamodbTransactGetItem>;
```

- *Type:* MutArray&lt;<a href="#@winglang/sdk.ex.DynamodbTransactGetItem">DynamodbTransactGetItem</a>&gt;

An ordered array of up to 100 `DynamodbTransactGetItem` objects, each of which contains a `DynamodbTransactGetItem` structure.

---

##### `returnConsumedCapacity`<sup>Optional</sup> <a name="returnConsumedCapacity" id="@winglang/sdk.ex.DynamodbTransactGetItemsOptions.property.returnConsumedCapacity"></a>

```wing
returnConsumedCapacity: str;
```

- *Type:* str
- *Default:* "NONE"

Determines the level of detail about either provisioned or on-demand throughput consumption.

---

### DynamodbTransactWriteItem <a name="DynamodbTransactWriteItem" id="@winglang/sdk.ex.DynamodbTransactWriteItem"></a>

Dynamodb transact write operation.

#### Initializer <a name="Initializer" id="@winglang/sdk.ex.DynamodbTransactWriteItem.Initializer"></a>

```wing
bring ex;

let DynamodbTransactWriteItem = ex.DynamodbTransactWriteItem{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.ex.DynamodbTransactWriteItem.property.conditionCheck">conditionCheck</a></code> | <code><a href="#@winglang/sdk.ex.DynamodbTransactWriteItemConditionCheckOptions">DynamodbTransactWriteItemConditionCheckOptions</a></code> | A request to perform a condition check operation. |
| <code><a href="#@winglang/sdk.ex.DynamodbTransactWriteItem.property.delete">delete</a></code> | <code><a href="#@winglang/sdk.ex.DynamodbTransactWriteItemDeleteOptions">DynamodbTransactWriteItemDeleteOptions</a></code> | A request to perform a delete operation. |
| <code><a href="#@winglang/sdk.ex.DynamodbTransactWriteItem.property.put">put</a></code> | <code><a href="#@winglang/sdk.ex.DynamodbTransactWriteItemPutProps">DynamodbTransactWriteItemPutProps</a></code> | A request to perform a put operation. |
| <code><a href="#@winglang/sdk.ex.DynamodbTransactWriteItem.property.update">update</a></code> | <code><a href="#@winglang/sdk.ex.DynamodbTransactWriteItemUpdateOptions">DynamodbTransactWriteItemUpdateOptions</a></code> | A request to perform a update operation. |

---

##### `conditionCheck`<sup>Optional</sup> <a name="conditionCheck" id="@winglang/sdk.ex.DynamodbTransactWriteItem.property.conditionCheck"></a>

```wing
conditionCheck: DynamodbTransactWriteItemConditionCheckOptions;
```

- *Type:* <a href="#@winglang/sdk.ex.DynamodbTransactWriteItemConditionCheckOptions">DynamodbTransactWriteItemConditionCheckOptions</a>

A request to perform a condition check operation.

---

##### `delete`<sup>Optional</sup> <a name="delete" id="@winglang/sdk.ex.DynamodbTransactWriteItem.property.delete"></a>

```wing
delete: DynamodbTransactWriteItemDeleteOptions;
```

- *Type:* <a href="#@winglang/sdk.ex.DynamodbTransactWriteItemDeleteOptions">DynamodbTransactWriteItemDeleteOptions</a>

A request to perform a delete operation.

---

##### `put`<sup>Optional</sup> <a name="put" id="@winglang/sdk.ex.DynamodbTransactWriteItem.property.put"></a>

```wing
put: DynamodbTransactWriteItemPutProps;
```

- *Type:* <a href="#@winglang/sdk.ex.DynamodbTransactWriteItemPutProps">DynamodbTransactWriteItemPutProps</a>

A request to perform a put operation.

---

##### `update`<sup>Optional</sup> <a name="update" id="@winglang/sdk.ex.DynamodbTransactWriteItem.property.update"></a>

```wing
update: DynamodbTransactWriteItemUpdateOptions;
```

- *Type:* <a href="#@winglang/sdk.ex.DynamodbTransactWriteItemUpdateOptions">DynamodbTransactWriteItemUpdateOptions</a>

A request to perform a update operation.

---

### DynamodbTransactWriteItemConditionCheckOptions <a name="DynamodbTransactWriteItemConditionCheckOptions" id="@winglang/sdk.ex.DynamodbTransactWriteItemConditionCheckOptions"></a>

Options for transact write item's condition check operation.

#### Initializer <a name="Initializer" id="@winglang/sdk.ex.DynamodbTransactWriteItemConditionCheckOptions.Initializer"></a>

```wing
bring ex;

let DynamodbTransactWriteItemConditionCheckOptions = ex.DynamodbTransactWriteItemConditionCheckOptions{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.ex.DynamodbTransactWriteItemConditionCheckOptions.property.key">key</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | The primary key of the item to be checked. |
| <code><a href="#@winglang/sdk.ex.DynamodbTransactWriteItemConditionCheckOptions.property.conditionExpression">conditionExpression</a></code> | <code>str</code> | A condition that must be satisfied in order for an operation to succeed. |
| <code><a href="#@winglang/sdk.ex.DynamodbTransactWriteItemConditionCheckOptions.property.expressionAttributeNames">expressionAttributeNames</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | One or more substitution tokens for attribute names in an expression. |
| <code><a href="#@winglang/sdk.ex.DynamodbTransactWriteItemConditionCheckOptions.property.expressionAttributeValues">expressionAttributeValues</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | One or more values that can be substituted in an expression. |
| <code><a href="#@winglang/sdk.ex.DynamodbTransactWriteItemConditionCheckOptions.property.returnValuesOnConditionCheckFailure">returnValuesOnConditionCheckFailure</a></code> | <code>str</code> | Determines the level of detail about either provisioned or on-demand throughput consumption. |

---

##### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.ex.DynamodbTransactWriteItemConditionCheckOptions.property.key"></a>

```wing
key: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

The primary key of the item to be checked.

---

##### `conditionExpression`<sup>Optional</sup> <a name="conditionExpression" id="@winglang/sdk.ex.DynamodbTransactWriteItemConditionCheckOptions.property.conditionExpression"></a>

```wing
conditionExpression: str;
```

- *Type:* str

A condition that must be satisfied in order for an operation to succeed.

---

##### `expressionAttributeNames`<sup>Optional</sup> <a name="expressionAttributeNames" id="@winglang/sdk.ex.DynamodbTransactWriteItemConditionCheckOptions.property.expressionAttributeNames"></a>

```wing
expressionAttributeNames: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

One or more substitution tokens for attribute names in an expression.

---

##### `expressionAttributeValues`<sup>Optional</sup> <a name="expressionAttributeValues" id="@winglang/sdk.ex.DynamodbTransactWriteItemConditionCheckOptions.property.expressionAttributeValues"></a>

```wing
expressionAttributeValues: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

One or more values that can be substituted in an expression.

---

##### `returnValuesOnConditionCheckFailure`<sup>Optional</sup> <a name="returnValuesOnConditionCheckFailure" id="@winglang/sdk.ex.DynamodbTransactWriteItemConditionCheckOptions.property.returnValuesOnConditionCheckFailure"></a>

```wing
returnValuesOnConditionCheckFailure: str;
```

- *Type:* str
- *Default:* "NONE"

Determines the level of detail about either provisioned or on-demand throughput consumption.

---

### DynamodbTransactWriteItemDeleteOptions <a name="DynamodbTransactWriteItemDeleteOptions" id="@winglang/sdk.ex.DynamodbTransactWriteItemDeleteOptions"></a>

Options for transact write item's delete operation.

#### Initializer <a name="Initializer" id="@winglang/sdk.ex.DynamodbTransactWriteItemDeleteOptions.Initializer"></a>

```wing
bring ex;

let DynamodbTransactWriteItemDeleteOptions = ex.DynamodbTransactWriteItemDeleteOptions{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.ex.DynamodbTransactWriteItemDeleteOptions.property.key">key</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | The primary key of the item to be deleted. |
| <code><a href="#@winglang/sdk.ex.DynamodbTransactWriteItemDeleteOptions.property.conditionExpression">conditionExpression</a></code> | <code>str</code> | A condition that must be satisfied in order for an operation to succeed. |
| <code><a href="#@winglang/sdk.ex.DynamodbTransactWriteItemDeleteOptions.property.expressionAttributeNames">expressionAttributeNames</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | One or more substitution tokens for attribute names in an expression. |
| <code><a href="#@winglang/sdk.ex.DynamodbTransactWriteItemDeleteOptions.property.expressionAttributeValues">expressionAttributeValues</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | One or more values that can be substituted in an expression. |
| <code><a href="#@winglang/sdk.ex.DynamodbTransactWriteItemDeleteOptions.property.returnValuesOnConditionCheckFailure">returnValuesOnConditionCheckFailure</a></code> | <code>str</code> | Determines the level of detail about either provisioned or on-demand throughput consumption. |

---

##### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.ex.DynamodbTransactWriteItemDeleteOptions.property.key"></a>

```wing
key: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

The primary key of the item to be deleted.

---

##### `conditionExpression`<sup>Optional</sup> <a name="conditionExpression" id="@winglang/sdk.ex.DynamodbTransactWriteItemDeleteOptions.property.conditionExpression"></a>

```wing
conditionExpression: str;
```

- *Type:* str

A condition that must be satisfied in order for an operation to succeed.

---

##### `expressionAttributeNames`<sup>Optional</sup> <a name="expressionAttributeNames" id="@winglang/sdk.ex.DynamodbTransactWriteItemDeleteOptions.property.expressionAttributeNames"></a>

```wing
expressionAttributeNames: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

One or more substitution tokens for attribute names in an expression.

---

##### `expressionAttributeValues`<sup>Optional</sup> <a name="expressionAttributeValues" id="@winglang/sdk.ex.DynamodbTransactWriteItemDeleteOptions.property.expressionAttributeValues"></a>

```wing
expressionAttributeValues: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

One or more values that can be substituted in an expression.

---

##### `returnValuesOnConditionCheckFailure`<sup>Optional</sup> <a name="returnValuesOnConditionCheckFailure" id="@winglang/sdk.ex.DynamodbTransactWriteItemDeleteOptions.property.returnValuesOnConditionCheckFailure"></a>

```wing
returnValuesOnConditionCheckFailure: str;
```

- *Type:* str
- *Default:* "NONE"

Determines the level of detail about either provisioned or on-demand throughput consumption.

---

### DynamodbTransactWriteItemPutProps <a name="DynamodbTransactWriteItemPutProps" id="@winglang/sdk.ex.DynamodbTransactWriteItemPutProps"></a>

Options for transact write item's update operation.

#### Initializer <a name="Initializer" id="@winglang/sdk.ex.DynamodbTransactWriteItemPutProps.Initializer"></a>

```wing
bring ex;

let DynamodbTransactWriteItemPutProps = ex.DynamodbTransactWriteItemPutProps{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.ex.DynamodbTransactWriteItemPutProps.property.item">item</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | The values of the item to be put. |
| <code><a href="#@winglang/sdk.ex.DynamodbTransactWriteItemPutProps.property.conditionExpression">conditionExpression</a></code> | <code>str</code> | A condition that must be satisfied in order for the operation to succeed. |

---

##### `item`<sup>Required</sup> <a name="item" id="@winglang/sdk.ex.DynamodbTransactWriteItemPutProps.property.item"></a>

```wing
item: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

The values of the item to be put.

---

##### `conditionExpression`<sup>Optional</sup> <a name="conditionExpression" id="@winglang/sdk.ex.DynamodbTransactWriteItemPutProps.property.conditionExpression"></a>

```wing
conditionExpression: str;
```

- *Type:* str
- *Default:* undefined

A condition that must be satisfied in order for the operation to succeed.

---

### DynamodbTransactWriteItemsOptions <a name="DynamodbTransactWriteItemsOptions" id="@winglang/sdk.ex.DynamodbTransactWriteItemsOptions"></a>

Options for `DynamodbTable.transactWriteItems`.

#### Initializer <a name="Initializer" id="@winglang/sdk.ex.DynamodbTransactWriteItemsOptions.Initializer"></a>

```wing
bring ex;

let DynamodbTransactWriteItemsOptions = ex.DynamodbTransactWriteItemsOptions{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.ex.DynamodbTransactWriteItemsOptions.property.transactItems">transactItems</a></code> | <code>MutArray&lt;<a href="#@winglang/sdk.ex.DynamodbTransactWriteItem">DynamodbTransactWriteItem</a>&gt;</code> | The write transact items. |

---

##### `transactItems`<sup>Required</sup> <a name="transactItems" id="@winglang/sdk.ex.DynamodbTransactWriteItemsOptions.property.transactItems"></a>

```wing
transactItems: MutArray<DynamodbTransactWriteItem>;
```

- *Type:* MutArray&lt;<a href="#@winglang/sdk.ex.DynamodbTransactWriteItem">DynamodbTransactWriteItem</a>&gt;

The write transact items.

---

### DynamodbTransactWriteItemUpdateOptions <a name="DynamodbTransactWriteItemUpdateOptions" id="@winglang/sdk.ex.DynamodbTransactWriteItemUpdateOptions"></a>

Options for transact write item's update operation.

#### Initializer <a name="Initializer" id="@winglang/sdk.ex.DynamodbTransactWriteItemUpdateOptions.Initializer"></a>

```wing
bring ex;

let DynamodbTransactWriteItemUpdateOptions = ex.DynamodbTransactWriteItemUpdateOptions{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.ex.DynamodbTransactWriteItemUpdateOptions.property.key">key</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | The primary key of the item to be updated. |
| <code><a href="#@winglang/sdk.ex.DynamodbTransactWriteItemUpdateOptions.property.conditionExpression">conditionExpression</a></code> | <code>str</code> | A condition that must be satisfied in order for an operation to succeed. |
| <code><a href="#@winglang/sdk.ex.DynamodbTransactWriteItemUpdateOptions.property.expressionAttributeNames">expressionAttributeNames</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | One or more substitution tokens for attribute names in an expression. |
| <code><a href="#@winglang/sdk.ex.DynamodbTransactWriteItemUpdateOptions.property.expressionAttributeValues">expressionAttributeValues</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | One or more values that can be substituted in an expression. |
| <code><a href="#@winglang/sdk.ex.DynamodbTransactWriteItemUpdateOptions.property.returnValuesOnConditionCheckFailure">returnValuesOnConditionCheckFailure</a></code> | <code>str</code> | Determines the level of detail about either provisioned or on-demand throughput consumption. |
| <code><a href="#@winglang/sdk.ex.DynamodbTransactWriteItemUpdateOptions.property.updateExpression">updateExpression</a></code> | <code>str</code> | An expression that defines one or more attributes to be updated. |

---

##### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.ex.DynamodbTransactWriteItemUpdateOptions.property.key"></a>

```wing
key: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

The primary key of the item to be updated.

---

##### `conditionExpression`<sup>Optional</sup> <a name="conditionExpression" id="@winglang/sdk.ex.DynamodbTransactWriteItemUpdateOptions.property.conditionExpression"></a>

```wing
conditionExpression: str;
```

- *Type:* str

A condition that must be satisfied in order for an operation to succeed.

---

##### `expressionAttributeNames`<sup>Optional</sup> <a name="expressionAttributeNames" id="@winglang/sdk.ex.DynamodbTransactWriteItemUpdateOptions.property.expressionAttributeNames"></a>

```wing
expressionAttributeNames: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

One or more substitution tokens for attribute names in an expression.

---

##### `expressionAttributeValues`<sup>Optional</sup> <a name="expressionAttributeValues" id="@winglang/sdk.ex.DynamodbTransactWriteItemUpdateOptions.property.expressionAttributeValues"></a>

```wing
expressionAttributeValues: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

One or more values that can be substituted in an expression.

---

##### `returnValuesOnConditionCheckFailure`<sup>Optional</sup> <a name="returnValuesOnConditionCheckFailure" id="@winglang/sdk.ex.DynamodbTransactWriteItemUpdateOptions.property.returnValuesOnConditionCheckFailure"></a>

```wing
returnValuesOnConditionCheckFailure: str;
```

- *Type:* str
- *Default:* "NONE"

Determines the level of detail about either provisioned or on-demand throughput consumption.

---

##### `updateExpression`<sup>Optional</sup> <a name="updateExpression" id="@winglang/sdk.ex.DynamodbTransactWriteItemUpdateOptions.property.updateExpression"></a>

```wing
updateExpression: str;
```

- *Type:* str

An expression that defines one or more attributes to be updated.

---


