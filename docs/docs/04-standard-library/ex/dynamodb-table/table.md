---
title: Dynamodb Table
id: dynamodb-table-table
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
| <code><a href="#@winglang/sdk.ex.IDynamodbTableClient.updateItem">updateItem</a></code> | Edit an existing item's attributes, or add a new item to the table if it does not already exist. |

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

Edit an existing item's attributes, or add a new item to the table if it does not already exist.

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
| <code><a href="#@winglang/sdk.ex.DynamodbTableClientBase.updateItem">updateItem</a></code> | Edit an existing item's attributes, or add a new item to the table if it does not already exist. |

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

Edit an existing item's attributes, or add a new item to the table if it does not already exist.

###### `options`<sup>Required</sup> <a name="options" id="@winglang/sdk.ex.DynamodbTableClientBase.updateItem.parameter.options"></a>

- *Type:* <a href="#@winglang/sdk.ex.DynamodbTableUpdateItemOptions">DynamodbTableUpdateItemOptions</a>

---




## Structs <a name="Structs" id="Structs"></a>

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


