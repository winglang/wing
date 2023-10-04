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
| <code><a href="#@winglang/sdk.ex.IDynamodbTableClient.deleteItem">deleteItem</a></code> | Delete an item from the table. |
| <code><a href="#@winglang/sdk.ex.IDynamodbTableClient.getItem">getItem</a></code> | Get an item from the table. |
| <code><a href="#@winglang/sdk.ex.IDynamodbTableClient.putItem">putItem</a></code> | Put an item into the table. |
| <code><a href="#@winglang/sdk.ex.IDynamodbTableClient.query">query</a></code> | Return all items with a given partition key value. |
| <code><a href="#@winglang/sdk.ex.IDynamodbTableClient.scan">scan</a></code> | Return one or more items and item attributes by accessing every item in a table or a secondary index. |
| <code><a href="#@winglang/sdk.ex.IDynamodbTableClient.transactWriteItems">transactWriteItems</a></code> | Perform a synchronous write operation that groups up to 100 action requests. |
| <code><a href="#@winglang/sdk.ex.IDynamodbTableClient.updateItem">updateItem</a></code> | Get an item from the table. |

---

##### `deleteItem` <a name="deleteItem" id="@winglang/sdk.ex.IDynamodbTableClient.deleteItem"></a>

```wing
inflight deleteItem(key: Json): void
```

Delete an item from the table.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.ex.IDynamodbTableClient.deleteItem.parameter.key"></a>

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

key of the item.

---

##### `getItem` <a name="getItem" id="@winglang/sdk.ex.IDynamodbTableClient.getItem"></a>

```wing
inflight getItem(key: Json): Json
```

Get an item from the table.

> [https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html)

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.ex.IDynamodbTableClient.getItem.parameter.key"></a>

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

key of the item.

---

##### `putItem` <a name="putItem" id="@winglang/sdk.ex.IDynamodbTableClient.putItem"></a>

```wing
inflight putItem(item: Json, props?: DynamodbTablePutItemProps): void
```

Put an item into the table.

###### `item`<sup>Required</sup> <a name="item" id="@winglang/sdk.ex.IDynamodbTableClient.putItem.parameter.item"></a>

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

data to be inserted.

---

###### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.ex.IDynamodbTableClient.putItem.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.ex.DynamodbTablePutItemProps">DynamodbTablePutItemProps</a>

dynamodb PutItem props.

---

##### `query` <a name="query" id="@winglang/sdk.ex.IDynamodbTableClient.query"></a>

```wing
inflight query(props: DynamodbTableQueryProps): DynamodbTableQueryResult
```

Return all items with a given partition key value.

> [https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Query.html](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Query.html)

###### `props`<sup>Required</sup> <a name="props" id="@winglang/sdk.ex.IDynamodbTableClient.query.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.ex.DynamodbTableQueryProps">DynamodbTableQueryProps</a>

properties for the query operation.

---

##### `scan` <a name="scan" id="@winglang/sdk.ex.IDynamodbTableClient.scan"></a>

```wing
inflight scan(props?: DynamodbTableScanProps): DynamodbTableScanResult
```

Return one or more items and item attributes by accessing every item in a table or a secondary index.

###### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.ex.IDynamodbTableClient.scan.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.ex.DynamodbTableScanProps">DynamodbTableScanProps</a>

properties for the scan operation.

---

##### `transactWriteItems` <a name="transactWriteItems" id="@winglang/sdk.ex.IDynamodbTableClient.transactWriteItems"></a>

```wing
inflight transactWriteItems(props: DynamodbTransactWriteItemsProps): void
```

Perform a synchronous write operation that groups up to 100 action requests.

###### `props`<sup>Required</sup> <a name="props" id="@winglang/sdk.ex.IDynamodbTableClient.transactWriteItems.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.ex.DynamodbTransactWriteItemsProps">DynamodbTransactWriteItemsProps</a>

properties for the transact write items operation.

---

##### `updateItem` <a name="updateItem" id="@winglang/sdk.ex.IDynamodbTableClient.updateItem"></a>

```wing
inflight updateItem(key: Json, props?: DynamodbTableUpdateItemProps): Json
```

Get an item from the table.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.ex.IDynamodbTableClient.updateItem.parameter.key"></a>

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

key of the item.

---

###### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.ex.IDynamodbTableClient.updateItem.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.ex.DynamodbTableUpdateItemProps">DynamodbTableUpdateItemProps</a>

dynamodb UpdateItem props.

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
| <code><a href="#@winglang/sdk.ex.DynamodbTableClientBase.deleteItem">deleteItem</a></code> | Delete an item from the table. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableClientBase.getItem">getItem</a></code> | Get an item from the table. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableClientBase.putItem">putItem</a></code> | Put an item into the table. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableClientBase.query">query</a></code> | Return all items with a given partition key value. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableClientBase.scan">scan</a></code> | Return one or more items and item attributes by accessing every item in a table or a secondary index. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableClientBase.transactWriteItems">transactWriteItems</a></code> | Perform a synchronous write operation that groups up to 100 action requests. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableClientBase.updateItem">updateItem</a></code> | Get an item from the table. |

---

##### `deleteItem` <a name="deleteItem" id="@winglang/sdk.ex.DynamodbTableClientBase.deleteItem"></a>

```wing
deleteItem(key: Json): void
```

Delete an item from the table.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.ex.DynamodbTableClientBase.deleteItem.parameter.key"></a>

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

---

##### `getItem` <a name="getItem" id="@winglang/sdk.ex.DynamodbTableClientBase.getItem"></a>

```wing
getItem(key: Json): Json
```

Get an item from the table.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.ex.DynamodbTableClientBase.getItem.parameter.key"></a>

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

---

##### `putItem` <a name="putItem" id="@winglang/sdk.ex.DynamodbTableClientBase.putItem"></a>

```wing
putItem(item: Json, props?: DynamodbTablePutItemProps): void
```

Put an item into the table.

###### `item`<sup>Required</sup> <a name="item" id="@winglang/sdk.ex.DynamodbTableClientBase.putItem.parameter.item"></a>

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

---

###### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.ex.DynamodbTableClientBase.putItem.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.ex.DynamodbTablePutItemProps">DynamodbTablePutItemProps</a>

---

##### `query` <a name="query" id="@winglang/sdk.ex.DynamodbTableClientBase.query"></a>

```wing
query(props: DynamodbTableQueryProps): DynamodbTableQueryResult
```

Return all items with a given partition key value.

###### `props`<sup>Required</sup> <a name="props" id="@winglang/sdk.ex.DynamodbTableClientBase.query.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.ex.DynamodbTableQueryProps">DynamodbTableQueryProps</a>

---

##### `scan` <a name="scan" id="@winglang/sdk.ex.DynamodbTableClientBase.scan"></a>

```wing
scan(props?: DynamodbTableScanProps): DynamodbTableScanResult
```

Return one or more items and item attributes by accessing every item in a table or a secondary index.

###### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.ex.DynamodbTableClientBase.scan.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.ex.DynamodbTableScanProps">DynamodbTableScanProps</a>

---

##### `transactWriteItems` <a name="transactWriteItems" id="@winglang/sdk.ex.DynamodbTableClientBase.transactWriteItems"></a>

```wing
transactWriteItems(props: DynamodbTransactWriteItemsProps): void
```

Perform a synchronous write operation that groups up to 100 action requests.

###### `props`<sup>Required</sup> <a name="props" id="@winglang/sdk.ex.DynamodbTableClientBase.transactWriteItems.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.ex.DynamodbTransactWriteItemsProps">DynamodbTransactWriteItemsProps</a>

---

##### `updateItem` <a name="updateItem" id="@winglang/sdk.ex.DynamodbTableClientBase.updateItem"></a>

```wing
updateItem(key: Json, props?: DynamodbTableUpdateItemProps): Json
```

Get an item from the table.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.ex.DynamodbTableClientBase.updateItem.parameter.key"></a>

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

---

###### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.ex.DynamodbTableClientBase.updateItem.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.ex.DynamodbTableUpdateItemProps">DynamodbTableUpdateItemProps</a>

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

### DynamodbTablePutItemProps <a name="DynamodbTablePutItemProps" id="@winglang/sdk.ex.DynamodbTablePutItemProps"></a>

Properties for `DynamodbTable.putItem`.

#### Initializer <a name="Initializer" id="@winglang/sdk.ex.DynamodbTablePutItemProps.Initializer"></a>

```wing
bring ex;

let DynamodbTablePutItemProps = ex.DynamodbTablePutItemProps{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.ex.DynamodbTablePutItemProps.property.conditionExpression">conditionExpression</a></code> | <code>str</code> | A condition that must be satisfied in order for an operation to succeed. |

---

##### `conditionExpression`<sup>Optional</sup> <a name="conditionExpression" id="@winglang/sdk.ex.DynamodbTablePutItemProps.property.conditionExpression"></a>

```wing
conditionExpression: str;
```

- *Type:* str
- *Default:* undefined

A condition that must be satisfied in order for an operation to succeed.

---

### DynamodbTableQueryProps <a name="DynamodbTableQueryProps" id="@winglang/sdk.ex.DynamodbTableQueryProps"></a>

Properties for `DynamodbTable.query`.

#### Initializer <a name="Initializer" id="@winglang/sdk.ex.DynamodbTableQueryProps.Initializer"></a>

```wing
bring ex;

let DynamodbTableQueryProps = ex.DynamodbTableQueryProps{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.ex.DynamodbTableQueryProps.property.keyConditionExpression">keyConditionExpression</a></code> | <code>str</code> | The condition that specifies the key values for items to be retrieved by the Query action. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableQueryProps.property.consistentRead">consistentRead</a></code> | <code>bool</code> | Determines the read consistency model: If set to true, then the operation uses strongly consistent reads; |
| <code><a href="#@winglang/sdk.ex.DynamodbTableQueryProps.property.exclusiveStartKey">exclusiveStartKey</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | The primary key of the first item that this operation will evaluate. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableQueryProps.property.expressionAttributeNames">expressionAttributeNames</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | One or more substitution tokens for attribute names in an expression. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableQueryProps.property.expressionAttributeValues">expressionAttributeValues</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | One or more values that can be substituted in an expression. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableQueryProps.property.filterExpression">filterExpression</a></code> | <code>str</code> | A string that contains conditions that DynamoDB applies after the Query operation, but before the data is returned to you. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableQueryProps.property.indexName">indexName</a></code> | <code>str</code> | The name of an index to query. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableQueryProps.property.limit">limit</a></code> | <code>num</code> | The maximum number of items to evaluate (not necessarily the number of matching items). |
| <code><a href="#@winglang/sdk.ex.DynamodbTableQueryProps.property.projectionExpression">projectionExpression</a></code> | <code>str</code> | A string that identifies one or more attributes to retrieve from the table. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableQueryProps.property.returnConsumedCapacity">returnConsumedCapacity</a></code> | <code>str</code> | Determines the level of detail about either provisioned or on-demand throughput consumption. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableQueryProps.property.scanIndexForward">scanIndexForward</a></code> | <code>bool</code> | Specifies the order for index traversal. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableQueryProps.property.select">select</a></code> | <code>str</code> | The attributes to be returned in the result. |

---

##### `keyConditionExpression`<sup>Required</sup> <a name="keyConditionExpression" id="@winglang/sdk.ex.DynamodbTableQueryProps.property.keyConditionExpression"></a>

```wing
keyConditionExpression: str;
```

- *Type:* str

The condition that specifies the key values for items to be retrieved by the Query action.

> [https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Query.html#DDB-Query-request-KeyConditionExpression](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Query.html#DDB-Query-request-KeyConditionExpression)

---

##### `consistentRead`<sup>Optional</sup> <a name="consistentRead" id="@winglang/sdk.ex.DynamodbTableQueryProps.property.consistentRead"></a>

```wing
consistentRead: bool;
```

- *Type:* bool
- *Default:* false

Determines the read consistency model: If set to true, then the operation uses strongly consistent reads;

otherwise, the operation uses eventually consistent reads.

> [https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Query.html#DDB-Query-request-ConsistentRead](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Query.html#DDB-Query-request-ConsistentRead)

---

##### `exclusiveStartKey`<sup>Optional</sup> <a name="exclusiveStartKey" id="@winglang/sdk.ex.DynamodbTableQueryProps.property.exclusiveStartKey"></a>

```wing
exclusiveStartKey: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>
- *Default:* undefined

The primary key of the first item that this operation will evaluate.

> [https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Query.html#DDB-Query-request-ExclusiveStartKey](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Query.html#DDB-Query-request-ExclusiveStartKey)

---

##### `expressionAttributeNames`<sup>Optional</sup> <a name="expressionAttributeNames" id="@winglang/sdk.ex.DynamodbTableQueryProps.property.expressionAttributeNames"></a>

```wing
expressionAttributeNames: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>
- *Default:* undefined

One or more substitution tokens for attribute names in an expression.

> [https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Query.html#DDB-Query-request-ExpressionAttributeNames](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Query.html#DDB-Query-request-ExpressionAttributeNames)

---

##### `expressionAttributeValues`<sup>Optional</sup> <a name="expressionAttributeValues" id="@winglang/sdk.ex.DynamodbTableQueryProps.property.expressionAttributeValues"></a>

```wing
expressionAttributeValues: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>
- *Default:* undefined

One or more values that can be substituted in an expression.

> [https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Query.html#DDB-Query-request-ExpressionAttributeValues](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Query.html#DDB-Query-request-ExpressionAttributeValues)

---

##### `filterExpression`<sup>Optional</sup> <a name="filterExpression" id="@winglang/sdk.ex.DynamodbTableQueryProps.property.filterExpression"></a>

```wing
filterExpression: str;
```

- *Type:* str
- *Default:* undefined

A string that contains conditions that DynamoDB applies after the Query operation, but before the data is returned to you.

> [https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Query.html#DDB-Query-request-FilterExpression](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Query.html#DDB-Query-request-FilterExpression)

---

##### `indexName`<sup>Optional</sup> <a name="indexName" id="@winglang/sdk.ex.DynamodbTableQueryProps.property.indexName"></a>

```wing
indexName: str;
```

- *Type:* str
- *Default:* undefined

The name of an index to query.

> [https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Query.html#DDB-Query-request-IndexName](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Query.html#DDB-Query-request-IndexName)

---

##### `limit`<sup>Optional</sup> <a name="limit" id="@winglang/sdk.ex.DynamodbTableQueryProps.property.limit"></a>

```wing
limit: num;
```

- *Type:* num
- *Default:* undefined

The maximum number of items to evaluate (not necessarily the number of matching items).

> [https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Query.html#DDB-Query-request-Limit](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Query.html#DDB-Query-request-Limit)

---

##### `projectionExpression`<sup>Optional</sup> <a name="projectionExpression" id="@winglang/sdk.ex.DynamodbTableQueryProps.property.projectionExpression"></a>

```wing
projectionExpression: str;
```

- *Type:* str
- *Default:* undefined

A string that identifies one or more attributes to retrieve from the table.

> [https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Query.html#DDB-Query-request-ProjectionExpression](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Query.html#DDB-Query-request-ProjectionExpression)

---

##### `returnConsumedCapacity`<sup>Optional</sup> <a name="returnConsumedCapacity" id="@winglang/sdk.ex.DynamodbTableQueryProps.property.returnConsumedCapacity"></a>

```wing
returnConsumedCapacity: str;
```

- *Type:* str
- *Default:* "NONE"

Determines the level of detail about either provisioned or on-demand throughput consumption.

> [https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Query.html#DDB-Query-request-ReturnConsumedCapacity](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Query.html#DDB-Query-request-ReturnConsumedCapacity)

---

##### `scanIndexForward`<sup>Optional</sup> <a name="scanIndexForward" id="@winglang/sdk.ex.DynamodbTableQueryProps.property.scanIndexForward"></a>

```wing
scanIndexForward: bool;
```

- *Type:* bool
- *Default:* true

Specifies the order for index traversal.

> [https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Query.html#DDB-Query-request-ScanIndexForward](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Query.html#DDB-Query-request-ScanIndexForward)

---

##### `select`<sup>Optional</sup> <a name="select" id="@winglang/sdk.ex.DynamodbTableQueryProps.property.select"></a>

```wing
select: str;
```

- *Type:* str
- *Default:* undefined

The attributes to be returned in the result.

> [https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Query.html#DDB-Query-request-Select](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Query.html#DDB-Query-request-Select)

---

### DynamodbTableQueryResult <a name="DynamodbTableQueryResult" id="@winglang/sdk.ex.DynamodbTableQueryResult"></a>

Result for `DynamodbTable.query`.

> [https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html#API_Scan_ResponseSyntax](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html#API_Scan_ResponseSyntax)

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
| <code><a href="#@winglang/sdk.ex.DynamodbTableQueryResult.property.consumedCapacity">consumedCapacity</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | The capacity units consumed by the Query operation. |
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

The capacity units consumed by the Query operation.

---

##### `lastEvaluatedKey`<sup>Optional</sup> <a name="lastEvaluatedKey" id="@winglang/sdk.ex.DynamodbTableQueryResult.property.lastEvaluatedKey"></a>

```wing
lastEvaluatedKey: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

The primary key of the item where the operation stopped, inclusive of the previous result set.

---

### DynamodbTableScanProps <a name="DynamodbTableScanProps" id="@winglang/sdk.ex.DynamodbTableScanProps"></a>

Properties for `DynamodbTable.scan`.

#### Initializer <a name="Initializer" id="@winglang/sdk.ex.DynamodbTableScanProps.Initializer"></a>

```wing
bring ex;

let DynamodbTableScanProps = ex.DynamodbTableScanProps{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.ex.DynamodbTableScanProps.property.consistentRead">consistentRead</a></code> | <code>bool</code> | Determines the read consistency model: If set to true, then the operation uses strongly consistent reads; |
| <code><a href="#@winglang/sdk.ex.DynamodbTableScanProps.property.exclusiveStartKey">exclusiveStartKey</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | The primary key of the first item that this operation will evaluate. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableScanProps.property.expressionAttributeNames">expressionAttributeNames</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | One or more substitution tokens for attribute names in an expression. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableScanProps.property.expressionAttributeValues">expressionAttributeValues</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | One or more values that can be substituted in an expression. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableScanProps.property.filterExpression">filterExpression</a></code> | <code>str</code> | A string that contains conditions that DynamoDB applies after the Query operation, but before the data is returned to you. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableScanProps.property.indexName">indexName</a></code> | <code>str</code> | The name of an index to query. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableScanProps.property.limit">limit</a></code> | <code>num</code> | The maximum number of items to evaluate (not necessarily the number of matching items). |
| <code><a href="#@winglang/sdk.ex.DynamodbTableScanProps.property.projectionExpression">projectionExpression</a></code> | <code>str</code> | A string that identifies one or more attributes to retrieve from the table. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableScanProps.property.returnConsumedCapacity">returnConsumedCapacity</a></code> | <code>str</code> | Determines the level of detail about either provisioned or on-demand throughput consumption. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableScanProps.property.segment">segment</a></code> | <code>num</code> | For a parallel Scan request, Segment identifies an individual segment to be scanned by an application worker. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableScanProps.property.select">select</a></code> | <code>str</code> | The attributes to be returned in the result. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableScanProps.property.totalSegments">totalSegments</a></code> | <code>num</code> | For a parallel Scan request, TotalSegments represents the total number of segments into which the Scan operation will be divided. |

---

##### `consistentRead`<sup>Optional</sup> <a name="consistentRead" id="@winglang/sdk.ex.DynamodbTableScanProps.property.consistentRead"></a>

```wing
consistentRead: bool;
```

- *Type:* bool
- *Default:* false

Determines the read consistency model: If set to true, then the operation uses strongly consistent reads;

otherwise, the operation uses eventually consistent reads.

> [https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html#DDB-Scan-request-ConsistentRead](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html#DDB-Scan-request-ConsistentRead)

---

##### `exclusiveStartKey`<sup>Optional</sup> <a name="exclusiveStartKey" id="@winglang/sdk.ex.DynamodbTableScanProps.property.exclusiveStartKey"></a>

```wing
exclusiveStartKey: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>
- *Default:* undefined

The primary key of the first item that this operation will evaluate.

> [https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html#DDB-Scan-request-ExclusiveStartKey](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html#DDB-Scan-request-ExclusiveStartKey)

---

##### `expressionAttributeNames`<sup>Optional</sup> <a name="expressionAttributeNames" id="@winglang/sdk.ex.DynamodbTableScanProps.property.expressionAttributeNames"></a>

```wing
expressionAttributeNames: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>
- *Default:* undefined

One or more substitution tokens for attribute names in an expression.

> [https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html#DDB-Scan-request-ExpressionAttributeNames](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html#DDB-Scan-request-ExpressionAttributeNames)

---

##### `expressionAttributeValues`<sup>Optional</sup> <a name="expressionAttributeValues" id="@winglang/sdk.ex.DynamodbTableScanProps.property.expressionAttributeValues"></a>

```wing
expressionAttributeValues: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>
- *Default:* undefined

One or more values that can be substituted in an expression.

> [https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html#DDB-Scan-request-ExpressionAttributeValues](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html#DDB-Scan-request-ExpressionAttributeValues)

---

##### `filterExpression`<sup>Optional</sup> <a name="filterExpression" id="@winglang/sdk.ex.DynamodbTableScanProps.property.filterExpression"></a>

```wing
filterExpression: str;
```

- *Type:* str
- *Default:* undefined

A string that contains conditions that DynamoDB applies after the Query operation, but before the data is returned to you.

> [https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html#DDB-Scan-request-FilterExpression](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html#DDB-Scan-request-FilterExpression)

---

##### `indexName`<sup>Optional</sup> <a name="indexName" id="@winglang/sdk.ex.DynamodbTableScanProps.property.indexName"></a>

```wing
indexName: str;
```

- *Type:* str
- *Default:* undefined

The name of an index to query.

> [https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html#DDB-Scan-request-IndexName](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html#DDB-Scan-request-IndexName)

---

##### `limit`<sup>Optional</sup> <a name="limit" id="@winglang/sdk.ex.DynamodbTableScanProps.property.limit"></a>

```wing
limit: num;
```

- *Type:* num
- *Default:* undefined

The maximum number of items to evaluate (not necessarily the number of matching items).

> [https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html#DDB-Scan-request-Limit](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html#DDB-Scan-request-Limit)

---

##### `projectionExpression`<sup>Optional</sup> <a name="projectionExpression" id="@winglang/sdk.ex.DynamodbTableScanProps.property.projectionExpression"></a>

```wing
projectionExpression: str;
```

- *Type:* str
- *Default:* undefined

A string that identifies one or more attributes to retrieve from the table.

> [https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html#DDB-Scan-request-ProjectionExpression](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html#DDB-Scan-request-ProjectionExpression)

---

##### `returnConsumedCapacity`<sup>Optional</sup> <a name="returnConsumedCapacity" id="@winglang/sdk.ex.DynamodbTableScanProps.property.returnConsumedCapacity"></a>

```wing
returnConsumedCapacity: str;
```

- *Type:* str
- *Default:* "NONE"

Determines the level of detail about either provisioned or on-demand throughput consumption.

> [https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html#DDB-Scan-request-ReturnConsumedCapacity](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html#DDB-Scan-request-ReturnConsumedCapacity)

---

##### `segment`<sup>Optional</sup> <a name="segment" id="@winglang/sdk.ex.DynamodbTableScanProps.property.segment"></a>

```wing
segment: num;
```

- *Type:* num
- *Default:* 0

For a parallel Scan request, Segment identifies an individual segment to be scanned by an application worker.

> [https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html#DDB-Scan-request-Segment](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html#DDB-Scan-request-Segment)

---

##### `select`<sup>Optional</sup> <a name="select" id="@winglang/sdk.ex.DynamodbTableScanProps.property.select"></a>

```wing
select: str;
```

- *Type:* str
- *Default:* undefined

The attributes to be returned in the result.

> [https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html#DDB-Scan-request-Select](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html#DDB-Scan-request-Select)

---

##### `totalSegments`<sup>Optional</sup> <a name="totalSegments" id="@winglang/sdk.ex.DynamodbTableScanProps.property.totalSegments"></a>

```wing
totalSegments: num;
```

- *Type:* num
- *Default:* 1

For a parallel Scan request, TotalSegments represents the total number of segments into which the Scan operation will be divided.

> [https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html#DDB-Scan-request-TotalSegments](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html#DDB-Scan-request-TotalSegments)

---

### DynamodbTableScanResult <a name="DynamodbTableScanResult" id="@winglang/sdk.ex.DynamodbTableScanResult"></a>

Result for `DynamodbTable.scan`.

> [https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html#API_Scan_ResponseSyntax](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html#API_Scan_ResponseSyntax)

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
| <code><a href="#@winglang/sdk.ex.DynamodbTableScanResult.property.consumedCapacity">consumedCapacity</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | The capacity units consumed by the Scan operation. |
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

The capacity units consumed by the Scan operation.

---

##### `lastEvaluatedKey`<sup>Optional</sup> <a name="lastEvaluatedKey" id="@winglang/sdk.ex.DynamodbTableScanResult.property.lastEvaluatedKey"></a>

```wing
lastEvaluatedKey: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

The primary key of the item where the operation stopped, inclusive of the previous result set.

---

### DynamodbTableUpdateItemProps <a name="DynamodbTableUpdateItemProps" id="@winglang/sdk.ex.DynamodbTableUpdateItemProps"></a>

Properties for `DynamodbTable.updateItem`.

#### Initializer <a name="Initializer" id="@winglang/sdk.ex.DynamodbTableUpdateItemProps.Initializer"></a>

```wing
bring ex;

let DynamodbTableUpdateItemProps = ex.DynamodbTableUpdateItemProps{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.ex.DynamodbTableUpdateItemProps.property.expressionAttributeValues">expressionAttributeValues</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | One or more values that can be substituted in an expression. |
| <code><a href="#@winglang/sdk.ex.DynamodbTableUpdateItemProps.property.updateExpression">updateExpression</a></code> | <code>str</code> | An expression that defines one or more attributes to be updated. |

---

##### `expressionAttributeValues`<sup>Optional</sup> <a name="expressionAttributeValues" id="@winglang/sdk.ex.DynamodbTableUpdateItemProps.property.expressionAttributeValues"></a>

```wing
expressionAttributeValues: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>
- *Default:* undefined

One or more values that can be substituted in an expression.

---

##### `updateExpression`<sup>Optional</sup> <a name="updateExpression" id="@winglang/sdk.ex.DynamodbTableUpdateItemProps.property.updateExpression"></a>

```wing
updateExpression: str;
```

- *Type:* str
- *Default:* undefined

An expression that defines one or more attributes to be updated.

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
| <code><a href="#@winglang/sdk.ex.DynamodbTransactWriteItem.property.delete">delete</a></code> | <code><a href="#@winglang/sdk.ex.DynamodbTransactWriteItemDeleteProps">DynamodbTransactWriteItemDeleteProps</a></code> | A request to perform a delete operation. |
| <code><a href="#@winglang/sdk.ex.DynamodbTransactWriteItem.property.put">put</a></code> | <code><a href="#@winglang/sdk.ex.DynamodbTransactWriteItemPutProps">DynamodbTransactWriteItemPutProps</a></code> | A request to perform a put operation. |
| <code><a href="#@winglang/sdk.ex.DynamodbTransactWriteItem.property.update">update</a></code> | <code><a href="#@winglang/sdk.ex.DynamodbTransactWriteItemUpdateProps">DynamodbTransactWriteItemUpdateProps</a></code> | A request to perform a update operation. |

---

##### `delete`<sup>Optional</sup> <a name="delete" id="@winglang/sdk.ex.DynamodbTransactWriteItem.property.delete"></a>

```wing
delete: DynamodbTransactWriteItemDeleteProps;
```

- *Type:* <a href="#@winglang/sdk.ex.DynamodbTransactWriteItemDeleteProps">DynamodbTransactWriteItemDeleteProps</a>

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
update: DynamodbTransactWriteItemUpdateProps;
```

- *Type:* <a href="#@winglang/sdk.ex.DynamodbTransactWriteItemUpdateProps">DynamodbTransactWriteItemUpdateProps</a>

A request to perform a update operation.

---

### DynamodbTransactWriteItemDeleteProps <a name="DynamodbTransactWriteItemDeleteProps" id="@winglang/sdk.ex.DynamodbTransactWriteItemDeleteProps"></a>

Properties for transact write item's delete operation.

#### Initializer <a name="Initializer" id="@winglang/sdk.ex.DynamodbTransactWriteItemDeleteProps.Initializer"></a>

```wing
bring ex;

let DynamodbTransactWriteItemDeleteProps = ex.DynamodbTransactWriteItemDeleteProps{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.ex.DynamodbTransactWriteItemDeleteProps.property.key">key</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | The item to delete. |

---

##### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.ex.DynamodbTransactWriteItemDeleteProps.property.key"></a>

```wing
key: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

The item to delete.

---

### DynamodbTransactWriteItemPutProps <a name="DynamodbTransactWriteItemPutProps" id="@winglang/sdk.ex.DynamodbTransactWriteItemPutProps"></a>

Properties for transact write item's update operation.

#### Initializer <a name="Initializer" id="@winglang/sdk.ex.DynamodbTransactWriteItemPutProps.Initializer"></a>

```wing
bring ex;

let DynamodbTransactWriteItemPutProps = ex.DynamodbTransactWriteItemPutProps{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.ex.DynamodbTransactWriteItemPutProps.property.item">item</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | The item to put. |
| <code><a href="#@winglang/sdk.ex.DynamodbTransactWriteItemPutProps.property.conditionExpression">conditionExpression</a></code> | <code>str</code> | A condition that must be satisfied in order for an operation to succeed. |

---

##### `item`<sup>Required</sup> <a name="item" id="@winglang/sdk.ex.DynamodbTransactWriteItemPutProps.property.item"></a>

```wing
item: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

The item to put.

---

##### `conditionExpression`<sup>Optional</sup> <a name="conditionExpression" id="@winglang/sdk.ex.DynamodbTransactWriteItemPutProps.property.conditionExpression"></a>

```wing
conditionExpression: str;
```

- *Type:* str
- *Default:* undefined

A condition that must be satisfied in order for an operation to succeed.

---

### DynamodbTransactWriteItemsProps <a name="DynamodbTransactWriteItemsProps" id="@winglang/sdk.ex.DynamodbTransactWriteItemsProps"></a>

Properties for `DynamodbTable.transactWriteItems`.

#### Initializer <a name="Initializer" id="@winglang/sdk.ex.DynamodbTransactWriteItemsProps.Initializer"></a>

```wing
bring ex;

let DynamodbTransactWriteItemsProps = ex.DynamodbTransactWriteItemsProps{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.ex.DynamodbTransactWriteItemsProps.property.transactItems">transactItems</a></code> | <code>MutArray&lt;<a href="#@winglang/sdk.ex.DynamodbTransactWriteItem">DynamodbTransactWriteItem</a>&gt;</code> | The write transact items. |

---

##### `transactItems`<sup>Required</sup> <a name="transactItems" id="@winglang/sdk.ex.DynamodbTransactWriteItemsProps.property.transactItems"></a>

```wing
transactItems: MutArray<DynamodbTransactWriteItem>;
```

- *Type:* MutArray&lt;<a href="#@winglang/sdk.ex.DynamodbTransactWriteItem">DynamodbTransactWriteItem</a>&gt;

The write transact items.

---

### DynamodbTransactWriteItemUpdateProps <a name="DynamodbTransactWriteItemUpdateProps" id="@winglang/sdk.ex.DynamodbTransactWriteItemUpdateProps"></a>

Properties for transact write item's update operation.

#### Initializer <a name="Initializer" id="@winglang/sdk.ex.DynamodbTransactWriteItemUpdateProps.Initializer"></a>

```wing
bring ex;

let DynamodbTransactWriteItemUpdateProps = ex.DynamodbTransactWriteItemUpdateProps{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.ex.DynamodbTransactWriteItemUpdateProps.property.key">key</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | The item to update. |
| <code><a href="#@winglang/sdk.ex.DynamodbTransactWriteItemUpdateProps.property.expressionAttributeValues">expressionAttributeValues</a></code> | <code><a href="#@winglang/sdk.std.Json">Json</a></code> | One or more values that can be substituted in an expression. |
| <code><a href="#@winglang/sdk.ex.DynamodbTransactWriteItemUpdateProps.property.updateExpression">updateExpression</a></code> | <code>str</code> | An expression that defines one or more attributes to be updated. |

---

##### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.ex.DynamodbTransactWriteItemUpdateProps.property.key"></a>

```wing
key: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

The item to update.

---

##### `expressionAttributeValues`<sup>Optional</sup> <a name="expressionAttributeValues" id="@winglang/sdk.ex.DynamodbTransactWriteItemUpdateProps.property.expressionAttributeValues"></a>

```wing
expressionAttributeValues: Json;
```

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>
- *Default:* undefined

One or more values that can be substituted in an expression.

---

##### `updateExpression`<sup>Optional</sup> <a name="updateExpression" id="@winglang/sdk.ex.DynamodbTransactWriteItemUpdateProps.property.updateExpression"></a>

```wing
updateExpression: str;
```

- *Type:* str
- *Default:* undefined

An expression that defines one or more attributes to be updated.

---


